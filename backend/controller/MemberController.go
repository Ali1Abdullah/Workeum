package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"mime"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	model "../model"
	utils "../utils"
	"github.com/gorilla/mux"
)

func HandleGetMembers(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	var members model.Members
	members = model.GetMembers()
	data, err := json.Marshal(members.AllMembers)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, "%s", data)
}

func HandleGetMemberById(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	var member model.Member
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	member = model.GetMember(id)
	data, err := json.Marshal(member)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, "%s", data)
}

func HandleMemberSignup(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)

	b, err := ioutil.ReadAll(r.Body)
	var mmbr model.Member

	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// // Unmarshal

	err = json.Unmarshal(b, &mmbr)
	fmt.Println(mmbr)
	str := "-1"
	if mmbr.MemberName == "" {

	} else {
		model.CreateMember(mmbr)
		str = strconv.Itoa(model.GetLastMemberId())
	}

	fmt.Println("last one is ", str)
	fmt.Fprintf(w, str)

}

func HandleDeleteMember(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	model.DeleteMember(id)
}

func HandleUpdateMember(w http.ResponseWriter, req *http.Request) {
	utils.EnableCors(&w)
	b, err := ioutil.ReadAll(req.Body)
	var mem model.Member
	defer req.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// // Unmarshal
	err = json.Unmarshal(b, &mem)
	fmt.Println(mem)
	model.UpdateMember(mem)
}

func UploadMemberImageHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	const maxUploadSize = 4 * 1024 * 1024 // 2 MB
	var uploadPath = "./../angular/src/assets/members"
	fmt.Println("Response: ", r)
	fmt.Println("Response Body: ", r.Body)
	// validate file size
	r.Body = http.MaxBytesReader(w, r.Body, maxUploadSize)
	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		fmt.Println(err)
		renderTheError(w, "FILE_TOO_BIG", http.StatusBadRequest)
		return
	}
	// parse and validate file and post parameters
	file, _, err := r.FormFile("uploadFile")
	if err != nil {
		fmt.Println("Err 1", err)
		renderTheError(w, "INVALID_FILE", http.StatusBadRequest)
		return
	}
	defer file.Close()
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println("Err 2", err)
		renderTheError(w, "INVALID_FILE", http.StatusBadRequest)
		return
	}
	// check file type, detectcontenttype only needs the first 512 bytes
	detectedFileType := http.DetectContentType(fileBytes)
	switch detectedFileType {
	case "image/jpeg", "image/jpg":
	case "image/gif", "image/png":
	case "application/pdf":
		break
	default:
		renderTheError(w, "INVALID_FILE_TYPE", http.StatusBadRequest)
		return
	}
	fileName := randTheToken(12)
	fileEndings, err := mime.ExtensionsByType(detectedFileType)
	if err != nil {
		renderTheError(w, "CANT_READ_FILE_TYPE", http.StatusInternalServerError)
		return
	}
	newPath := filepath.Join(uploadPath, fileName+fileEndings[0])
	fmt.Printf("FileType: %s, File: %s\n", detectedFileType, newPath)
	var mem model.Member
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	mem.MemberId = id
	mem.Image = fileName + fileEndings[0]
	model.UpdateMemberImage(mem.MemberId, mem.Image)

	newFile, err := os.Create(newPath)
	if err != nil {
		renderTheError(w, "CANT_WRITE_FILE", http.StatusInternalServerError)
		return
	}
	defer newFile.Close() // idempotent, okay to call twice
	if _, err := newFile.Write(fileBytes); err != nil || newFile.Close() != nil {
		renderTheError(w, "CANT_WRITE_FILE", http.StatusInternalServerError)
		return
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("SUCCESS"))
	}
}

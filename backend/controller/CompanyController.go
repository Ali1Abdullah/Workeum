package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"mime"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	model "../model"
	utils "../utils"
	"github.com/gorilla/mux"
)

func HandleCompanySignup(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)

	b, err := ioutil.ReadAll(r.Body)
	var comp model.Company

	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// // Unmarshal

	err = json.Unmarshal(b, &comp)
	fmt.Println(comp)
	str := "-1"
	if comp.CompanyName == "" {

	} else {
		model.CreateCompany(comp)
		str = strconv.Itoa(model.GetLastCompanyId())
	}

	fmt.Println("last one is ", str)
	fmt.Fprintf(w, str)

}

func HandleDeleteCompany(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	model.DeleteCompnay(id)
}

func HandleUpdateCompany(w http.ResponseWriter, req *http.Request) {
	utils.EnableCors(&w)
	b, err := ioutil.ReadAll(req.Body)
	var cmp model.Company
	defer req.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// // Unmarshal
	err = json.Unmarshal(b, &cmp)
	fmt.Println(cmp)
	model.UpdateCompany(cmp)
}

func UploadCompanyImageHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	const maxUploadSize = 4 * 1024 * 1024 // 2 MB
	var uploadPath = "../images"
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
	var cmp model.Company
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	cmp.CompanyId = id
	cmp.Image = fileName + fileEndings[0]
	model.UpdateCompanyImage(cmp.CompanyId, cmp.Image)
	// write file
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
func renderTheError(w http.ResponseWriter, message string, statusCode int) {
	w.WriteHeader(http.StatusBadRequest)
	w.Write([]byte(message))
}
func randTheToken(len int) string {
	b := make([]byte, len)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}

func DeleteFile(path string) {
	// delete file
	var err = os.Remove(path)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Println("File Deleted")
}

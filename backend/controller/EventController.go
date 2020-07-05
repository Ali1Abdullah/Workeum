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

func HandleGetEvents(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	var events model.Events
	events = model.GetEvents()
	data, err := json.Marshal(events.AllEvents)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, "%s", data)
}

func HandleDeleteEvent(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	model.DeleteEvent(id)
}

func HandleUpdateEvent(w http.ResponseWriter, req *http.Request) {
	utils.EnableCors(&w)
	b, err := ioutil.ReadAll(req.Body)
	var event model.Event

	params := mux.Vars(req)
	id, _ := strconv.Atoi(params["id"])

	defer req.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// // Unmarshal
	err = json.Unmarshal(b, &event)
	fmt.Println(event)
	model.UpdateEvent(event, id)
}

func HandleCreateEvent(w http.ResponseWriter, req *http.Request) {
	utils.EnableCors(&w)
	b, err := ioutil.ReadAll(req.Body)
	var event model.Event
	defer req.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// // Unmarshal
	err = json.Unmarshal(b, &event)
	fmt.Println(event)
	str := "-1"
	if event.EventTitle == "" {
	} else {
		model.CreateEvent(event)
		str = strconv.Itoa(model.GetLastEventId())
	}
	fmt.Println("last one is ", str)
	fmt.Fprintf(w, str)
}

func UploadEventImageHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	const maxUploadSize = 4 * 1024 * 1024 // 2 MB
	var uploadPath = "./../angular/src/assets/events"
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
	var event model.Event
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	event.EventId = id
	event.EventImage = fileName + fileEndings[0]
	model.UpdateEventImage(event)

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

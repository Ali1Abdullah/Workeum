package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
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
	defer req.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// // Unmarshal
	err = json.Unmarshal(b, &event)
	fmt.Println(event)
	model.UpdateEvent(event)
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

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
)

func HandleGetMessages(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	var messages model.Messages
	messages = model.GetMessages()
	data, err := json.Marshal(messages.AllMessages)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, "%s", data)
}

func HandlePostMessage(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)

	b, err := ioutil.ReadAll(r.Body)
	var msg model.Message

	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// // Unmarshal

	err = json.Unmarshal(b, &msg)
	fmt.Println(msg)
	str := "-1"
	if msg.Content == "" {

	} else {
		model.CreateMessage(msg)
		str = strconv.Itoa(model.GetLastMessageId())
	}

	fmt.Println("last one is ", str)
	fmt.Fprintf(w, str)

}

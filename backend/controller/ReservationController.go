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

func HandlePostReservation(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	b, err := ioutil.ReadAll(r.Body)

	var res model.Reservation
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	err = json.Unmarshal(b, &res)
	str := "-1"

	model.Reserve(res)
	str = strconv.Itoa(model.GetLastReservationId())

	fmt.Fprintf(w, str)

}

func HandleGetReservations(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	params := mux.Vars(r)
	startDate, _ := params["startDate"]
	endDate, _ := params["endDate"]
	var reservations model.Reservations
	reservations = model.GetReservations(startDate, endDate)
	data, err := json.Marshal(reservations.AllReservations)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, "%s", data)
}

func HandleDeleteReservation(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	model.DeleteReservation(id)
}

package main

import (
	"log"
	"net/http"

	controller "./controller"
	"./database"
	"github.com/gorilla/mux"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	database.InitDB()
	Router := mux.NewRouter().StrictSlash(true)

	Router.HandleFunc("/api/messages", controller.HandleGetMessages)
	Router.HandleFunc("/api/messages/post", controller.HandlePostMessage)

	Router.HandleFunc("/api/reservations/reserve", controller.HandlePostReservation)
	Router.HandleFunc("/api/reservations/{startDate}/{endDate}", controller.HandleGetReservations)
	Router.HandleFunc("/api/reservations/delete/{id}", controller.HandleDeleteReservation)
	log.Fatal(http.ListenAndServe(":3001", Router))
}

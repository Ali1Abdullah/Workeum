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

	Router.HandleFunc("/api/companies/delete/{id}", controller.HandleDeleteCompany)
	Router.HandleFunc("/api/companies/add", controller.HandleCompanySignup)
	Router.HandleFunc("/api/companies/edit", controller.HandleUpdateCompany)
	Router.HandleFunc("/api/companies/image", controller.UploadCompanyImageHandler)

	Router.HandleFunc("/api/members/add", controller.HandleMemberSignup)
	Router.HandleFunc("/api/members/edit", controller.HandleUpdateMember)
	Router.HandleFunc("/api/members/delete/{id}", controller.HandleDeleteMember)

	Router.HandleFunc("/api/events", controller.HandleGetEvents)
	Router.HandleFunc("/api/events/add", controller.HandleCreateEvent)
	Router.HandleFunc("/api/events/edit", controller.HandleUpdateEvent)
	Router.HandleFunc("/api/events/delete/{id}", controller.HandleDeleteEvent)

	log.Fatal(http.ListenAndServe(":3001", Router))
}

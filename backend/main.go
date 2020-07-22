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
	Router.HandleFunc("/api/reservations/getreservation/{startDate}/{endDate}", controller.HandleGetReservations)
	Router.HandleFunc("/api/reservations/delete/{id}", controller.HandleDeleteReservation)
	Router.HandleFunc("/api/reservations-user/{id}", controller.HandleGetUserReservations)

	Router.HandleFunc("/api/companies", controller.HandleGetCompanies)
	Router.HandleFunc("/api/company/{id}", controller.HandleGetCompanyById)
	Router.HandleFunc("/api/companies/delete/{id}", controller.HandleDeleteCompany)
	Router.HandleFunc("/api/companies/add", controller.HandleCompanySignup)
	Router.HandleFunc("/api/companies/edit", controller.HandleUpdateCompany)
	Router.HandleFunc("/api/companies/image/{id}", controller.UploadCompanyImageHandler)

	Router.HandleFunc("/api/members", controller.HandleGetMembers)
	Router.HandleFunc("/api/member/{id}", controller.HandleGetMemberById)
	Router.HandleFunc("/api/members/add", controller.HandleMemberSignup)
	Router.HandleFunc("/api/members/edit", controller.HandleUpdateMember)
	Router.HandleFunc("/api/members/delete/{id}", controller.HandleDeleteMember)
	Router.HandleFunc("/api/member/image/{id}", controller.UploadMemberImageHandler)

	Router.HandleFunc("/api/events", controller.HandleGetEvents)
	Router.HandleFunc("/api/events/add", controller.HandleCreateEvent)
	Router.HandleFunc("/api/events/edit/{id}", controller.HandleUpdateEvent)
	Router.HandleFunc("/api/events/delete/{id}", controller.HandleDeleteEvent)
	Router.HandleFunc("/api/events/image/{id}", controller.UploadEventImageHandler)

	Router.HandleFunc("/api/login/admin", controller.AdminLogin)
	Router.HandleFunc("/api/login/user", controller.UserLogin)
	Router.HandleFunc("/api/login/company", controller.CompanyLogin)

	log.Fatal(http.ListenAndServe(":3001", Router))
}

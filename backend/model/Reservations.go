package model

import (
	"fmt"
	"log"
	"time"
)

type Reservation struct {
	ReservationId int    `json:"ReservationId"`
	SeatId        int    `json:"SeatId"`
	UserId        int    `json:"UserId"`
	StartDate     string `json:"StartDate"`
	EndDate       string `json:"EndDate"`
}

type Reservations struct {
	AllReservations []Reservation
}

func GetReservations(startDate string, endDate string) Reservations {
	reservations := Reservations{}
	layout := "2000-01-01"
	start, err := time.Parse(layout, startDate)
	end, err := time.Parse(layout, endDate)

	sqlStmt := `SELECT * from public."Reservations" WHERE 
    ("StartDate"< $1 AND "EndDate" > $1) OR
	("StartDate"> $1 AND "StartDate" < $2)`

	rows, err := db.Query(sqlStmt, start, end)

	defer rows.Close()
	if err != nil {
		log.Fatal(err)
	}

	//looping through the item data
	for rows.Next() {
		res := Reservation{}
		err := rows.Scan(
			&res.ReservationId,
			&res.SeatId,
			&res.UserId,
			&res.StartDate,
			&res.EndDate)
		if err != nil {
			log.Fatal(err)
		}
		reservations.AllReservations = append(reservations.AllReservations, res)
	}
	return reservations
}

func Reserve(reservation Reservation) {

	layout := "2000-01-01"
	start, _ := time.Parse(layout, reservation.StartDate)
	end, _ := time.Parse(layout, reservation.EndDate)

	sqlStmt := `INSERT INTO public."Reservations"(
		"SeatId", "UserId", "StartDate", "EndDate")
		VALUES ($1, $2, $3, $4)`

	_, err := db.Exec(sqlStmt, reservation.SeatId, reservation.UserId, start, end)

	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Item got created")
	}
}

func DeleteReservation(id int) {
	sqlStmt := `DELETE FROM public."Reservations" WHERE "ReservationId"=$1`

	_, err := db.Exec(sqlStmt, id)
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Reservation got deleted")
	}
}

func GetLastReservationId() int {
	var id int
	sql := `SELECT "ReservationId" FROM public."Reservations" order by "ReservationId" desc limit 1`
	rows, err := db.Query(sql)

	if err != nil {
		fmt.Println(err)
	}

	defer rows.Close()
	for rows.Next() {
		err = rows.Scan(&id)
	}
	fmt.Println("Id ", id, &id)
	return id
}

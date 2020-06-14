package model

import (
	"fmt"
	"log"
)

type Event struct {
	EventId          int    `json:"EventId"`
	EventTitle       string `json:"EventTitle"`
	EventDescription string `json:"EventDescription"`
	EventDate        string `json:"EventDate"`
	EventStart       string `json:"EventStart"`
	EventEnd         string `json:"EventEnd"`
	EventImage       string `json:"EventImage"`
}

type Events struct {
	AllEvents []Event
}

func GetEvents() Events {
	sqlStmt := `SELECT * FROM public."Events"`
	rows, err := db.Query(sqlStmt)
	events := Events{}
	defer rows.Close()
	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		evnt := Event{}
		err := rows.Scan(
			&evnt.EventId,
			&evnt.EventTitle,
			&evnt.EventDescription,
			&evnt.EventDate,
			&evnt.EventStart,
			&evnt.EventEnd,
			&evnt.EventImage)
		if err != nil {
			log.Fatal(err)
		}
		events.AllEvents = append(events.AllEvents, evnt)
	}
	return events
}

func CreateEvent(event Event) {
	sqlStmt := `INSERT INTO public."Events"(
		"EventTitle", "EventDescription", "EventDate", "EventStart","EventEnd")
		VALUES ($1, $2, $3, $4, $5)`

	_, err := db.Exec(sqlStmt, event.EventTitle, event.EventDescription, event.EventDate, event.EventStart, event.EventEnd)

	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Event got created")
	}
}

func DeleteEvent(id int) {
	sqlStmt := `DELETE FROM public."Events" WHERE "EventId" = $1`

	_, err := db.Exec(sqlStmt, id)
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Event got deleted")
	}
}

func GetLastEventId() int {
	var id int
	sql := `SELECT "EventId" FROM public."Events" order by "EventId" desc limit 1`
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

func UpdateEvent(event Event) {
	sql := `UPDATE public."Events"
    SET  "EventTitle"=$1, "EventDescription"=$2, "EventDate"=$3, "EventStart"=$4,"EventEnd"=$5
    WHERE "EventId"=$6;`
	_, err := db.Exec(sql, event.EventTitle, event.EventDescription, event.EventDate, event.EventStart, event.EventEnd, event.EventId)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Event successfully updated")
	}
}

func UpdateEventImage(event Event) {
	sql := `UPDATE public."Events"
    SET   "EventImage"=$1 WHERE "EventId"=$2;`
	_, err := db.Exec(sql, event.EventImage, event.EventId)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Event successfully updated")
	}
}

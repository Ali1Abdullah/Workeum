package model

import (
	"fmt"
	"log"

	"../database"
)

var db = database.InitDB()

type Message struct {
	MessageId   int    `json:"MessageId"`
	FirstName   string `json:"FirstName"`
	LastName    string `json:"LastName"`
	Email       string `json:"Email"`
	PhoneNumber string `json:"PhoneNumber"`
	Content     string `json: "Content"`
}

type Messages struct {
	AllMessages []Message
}

func GetMessages() Messages {

	messages := Messages{}

	sqlStmt := `SELECT "Messages"."MessageId", "FirstName", "LastName", "Email", "PhoneNumber", "Content"
	FROM public."Messages"`
	rows, err := db.Query(sqlStmt)
	defer rows.Close()
	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		msg := Message{}
		err := rows.Scan(
			&msg.MessageId,
			&msg.FirstName,
			&msg.LastName,
			&msg.Email,
			&msg.PhoneNumber,
			&msg.Content)
		if err != nil {
			log.Fatal(err)
		}
		messages.AllMessages = append(messages.AllMessages, msg)
	}
	return messages
}

func CreateMessage(msg Message) {
	sqlStmt := `INSERT INTO public."Messages"(
		"FirstName", "LastName", "Email", "PhoneNumber", "Content")
		VALUES ($1, $2, $3, $4, $5)`

	fmt.Println(msg)

	_, err := db.Exec(sqlStmt, msg.FirstName, msg.LastName, msg.Email, msg.PhoneNumber, msg.Content)

	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Message got created")
	}
}

func GetLastMessageId() int {
	var id int
	sql := `SELECT "MessageId" FROM public."Messages" order by "MessageId" desc limit 1`
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

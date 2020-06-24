package model

import (
	"fmt"
	"log"
)

type Member struct {
	MemberId    int    `json:"MemberId"`
	MemberName  string `json:"MemberName"`
	CompanyName string `json:"CompanyName"`
	Email       string `json:"Email"`
	PhoneNumber string `json:"PhoneNumber"`
	BOD         string `json:"BOD"`
	Position    string `json:"Position"`
	Password    string `json:"Password"`
	Image       string `json:"Image"`
}

type Members struct {
	AllMembers []Member
}

func GetMembers() Members {
	sqlStmt := `SELECT * FROM public."Members"`
	rows, err := db.Query(sqlStmt)
	members := Members{}
	defer rows.Close()
	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		mmbr := Member{}
		err := rows.Scan(
			&mmbr.MemberId,
			&mmbr.MemberName,
			&mmbr.CompanyName,
			&mmbr.Email,
			&mmbr.PhoneNumber,
			&mmbr.BOD,
			&mmbr.Position,
			&mmbr.Password,
			&mmbr.Image)
		if err != nil {
			log.Fatal(err)
		}
		members.AllMembers = append(members.AllMembers, mmbr)
	}
	return members
}

func CreateMember(mmbr Member) {
	sqlStmt := `INSERT INTO public."Members"(
		"MemberName", "CompanyName", "Email", "PhoneNumber","BOD", "Position","Password","Image")
		VALUES ($1, $2, $3, $4, $5,$6,$7,$8)`

	_, err := db.Exec(sqlStmt, mmbr.MemberName, mmbr.CompanyName, mmbr.Email, mmbr.PhoneNumber, mmbr.BOD, mmbr.Position, mmbr.Password, "")

	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Member got created")
	}
}

func DeleteMember(id int) {
	sqlStmt := `DELETE FROM public."Members" WHERE "MemberId" = $1`

	_, err := db.Exec(sqlStmt, id)
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Member got deleted")
	}
}

func GetLastMemberId() int {
	var id int
	sql := `SELECT "MemberId" FROM public."Members" order by "MemberId" desc limit 1`
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

func UpdateMemberImage(id int, image string) {
	sql := `UPDATE public."Members"
	SET   "Image"=$1 WHERE "MemberId"=$2;`
	fmt.Println("hi")
	_, err := db.Exec(sql, image, id)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Member successfully updated")
	}
}

func UpdateMember(mem Member) {
	sql := `UPDATE public."Members"
    SET  "MemberName"=$1, "CompanyName"=$2, "Email"=$3, "PhoneNumber"=$4,"BOD"=$5, "Position"=$6,"Password"=$7
    WHERE "MemberId"=$8;`
	_, err := db.Exec(sql, mem.MemberName, mem.CompanyName, mem.Email, mem.PhoneNumber, mem.BOD, mem.Position, mem.Password, mem.MemberId)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Member successfully updated")
	}
}

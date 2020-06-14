package model

import (
	"fmt"
	"log"
)

type Company struct {
	CompanyId    int    `json:"CompanyId"`
	CompanyName  string `json:"CompanyName"`
	FounderName  string `json:"FounderName"`
	BusinessType string `json:"BusinessType"`
	Others       string `json:"Others"`
	Email        string `json:"Email"`
	PhoneNumber  string `json:"PhoneNumber"`
	Password     string `json:"Password"`
	Image        string `json:"Image"`
}

type Companies struct {
	AllCompanies []Company
}

func DeleteCompnay(id int) {
	sqlStmt := `DELETE FROM public."Companies" WHERE "CompanyId" = $1`

	_, err := db.Exec(sqlStmt, id)
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Member got deleted")
	}
}

func CreateCompany(comp Company) {
	sqlStmt := `INSERT INTO public."Companies"(
		"CompanyName", "FounderName","BusinessType","Others", "Email", "PhoneNumber","Password")
		VALUES ($1, $2, $3, $4, $5,$6,$7)`

	_, err := db.Exec(sqlStmt, comp.CompanyName, comp.FounderName, comp.BusinessType, comp.Others, comp.Email, comp.PhoneNumber, comp.Password)

	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Compnay got created")
	}
}

func GetLastCompanyId() int {
	var id int
	sql := `SELECT "CompanyId" FROM public."Companies" order by "CompanyId" desc limit 1`
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

func UpdateCompanyImage(id int, image string) {
	sql := `UPDATE public."Companies"
    SET   "Image"=$1 WHERE "CompanyId"=$2;`
	_, err := db.Exec(sql, image, id)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Company successfully updated")
	}
}

func UpdateCompany(cmp Company) {
	sql := `UPDATE public."Companies"
    SET "CompanyName"=$1, "FounderName"=$2,"BusinessType"=$3,"Others"=$4, "Email"=$5, "PhoneNumber"=$6,"Password"=$7
    WHERE "CompanyId"=$8;`
	_, err := db.Exec(sql, cmp.CompanyName, cmp.FounderName, cmp.BusinessType, cmp.Others, cmp.Email, cmp.PhoneNumber, cmp.Password, cmp.CompanyId)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Company successfully updated")
	}
}

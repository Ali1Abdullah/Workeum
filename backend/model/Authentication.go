package model

import "fmt"

type Auth struct {
	Email    string `json:"Email"`
	Password string `json:"Password"`
}

func AdminAuth(auth Auth) bool {
	//to search for the username and password written by the admin
	sql := `SELECT * FROM public."Admin" where "Username"=$1 and "Password"=$2`
	flag := false
	rows, err := db.Query(sql, auth.Email, auth.Password)
	if err != nil {
		fmt.Println(err)
		return false
	}
	defer rows.Close()
	for rows.Next() {
		flag = true
	}
	//returing true if admin is validated and false if not
	return flag
}

func CompanyAuth(auth Auth) bool {
	sql := `SELECT * FROM public."Companies" where "Email"=$1 and "Password"=$2`
	flag := false
	rows, err := db.Query(sql, auth.Email, auth.Password)
	if err != nil {
		fmt.Println(err)
		return false
	}
	defer rows.Close()
	for rows.Next() {
		flag = true
	}
	//returing true if admin is validated and false if not
	return flag
}

func UserAuth(auth Auth) bool {
	sql := `SELECT * FROM public."Members" where "Email"=$1 and "Password"=$2`
	flag := false
	rows, err := db.Query(sql, auth.Email, auth.Password)
	if err != nil {
		fmt.Println(err)
		return false
	}
	defer rows.Close()
	for rows.Next() {
		flag = true
	}
	//returing true if admin is validated and false if not
	return flag
}

func GetAuthUser(auth Auth) int {
	sqlStmt := `SELECT "Members"."MemberId" FROM public."Members" WHERE "Email"=$1 and "Password"=$2`

	//retrieving data from database
	row := db.QueryRow(sqlStmt, auth.Email, auth.Password)

	//creating structure for variable and adding the row value to it
	member := Member{}
	row.Scan(
		&member.MemberId)

	var id = member.MemberId

	return id
}

func GetAuthCompany(auth Auth) int {
	sqlStmt := `SELECT "Companies"."CompanyId" FROM public."Companies" WHERE "Email"=$1 and "Password"=$2`

	//retrieving data from database
	row := db.QueryRow(sqlStmt, auth.Email, auth.Password)

	//creating structure for variable and adding the row value to it
	company := Company{}
	row.Scan(
		&company.CompanyId)

	var id = company.CompanyId

	return id
}

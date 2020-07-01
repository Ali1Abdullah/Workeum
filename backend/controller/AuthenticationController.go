package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	model "../model"
	utils "../utils"
)

func AdminLogin(w http.ResponseWriter, req *http.Request) {
	utils.EnableCors(&w)
	b, err := ioutil.ReadAll(req.Body)
	var auth model.Auth
	defer req.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// // Unmarshal
	err = json.Unmarshal(b, &auth)
	fmt.Println(auth)
	res := strconv.FormatBool(model.AdminAuth(auth))
	fmt.Fprintf(w, string(res))
}
func UserLogin(w http.ResponseWriter, req *http.Request) {
	utils.EnableCors(&w)
	b, err := ioutil.ReadAll(req.Body)
	var auth model.Auth
	defer req.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// // Unmarshal
	err = json.Unmarshal(b, &auth)
	fmt.Println(auth)
	var id int
	res := model.UserAuth(auth)
	fmt.Println("RES", res)
	if res == true {
		id = model.GetAuthUser(auth)

	} else {
		id = -1
	}
	fmt.Println("ID", id)
	fmt.Fprintf(w, "%s", strconv.Itoa(id))
}
func CompanyLogin(w http.ResponseWriter, req *http.Request) {
	utils.EnableCors(&w)
	b, err := ioutil.ReadAll(req.Body)
	var auth model.Auth
	defer req.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// // Unmarshal
	err = json.Unmarshal(b, &auth)
	fmt.Println(auth)
	var id int
	res := model.CompanyAuth(auth)
	if res == true {
		id = model.GetAuthCompany(auth)
	} else {
		id = -1
	}
	fmt.Println("ID", id)
	fmt.Fprintf(w, "%s", strconv.Itoa(id))
}

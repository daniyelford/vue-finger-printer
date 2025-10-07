package router

import (
	"go-mongo-vue-go/libraries"

	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/api/user/fingerPrint", libraries.ShapeFingerPrint).Methods("POST")
	return r
}

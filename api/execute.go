package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Request struct {
	Code string `json:"code"`
}

type Response struct {
	Output string `json:"output"`
	Error  string `json:"error,omitempty"`
}

func executeMaScript(code string) string {
	// Placeholder: You need to implement MaScript's parsing and execution logic here.
	return fmt.Sprintf("Executing MaScript: %s", code)
}

func handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	var req Request
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	output := executeMaScript(req.Code)

	res := Response{Output: output}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}

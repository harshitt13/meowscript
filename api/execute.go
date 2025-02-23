package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

// Data types
type Value struct {
	Type  string // "number", "string", "boolean"
	Value interface{}
}

// Variables
var variables = make(map[string]Value)

// Tokenize the input code
func tokenize(code string) []string {
	return strings.FieldsFunc(code, func(r rune) bool {
		return r == ' ' || r == '\n' || r == '\t' || r == ';'
	})
}

// Parse and execute MeowScript code
func executeMeowScript(code string) string {
	tokens := tokenize(code)
	output := ""

	for i := 0; i < len(tokens); i++ {
		token := tokens[i]

		switch token {
		case "purr":
			// Variable declaration
			name := tokens[i+1]
			i += 2 // Skip "="
			value := tokens[i]
			variables[name] = parseValue(value)
		case "meow":
			// Print statement
			value := tokens[i+1]
			output += fmt.Sprintf("%v\n", evalExpression(value))
			i++
		case "if":
			// Conditional statement
			condition := tokens[i+1]
			i += 2 // Skip "{"
			if evalCondition(condition) {
				output += executeMeowScript(strings.Join(tokens[i:], " "))
			}
		}
	}

	return output
}

// Parse a value (number, string, boolean)
func parseValue(value string) Value {
	if num, err := strconv.ParseFloat(value, 64); err == nil {
		return Value{Type: "number", Value: num}
	}
	if value == "true" || value == "false" {
		return Value{Type: "boolean", Value: value == "true"}
	}
	return Value{Type: "string", Value: strings.Trim(value, `"`)}
}

// Evaluate an expression (e.g., "x + y")
func evalExpression(expr string) interface{} {
	if val, ok := variables[expr]; ok {
		return val.Value
	}
	return expr
}

// Evaluate a condition (e.g., "x > 0")
func evalCondition(cond string) bool {
	parts := strings.Split(cond, " ")
	left := evalExpression(parts[0])
	right := evalExpression(parts[2])

	switch parts[1] {
	case ">":
		return left.(float64) > right.(float64)
	case "<":
		return left.(float64) < right.(float64)
	case "==":
		return left == right
	}
	return false
}

// API handler
func executeHandler(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Code string `json:"code"`
	}
	json.NewDecoder(r.Body).Decode(&req)

	output := executeMeowScript(req.Code)
	json.NewEncoder(w).Encode(struct {
		Output string `json:"output"`
	}{Output: output})
}

func main() {
	http.HandleFunc("/execute", executeHandler)
	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
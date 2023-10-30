package main

import (
	// "ethereal/scopes"
	"ethereal/server"
)

func main() {
	ginEngine, _ := server.Init()

	// go scopes.Init()

	ginEngine.Run(":3000")
}

package scopes

import (
	"encoding/json"
	"ethereal/util"
	"os"
	"os/exec"
	"path"

	"github.com/charmbracelet/log"
)

const SRC = "/scopes/proj/src"

func initializeRepo() {
	path := path.Join("scopes", "lit-element")
	err := os.Mkdir(path, os.FileMode(0522))

	if err != nil {
		log.Debug(err)
	}

	cmd := exec.Command("cd", "scopes")

	if err := cmd.Run(); err != nil {
		log.Fatal(err)
	}
	log.Info("cd scopes")
	// stdin, _ := cmd.StdinPipe()
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	cmd = exec.Command("bun", "create", "vite", "lit-element")

	stdin, _ := cmd.StdinPipe()
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	stdin.Write([]byte("$\031"))

	defer stdin.Close()

	if err = cmd.Run(); err != nil {
		log.Fatal(err)
	}

	// cmd = exec.Command("echo", "-n", "$\031")

	// if err = cmd.Run(); err != nil {
	// 	log.Fatal(err)
	// }

	log.Info("Created vite project")
}

func readFile(fileName string) string {
	wd, err := os.Getwd()

	if err != nil {
		log.Debug(err)
	}

	filePath := path.Join(wd, SRC, fileName)

	contents, err := os.ReadFile(filePath)

	if err != nil {
		log.Debug(err)
	}

	return string(contents)
}

// 1. Create global scope
// 2. on a random element creation
// 3. create new scope
func CreateGlobalScope() []byte {
	// read content of my-element
	contents := readFile("my-element.ts")

	state := util.State{
		State: contents,
		Type:  util.JS,
	}

	bytes, err := json.Marshal(state)

	if err != nil {
		log.Debug(err)
	}

	log.Info("Created Global Scope")

	return bytes
}

// 1. Create global scope
// 2. on a random element creation
// 3. create new scope
func CreateScopes(message *util.State) {

}

func Init() {
	// initializeRepo()
	CreateGlobalScope()

}

package server

import (
	"encoding/json"
	"ethereal/scopes"
	"ethereal/util"
	"path"

	"github.com/charmbracelet/log"
	"github.com/gin-gonic/gin"
	"gopkg.in/olahol/melody.v1"
)

func createState(msg []byte) *util.State {
	state := &util.State{}

	err := json.Unmarshal(msg, &state)
	if err != nil {
		log.Fatal(err)
	}

	return state
}

func Init() (*gin.Engine, *melody.Melody) {
	r := gin.Default()
	m := melody.New()

	r.GET("/", func(c *gin.Context) {
		path.Join("frontend", "public")
	})

	r.GET("/ws", func(c *gin.Context) {
		m.HandleRequest(c.Writer, c.Request)
	})

	m.HandleMessage(func(s *melody.Session, msg []byte) {
		state := createState(msg)

		if state.Type == util.JS {
			m.Broadcast(scopes.CreateGlobalScope())
		} else if state.Type == util.HTML {
			scopes.CreateScopes(state)
			m.Broadcast(msg)
		}

		// m.Broadcast(msg)
	})

	return r, m
}

package util

const (
	HTML = iota
	JS
)

type State struct {
	State string `json:"state"`
	Type  int    `json:"type"`
}

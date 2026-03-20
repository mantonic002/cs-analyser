package models

import (
	"encoding/json"

	"github.com/golang/geo/r3"
	"github.com/markus-wa/demoinfocs-golang/v5/pkg/demoinfocs/common"
)

type Game struct {
	Map      string   `json:"map"`
	TickRate float64  `json:"tickRate"`
	Players  []Player `json:"players"`
	Rounds   []Round  `json:"rounds"`
	Ticks    []Tick   `json:"ticks"`
}

type Round struct {
	Round     int         `json:"round"`
	TScore    int         `json:"tScore"`
	CTScore   int         `json:"ctScore"`
	Winner    common.Team `json:"winner"`
	StartTick int         `json:"startTick"`
	EndTick   int         `json:"endTick"`
}

type Player struct {
	UserID  int    `json:"userID"`
	SteamID uint64 `json:"steamID"`
	Name    string `json:"name"`
}

type PlayerTick struct {
	UserID         int         `json:"userID"`
	Team           common.Team `json:"team"`
	Position       r3.Vector   `json:"position"`
	ViewDirectionX float32     `json:"viewDirectionX"`
	Hp             int         `json:"hp"`
	Armor          int         `json:"armor"`
	Money          int         `json:"money"`
}

func (p PlayerTick) MarshalJSON() ([]byte, error) {
	return json.Marshal([]any{
		p.UserID,
		p.Team,
		[]any{p.Position.X, p.Position.Y, p.Position.Z},
		p.ViewDirectionX,
		p.Hp,
		p.Armor,
		p.Money,
	})
}

type Tick struct {
	Tick    int          `json:"tick"`
	Players []PlayerTick `json:"players"`
}

func (t Tick) MarshalJSON() ([]byte, error) {
	return json.Marshal([]any{
		t.Tick,
		t.Players,
	})
}

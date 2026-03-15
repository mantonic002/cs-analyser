package models

import (
	"github.com/golang/geo/r3"
	"github.com/markus-wa/demoinfocs-golang/v5/pkg/demoinfocs/common"
)

type Game struct {
	Map string
	TickRate float64
	Players []Player
}

type Player struct {
	UserID int 
	SteamID uint64 
	Name string
}

type PlayerTick struct {
	UserID int
	Team common.Team 
	Position r3.Vector
	ViewDirectionX float32
	Hp int
	Armot int
	Money int
}

type Round struct {
	TScore int
	CTScore int
	Winner common.Team 
	StartTick int
	EndTick int
}

type Tick struct {
	Tick int
	Players []PlayerTick
}

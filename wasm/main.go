package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"syscall/js"
	"wasm/models"

	"github.com/markus-wa/demoinfocs-golang/v5/pkg/demoinfocs"
	"github.com/markus-wa/demoinfocs-golang/v5/pkg/demoinfocs/common"
	"github.com/markus-wa/demoinfocs-golang/v5/pkg/demoinfocs/events"
	"github.com/markus-wa/demoinfocs-golang/v5/pkg/demoinfocs/msg"
)

func parseDemoFile(this js.Value, args []js.Value) interface {}{
    jsBytes := args[0]
    byteSlice := make([]byte, jsBytes.Get("byteLength").Int())
    js.CopyBytesToGo(byteSlice, jsBytes)

	mFile := bytes.NewReader(byteSlice) 
	p := demoinfocs.NewParser(mFile)
	defer p.Close()

	game := models.Game{}
	game.Players = make([]models.Player, 0, 10)
	game.Rounds = make([]models.Round, 0, 30)
	game.Ticks = make([]models.Tick, 0, 10_000)

	game.TickRate = p.TickRate()

	p.RegisterNetMessageHandler(func(m *msg.CSVCMsg_ServerInfo) {
		game.Map = m.GetMapName()
	})

	p.RegisterEventHandler(func(e events.MatchStart) {
		gs := p.GameState()

		participants := gs.Participants().All()
		for _, p := range participants {
			game.Players = append(game.Players, models.Player{
				UserID: p.UserID, 
				SteamID: p.SteamID64,
				Name: p.Name,
			})
		}
	})

	roundIndex := 0 
	p.RegisterEventHandler(func(e events.RoundStart) {
		game.Rounds = append(game.Rounds, models.Round{
			Round: roundIndex,
			StartTick: p.GameState().IngameTick(),
		})
	})
	p.RegisterEventHandler(func(e events.RoundEnd) {
		gs := p.GameState()
		game.Rounds[roundIndex].EndTick = gs.IngameTick() 
		game.Rounds[roundIndex].Winner = e.Winner	

		switch e.Winner {
			case common.TeamTerrorists:
				game.Rounds[roundIndex].CTScore = gs.TeamCounterTerrorists().Score() 
				game.Rounds[roundIndex].TScore = gs.TeamTerrorists().Score() 
			case common.TeamCounterTerrorists:
				game.Rounds[roundIndex].CTScore = gs.TeamCounterTerrorists().Score() 
				game.Rounds[roundIndex].TScore = gs.TeamTerrorists().Score() 
			default:
		}
		roundIndex += 1
	})

	for {
		more, err := p.ParseNextFrame()
		if err != nil {
			fmt.Println("failed reading file")
		} 
		if !more {
			break
		}
		gs:= p.GameState()
		tickI := gs.IngameTick()
		if tickI % 12 != 0 {
			continue
		}

		tick := models.Tick{
			Tick: tickI,
		}

		playing := gs.Participants().Playing()
		tick.Players = make([]models.PlayerTick, len(playing))

		for i, p := range playing {
			tick.Players[i] = models.PlayerTick{
				UserID: p.UserID,	
				Team: p.Team,
				Position: p.Position(),
				ViewDirectionX: p.ViewDirectionX(),
				Hp: p.Health(),
				Armor: p.Armor(),
				Money: p.Money(),
			}
		}
		game.Ticks = append(game.Ticks, tick)
	}

	jsonBytes, _ := json.Marshal(game)

	return js.ValueOf(string(jsonBytes))
}

func main() {
	ch := make(chan struct{})
	fmt.Println("Hello, WebAssembly!")
	js.Global().Set("parseDemoFile", js.FuncOf(parseDemoFile))
	<-ch
}

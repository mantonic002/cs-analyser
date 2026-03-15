package handlers

import (
	"cs-analyser/models"

	"github.com/gin-gonic/gin"
	"github.com/markus-wa/demoinfocs-golang/v5/pkg/demoinfocs"
	"github.com/markus-wa/demoinfocs-golang/v5/pkg/demoinfocs/events"
	"github.com/markus-wa/demoinfocs-golang/v5/pkg/demoinfocs/msg"
)

func ParseDemoFile(c *gin.Context) {
	mFile, _, err := c.Request.FormFile("demo")
	if err != nil {
		c.AbortWithError(400, err)
	} 

	p := demoinfocs.NewParser(mFile)
	defer p.Close()

	game := models.Game{}

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
	
	err = p.ParseToEnd()
	if err != nil {
		c.AbortWithError(400, err)
	} 

	c.JSON(200, game) 

}

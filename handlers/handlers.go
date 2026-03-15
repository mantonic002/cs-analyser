package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/markus-wa/demoinfocs-golang/v5/pkg/demoinfocs"
	"github.com/markus-wa/demoinfocs-golang/v5/pkg/demoinfocs/msg"
)

func ParseDemoFile(c *gin.Context) {
	mFile, _, err := c.Request.FormFile("demo")
	if err != nil {
		c.AbortWithError(400, err)
	} 

	p := demoinfocs.NewParser(mFile)
	defer p.Close()

	var map_name string
	p.RegisterNetMessageHandler(func(m *msg.CSVCMsg_ServerInfo) {
		map_name = m.GetMapName()
	})
	
	err = p.ParseToEnd()
	if err != nil {
		c.AbortWithError(400, err)
	} 

	c.JSON(200, map_name)

}

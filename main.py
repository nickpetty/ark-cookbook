# item list = https://github.com/gamehaxors/ark-item-db/blob/master/src/js/pages/dashboard/arkItems.js
from flask import Flask, render_template, Response
import keyboard
import time
import simplejson

itemList = open("static/itemList.json").read()
itemList = simplejson.loads(itemList)

config = simplejson.loads(open("config.json").read())

def findPlayerID(playerName):
	x = 0
	while x < len(config["players"]):
		if config["players"][x]["name"] == playerName:
			return config["players"][x]["id"]
		else:
			return 0

def keys(string):
	time.sleep(1)
	keyboard.write(string)
	time.sleep(.5)
	keyboard.send('enter')

# Console Command Functions #

def launchConsole(): # Default = 'tab'
	keyboard.write('`')
	time.sleep(.5)

# def closeConsole():
# 	keyboard.send('esc')

def enableCheats(password):
	launchConsole()
	keys('EnableCheats %s' % (password))

def forceTame():
	launchConsole()
	keys('admincheat ForceTame')

def giveItem(itemName, quanity=1, quality=1,  forceBlueprint=0, player=1):
	itemID = findItemID(itemName)
	launchConsole()
	if player == 1:
		keys('admincheat GiveItemNum %s %s %s %s' % (itemID, quanity, quality, forceBlueprint))
	else:
		playerID = findPlayerID(player)
		if playerID == 0:
			print "Player not found"
		else:
			keys("admincheat giveitemnumtoplayer %s %s %s %s %s" % (playerID, itemID, quanity, quality, forceBlueprint))


# Program Functions #

def findItemID(item):
	x = 0
	while x < len(itemList["items"]):
		if itemList["items"][x]["name"] == item:
			return itemList["items"][x]["id"]
		x += 1

time.sleep(4)
enableCheats('thereusetobeapasswordhere')
giveItem("Electric Prod")


# item list = https://github.com/gamehaxors/ark-item-db/blob/master/src/js/pages/dashboard/arkItems.js
from flask import Flask, render_template, request, Response
import platform

if platform.system() == "Darwin":
	import os
elif platform.system() == "Windows":
	import keyboard

import time
import simplejson
import json
import os

app = Flask(__name__)

# System Functions #

def windows(string):
	time.sleep(1)
	keyboard.write(string)
	time.sleep(.5)
	keyboard.send('enter')

def darwin(string):
	time.sleep(1)
	cmd = """osascript -e 'tell application "System Events" to keystroke "%s"'""" % (string)
	os.system(cmd)
	time.sleep(.5)
	cmd = """osascript -e 'tell application "System Events" to keystroke return'"""
	os.system(cmd)

if platform.system() == "Darwin":
	keys = darwin
elif platform.system() == "Windows":
	keys = windows


# Load Config/Itemlists #

itemListFile = open("static/itemList.json").read()
itemList = simplejson.loads(itemListFile)

if os.path.isfile("config.json"):
	config = simplejson.loads(open("config.json").read())
else:
	config = {"players":[{"name":"test", "id":"0"}], "adminPassword":"", "consoleKey":"tab"}
	with open('config.json', 'w') as outfile:
		json.dump(config, outfile)


# Flask Functions #

@app.route('/')
def index():
	return render_template("index.html")

@app.route('/getItems')
def getItems():
	return itemListFile

@app.route('/giveItem')
def giveItemRequest():
	giveItem( itemID=request.args.get("id"), quantity=request.args.get("quantity"), player=request.args.get("player") );
	return "", 200

@app.route('/giveBlueprint')
def givePlans():
	giveBlueprint(blueprint=request.args.get("id"), quantity=request.args.get("quantity"), player=request.args.get("player") )

@app.route('/enableCheats')
def cheater():
	enableCheats(config["adminPassword"])
	return "", 200

@app.route('/addplayer')
def addPlayer():
	playerName = request.args.get("name")
	playerID = request.args.get("id")
	config["players"].append({"name":playerName, "id":playerID})

	with open('config.json', 'w') as outfile:
		json.dump(config, outfile)

	return "", 200

# Console Command Functions #

def launchConsole(): # Default = 'tab'
	if platform.system() == "Darwin":
		cmd = """osascript -e 'tell application "System Events" to keystroke "`"'"""
		os.system(cmd)
		time.sleep(.5)
	elif platform.system() == "Windows":
		keyboard.write('`')
	

def enableCheats(password):
	launchConsole()
	keys('EnableCheats %s' % (password))

def forceTame():
	launchConsole()
	keys('admincheat ForceTame')

def giveItem(itemID, quantity=1, quality=1,  forceBlueprint=0, player=1):
	#itemID = findItemID(itemName)
	launchConsole()
	if player == "1":
		keys('admincheat GiveItemNum %s %s %s %s' % (itemID, quantity, quality, forceBlueprint))
	else:
		playerID = findPlayerID(player)
		if playerID == 0:
			print "Player not found"
		else:
			keys("admincheat giveitemnumtoplayer %s %s %s %s %s" % (playerID, itemID, quantity, quality, forceBlueprint))

def giveBlueprint(blueprint, quantity=1, quality=1,  forceBlueprint=0, player=1):
	#itemID = findItemID(itemName)
	time.sleep(2)
	if findBlueprintPath(blueprint) != False:
		print "we got here"
		blueprint = "\"" + findBlueprintPath(blueprint) + "\""

		launchConsole()
		if player == "1":
			keys('admincheat GiveItem %s %s %s %s' % (blueprint, quantity, quality, forceBlueprint))
		else:
			playerID = findPlayerID(player)
			if playerID == 0:
				print "Player not found"
			else:

				keys("admincheat giveitemtoplayer %s %s %s %s %s" % (playerID, blueprint, quantity, quality, forceBlueprint))
# Program Functions #

def findItemID(item):
	x = 0
	while x < len(itemList["items"]):
		if itemList["items"][x]["name"] == item:
			return  itemList["items"][x]["id"]
		x += 1
	return False

def findBlueprintPath(name):
	x = 0
	while x < len(itemList["blueprints"]):
		if itemList["blueprints"][x]["name"] == name:
			return itemList["blueprints"][x]["id"]
		x += 1

def findPlayerID(playerName):
	x = 0
	while x < len(config["players"]):
		if config["players"][x]["name"] == playerName:
			return config["players"][x]["id"]
		else:
			return 0


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)


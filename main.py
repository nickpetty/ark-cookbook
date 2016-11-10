# item list = https://github.com/gamehaxors/ark-item-db/blob/master/src/js/pages/dashboard/arkItems.js
from flask import Flask, render_template, request, Response
import keyboard
import time
import simplejson

app = Flask(__name__)

itemListFile = open("static/itemList.json").read()
itemList = simplejson.loads(itemListFile)

config = simplejson.loads(open("config.json").read())

# Flask Functions #

@app.route('/')
def index():
	return render_template("index.html")

@app.route('/getItems')
def getItems():
	return itemListFile

@app.route('/giveItem')
def giveItemRequest():
	giveItem(request.args.get("id"));
	return 'cool'

@app.route('/enableCheats')
def cheater():
	enableCheats('nothing to see here')

# Console Command Functions #

def launchConsole(): # Default = 'tab'
	keyboard.write('`')
	time.sleep(.5)

def enableCheats(password):
	launchConsole()
	keys('EnableCheats %s' % (password))

def forceTame():
	launchConsole()
	keys('admincheat ForceTame')

def giveItem(itemID, quanity=1, quality=1,  forceBlueprint=0, player=1):
	#itemID = findItemID(itemName)
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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)


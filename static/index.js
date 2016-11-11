var itemList;
var blueprintList;
function getItemList(){
	var xmlhttp = new XMLHttpRequest();
	var url = "/getItems";

	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        itemList = JSON.parse(this.responseText);
	        //console.log(myArr['items'][0]["name"]);
	        listItems(itemList);
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	function listItems(arr) {
	    var out = "";
	    var i;
	    for(i = 0; i < arr['items'].length; i++) {
	        out += "<div onclick='giveItem(" + arr['items'][i]['id'] + ")'>" + arr['items'][i]["name"] +  "</div><p>";
	    }
	    document.getElementById("items").innerHTML = out;
	}	
}

function giveItem(id=1, player=1, quanity=1, quality=1, forceBlueprint=0){
	var data = "player=" + player + "&id=" + id + "&quanity=" + quanity + "&quality=" +
	quality + "&forceBlueprint=" + forceBlueprint;
	console.log(data);

	var xmlhttp = new XMLHttpRequest();
	var url = "/giveItem?" + data
	xmlhttp.open("GET", url, true);
	//xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}

getItemList()


function enableCheats(){
	var xmlhttp = new XMLHttpRequest();
	var url = "/enableCheats";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function searchItem(){
	var item = document.getElementById('item').value;
	if (item == ""){
		getItemList();
	} else {
		console.log(item);
		var out = "";
		var i;
	    for(i = 0; i < itemList['items'].length; i++) {
	    	if (itemList['items'][i]['name'].toLowerCase().indexOf(item) >= 0){
	    		console.log('found it');
	    		out += "<div onclick='giveItem(" + itemList['items'][i]['id'] + ")'>" + itemList['items'][i]["name"] +  "</div><p>";
	    	}
	    }
	    if (out == ""){
	    	getItemList()
	    	return;
	    }
	    document.getElementById("items").innerHTML = '';
	    document.getElementById("items").innerHTML = out;
	}

}

function getBlueprintList(){
	var xmlhttp = new XMLHttpRequest();
	var url = "/getItems";

	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        blueprintList = JSON.parse(this.responseText);
	        //console.log(myArr['items'][0]["name"]);
	        listItems(blueprintList);
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	function listItems(arr) {
	    var out = "";
	    var i;
	    for(i = 0; i < arr['blueprints'].length; i++) {
	        out += "<div onclick='giveItem(" + arr['blueprints'][i]['id'] + ")'>" + arr['blueprints'][i]["name"] +  "</div><p>";
	    }
	    document.getElementById("blueprints").innerHTML = out;
	}	
}
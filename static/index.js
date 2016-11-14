

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

function giveItem(id=1, player=1, quantity=1, quality=1, forceBlueprint=0){
	if (document.getElementById("taylor").checked){
		player="Taylor";
	} else if (document.getElementById("nick").checked){
		player = 1;
	}
	console.log(document.getElementById('qty').value);
	var data = "player=" + player + "&id=" + id + "&quantity=" + document.getElementById('qty').value + "&quality=" +
	quality + "&forceBlueprint=" + forceBlueprint;
	console.log(data);

	var xmlhttp = new XMLHttpRequest();
	var url = "/giveItem?" + data
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function giveBlueprint(id=1, player=1, quantity=1, quality=1, forceBlueprint=0){
	console.log('called');
	if (document.getElementById("taylor").checked){
		player="Taylor";
	} else if (document.getElementById("nick").checked){
		player = 1;
	}
	console.log(document.getElementById('qty').value);
	var data = "player=" + player + "&id=" + id + "&quantity=" + document.getElementById('qty').value + "&quality=" +
	quality + "&forceBlueprint=" + forceBlueprint;
	console.log(data);

	var xmlhttp = new XMLHttpRequest();
	var url = "/giveBlueprint?" + data
	xmlhttp.open("GET", url, true);
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
		document.getElementById("items").innerHTML = '';
		document.getElementById("blueprints").innerHTML = '';
		getItemList();
		getBlueprintList();
	} else {
		console.log(item);
		var out = "";
		var i;
	    for(i = 0; i < itemList['items'].length; i++) {
	    	if (itemList['items'][i]['name'].toLowerCase().indexOf(item.toLowerCase()) >= 0){
	    		console.log('found it');
	    		out += "<div onclick='giveItem(" + itemList['items'][i]['id'] + ")'>" + itemList['items'][i]["name"] +  "</div><p>";
	    	}
	    }
	    if (out == ""){
	    	document.getElementById("items").innerHTML = '';
	    	return;
	    }
	    document.getElementById("items").innerHTML = '';	    
	    document.getElementById("items").innerHTML = out;
	}
	document.getElementById('qty').value = 1;
	searchBlueprints();

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
	        out += "<div onclick=\"giveBlueprint(\'" + itemList['blueprints'][i]['name'] + "\')\">" + arr['blueprints'][i]["name"] +  "</div><p>";
	    }
	    document.getElementById("blueprints").innerHTML = out;
	}	
}

getBlueprintList()

function searchBlueprints(){
	var item = document.getElementById('item').value;
	var out = "";
	var i;
    for(i = 0; i < itemList['blueprints'].length; i++) {
    	if (itemList['blueprints'][i]['name'].toLowerCase().indexOf(item.toLowerCase()) >= 0){
    		console.log('found it');
    		out += "<div onclick=\"giveBlueprint(\'" + itemList['blueprints'][i]['name'] + "\')\">" + itemList['blueprints'][i]["name"] +  "</div><p>";
    	}
    }

    if (out == ""){
    	document.getElementById("blueprints").innerHTML = '';
    	return;
    }
    document.getElementById("blueprints").innerHTML = '';
    document.getElementById("blueprints").innerHTML = out;
}

document.getElementById('item').onkeypress=function(e){
    if(e.keyCode==13){
        document.getElementById('submit').click();
    }
}










function getItemList(){
	var xmlhttp = new XMLHttpRequest();
	var url = "/getItems";

	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        var myArr = JSON.parse(this.responseText);
	        //console.log(myArr['items'][0]["name"]);
	        listItems(myArr);
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
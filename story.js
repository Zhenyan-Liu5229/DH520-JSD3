var opening = document.getElementById('opening').innerHTML;
var one = document.getElementById('one').innerHTML;
var two = document.getElementById('two').innerHTML;
var three = document.getElementById('three').innerHTML;
var four = document.getElementById('four').innerHTML;
var five = document.getElementById('five');
var select = 'rose'


function proceed(scene) {
	if (scene == d) {
		if (event.keyCode == 68 ||event.keyCode == 68+32) {
  	    document.getElementById('one').style.display = 'block';
  	    document.getElementById('opening').style.display = 'none';
        } else {
  	        alert('Please press d to continue!');
        }
	} else if (scene == h) {
		if (event.keyCode == 72 ||event.keyCode == 72+32) {
      	    document.getElementById('two').style.display = 'block';
      	    document.getElementById('one').style.display = 'none';
        } else {
  	        alert('Please press h to continue!');
        }
    } else if (scene == i) {
        document.getElementById('items').style.display = 'block';
        document.getElementById('two').style.display = 'none';
    } else if (scene == f) {
        if (event.keyCode == 53) {
            document.getElementById('four').style.display = 'block';
            document.getElementById('three').style.display = 'none';
        } else {
            alert('Please press 5 to continue!');
        }   
    } else if (scene == t) {
        if (event.keyCode == 50) {
            document.getElementById('four').style.display = 'none';
            document.getElementById('five').style.display = 'block';
            if (select == 'rose') {
                document.getElementById('rose').style.display = 'block';
            } else if (select == 'sword') {
                document.getElementById('sword').style.display = 'block';
            } else {
                document.getElementById('chocobo').style.display = 'block';
            }
        } else {
            alert('Please press 2 to continue!');
        }
    }  else if (scene == z) {
        if (event.keyCode == 48) {
            document.getElementById('last').style.display = 'block';
            document.getElementById('five').style.display = 'none';
        } else {
            alert('Please press 0 to continue!');
        }
    }
}


function dogName() {
    var dog_name = prompt('What\'s the name of your dog?');
    if (dog_name == null || dog_name =='') {
        document.getElementById('opening').innerHTML = opening.replace('your dog', 'your dog Tom');
    } else {
        document.getElementById('opening').innerHTML = opening.replace('your dog', 'your dog '+dog_name);
        document.getElementById('three').innerHTML = three.replace(/Tom\b/g, dog_name);
    }
}


function playerName() {
	var player_name = prompt('What\'s your name?');
    var first_three = player_name.slice(0,3);
	if (player_name != null || player_name != '') {
        document.getElementById('one').innerHTML = one.replace('Bobalat', player_name);
        document.getElementById('two').innerHTML = two.replace('Bobalat', player_name).replace(/Bob\b/g, first_three);
        document.getElementById('four').innerHTML = four.replace('Bobalat', player_name).replace(/Bob\b/g, first_three);
	}
}


function selectItem(item) {
    var first_three = item.slice(0,3);
    if (item == 'sword') {
        select = 'sword';
        document.getElementById('three').innerHTML = three.replace('rose', item).replace(/ros\b/g,first_three);
        five.insertBefore(document.getElementById('sword'),five.firstChild);    
    } else if (item == 'rose') {
        five.insertBefore(document.getElementById('rose'),five.firstChild);
    } else {
        select = 'chocobo';
        document.getElementById('three').innerHTML = three.replace('rose', item+'costume').replace(/ros\b/g,first_three);
        five.insertBefore(document.getElementById('chocobo'),five.firstChild);
    }
    document.getElementById('three').style.display = 'block';
    document.getElementById('items').style.display = 'none';
}

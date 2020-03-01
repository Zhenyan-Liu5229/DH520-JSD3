var opening = document.getElementById('opening').innerHTML;
var one = document.getElementById('one').innerHTML;
var pet_name = 'Tom', slayer_name = 'Bobalat'


function dogName() {
	var dog_name = prompt('What\'s the name of your dog?');
	if (dog_name == null || dog_name =='') {
        document.getElementById('opening').innerHTML = opening.replace('your dog', 'your dog Tom');
	} else {
        document.getElementById('opening').innerHTML = opening.replace('your dog', 'your dog '+dog_name);
        pet_name = dog_name;
	}
}


function proceed(scene) {
	if (scene == d){
		if (event.keyCode == 68 ||event.keyCode == 68+32) {
  	    document.getElementById('one').style.display = 'block';
  	    document.getElementById('opening').style.display = 'none';
        } else {
  	        alert('Please press d to continue!')
        }
	} else if (scene == h){
		if (event.keyCode == 72 ||event.keyCode == 72+32) {
  	    document.getElementById('two').style.display = 'block';
  	    document.getElementById('one').style.display = 'none';
        } else {
  	        alert('Please press h to continue!')
        }
    } 
    
}


function playerName() {
	var player_name = prompt('What\'s your name?');
	if (player_name != null || player_name != '') {
        document.getElementById('one').innerHTML = one.replace('Bobalat', player_name);
	}
}

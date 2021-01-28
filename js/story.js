//get each scene
var scene_start = document.getElementById('start');
var scene_open = document.getElementById('opening');
var scene_one = document.getElementById('one');
var scene_two = document.getElementById('two');
var scene_item = document.getElementById('items');
var scene_three = document.getElementById('three');
var scene_four = document.getElementById('four');
var scene_five = document.getElementById('five');
var scene_last = document.getElementById('last');

//get the content of the nodes we will be replace
var opening = document.getElementById('opening').innerHTML;
var one = document.getElementById('one').innerHTML;
var two = document.getElementById('two').innerHTML;
var three = document.getElementById('three').innerHTML;
var four = document.getElementById('four').innerHTML;

//the default selections
var item = 'rose';
var pet_name = 'Tom';

//add eventlisteners
document.getElementById('play').addEventListener('click', proceed);
document.getElementById('yourdogname').addEventListener('click', dogName);
document.getElementById('yourname').addEventListener('click', enterName);
document.getElementById('d').addEventListener('keypress', proceed);
document.getElementById('h').addEventListener('keypress', proceed);
document.getElementById('i').addEventListener('click', proceed);
document.getElementById('select_sword').addEventListener('click', selectSword);
document.getElementById('select_rose').addEventListener('click', selectRose);
document.getElementById('select_choco').addEventListener('click', selectChoco);
document.getElementById('t').addEventListener('keypress', proceed);
document.getElementById('z').addEventListener('keypress', proceed);
document.getElementById('replay').addEventListener('click', restart);


//the function to change the scenes (by replacing the <div> node under <section>)
function proceed() {
    var scene = document.getElementsByTagName('div')[0].id;
    if (scene == 'start') {
        //for replaceChild, the first argument is the new node
        document.getElementsByTagName('section')[0].replaceChild(scene_open, scene_start);
    } else if (scene == 'opening') {
        //for the keypress, check the keyCode to ensure that the player press the correct key,
        //the first number is the capital and the +32 is the lowercase
        if (event.keyCode == 68 ||event.keyCode == 68+32) {
            document.getElementsByTagName('section')[0].replaceChild(scene_one, scene_open);
        } else {
            alert('Please enter d to continue!');
        }
    } else if (scene == 'one') {
        if (event.keyCode == 72 ||event.keyCode == 72+32) {
            document.getElementsByTagName('section')[0].replaceChild(scene_two, scene_one);
        } else {
            alert('Please enter h to continue!');
        }
    } else if (scene == 'two') {
        document.getElementsByTagName('section')[0].replaceChild(scene_item, scene_two);
    } else if (scene == 'three') {
        if (event.keyCode == 53) {
            document.getElementsByTagName('section')[0].replaceChild(scene_four,scene_three);
        } else {
            alert('Please enter 5 to continue!');
        }   
    } else if (scene == 'four') {
        if (event.keyCode == 50) {
            document.getElementsByTagName('section')[0].replaceChild(scene_five,scene_four);
        } else {
            alert('Please enter 2 to continue!');
        }
    }  else if (scene == 'five') {
        if (event.keyCode == 48) {
            document.getElementsByTagName('section')[0].replaceChild(scene_last,scene_five);
        } else {
            alert('Please enter 0 to continue!');
        }
    }
}


// the function to change the name of the dog
function dogName() {
    var dog_name = prompt('What\'s the name of your dog?');
    if (dog_name != null || dog_name !='') {
        document.getElementById('opening').innerHTML = opening.replace(/Tom\b/,dog_name);
        pet_name = dog_name;
    }
    //after the replacement. the original eventlistener disappears so we manually add one here
    document.getElementById('d').addEventListener('keypress', proceed);
}

// the function to change the name of the player
function enterName() {
    // to make our game functional, we set the length of user input >=4
    var player_name = prompt('What\'s your name? (Please enter at least 4 characters)');
    if (player_name.length >3) {
        var first_three = player_name.slice(0,3);
        if (player_name != null || player_name != '') {
            document.getElementById('one').innerHTML = one.replace('Bobalat', player_name);
            document.getElementById('two').innerHTML = two.replace('Bobalat', player_name).replace(/Bob\b/g, first_three);
            document.getElementById('four').innerHTML = four.replace('Bobalat', player_name).replace(/Bob\b/g, first_three);
        }
        document.getElementById('h').addEventListener('keypress', proceed);
        document.getElementById('i').addEventListener('click', proceed);
        document.getElementById('t').addEventListener('keypress', proceed);
        } else {
            enterName();       
        } 
}

//add different story depends on the user selection - sword 
function selectSword(){
    var item = 'sword';
    var first_three = item.slice(0,3);
    if (pet_name !='Tom') {
        document.getElementById('three').innerHTML = three.replace('rose', item).replace(/ros\b/g,first_three).replace(/Tom\b/g, pet_name);
} else{
        document.getElementById('three').innerHTML = three.replace('rose', item).replace(/ros\b/g,first_three); 
}   
    five.insertBefore(document.getElementById('sword'),five.firstChild);
    document.getElementById('f').addEventListener('keypress', proceed);
    document.getElementsByTagName('section')[0].replaceChild(scene_three, scene_item);
}

//add different story depends on the user selection - rose 
function selectRose(){
    var first_three = item.slice(0,3);
    if (pet_name !='Tom') {
        document.getElementById('three').innerHTML = three.replace(/ros\b/g,first_three).replace(/Tom\b/g, pet_name);
} else{
        document.getElementById('three').innerHTML = three.replace(/ros\b/g,first_three); 
}   
    five.insertBefore(document.getElementById('rose'),five.firstChild);
    document.getElementById('f').addEventListener('keypress', proceed);
    document.getElementsByTagName('section')[0].replaceChild(scene_three, scene_item); 
}

//add different story depends on the user selection - chocobo
function selectChoco(){
    var item = 'chocobo';
    var first_three = item.slice(0,3);
    if (pet_name !='Tom') {
        document.getElementById('three').innerHTML = three.replace('rose', item +' costume').replace(/ros\b/g,first_three).replace(/Tom\b/g, pet_name);
} else{
        document.getElementById('three').innerHTML = three.replace('rose', item +' costume').replace(/ros\b/g,first_three); 
}   
    five.insertBefore(document.getElementById('chocobo'),five.firstChild);
    document.getElementById('f').addEventListener('keypress', proceed);
    document.getElementsByTagName('section')[0].replaceChild(scene_three, scene_item);
}

// refresh the page for the restart
function restart(){
    location.reload();
}
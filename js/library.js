// document.write('<h4> Hello </h4>');

// var animals = ['cat', 'dog', 'monkey'];
// document.write(animals[0]);

// var greeting = '\t\t\tHeko\'\n\n';
// document.write('<pre>' + greeting.trim() + '</pre>');

// var person = {
// 	'first':'William',
// 	'last':'Shakespeare',
// 	'birth':1564,
// 	'death':1616,
// 	'citizenship': 'English'
// };

// var parents = [
//     {'year': 1573, 'age': 24},
//     {'year':1575, 'age': 25},
//     {'year':1577, 'age': 30}
// ];


// /*if/else*/
// var coin = Math.random();
// if (coin < 0.5) {
// 	document.write('It\'s heads!');
// }  
// else {
// 	document.write('It\'s tails!');
// };

// var name = prompt('what \'s your name?');


// for loop, things in () are tested for boolean 

// for (property in person) {
// 	document.write(property + person[property] +'<br>');
// };


// var count = 0;
// while (count <3 ) {
// 	count += 1;
// 	document.write(count+'<br>')
// }


// /*loop through a list*/
// var letters = 'ASDFGHJ'.split('');
// var index = 0;

// while (index < letters.length ) {
// 	document.write(letters[index]);
// 	index += 1;
// }

// for (index = 0; index < letters.length; index ++){
// 	document.write(letters[index]);
// }

// for (info in person) {
// 	document.write(info+'<br>');
// }


// //functions
// function flipCoin() {
//     if (Math.random() < 0.5) {
//     	return 'heads';
//     } else{
//     	return 'tails';
//     }
// }

// document.write(flipCoin())
// 'use strict';

// document.write('before the function,'+ name + '<br>');

// function fullname(first, last) {
// 	var name = first + ' ' + last;
// 	document.write('in the function,'+ name + '<br>')
// 	return name
// }

// var writer = fullname('William', 'Shakespeare');
// document.write('The writer is ' + writer + '.<br>');

// document.write('after the function,'+ name + '<br>');

// var person = {
// 	'first':'William',
// 	'last':'Shakespeare',
// 	'birth':1564,
// 	'death':1616,
// 	'citizenship': 'English',
// 	'fullname':function() {
// 		return this.first + ' ' + this.last;
// 	}
// };


// function register_error(method, message) {
// 	method(message);
// } 

// function rewrite(message) {
// 	document.write(message);
// }



// Global Variables for this page

// var background = 'white';
// var foreground = 'black';

// //Add an event handler to our button
// d3.select('button')
//     .on('click', changePage);

// //function to change the page

// function changePage() {
//     if (background == 'white') {
//     	background = 'black';
//     	foreground = 'white';
//     } else {
//     	background = 'white';
//     	foreground = 'black';
//     }

//     d3.select('body')
//         .transition()
//         .style('background-color', background)
//         .style('color',foreground);
// }

// function addParagraphs() {

// 	d3.select('body')
// 	   .selectAll('p')
// 	   .data([1,2,3,4,5])
// 	   .text( function(d) {return 'my number is'+d+' .';})
// 	   .enter()
// 	   .text(function(d) {return 'new paragraph is'+d+' .';});
// }

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
// }

// document.write(getRandomIntInclusive(-3, 3))


//2020.3.18
//Data loading

var dataset = [];
var bastket = 0;

d3.csv('data/data.csv', function(data) {
	//loading sth from the local will cause an error
	// +string = number
	dataset.push({data.fruit, count: +data.count}); //move local data to global variable
	add_paragraphs();//put this line here because if outside csv, will cause async problem
	console.log(data);
});

// d3 get data each time so this function will be called 4 times
function add_paragraphs() {
	console.log(dataset.length);
    d3.select('body')
       .selectAll('P')
       .data(dataset)
       .enter()
       .append('p')
       .text(function(d) {
       	    basket += d.count;
       	    var answer = "I am adding" + d.count + ' ' + 'to my basket.';
       	    answer =+ "I have " + basket + ' items now.' ;
       	    return answer;
       });
}
//Js Library for the F1 data viz project
//Global variables
const SVG_WIDTH = 1100;
const SVG_HEIGHT = 600;

//the name for each race
var races = ['Australia','Bahrain','China','Azerbaijan', 'Spain', 
             'Monaco','Canada','France','Austria','Britain','Germany',
             'Hungary', 'Belgium' ,'Italy', 'Singapore', 'Russia',
             'Japan', 'Mexico', 'US', 'Brazil', 'Abu'];
//the drivers' last name, used in data groups as well as line ids and circle groups             
var drivers = ['Albon', 'Giovinazzi', 'Sainz', 'Leclerc','Ricciardo',
               'Kvyat', 'Russell', 'Magnussen', 'Raikkonen', 'Stroll',
               'Norris', 'Hamilton', 'Verstappen', 'Hulkenberg', 'Gasly',
               'Kubica', 'Grosjean', 'Vettel','Perez', 'Bottas'];
//the drivers' first name, used in checkbox id
var labels = ['Alexander', 'Antonio', 'Carlos', 'Charles', 'Daniel',
              'Daniil', 'George', 'Kevin', 'Kimi', 'Lance',
              'Lando', 'Lewis', 'Max', 'Nico', 'Pierre',
              'Robert', 'Romain','Sebastian', 'Sergio', 'Valtteri']
//the 'second' driver in each team (some of them are not official); they have dashed lines
var second = ['Albon', 'Giovinazzi','Norris', 'Leclerc','Gasly',
             'Hulkenberg', 'Kubica','Magnussen' ,'Stroll' , 'Bottas'];
//the color for each line, the colors are set the same as those of their teams
var colors = {'Albon':'#1E41FF','Verstappen':'#1E41FF', 'Giovinazzi':'#9B0000', 'Raikkonen':'#9B0000',
              'Sainz':'#FF8700', 'Norris':'#FF8700', 'Leclerc':'#DC0000', 'Vettel':'#DC0000',
              'Ricciardo':'#FFF500', 'Hulkenberg':'#FFF500', 'Kvyat':'#469BFF', 'Gasly':'#469BFF',
              'Russell':'#FFFFFF', 'Kubica':'#FFFFFF', 'Magnussen':'#F0D787', 'Grosjean':'#F0D787',
              'Stroll':'#F596C8', 'Perez':'#F596C8','Hamilton':'#00D2BE', 'Bottas':'#00D2BE'}

//the div for tooltips
var tooltip = d3.select('body').append('div')   
    .attr('class', 'tooltip')               
    .style('opacity', 0);

//use the data and data processing
d3.csv('data/f1data.csv', function(data) {
    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = drivers.map(function(driverName) { // .map allows to do something for each element of the list
        return {
            name: driverName,
            values: data.map(function(d) {
            return {Race: d.Race, value: +d[driverName]}; //use + will turn a string into a number; also remember d.Race = d[Race]
        })
      };
    });
    //check the data we got
    //console.log(dataReady);

    //Add x axis
    //define the x scale; since our x data is categorical so I used scalePoint()
    var x = d3.scalePoint()
              .domain(races)
              .range([50, SVG_WIDTH-50]);
    
    //draw the x axis
    d3.select('svg')
       .append('g')
       .attr('id', 'xaxis')
       .attr('class', 'axes')
       .attr('transform', 'translate(0,' + SVG_HEIGHT/2 +')')
       .call(d3.axisBottom(x)
                .tickPadding(20));

    // Add y axis
    //define the x scale; 
    var y = d3.scaleLinear()
    //the domain is fixed as the rankings will only fluctuate within the range of [-20,20]
              .domain([-20,20])
              .range([SVG_HEIGHT-50,50]);
    
    //draw the y axis
    d3.select('svg')
       .append('g')
       .attr('id', 'yaxis')
       .attr('class', 'axes')
       .attr('transform', 'translate(50, 0)')
       .call(d3.axisLeft(y));
    
    //add labels for the axes
    add_labels()

    //define each line with (race, ranking-change) pairs
    var line = d3.line()
                 .x(function(d) { return x(d.Race); })
                 .y(function(d) { return y(+d.value); })

    //draw the lines
    d3.select('svg')
      .selectAll('myLines')
      .data(dataReady)
      .enter()
      .append('path')
        .attr('d', function(d){ return line(d.values); })
        .attr('stroke', function(d) { return colors[d.name]; })
        .attr('stroke-width', 4)
        .attr('fill', 'none')
        .attr('display', 'none') //set display as none for the checkbox
        .attr('id', function(d) { return d.name; }); //set the id=driver's last name

    //set different style for the 'second' driver in the same team
    for (index in drivers) {
        if (second.includes(drivers[index])) {
            d3.select('#'+drivers[index]).attr('stroke-dasharray',3);
        }     
    }

    //draw the circles for each datapoint
    d3.select('svg')
      .selectAll('myDots')
      .data(dataReady)
      .enter()
        .append('g')
        .attr('class', function(d) {return d.name; } )
        .attr('display', 'none')
        .attr('fill', function(d) {return colors[d.name]; })
      // Second we need to enter in the 'values' part of this group
      .selectAll('myPoints')
      .data(function(d){ return d.values; })
      .enter()
      .append('circle')
        .attr('cx', function(d) { return x(d.Race); })
        .attr('cy', function(d) { return y(d.value); })
        .attr('r', 5)
        .attr('stroke', 'white')
        //add tooltip events for the circles
        .on('mouseover', function(d) {       
            tooltip.transition()        
                   .duration(200)      
                   .style('opacity', 0.9);

            tooltip.html('('+d.Race+', '+d.value+')')  
                   .style('left', (d3.event.pageX) + 'px')     
                   .style('top', (d3.event.pageY - 10) + 'px');    
            })                  
        .on('mouseout', function(d) {       
            tooltip.transition()        
                   .duration(500)      
                   .style('opacity', 0); 
            });
});


// label for the axes
function add_labels() {
    d3.select('svg')
       .append('text')
       .attr('transform', 'translate(1050, 280)')
       .text('Race');

    d3.select('svg')
       .append('text')
       .attr('transform', 'translate(20, 25)')
       .text('Change of Standing');
}


// Event Handlers for the checkbox
//d3 way of adding event listeners to all the checkboxes
d3.selectAll('input')
  .on('click', checkbox);

//the function to check which box is ticked and show related lines
function checkbox() {
    for (index in drivers) {
        if (d3.select('#'+labels[index]).property('checked')) {
            d3.select('#'+drivers[index]).attr('display', 'block');
            d3.select('.'+drivers[index]).attr('display', 'block');
        } else {
            d3.select('#'+drivers[index]).attr('display', 'none');
            d3.select('.'+drivers[index]).attr('display', 'none');
        }
    }
}
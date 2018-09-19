(function() { // wrapper to avoid variable override between files

// generate random data
function generate() {
  var data = [];
  for (var i=0; i<3; i++) {
     var sample = [];
    for (var j=0; j<20; j++) {
      sample.push({'x':j, 'y':d3.randomNormal(0,1)()});
    }
    data.push({'id':i, 'values':sample})
  }
  return data;
}

// d3
var svg = d3.select("#a_line")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom),
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
  .range([0,width]);

var y = d3.scaleLinear()
  .range([height,0]);

// define line
var line = d3.line()
    .defined(function(d) { return d; })
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

var x_axis = g.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0," + height + ")");

var y_axis = g.append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate(0," + 0 + ")");

series = g.selectAll('.series')
  .data(generate())
  .enter().append('g')
    .attr('class', 'series');

series.append('path')
	.attr('class', 'line')
	.attr('fill', 'none')
  .attr('stroke', function(d) { return mat(d.id); })
  .attr('stroke-width', '1.5px');
  
var sec = 0,   // discretize seconds
    i = 0;      // count loops
  
d3.timer(function(d) {
  sec = Math.round(d/1000)>sec ? Math.floor(d/1000) : sec;

  if (sec%3===0) {
    var data = generate(),
        t = d3.transition()
          .duration(1000);

    x.domain([
      d3.min(data, function(c) { return d3.min(c.values, function(d) { return d.x; }); }),
      d3.max(data, function(c) { return d3.max(c.values, function(d) { return d.x; }); })
    ]);

    y.domain([
      d3.min(data, function(c) { return d3.min(c.values, function(d) { return d.y; }); }),
      d3.max(data, function(c) { return d3.max(c.values, function(d) { return d.y; }); })
    ]);
    
    if (i===0) {

      // render w/o transition on first loop
      g.selectAll('.line')
        .data(data)
        .attr('d', function(d) { return line(d.values); });
      
      y_axis.call(d3.axisLeft(y));
    } else {
      
      // render all following loops w/ transitions
      g.selectAll('.line')
        .data(data)
        .transition(t) // set transition; applied to following change
        .delay(function(d, i) { return i*200; })
        .attr('d', function(d) { return line(d.values); });
      
      y_axis.transition(t).call(d3.axisLeft(y));
    }

    x_axis.call(d3.axisBottom(x));
    i++;
  }
  
});

})();

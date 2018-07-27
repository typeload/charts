(function() {
 
var svg = d3.select("svg")
    .attr("width", full_width)
    .attr("height", full_height),
    g = svg.append("g").attr("transform", "translate(" + full_width/2 + "," + full_height/2 + ")"),
    radius = height/2;

d3.csv('/path/to/data', function(d) {
  // function for data prep
  d.count = +d.count;
  return d;
}, function(error, data) {
  if (error) throw(error);
  
  var pie = d3.pie()
      .value(function(d) { return d.count })

  var path = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius/2);

  var arc = g.append('g')
    .selectAll('g')
    .data(pie(data))
    .enter().append('g')
      .attr('class','arc');

  arc.append('path')
      .attr('d', path)
      .attr('fill', function(d, i) { return clr(i); })

  // handle legend  
  var legend = svg.append("g")
      .style("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .attr("transform", function(d, i) { return "translate(" + (full_width/2+radius+40) + "," + (full_height/2-40) + ")"; })
    .selectAll("g")
    .data(pie(data))
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i*20 + ")"; });

  legend.append("rect")
      .attr("x", 5)
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", function(d, i) { return clr(i); });

  legend.append("text")
      .attr("y", 7.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d.data.animal; });

  arc      
    .on("mouseover", mouseover)
    .on("mousemove", function(d) {
      div
        .style("left", (d3.event.pageX - 34) + "px")
        .style("top", (d3.event.pageY - 12) + "px")
        .text(d.data.animal + ' : ' + d.data.count)
      .selectAll('rect').data(data)
      .enter().append('rect')
        .attr("x", (d3.event.pageX - 38) + "px")
        .attr("y", (d3.event.pageY - 16) + "px")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", mat(d.animal));
    })
    .on("mouseout", mouseout);
});
  
})();
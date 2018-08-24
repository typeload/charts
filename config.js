// global values across all chart scripts
var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom,
    full_width = width + margin.left + margin.right,
    full_height = height + margin.top + margin.bottom;
    
// default color scheme
var scheme = ['#d1e4f1', '#f7f00a', '#EE4266', '#540D6E'],
    clr = d3.scaleOrdinal(scheme);

// default formatting
var format = d3.format(',d');

// append tooltip div to DOM
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("display", "none");

// mouse hover functions
function mouseover() {
    div.style("display", "inline");
}

function mouseout() {
    div.style("display", "none");
}
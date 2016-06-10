$(function(){
    
    var vis = d3.select("#svg1"),
    WIDTH = parseInt($("#svg1").css('width')),
    HEIGHT = parseInt($("#svg1").css('height')),
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    
    formatxAxis = d3.format('.0f'),
    
    xScale = d3.scale.linear()
                .range([MARGINS.left, WIDTH - MARGINS.right])
                .domain([2000,2005]),
    
    yScale = d3.scale.linear()
                .range([HEIGHT - MARGINS.bottom, MARGINS.top])
                .domain([134,215]),
                
    xAxis = d3.svg.axis()
                .tickValues(d3.range(2000, 2005, 1))
                .tickFormat(formatxAxis)
                .scale(xScale),
  
    yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");
    
    
    
    vis.append("g")
        .attr("class","axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);
    
    vis.append("g")
        .attr("class","axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);
        
    var lineGen = d3.svg.line()
                      .x(function(d) {
                        return xScale(d.year);
                      })
                      .y(function(d) {
                        return yScale(d.sale);
                      })
                      .interpolate("cardinal");
    
    vis.append('path')
          .attr('d', lineGen(data))
          .attr('stroke', 'rgb(215,187,11)')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
          
          
    vis.selectAll('circle')
        .data(data).enter()
        .append('circle')
        .attr('cx', function(d) { return xScale(d.year) })
        .attr('cy', function (d) { return yScale(d.sale); })
	    .attr('r', 3)
	    .attr('stroke', 'orange')
	    .attr('fill', 'transparent');
})




var data = [{
    "sale": 202,
    "year": 2000
}, {
    "sale": 215,
    "year": 2001
}, {
    "sale": 179,
    "year": 2002
}, {
    "sale": 199,
    "year": "2003"
}, {
    "sale": 134,
    "year": 2005
}];
var graphCreator = graphCreator || {};

/*
 * This method will draw a line graph, with the following parameters
 * 1. config.svgID = The svg where to draw
 * 2. config.data = the array of objects containing config.xProp and config.yProp
 * 3. config.xProp = the property which contains values of config.xProp
 * 4. config.yProp = the property which contains values of config.yProp
 * 5. config.axisReq = true / false; whether axis is required or not
 
 * Sample structure of config.data = 
    [
        {
            xProp: someVal,
            yProp: someVal
        },
        {
            xProp: someVal,
            yProp: someVal
        },
        {
            xProp: someVal,
            yProp: someVal
        }
    ]
 */
graphCreator.drawLineGraph = function (config) {
    
    var vis = d3.select("#" + config.svgID),
    WIDTH = parseInt($("#" + config.svgID).css('width')),
    HEIGHT = parseInt($("#" + config.svgID).css('height')),
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    
    xValuesArr = [],
    yValuesArr = [];
    
    config.data.forEach(function(d) {
        xValuesArr.push(d[config.xProp]);
        yValuesArr.push(d[config.yProp]);
    });
    
    var xMin = d3.min(xValuesArr),
    xMax = d3.max(xValuesArr),
    
    yMin = d3.min(yValuesArr) - 20,
    yMax = d3.max(yValuesArr) + 20,
    
    formatxAxis = d3.format('.0f'),
    
   xScale, yScale, xAxis, yAxis;
    
    if (config.ordinalX) {
        xScale = d3.scale.ordinal()
                .domain(xValuesArr)
                .rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 1)
                
                //.rangeBands([MARGINS.left, WIDTH - MARGINS.right])
    } else {
        xScale = d3.scale.linear()
                .range([MARGINS.left, WIDTH - MARGINS.right])
                .domain([xMin, xMax]);
    }
    
    
                
    yScale = d3.scale.linear()
                .range([HEIGHT - MARGINS.bottom, MARGINS.top])
                .domain([yMin, yMax]);
                
    
    
    
    
    if (config.axisReq) {
        if (config.ordinalX) {
            xAxis = d3.svg.axis()
                .scale(xScale);
                
        } else {
            if (config.customTickProp) {
                
                var tickValuesArr = [];
                config.data.forEach(function(d) {
                    tickValuesArr.push(d[config.customTickProp]);
                });
                
                //console.log(tickValuesArr);
                var counter = -1;
                xAxis = d3.svg.axis()
                    //.tickValues(tickValuesArr)
                    .tickFormat(function (d, i) {
                        //console.log(i);
                        if(i%2 == 0) {
                            counter++;
                            return tickValuesArr[counter];
                        }
                    })
                    .scale(xScale);
            } else {
                xAxis = d3.svg.axis()
                    .tickValues(d3.range(xMin, xMax, 1))
                    .tickFormat(formatxAxis)
                    .scale(xScale);
            }
            
        }
        
  
        yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");
        
        vis.append("g")
            .attr("class","axis")
            .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
            .call(xAxis);
    
        //console.log("MARGINS.left="+MARGINS.left);
        vis.append("g")
            .attr("class","axis")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);
    }
        
    var lineGen = d3.svg.line()
                      .x(function(d) {
                        return xScale(d[config.xProp]);
                      })
                      .y(function(d) {
                        return yScale(d[config.yProp]);
                      })
                      .interpolate("cardinal");
        
    vis.append('path')
          .attr('d', lineGen(config.data))
          .attr('stroke', config.lineColor || 'rgb(215,187,11)')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
    
    if (config.circleReq) {
        vis.selectAll('circle')
            .data(config.data).enter()
            .append('circle')
            .attr('cx', function(d) { return xScale(d[config.xProp]) })
            .attr('cy', function (d) { return yScale(d[config.yProp]) })
    	    .attr('r', 3)
    	    .attr('stroke', 'orange')
    	    .attr('fill', 'transparent');
    }
    
};



/*
 *
 */

graphCreator.drawProgressRing = function (config) {
    var colors = {
        'pink': '#E1499A',
        'yellow': '#f0ff08',
        'green': '#47e495',
        'btBlue': '#6A569E'
    };
    
    var color = colors.btBlue;

    var boxSize = parseInt($("#" + config.containerID).css('width'));
    var border = 15;
    var padding = 20;
    var startPercent = 0;
    var endPercent = 0.85;
    var twoPi = Math.PI * 2;
    var formatPercent = d3.format('.0%');
    var radius = (boxSize - (2 * padding)) / 2;
    
    var count = Math.abs((endPercent - startPercent) / 0.01);
    var step = endPercent < startPercent ? -0.01 : 0.01;
    
    var arc = d3.svg.arc()
        .startAngle(0)
        .innerRadius(radius)
        .outerRadius(radius - border);
    
    var parent = d3.select('div#radialProgress');
    
    var svg = parent.append('svg')
        .attr('width', boxSize)
        .attr('height', boxSize);
    
    var defs = svg.append('defs');
    
    var filter = defs.append('filter')
        .attr('id', 'blur');
    
    filter.append('feGaussianBlur')
        .attr('in', 'SourceGraphic')
        .attr('stdDeviation', '7');
    
    var g = svg.append('g')
        .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');
    
    var meter = g.append('g')
        .attr('class', 'progress-meter');
    
    meter.append('path')
        .attr('class', 'background')
        .attr('fill', '#ccc')
        .attr('fill-opacity', 0.5)
        .attr('d', arc.endAngle(twoPi));
    
    var foreground = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1)
        .attr('stroke', color)
        .attr('stroke-width', 5)
        .attr('stroke-opacity', 1)
        .attr('filter', 'url(#blur)');
    
    var front = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1);
    
    var numberText = meter.append('text')
        .attr('fill', '#000')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em');
    
    function updateProgress(progress) {
        foreground.attr('d', arc.endAngle(twoPi * progress));
        front.attr('d', arc.endAngle(twoPi * progress));
        numberText.text(formatPercent(progress));
    }
    
    var progress = startPercent;
    
    (function loops() {
        updateProgress(progress);
    
        if (count > 0) {
            count--;
            progress += step;
            setTimeout(loops, 10);
        }
    })();
}


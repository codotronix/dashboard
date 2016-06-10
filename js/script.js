$(function(){
    var config1 = {};
    config1.svgID = "svg1";
    config1.data = data1;
    config1.xProp = "year";
    config1.yProp = "sale";
    config1.axisReq = true;
    config1.circleReq = true;
    //config1.ordinalX = true;
    config1.customTickProp = "date";
    
    graphCreator.drawLineGraph(config1);
    
    
    
    
    
    
    var config2 = {};
    config2.svgID = "svg2";
    config2.data = data1;
    config2.xProp = "year";
    config2.yProp = "sale";
    config2.axisReq = false;
    config2.lineColor = "blue";
    config2.axisReq = true;
    graphCreator.drawLineGraph(config2);
    
    var config3 = $.extend({}, config2);
    config3.data = data2;
    config3.lineColor = "green";
    config3.axisReq = false;
    graphCreator.drawLineGraph(config3);
    
    var config4 = $.extend({}, config3);
    config4.data = data3;
    config4.lineColor = "red";
    graphCreator.drawLineGraph(config4);
    
    
    //Let's draw the circular progress ring
    var circConfig = {};
    circConfig.containerID = 'radialProgress';
    graphCreator.drawProgressRing(circConfig);
    
})


var data = [{
    "sale": 202,
    "year": "A"
}, {
    "sale": 215,
    "year": "B"
}, {
    "sale": 179,
    "year": "C"
}, {
    "sale": 199,
    "year": "D"
}, {
    "sale": 134,
    "year": "E"
}, {
    "sale": 300,
    "year": "F"
}];



var data1 = [{
    "sale": 150,
    "year": 1995,
    "date": "1/11"
}, {
    "sale": 170,
    "year": 1996,
    "date": "2/11"
}, {
    "sale": 190,
    "year": 1997,
    "date": "3/11"
}, {
    "sale": 160,
    "year": 1998,
    "date": "4/11"
}, {
    "sale": 140,
    "year": 1999,
    "date": "5/11"
}, {
    "sale": 160,
    "year": 2000,
    "date": "6/11"
}, {
    "sale": 180,
    "year": 2001,
    "date": "7/11"
}];

var data2 = [{
    "sale": 160,
    "year": 1995
}, {
    "sale": 150,
    "year": 1996
}, {
    "sale": 140,
    "year": 1997
}, {
    "sale": 150,
    "year": 1998
}, {
    "sale": 160,
    "year": 1999
}, {
    "sale": 180,
    "year": 2000
}, {
    "sale": 166,
    "year": 2001
}];

var data3 = [{
    "sale": 152,
    "year": 1995
}, {
    "sale": 169,
    "year": 1996
}, {
    "sale": 180,
    "year": 1997
}, {
    "sale": 167,
    "year": 1998
}, {
    "sale": 147,
    "year": 1999
}, {
    "sale": 169,
    "year": 2000
}, {
    "sale": 150,
    "year": 2001
}];
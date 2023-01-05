
function drawGungu(code) {
    
    var filePath = 'json/' + code +'.json'
    var width = 600, 
        height = 600;

    var tooltip = d3.select("body")
        .append("div")
        .attr('class', 'd3-tooltip')
       

    var svg = d3.select("#container2")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr('id', 'map')
        .attr('class', 'map');

    d3.json(filePath, function(data) {
        var features = data.features

        var projection = d3.geo.mercator()
        .center(data.center)
        .scale(data.scale)
        .translate([width/2, height/2]);

        var path = d3.geo.path().projection(projection);
        var map = svg.append("g").attr("id", "states");

        map.selectAll("path")
        .data(features)
        .enter().append("path")
        .attr("d", path)
        
    
        map.selectAll("text")
            .data(features)
            .enter().append("text")
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .attr("class", "municipality-label")
            .attr('id', function(d) {
                return 'label-' + d.properties.SIG_ENG_NM.split(',')[0];
            })
            .text(function(d) { return d.properties.name; })

        map.selectAll("path")
        .on('mouseover', function (e) {
            if(e.properties.name == "") {
                tooltip
                    .style('top', (d3.event.pageY-10) + 'px')
                    .style('left', (d3.event.pageX+10) + 'px')
                    .text(e.properties.SIG_KOR_NM)
                    .style("visibility", "visible");
                
                //map.select('#label-' + e.properties.SIG_ENG_NM.split(',')[0]).text(e.properties.SIG_KOR_NM)
            }
        })
        .on('mouseout', function (e) {
            if(e.properties.name == "") {
                tooltip
                    .text(e.properties.name)
                    .style("visibility", "hidden");
                //map.select('#label-' + e.properties.SIG_ENG_NM.split(',')[0]).text(e.properties.name)
            }
        })
        .on('click', function (e) {
            var obj = {
                name: e.properties.name,
                code: e.properties.SIG_CD,
            }
            console.log(obj)
        });

    });

}


 

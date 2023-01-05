window.onload = function() {
    drawSido();
};

function selectSido(obj)  {
    document.getElementById("container2").innerHTML = "";
    console.log(obj)
    drawGungu(obj.code)
}

function drawSido() {
    var filePath2 = 'json/ctprvn.json'
    var width = 500, 
        height = 700;

    var svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr('id', 'map')
        .attr('class', 'map');

    d3.json(filePath2, function(data) {
        var features = data.features
        var projection = d3.geo.mercator()
        .center([126.9895, 36.5])
        .scale(4000)
        .translate([width/2, height/2]);

        var path = d3.geo.path().projection(projection);
        var map = svg.append("g").attr("id", "states");
                    

        map.selectAll("path")
        .data(features)
        .enter().append("path")
        .attr("d", path)
        .on('click', function (e) {
            var obj = {
                name: e.properties.name,
                code: e.properties.CTPRVN_CD,
            }
            
            selectSido(obj)
        });

        map.selectAll("text")
        .data(features)
        .enter().append("text")
        .attr("transform", translateTolabel)
        .attr("dy", ".35em")
        .attr("class", "municipality-label")
        .text(function(d) { return d.properties.name; })

        function translateTolabel(d) {
            var arr = path.centroid(d);
            if (d.properties.CTPRVN_CD == 41) {
                
                arr[1] +=
                    d3.event && d3.event.scale
                        ? d3.event.scale / height + 20
                        : 4000 / height + 20;
            } 
            return 'translate(' + arr + ')';
        }

    });

}
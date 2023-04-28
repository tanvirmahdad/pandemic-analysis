
var lastDate = '2021-04-12';
var radius = 4;
var xHLabel = "Hospital bed per Thousand";
var yHLabel = "Deaths per million";
var HLegendTitle=["Age 65 or Older"];
var HLegendText=["5%", "10%", "15%", "20%"];

var Htooltip = d3.select("body").append("div")
    .style("opacity", 0);

d3.csv("owid-covid-data.csv", function (data) {
    data.forEach(element => {
        element.total_deaths_per_million = +element.total_deaths_per_million;
    });



    var countryData = data.filter(function (entry) {
        var not_null_data = (entry.continent && entry.hospital_beds_per_thousand && entry.aged_65_older);
        return not_null_data;
    });

    var filterd_by_last_date = countryData.filter(function (entry) {
        return entry.date == lastDate;
    });



    var clearData = filterd_by_last_date.map(function (entry) {
        var group;
        if (entry.aged_65_older > 0 && entry.aged_65_older <= 5) {
            group = 1;
        } else if (entry.aged_65_older > 5 && entry.aged_65_older <= 10) {
            group = 2;
        } else if (entry.aged_65_older > 10 && entry.aged_65_older <= 15) {
            group = 3;
        } else if (entry.aged_65_older > 15 && entry.aged_65_older <= 20) {
            group = 4;
        } else if (entry.aged_65_older > 20) {
            group = 5;
        } else {
            group = 1;
        }

        return {
            country: entry.location,
            death_per_million: +entry.total_deaths_per_million,
            aged_ratio: group,
            aged_number:entry.aged_65_older,
            hospital_bed_ratio: +entry.hospital_beds_per_thousand

        }
    });

    /*
    var xmin = d3.max(clearData.map(function (entry) {
        return entry.aged_ratio;
    }));*/

    var xmin = d3.min(clearData.map(function (entry) {
        return entry.hospital_bed_ratio;
    }));

    var xmax = d3.max(clearData.map(function (entry) {
        return entry.hospital_bed_ratio;
    }));

    var ymin = d3.min(clearData.map(function (entry) {
        return entry.death_per_million;
    }));

    var ymax = d3.max(clearData.map(function (entry) {
        return entry.death_per_million;
    }));

    var padding = 50;

    var xScale = d3.scaleLinear()
        .domain([xmin, xmax])
        .range([padding, 500 - padding]);

    var yScale = d3.scaleLinear()
        .domain([ymax, ymin])
        .range([padding, 500 - padding]);

    var hosp_svg = d3.select('#svg_hosp');

    //var colorScale = d3.scaleOrdinal(d3.schemeAccent);

    var ageColor = d3.scaleLinear()
        .range(["#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845"]);
    ageColor.domain([1, 2, 3, 4, 5]);


    var cirlce_hosp = hosp_svg.selectAll('circle').data(clearData);


    cirlce_hosp.enter().append('circle').merge(cirlce_hosp)
        .attr('cx', function (data, index) {
            return xScale(data.hospital_bed_ratio);
        })
        .attr('cy', function (data, index) {
            return yScale(data.death_per_million);
        })
        .attr('r', radius)
        .attr('fill', function (entry) {
            //console.log(entry.aged_ratio);
            return ageColor(entry.aged_ratio);
        })
        .on('mouseover', function (data) {
            d3.select(this).transition()
                .duration('100')
                .attr("r", radius * 2);

            Htooltip.transition()
                .duration(100)
                .style("opacity", 1);

            Htooltip.html(data.country + "<br />" +"Percentage:  "+data.aged_number+ "%")
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px")
                .style("position", "absolute")
                .style("background", "maroon")
                .style("color", "white")
                .style("font-size", "0.7rem");

        })
        .on('mouseout', function () {
            d3.select(this).transition()
                .duration('200')
                .attr("r", radius);
            Htooltip.transition()
                .duration(100)
                .style("opacity", 0);
        });


    var xHAxis = d3.axisBottom()
        .scale(xScale);
    var yHAxis = d3.axisLeft()
        .scale(yScale);

    var upperHXAxis = d3.axisTop()
        .scale(xScale)
        .tickFormat("")
        .tickSize(0);

    var rightHYAxis = d3.axisRight()
        .scale(yScale)
        .tickFormat("")
        .tickSize(0);

    var agedHXAxis = hosp_svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + (500 - padding) + ')')
        .call(xHAxis);

    var agedHYAxis = hosp_svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + (padding) + ',0)')
        .call(yHAxis);

    var agedHXAxisTop = hosp_svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + (padding) + ')')
        .call(upperHXAxis);

    var agedHYAxisRight = hosp_svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + (500 - padding) + ',0)')
        .call(rightHYAxis);

    //adding axis label


    agedHXAxis.append('text')
        .attr('class', 'axis-label')
        .attr('x', 250)
        .attr('y', padding - 5)
        .text(xHLabel);

    agedHYAxis.append('text')
        .attr('class', 'axis-label')
        .attr('x', -200)
        .attr('y', -padding + 12)
        .attr('transform', `rotate(-90)`)
        .text(yHLabel);


    var hospGraphLegend = hosp_svg.append('g')
        .attr("width", 250)
        .attr("height", 200)
        .attr("class", "legendContainer")
        .selectAll('g')
        .data(ageColor.domain().slice())
        .enter()
        .append('g')
        .attr("transform", function (data, index) {
            //return "translate(760," + (330 + (index * 25) )+ ")";
            return "translate(" + (240 + (index * 40)) + ", 80)";
        });

    hospGraphLegend.append("rect")
        .attr("width", 40)
        .attr("height", 10)
        .style('stroke', 'black')
        .style("stroke-width", "1")
        .style("fill", ageColor);

    hospGraphLegend.append("text")
        .data(HLegendText)
        .attr("x", 30)
        .attr("y", 30)
        .text(function (data) {
            return data;
        });

    hospGraphLegend.append("text")
        .data(HLegendTitle)
        .attr("x", 40)
        .attr("y", -10)
        .text(function (data) {
            return data;
        });




});
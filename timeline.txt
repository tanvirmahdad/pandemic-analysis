/*
     US Map drawing reference:
     Title: Basic US State Map - D3
*    Author: Michelle Chandra
*    Date: March 16, 2021
*    Availability: http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922

    */


//Width and height of the map
var width = 1000;
var height = 500;
var globalDate = '2020-02-25';
var group;
var dgroup;
var vgroup;
var globalData;
var dateFilterData;
var mapped_group;
var dateArray;
var mapDraw;
var mode = 0;



var pointDiv = d3.select("body").append("div")
    .style("opacity", 0);



//I have used projection and path as same as the reference
var projection = d3.geoMercator()
    .scale(130)
    .translate([width / 2, height / 1.5]);

var path = d3.geoPath()
    .projection(projection);



var color = d3.scaleLinear()
    //.range(["#fff5f0", "#fff4ef", "#fff4ee", "#fff3ed", "#fff2ec", "#fff2eb", "#fff1ea", "#fff0e9", "#fff0e8", "#ffefe7", "#ffeee6", "#ffeee6", "#ffede5", "#ffece4", "#ffece3", "#ffebe2", "#feeae1", "#fee9e0", "#fee9de", "#fee8dd", "#fee7dc", "#fee6db", "#fee6da", "#fee5d9", "#fee4d8", "#fee3d7", "#fee2d6", "#fee2d5", "#fee1d4", "#fee0d2", "#fedfd1", "#feded0", "#feddcf", "#fedccd", "#fedbcc", "#fedacb", "#fed9ca", "#fed8c8", "#fed7c7", "#fdd6c6", "#fdd5c4", "#fdd4c3", "#fdd3c1", "#fdd2c0", "#fdd1bf", "#fdd0bd", "#fdcfbc", "#fdceba", "#fdcdb9", "#fdccb7", "#fdcbb6", "#fdc9b4", "#fdc8b3", "#fdc7b2", "#fdc6b0", "#fdc5af", "#fdc4ad", "#fdc2ac", "#fdc1aa", "#fdc0a8", "#fcbfa7", "#fcbea5", "#fcbca4", "#fcbba2", "#fcbaa1", "#fcb99f", "#fcb89e", "#fcb69c", "#fcb59b", "#fcb499", "#fcb398", "#fcb196", "#fcb095", "#fcaf94", "#fcae92", "#fcac91", "#fcab8f", "#fcaa8e", "#fca98c", "#fca78b", "#fca689", "#fca588", "#fca486", "#fca285", "#fca183", "#fca082", "#fc9e81", "#fc9d7f", "#fc9c7e", "#fc9b7c", "#fc997b", "#fc987a", "#fc9778", "#fc9677", "#fc9475", "#fc9374", "#fc9273", "#fc9071", "#fc8f70", "#fc8e6f", "#fc8d6d", "#fc8b6c", "#fc8a6b", "#fc8969", "#fc8868", "#fc8667", "#fc8565", "#fc8464", "#fb8263", "#fb8162", "#fb8060", "#fb7f5f", "#fb7d5e", "#fb7c5d", "#fb7b5b", "#fb795a", "#fb7859", "#fb7758", "#fb7657", "#fb7455", "#fa7354", "#fa7253", "#fa7052", "#fa6f51", "#fa6e50", "#fa6c4e", "#f96b4d", "#f96a4c", "#f9684b", "#f9674a", "#f96549", "#f86448", "#f86347", "#f86146", "#f86045", "#f75e44", "#f75d43", "#f75c42", "#f65a41", "#f65940", "#f6573f", "#f5563e", "#f5553d", "#f4533c", "#f4523b", "#f4503a", "#f34f39", "#f34e38", "#f24c37", "#f24b37", "#f14936", "#f14835", "#f04734", "#ef4533", "#ef4433", "#ee4332", "#ed4131", "#ed4030", "#ec3f2f", "#eb3d2f", "#eb3c2e", "#ea3b2d", "#e93a2d", "#e8382c", "#e7372b", "#e6362b", "#e6352a", "#e5342a", "#e43229", "#e33128", "#e23028", "#e12f27", "#e02e27", "#df2d26", "#de2c26", "#dd2b25", "#dc2a25", "#db2924", "#da2824", "#d92723", "#d72623", "#d62522", "#d52422", "#d42321", "#d32221", "#d22121", "#d12020", "#d01f20", "#ce1f1f", "#cd1e1f", "#cc1d1f", "#cb1d1e", "#ca1c1e", "#c91b1e", "#c71b1d", "#c61a1d", "#c5191d", "#c4191c", "#c3181c", "#c2181c", "#c0171b", "#bf171b", "#be161b", "#bd161a", "#bb151a", "#ba151a", "#b91419", "#b81419", "#b61419", "#b51319", "#b41318", "#b21218", "#b11218", "#b01218", "#ae1117", "#ad1117", "#ac1117", "#aa1017", "#a91016", "#a71016", "#a60f16", "#a40f16", "#a30e15", "#a10e15", "#a00e15", "#9e0d15", "#9c0d14", "#9b0c14", "#990c14", "#970c14", "#960b13", "#940b13", "#920a13", "#900a13", "#8f0a12", "#8d0912", "#8b0912", "#890812", "#870811", "#860711", "#840711", "#820711", "#800610", "#7e0610", "#7c0510", "#7a0510", "#78040f", "#76040f", "#75030f", "#73030f", "#71020e", "#6f020e", "#6d010e", "#6b010e", "#69000d", "#67000d"]);
    .range(["rgb(255,255,255)", "rgb(255,229,204)", "rgb(255,204,153)", "rgb(255,178,102)", "rgb(255,153,51)", "rgb(255,128,0)", "rgb(255,153,153)", "rgb(255,51,51)", "rgb(204,0,0)", "rgb(102,0,0)"]);
//setting up color domain as group value
// we will set group value later

var vaccineColor = d3.scaleLinear()
    .range(["rgb(255,255,255)", "rgb(51,227,255)", "rgb(51,199,255)", "rgb(51,159,255)", "rgb(51,145,255)", "rgb(51,119,255)", "rgb(51,91,255)", "rgb(51,60,255)", "rgb(107,51,255)", "rgb(168,51,255)"]);

var stringencyColor = d3.scaleLinear()
    .range(["#FDFDFD","#FCF642", "#96F947", "#8AE542", "#7ED13C", "#6FB835", "#61A02F", "#4F8126", "#385B1B", "#1B2B0D"]);


color.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
vaccineColor.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
stringencyColor.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

//This is the text for legend
var groupTextNew = ["500", "1k", "3k", "5k", "10k", "20k", "35k", "60k", "100k"];
var legendTitleNew = ["New Case Count"];
var groupTextDeath = ["50", "100", "200", "400", "600", "800", "1000", "1500", "3000"];
var legendTitleDeath = ["Daily Death Count"];
var groupTextVac = ["1k", "5k", "20k", "50k", "70k", "100k", "300k", "500k", "1M"];
var legendTitleVac = ["Daily Vaccine Count"];
var groupTextSt = ["10", "20", "30", "40", "50", "60", "70", "80", "90"];
var legendTitleSt = ["Daily Stringency Index"];


//Create SVG element and append map to the SVG
var svg = d3.select("#svg_chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var svgHeading = d3.select("#svg_heading")
    .append("svgHeading")
    .attr("width", 300)
    .attr("height", 500);

var svgLegend = d3.select("#svg_legend")
    .append("svgLegend")
    .attr("width", 300)
    .attr("height", 500);



d3.json("world_countries.json", function (json) {
    mapDraw = svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "map")
        .style("stroke", "black")
        .style("stroke-width", "1")
        .style("fill", "white");
});




  
d3.csv("owid-covid-data.csv", function (data) {

    var counter = 0;

    //making the one_dose value as integers
    data.forEach(element => {
        element.new_cases = +element.new_cases;
    });
    //console.log(data);
    globalData = data;

    //console.log("I am reading");

    var filterd_dateArray = globalData.filter(function (entry) {
        return entry.location == 'Afghanistan';
    });

    dateArray = filterd_dateArray.map(function (entry) {
        counter = counter + 1;
        return {
            index: counter,
            date: entry.date
        };


    });





    data_preprocess();
    showLegend();

    //console.log(dateFilterData);
    //created map_group that contain only state and group information
    //Will use group value 1,2,3,4 that will be used in color domain    

});

function reformat(d) {
    return d3.time.format('%Y/%m/%d')(d3.time.format('%m/%d/%Y').parse(d));
}


function data_preprocess() {
    dateFilterData = globalData.filter(function (entry) {
        return entry.date == globalDate;
    });
    //console.log(dateFilterData);

    //console.log("I am here at preprocess");


    //created map_group that contain only state and group information
    //Will use group value 1,2,3,4 that will be used in color domain

    mapped_group = dateFilterData.map(function (entry) {

        if (entry.new_cases >= 0 && entry.new_cases < 500) {
            group = 1;
        } else if (entry.new_cases >= 500 && entry.new_cases < 1000) {
            group = 2;
        } else if (entry.new_cases >= 1000 && entry.new_cases < 3000) {
            group = 3;
        }
        else if (entry.new_cases >= 3000 && entry.new_cases < 5000) {
            group = 4;
        }
        else if (entry.new_cases >= 5000 && entry.new_cases < 10000) {
            group = 5;
        }
        else if (entry.new_cases >= 10000 && entry.new_cases < 20000) {
            group = 6;
        }
        else if (entry.new_cases >= 20000 && entry.new_cases < 35000) {
            group = 7;
        }
        else if (entry.new_cases >= 35000 && entry.new_cases < 60000) {
            group = 8;
        }
        else if (entry.new_cases >= 60000 && entry.new_cases < 100000) {
            group = 9;
        }
        else if (entry.new_cases >= 100000) {
            group = 10;
        }



        return {
            country: entry.location,
            groupInfo: group,
            newCases: entry.new_cases,
            totalCases: entry.total_cases
        };



    });



    mapped_dgroup = dateFilterData.map(function (entry) {
        entry.new_deaths=+entry.new_deaths;

        if (entry.new_deaths >= 0 && entry.new_deaths < 50) {
            dgroup = 1;
        } else if (entry.new_deaths >= 50 && entry.new_deaths < 100) {
            dgroup = 2;
        } else if (entry.new_deaths >= 100 && entry.new_deaths < 200) {
            dgroup = 3;
        }
        else if (entry.new_deaths >= 200 && entry.new_deaths < 400) {
            dgroup = 4;
        }
        else if (entry.new_deaths >= 400 && entry.new_deaths < 600) {
            dgroup = 5;
        }
        else if (entry.new_deaths >= 600 && entry.new_deaths < 800) {
            dgroup = 6;
        }
        else if (entry.new_deaths >= 800 && entry.new_deaths < 1000) {
            dgroup = 7;
        }
        else if (entry.new_deaths >= 1000 && entry.new_deaths < 1500) {
            dgroup = 8;
        }
        else if (entry.new_deaths >= 1500 && entry.new_deaths < 3000) {
            dgroup = 9;
        }
        else if (entry.new_cases >= 3000) {
            dgroup = 10;
        }



        return {
            country: entry.location,
            groupInfo: dgroup,
            newDeaths: +entry.new_deaths,
            totalDeaths: entry.total_deaths
        };



    });

    

    mapped_vgroup = dateFilterData.map(function (entry) {
        entry.new_vaccinations_smoothed=+entry.new_vaccinations_smoothed;


        if (entry.new_vaccinations_smoothed >= 0 && entry.new_vaccinations_smoothed < 1000) {
            vgroup = 1;
        } else if (entry.new_vaccinations_smoothed >= 1000 && entry.new_vaccinations_smoothed < 5000) {
            vgroup = 2;
        } else if (entry.new_vaccinations_smoothed >= 5000 && entry.new_vaccinations_smoothed < 20000) {
            vgroup = 3;
        }
        else if (entry.new_vaccinations_smoothed >= 20000 && entry.new_vaccinations_smoothed < 50000) {
            vgroup = 4;
        }
        else if (entry.new_vaccinations_smoothed >= 50000 && entry.new_vaccinations_smoothed < 70000) {
            vgroup = 5;
        }
        else if (entry.new_vaccinations_smoothed >= 70000 && entry.new_vaccinations_smoothed < 100000) {
            vgroup = 6;
        }
        else if (entry.new_vaccinations_smoothed >= 100000 && entry.new_vaccinations_smoothed < 300000) {
            vgroup = 7;
        }
        else if (entry.new_vaccinations_smoothed >= 300000 && entry.new_vaccinations_smoothed < 500000) {
            vgroup = 8;
        }
        else if (entry.new_vaccinations_smoothed >= 500000 && entry.new_vaccinations_smoothed < 1000000) {
            vgroup = 9;
        }
        else if (entry.new_vaccinations_smoothed >= 1000000) {
            vgroup = 10;
        }



        return {
            country: entry.location,
            groupInfo: vgroup,
            newVaccine: entry.new_vaccinations_smoothed
        };



    });


    mapped_sgroup = dateFilterData.map(function (entry) {
        entry.stringency_index=+entry.stringency_index;


        if (entry.stringency_index >= 0 && entry.stringency_index< 10) {
            sgroup = 1;
        } else if (entry.stringency_index >= 10 && entry.stringency_index < 20) {
            sgroup = 2;
        } else if (entry.stringency_index >= 20 && entry.stringency_index < 30) {
            sgroup = 3;
        }
        else if (entry.nstringency_index >= 30 && entry.stringency_index < 40) {
            sgroup = 4;
        }
        else if (entry.stringency_index >= 40 && entry.stringency_index < 50) {
            sgroup = 5;
        }
        else if (entry.stringency_index >= 50 && entry.stringency_index < 60) {
            sgroup = 6;
        }
        else if (entry.stringency_index >= 60 && entry.stringency_index < 70) {
            sgroup = 7;
        }
        else if (entry.stringency_index >= 70 && entry.stringency_index < 80) {
            sgroup = 8;
        }
        else if (entry.stringency_index >= 80 && entry.stringency_index < 90) {
            sgroup = 9;
        }
        else if (entry.stringency_index >= 90) {
            sgroup = 10;
        }



        return {
            country: entry.location,
            groupInfo: sgroup,
            sg_index: entry.stringency_index
        };



    });






    if (mode == 0) {
        drawMap();
    } else if (mode == 1) {
        ddrawMap();
    } else if (mode == 2) {
        vdrawMap();
    }else if (mode == 3) {
        sdrawMap();
    }


}




function drawMap() {
    //console.log(mapped_group);

    //This part of code is modified version of above reference
    //here I have inset the group value from mapped_data in json.features.properties
    d3.json("world_countries.json", function (json) {
        for (var j = 0; j < json.features.length; j++) {
            json.features[j].properties.group = undefined;
            json.features[j].properties.dgroup = undefined;
            json.features[j].properties.vgroup = undefined;
        }
        for (var i = 0; i < mapped_group.length; i++) {
            //grab the state and group name from my created mapped_group      
            var countryName = mapped_group[i].country;
            var groupValue = mapped_group[i].groupInfo;
            var newCases = mapped_group[i].newCases;
            var totalCases = mapped_group[i].totalCases;
            // This for loop will put groupValue on json.features 
            for (j = 0; j < json.features.length; j++) {
                var jsonCountry = json.features[j].properties.name;
                //console.log(jsonCountry);
                if (jsonCountry == "USA") {
                    jsonCountry = "United States";
                } else if (jsonCountry == "England") {
                    jsonCountry = "United Kingdom";
                } else if (jsonCountry == "United Republic of Tanzania") {
                    jsonCountry = "Tanzania";
                    //console.log("Yes I am here");   
                }
                else if (jsonCountry == "Republic of the Congo") {
                    jsonCountry = "Congo";
                    //console.log("Yes I am here");   
                } else if (jsonCountry == "Democratic Republic of the Congo") {
                    jsonCountry = "Democratic Republic of Congo";
                    //console.log("Yes I am here");   
                }


                if (countryName == jsonCountry) {
                    json.features[j].properties.group = groupValue;
                    json.features[j].properties.new_case = newCases;
                    json.features[j].properties.totalCases = totalCases;

                    break;
                }
            }


        }
        //Now drawing the US map
        //use group value as domain of color to fill color on every state



        mapDraw.data(json.features)
            .style("fill", function (data) {
                var value = data.properties.group;
                if (value) {
                    return color(value);
                } else {
                    return color(1);
                }
            })
            .on('mouseover', function (data) {

                pointDiv.transition()
                    .duration(100)
                    .style("opacity", 1);

                pointDiv.attr("data-html", "true")
                    .html(data.properties.name + "<br />" + "New Cases: " + data.properties.new_case)
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px")
                    .style("position", "absolute")
                    .style("background", "blue")
                    .style("color", "white")
                    .style("font-size", "1.0rem");

            })
            .on('mouseout', function () {
                pointDiv.transition()
                    .duration(100)
                    .style("opacity", 0);
            });



    });

    var title = "Title";

    if (mode == 0) {
        title = "Daily New Count";
    } else if (mode == 1) {
        title = "Daily New Death";
    }

    var infoContainer = svg.append('g')
        .attr("width", 250)
        .attr("height", 200)
        .attr("x", 150)
        .attr("y", 390)
        .attr("transform", "translate(130, 450)");
    infoContainer.append('text')
        .attr('class', 'year-label')
        .attr("font-size", "38px")
        .style('stroke', 'black')
        .text(globalDate);

    var headingContainer = svgHeading.append('g')
        .attr("width", 350)
        .attr("height", 300)
        .attr("x", 150)
        .attr("y", 390)
        .attr("transform", "translate(0,0)");
    headingContainer.append('text')
        .attr('class', 'heading')
        .attr("font-size", "66px")
        .style('stroke', 'black')
        .text(title);


    


}





function ddrawMap() {
    //console.log(mapped_group);

    //This part of code is modified version of above reference
    //here I have inset the group value from mapped_data in json.features.properties
    d3.json("world_countries.json", function (json) {
        for (var j = 0; j < json.features.length; j++) {
            json.features[j].properties.group = undefined;
            json.features[j].properties.dgroup = undefined;
            json.features[j].properties.vgroup = undefined;
        }
        for (var i = 0; i < mapped_group.length; i++) {
            //grab the state and group name from my created mapped_group      
            var countryName = mapped_dgroup[i].country;
            var groupValue = mapped_dgroup[i].groupInfo;
            var newDeaths = mapped_dgroup[i].newDeaths;
            var totalDeaths = mapped_dgroup[i].totalDeaths;
            // This for loop will put groupValue on json.features 
            for (j = 0; j < json.features.length; j++) {
                var jsonCountry = json.features[j].properties.name;
                //console.log(jsonCountry);
                if (jsonCountry == "USA") {
                    jsonCountry = "United States";
                } else if (jsonCountry == "England") {
                    jsonCountry = "United Kingdom";
                } else if (jsonCountry == "United Republic of Tanzania") {
                    jsonCountry = "Tanzania";
                    //console.log("Yes I am here");   
                }
                else if (jsonCountry == "Republic of the Congo") {
                    jsonCountry = "Congo";
                    //console.log("Yes I am here");   
                } else if (jsonCountry == "Democratic Republic of the Congo") {
                    jsonCountry = "Democratic Republic of Congo";
                    //console.log("Yes I am here");   
                }


                if (countryName == jsonCountry) {

                    json.features[j].properties.group = groupValue;
                    json.features[j].properties.new_death = newDeaths;
                    json.features[j].properties.totalDeaths = totalDeaths;

                    //console.log(json.features[j].properties);

                    break;
                }
            }


        }
        //Now drawing the US map
        //use group value as domain of color to fill color on every state

        //console.log(json.features.properties);



        mapDraw.data(json.features)
            .style("fill", function (data) {
                var value = data.properties.group;
                if (value) {
                    return color(value);
                } else {
                    return color(1);
                }
            })
            .on('mouseover', function (data) {

                pointDiv.transition()
                    .duration(100)
                    .style("opacity", 1);

                pointDiv.attr("data-html", "true")
                    .html(data.properties.name + "<br />" + "New Deaths: " + data.properties.new_death)
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px")
                    .style("position", "absolute")
                    .style("background", "blue")
                    .style("color", "white")
                    .style("font-size", "1.0rem");

            })
            .on('mouseout', function () {
                pointDiv.transition()
                    .duration(100)
                    .style("opacity", 0);
            });



    });

    var title = "Title";

    if (mode == 0) {
        title = "Daily New Count";
    } else if (mode == 1) {
        title = "Daily New Death";
    }

    var infoContainer = svg.append('g')
        .attr("width", 250)
        .attr("height", 200)
        .attr("x", 150)
        .attr("y", 390)
        .attr("transform", "translate(130, 450)");
    infoContainer.append('text')
        .attr('class', 'year-label')
        .attr("font-size", "38px")
        .style('stroke', 'black')
        .text(globalDate);


    var headingContainer = svgHeading.append('g')
        .attr("width", 350)
        .attr("height", 300)
        .attr("x", 150)
        .attr("y", 390)
        .attr("transform", "translate(0,0)");
    headingContainer.append('text')
        .attr('class', 'heading')
        .attr("font-size", "66px")
        .style('stroke', 'black')
        .text(title);

}

//d3.select("#slider1").on("input", new_case_click);

function slider_change_ni(value) {
    slider_value = value;
    var check = +slider_value;
    //console.log(slider_value);

    var cdArray = dateArray.filter(function (entry) {
        return entry.index == check;
    });

    var currentDate = cdArray.map(function (entry) {
        return entry.date;
    });

    currentDate = currentDate.toString();
    globalDate = currentDate;

    //console.log(globalDate);
    d3.select('#slider1')
        .attr('value', check);
    var yearText = d3.select('.year-label');
    yearText.remove();

    var headingText = d3.select('.heading');
    headingText.remove();


    //var allmap = d3.select('.map');
    //allmap.remove();
    //var yearText = d3.select('.year-label');
    //yearText.remove();
    data_preprocess();
}


function vdrawMap() {
    //console.log(mapped_group);

    //This part of code is modified version of above reference
    //here I have inset the group value from mapped_data in json.features.properties
    d3.json("world_countries.json", function (json) {
        for (var j = 0; j < json.features.length; j++) {
            json.features[j].properties.group = undefined;
            json.features[j].properties.dgroup = undefined;
            json.features[j].properties.vgroup = undefined;
        }
        for (var i = 0; i < mapped_group.length; i++) {
            //grab the state and group name from my created mapped_group      
            var countryName = mapped_vgroup[i].country;
            var groupValue = mapped_vgroup[i].groupInfo;
            var newVac = mapped_vgroup[i].newVaccine;

            // This for loop will put groupValue on json.features 
            for (j = 0; j < json.features.length; j++) {
                var jsonCountry = json.features[j].properties.name;
                //console.log(jsonCountry);
                if (jsonCountry == "USA") {
                    jsonCountry = "United States";
                } else if (jsonCountry == "England") {
                    jsonCountry = "United Kingdom";
                } else if (jsonCountry == "United Republic of Tanzania") {
                    jsonCountry = "Tanzania";
                    //console.log("Yes I am here");   
                }
                else if (jsonCountry == "Republic of the Congo") {
                    jsonCountry = "Congo";
                    //console.log("Yes I am here");   
                } else if (jsonCountry == "Democratic Republic of the Congo") {
                    jsonCountry = "Democratic Republic of Congo";
                    //console.log("Yes I am here");   
                }


                if (countryName == jsonCountry) {
                    json.features[j].properties.group = groupValue;
                    json.features[j].properties.new_vaccine = newVac;
                    console.log(json.features[j].properties);
                    

                    break;
                }
            }


        }
        //Now drawing the US map
        //use group value as domain of color to fill color on every state

        

        mapDraw.data(json.features)
            .style("fill", function (data) {
                var value = data.properties.group;
                if (value) {
                    return vaccineColor(value);
                } else {
                    return vaccineColor(1);
                }
            })
            .on('mouseover', function (data) {

                pointDiv.transition()
                    .duration(100)
                    .style("opacity", 1);

                pointDiv.attr("data-html", "true")
                    .html(data.properties.name + "<br />" + "New Vaccine: " + data.properties.new_vaccine)
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px")
                    .style("position", "absolute")
                    .style("background", "maroon")
                    .style("color", "white")
                    .style("font-size", "1.0rem");

            })
            .on('mouseout', function () {
                pointDiv.transition()
                    .duration(100)
                    .style("opacity", 0);
            });



    });

    var title = "Title";

    if (mode == 0) {
        title = "Daily New Count";
    } else if (mode == 1) {
        title = "Daily New Death";
    }else if (mode == 2) {
        title = "Daily New Vaccine";
    }

    var infoContainer = svg.append('g')
        .attr("width", 250)
        .attr("height", 200)
        .attr("x", 150)
        .attr("y", 390)
        .attr("transform", "translate(130, 450)");
    infoContainer.append('text')
        .attr('class', 'year-label')
        .attr("font-size", "38px")
        .style('stroke', 'black')
        .text(globalDate);

    var headingContainer = svgHeading.append('g')
        .attr("width", 350)
        .attr("height", 300)
        .attr("x", 150)
        .attr("y", 390)
        .attr("transform", "translate(0,0)");
    headingContainer.append('text')
        .attr('class', 'heading')
        .attr("font-size", "66px")
        .style('stroke', 'black')
        .text(title);


}

function sdrawMap() {
    //console.log(mapped_group);

    //This part of code is modified version of above reference
    //here I have inset the group value from mapped_data in json.features.properties
    d3.json("world_countries.json", function (json) {
        for (var j = 0; j < json.features.length; j++) {
            json.features[j].properties.group = undefined;
            json.features[j].properties.dgroup = undefined;
            json.features[j].properties.vgroup = undefined;
        }
        for (var i = 0; i < mapped_group.length; i++) {
            //grab the state and group name from my created mapped_group      
            var countryName = mapped_sgroup[i].country;
            var groupValue = mapped_sgroup[i].groupInfo;
            var sg_index = mapped_sgroup[i].sg_index;

            // This for loop will put groupValue on json.features 
            for (j = 0; j < json.features.length; j++) {
                var jsonCountry = json.features[j].properties.name;
                //console.log(jsonCountry);
                if (jsonCountry == "USA") {
                    jsonCountry = "United States";
                } else if (jsonCountry == "England") {
                    jsonCountry = "United Kingdom";
                } else if (jsonCountry == "United Republic of Tanzania") {
                    jsonCountry = "Tanzania";
                    //console.log("Yes I am here");   
                }
                else if (jsonCountry == "Republic of the Congo") {
                    jsonCountry = "Congo";
                    //console.log("Yes I am here");   
                } else if (jsonCountry == "Democratic Republic of the Congo") {
                    jsonCountry = "Democratic Republic of Congo";
                    //console.log("Yes I am here");   
                }


                if (countryName == jsonCountry) {
                    json.features[j].properties.group = groupValue;
                    json.features[j].properties.sg_index = sg_index;
                    //console.log(json.features[j].properties);
                    

                    break;
                }
            }


        }
        //Now drawing the US map
        //use group value as domain of color to fill color on every state

        

        mapDraw.data(json.features)
            .style("fill", function (data) {
                var value = data.properties.group;
                if (value) {
                    return stringencyColor(value);
                } else {
                    return stringencyColor(1);
                }
            })
            .on('mouseover', function (data) {

                pointDiv.transition()
                    .duration(100)
                    .style("opacity", 1);

                pointDiv.attr("data-html", "true")
                    .html(data.properties.name + "<br />" + "Stringency Index: " + data.properties.sg_index)
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px")
                    .style("position", "absolute")
                    .style("background", "maroon")
                    .style("color", "white")
                    .style("font-size", "1.0rem");

            })
            .on('mouseout', function () {
                pointDiv.transition()
                    .duration(100)
                    .style("opacity", 0);
            });



    });

    var title = "Title";

    if (mode == 0) {
        title = "Daily New Count";
    } else if (mode == 1) {
        title = "Daily New Death";
    }else if (mode == 2) {
        title = "Daily New Vaccine";
    }else if (mode == 3) {
        title = "Stringency Index";
    }

    var infoContainer = svg.append('g')
        .attr("width", 250)
        .attr("height", 200)
        .attr("x", 150)
        .attr("y", 390)
        .attr("transform", "translate(130, 450)");
    infoContainer.append('text')
        .attr('class', 'year-label')
        .attr("font-size", "38px")
        .style('stroke', 'black')
        .text(globalDate);

    var headingContainer = svgHeading.append('g')
        .attr("width", 350)
        .attr("height", 300)
        .attr("x", 150)
        .attr("y", 390)
        .attr("transform", "translate(0,0)");
    headingContainer.append('text')
        .attr('class', 'heading')
        .attr("font-size", "66px")
        .style('stroke', 'black')
        .text(title);


}

function new_case_click() {
    mode = 0;
    d3.select('#slider1')
        .property('value', '1')
        .property('min',1);
    slider_change_ni('1');


    var yearText = d3.select('.year-label');
    yearText.remove();

    var headingText = d3.select('.heading');
    headingText.remove();

    var legend=d3.select(".legendContainer");

    legend.remove();

    showLegend();

    data_preprocess();
}

function new_death_click() {
    mode = 1;
    d3.select('#slider1')
        .property('value', '1')
        .property('min',1);
    slider_change_ni('1');
    var yearText = d3.select('.year-label');
    yearText.remove();

    var headingText = d3.select('.heading');
    headingText.remove();

    var legend=d3.select(".legendContainer");

    legend.remove();

    showLegend();
    data_preprocess();
}

function new_vaccine_click() {
    mode = 2;
    d3.select('#slider1')
        .property('value', '298')
        .property('min',298);
    slider_change_ni('298');
    var yearText = d3.select('.year-label');
    yearText.remove();

    var headingText = d3.select('.heading');
    headingText.remove();

    var legend=d3.select(".legendContainer");

    legend.remove();

    showLegend();
    data_preprocess();
}

function new_stringency_click() {
    mode = 3;
    d3.select('#slider1')
        .property('value', '1')
        .property('min',1);
    slider_change_ni('1');
    var yearText = d3.select('.year-label');
    yearText.remove();

    var headingText = d3.select('.heading');
    headingText.remove();

    var legend=d3.select(".legendContainer");

    legend.remove();

    showLegend();
    data_preprocess();
}


function showLegend(){

    var legendColor;
    var legendText;
    var legendTitle;

    if(mode==0){
        legendColor=color;
        legendText=groupTextNew;
        legendTitle=legendTitleNew;
    }else if(mode==1){
        legendColor=color;
        legendText=groupTextDeath;
        legendTitle=legendTitleDeath;
    }else if(mode==2){
        legendColor=vaccineColor;
        legendText=groupTextVac;
        legendTitle=legendTitleVac;
    }else if(mode==3){
        //working on it
        legendColor=stringencyColor;
        legendText=groupTextSt;
        legendTitle=legendTitleSt;
    }
    var legendContainer = svg.append('g')
        .attr("width", 250)
        .attr("height", 200)
        .attr("class", "legendContainer")
        .selectAll('g')
        .data(legendColor.domain().slice())
        .enter()
        .append("g")
        .attr("transform", function (data, index) {
            //return "translate(760," + (330 + (index * 25) )+ ")";
            return "translate(" + (450 + (index * 40)) + ", 460)";
        });

    legendContainer.append("rect")
        .attr("width", 40)
        .attr("height", 20)
        .style('stroke', 'black')
        .style("stroke-width", "1")
        .style("fill", legendColor);

    legendContainer.append("text")
        .data(legendText)
        .attr("x", 30)
        .attr("y", 35)
        .text(function (data) {
            return data;
        });

    legendContainer.append("text")
        .data(legendTitle)
        .attr("x", 110)
        .attr("y", -10)
        .text(function (data) {
            return data;
        });


}




        //Now drawing the legend. I have taken the idea of drawing legend from the above reference and use it according to assignment's requirement.

/*

var legendContainer = svg.append('g')
    .attr("width", 250)
    .attr("height", 200)
    .selectAll('g')
    .data(color.domain().slice())
    .enter()
    .append("g")
    .attr("transform", function (data, index) {
        //return "translate(760," + (330 + (index * 25) )+ ")";
        return "translate(" + (770 + (index * 60)) + ", 380)";
    });

legendContainer.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .style('stroke', 'black')
    .style("stroke-width", "1")
    .style("fill", color);

legendContainer.append("text")
    .data(groupText)
    .attr("x", 50)
    .attr("y", 35)
    .text(function (data) {
        return data;
    });

legendContainer.append("text")
    .data(legendTitle)
    .attr("x", 30)
    .attr("y", -10)
    .text(function (data) {
        return data;
    });

    */








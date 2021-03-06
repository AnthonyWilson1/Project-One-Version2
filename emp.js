function employment(param) {
    var state = param

var fips = {
    alabama: "01",
    alaska: "02",
    arizona: "04",
    arkansas: "05",
    california: "06",
    colorado: "08",
    connecticut: "09",
    delaware: "10",
    districtOfColumbia: "11",
    florida: "12",
    georgia: "13",
    hawaii: "15",
    idaho: "16",
    illinois: "17",
    indiana: "18",
    iowa: "19",
    kansas: "20",
    kentucky: "21",
    louisiana: "22",
    maine: "23",
    maryland: "24",
    massachusetts: "25",
    michigan: "26",
    minnesota: "27",
    mississippi: "28",
    missouri: "29",
    montana: "30",
    nebraska: "31",
    nevada: "32",
    newHampshire: "33",
    newJersey: "34",
    newMexiceo: "35",
    newYork: "36",
    northCarolina: "37",
    northDakota: "38",
    ohio: "39",
    oklahoma: "40",
    oregon: "41",
    pennsylvania: "42",
    rhodeIsland: "44",
    southCarolina: "45",
    southDakota: "46",
    tennesse: "47",
    texas: "48",
    utah: "49",
    vermont: "50",
    virginia: "51",
    washington: "53",
    westVirginia: "54",
    wisconsin: "55",
    wyoming: "56",
    }

    var dynamicState = fips[param]

    var URL = "https://api.census.gov/data/2016/acs/acs1/profile?get="
    var URL2015 = "https://api.census.gov/data/2015/acs/acs1/profile?get="
    var population = "DP03_0009PE"
    var geography = "&for=county:*&in=state:" + dynamicState
    var key = "&key=272940975e9334abc537f165743db6e73882c550"
    var queryUrl = URL + population + geography + key
    var queryUrl2 = URL2015 + population + geography + key
    var corsProxy = "https://cors-anywhere.herokuapp.com/";
    var urlPop = corsProxy + queryUrl;
    var urlPop2 = corsProxy + queryUrl2;
    var datas = []
    var labelsOrigin = []
    var county = []
    var countyFull = []
    var colors = []
    var borders = []
    var datas2015 = []
    var colors2 = []
    var borders2 = []

    function fillColor() {
        for (let i = 0; i < datas.length; i++) {
            var color = "rgba(54, 162, 235, 0.2)"
            var color2015 = "'rgba(54, 162, 235, 0.2)'"
            colors.push(color)
            colors2.push(color2015)

        }
    }
    function fillBorder() {
        for (let i = 0; i < datas.length; i++) {
            var color = "rgba(54, 162, 235, 0.2)"
            var color2015 = "'rgba(54, 162, 235, 0.2)'"
            borders.push(color)  
            borders2.push(color2015)            
        }
    }

    function createChart2(label, value, value2) {
    var ctx = $("#myChartPop2");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: '2016 % of Unemployemnt',
                data: value,
                backgroundColor: colors,
                borderColor: borders,
                borderWidth: .5
            },{
                label: '2015 % of Unemployment',
                data: value2,
                backgroundColor: colors2,
                borderColor: borders2,
                borderWidth: .5
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    }   

    $.ajax({
        url: urlPop,
        method: "GET",
        
      }).then(function(response) {

        for (let i = 1; i < response.length; i++) {
            var data = parseInt(response[i][0])
            if (data < 0) {
                datas.push(0)
            } else {
            datas.push(data)
            var countyAPI = response[i][2]
            county.push(countyAPI)
            var stateCode = dynamicState + countyAPI; 
            countyFull.push(stateCode);   
            }          
        }
   

        for (let i = 0; i < countyFull.length; i++) {
            var URL = "https://www.broadbandmap.gov/broadbandmap/county-availability/jun2014/countyids/" + countyFull[i] + "?format=json"
            $.ajax({
                url:URL,
                method:"GET",
            }).then(function(response) {
                var labelName = (response.Results[0].countyName);
                labelsOrigin.push(labelName)                   
            })
        }
        

        
        $.ajax({
            url: urlPop2,
            method: "GET",
        }).then(function(response) {
           setTimeout(function(){
           for (let i= 1; i< response.length; i++) {
            var data2015 = parseInt(response[i][0])
            if (datas2015 < 0) {
            datas2015.push(0)
            }else {
            datas2015.push(data2015)  
            }                 
           } 
        })
        },2000); 


        fillColor();
        fillBorder();
        setTimeout(function(){
            console.log(datas);
            console.log(datas2015);
            insertChart2();
            createChart2(labelsOrigin,datas, datas2015);
          },3000);
        
    })   

    function insertChart2() {
    var canvas = $('<canvas>')
    canvas.attr('id', 'myChartPop2')
    canvas.attr('width', '400')
    canvas.attr('height', '400')
    $('#graphContainer').append(canvas)
    }
}
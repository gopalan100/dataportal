
function ContactController($scope, $http, $modal, dataSetData, $location) {
	    //$scope.datasets = dataSetData.query();
	$scope.acc2open = true;
	$scope.$on('$viewContentLoaded', addControls());
    $scope.activePath = null;
  	$scope.$on('$routeChangeSuccess', function(){
    	$scope.$parent.activePath ="#"+ $location.path();
  	});
  	
	var labelsArr = '{labels : [';
	var datasetsArr = 'datasets : [{"data":[';
	var yearArr = new Array();
	var countryArr = new Array();
	var Series=" [";
	var Category=" [";
	dataSetData.query(function(data)
	{
		//Category
		for(rowIndex in data)
		{
			if(!isPresent(data[rowIndex].year,yearArr)){
				yearArr.push(data[rowIndex].year);	
				Category=Category+JSON.stringify(data[rowIndex].year)+",";	
			}
			if(!isPresent(data[rowIndex].Country,countryArr)){
				countryArr.push(data[rowIndex].Country);	
			}
		}
		Category=Category.substring(0,Category.length-1);
		Category=Category+"]";
		Category=Category.replace(/"/g,"");
		//Series
		for(countryIndex in countryArr)
			{
				Series=Series+"{\"name\":"+JSON.stringify(countryArr[countryIndex])+", \"data\": [";
				var data1="";
				for(rowIndex in data)
				{
					if(JSON.stringify(data[rowIndex].Country)==JSON.stringify(countryArr[countryIndex])){
						data1=data1+JSON.stringify(data[rowIndex].population)+",";
					}
					else{
						rowIndex=rowIndex+yearArr.length;
					}
					data1=data1.replace(/"/g,"");
				}
			Series=Series+data1;
			Series=Series.substring(0,Series.length-1);	
			//console.log("series is :"+Series);
			Series=Series+"]},";
			}	
			Series=Series.substring(0,Series.length-1);	
		Series=Series+"]";
		//Series=Series.replace(/"/g,"");
		console.log("Categories are" +Category);
		var options={
		   chart: {type: 'line'},
           title: {text: 'Worldwide Population Growth'},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
           	formatter: function() {
           		//console.log(this.value);
           		return this.value / 1000;}
           	}
           	},
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           area: {
           	stacking: 'normal',
           	lineColor: '#666666',
           	lineWidth: 1,
           	marker: {
           		lineWidth: 1,
           		lineColor: '#666666'
           		}
           	 }
           },
           series: JSON.parse(Series)
           };
           var optionsBar={
		   chart: {type: 'bar'},
           title: {text: 'Worldwide Population Growth'},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
           	formatter: function() {
           		//console.log(this.value);
           		return this.value / 1000;}
           	}
           	},
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           series: {
                    stacking: 'normal'
                }
           },
           series: JSON.parse(Series)
           };
        //HighCharts
		function createChart() {
			console.log("options.series" + options.series);
			console.log("series" + Series);
			 jQuery('#TC1').highcharts(options);
			 jQuery('#TC2').highcharts(optionsBar);
	 };
			createChart();
});	
};

function aboutController($scope, $http, $modal, $location, dataSetData) {
	$scope.acc2open = true;
	$scope.$on('$viewContentLoaded', addControls());
    $scope.activePath = null;
  	$scope.$on('$routeChangeSuccess', function(){
    	$scope.$parent.activePath ="#"+ $location.path();
  	});
  	
	var labelsArr = '{labels : [';
	var datasetsArr = 'datasets : [{"data":[';
	var yearArr = new Array();
	var countryArr = new Array();
	var Series=" [";
	var Category=" [";
	dataSetData.query(function(data)
	{
		//Category
		for(rowIndex in data)
		{
			if(!isPresent(data[rowIndex].year,yearArr)){
				yearArr.push(data[rowIndex].year);	
				Category=Category+JSON.stringify(data[rowIndex].year)+",";	
			}
			if(!isPresent(data[rowIndex].Country,countryArr)){
				countryArr.push(data[rowIndex].Country);	
			}
		}
		Category=Category.substring(0,Category.length-1);
		Category=Category+"]";
		Category=Category.replace(/"/g,"");
		//Series
		for(countryIndex in countryArr)
			{
				Series=Series+"{\"name\":"+JSON.stringify(countryArr[countryIndex])+", \"data\": [";
				var data1="";
				for(rowIndex in data)
				{
					if(JSON.stringify(data[rowIndex].Country)==JSON.stringify(countryArr[countryIndex])){
						data1=data1+JSON.stringify(data[rowIndex].population)+",";
					}
					else{
						rowIndex=rowIndex+yearArr.length;
					}
					data1=data1.replace(/"/g,"");
				}
			Series=Series+data1;
			Series=Series.substring(0,Series.length-1);	
			//console.log("series is :"+Series);
			Series=Series+"]},";
			}	
			Series=Series.substring(0,Series.length-1);	
		Series=Series+"]";
		//Series=Series.replace(/"/g,"");
		//console.log("Categories are" +Category);
	var options={
		   chart: {type: 'column'},
           title: {text: 'Worldwide Population Growth'},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
           	formatter: function() {
           		//console.log(this.value);
           		return this.value / 1000;}
           	}
           	},
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           area: {
           	stacking: 'normal',
           	lineColor: '#666666',
           	lineWidth: 1,
           	marker: {
           		lineWidth: 1,
           		lineColor: '#666666'
           		}
           	 }
           },
           series: JSON.parse(Series)
           };
           var optionsBar={
		   chart: {type: 'area'},
           title: {text: 'Worldwide Population Growth'},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
           	formatter: function() {
           		//console.log(this.value);
           		return this.value / 1000;}
           	}
           	},
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           series: {
                    stacking: 'normal'
                }
           },
           series: JSON.parse(Series)
           };
        //HighCharts
		function createChart() {
			//console.log("options.series" + options.series);
			//console.log("series" + Series);
			 jQuery('#TestiChart1').highcharts(options);
			 jQuery('#TestiChart2').highcharts(optionsBar);
	 };
			createChart();
});	
};

function dataPageController($scope, $http, $modal, dataSetData1, $location, getSectors,getCountries, getYears,getSurveyData) {
    //surveyData=parseSurveyData(getSurveyData);
	
	dataSetData1.query(function(data){
	$scope.datasets = data;
	//console.log("the country descriptive data : "+JSON.stringify($scope.datasets));
	
	//now getting sectors, courntries and years
	var sectorArr=[],yearArr=[],countryArr=[];
	var Sectors='[';
	var Countries='[';
	var Years='[';
	
	getSectors.query(function(sectorData){
	for(rowIndex in sectorData)
	{ 		 if(!isPresent(sectorData[rowIndex].sector_name,sectorArr)){
				sectorArr.push(sectorData[rowIndex].sector_name);	
				//Category=Category+JSON.stringify(sectorData[rowIndex].sector_name)+",";	
				Sectors=Sectors+'{"name": '+JSON.stringify(sectorData[rowIndex].sector_name)+', "code": "01", "selectcode": true},';
			}
    }
		Sectors=Sectors.substring(0,Sectors.length-1);
		Sectors=Sectors+']';
		//console.log("sectorArr : "+Sectors);
	    $scope.Sectors1 =JSON.parse(Sectors);
		
		getCountries.query(function(countryData){
		for(rowIndex in countryData)
		{ 		 if(!isPresent(countryData[rowIndex].country,countryArr)){
					countryArr.push(countryData[rowIndex].country);	
					//Category=Category+JSON.stringify(sectorData[rowIndex].sector_name)+",";	
					Countries=Countries+'{"name": '+JSON.stringify(countryData[rowIndex].country)+', "code": "02", "selectcode": true},';
				}
		}
		Countries=Countries.substring(0,Countries.length-1);
		Countries=Countries+']';
		//console.log("sectorArr : "+Sectors);
	    $scope.Countries1 =JSON.parse(Countries);
		getYears.query(function(yearsList){
		for(rowIndex in yearsList)
		{ 		 if(!isPresent(yearsList[rowIndex].Year,yearArr)){
					yearArr.push(yearsList[rowIndex].Year);	
					//Category=Category+JSON.stringify(sectorData[rowIndex].sector_name)+",";	
					Years=Years+'{"name": '+JSON.stringify(yearsList[rowIndex].Year)+', "code": "03", "selectcode": true},';
				}
		}
			Years=Years.substring(0,Years.length-1);
			Years=Years+']';
			//console.log("sectorArr : "+Sectors);
			$scope.Years1 =JSON.parse(Years);
	
	
	
	
	
	
	
    //Accordion Starts

    $scope.displayData = function (idd) {
        for (i in $scope.datasets) {
            if ($scope.datasets[i].id == idd) {
                $scope.contentHeader = $scope.datasets[i].name;
                $scope.contentDetails = $scope.datasets[i].snippet;
                $scope.countrry = $scope.datasets[i].cntry;
                $scope.yyear = $scope.datasets[i].dateyear;
            }
        }
        $scope.acc1open = true;
        $scope.acc2open = true;
        $scope.acc3open = false;
    };

	//Drags

    $scope.topDragList = [{
        'title': 'Sector(' + $scope.sector_count + ')',
        'drag': true,
        'val': '12'
    }];

    $scope.leftDragList = [{
        'title': 'Country(' + $scope.contry_count + ')',
        'drag': true,
        'val': '11'
    }, {
        'title': 'Year(' + $scope.yyrss_count + ')',
        'drag': true,
        'val': '10'
    }];

		//console.log("just before the dragdataActions method");
		//console.log("sectores1 "+ $scope.Sectors1);
		//console.log("countries "+ $scope.Countries1);
		//console.log("Years1 "+ $scope.Years1);
		
		$scope.dragdataActions = function () {

		console.log("called it");
        valflag = 0;
        lftSideListArr = [];
        $scope.selectedContr = [];
        $scope.selectedSects = [];
        $scope.selectedYyrs = [];
		//console.log("just before the angular.forEach methods");
		//console.log("sectores1 "+ $scope.Sectors1);
		//console.log("countries "+ $scope.Countries1);
		//console.log("Years1 "+ $scope.Years1);
        
		angular.forEach($scope.Sectors1, function (sec) {

            if (angular.isDefined(sec.selectcode) && sec.selectcode === true) {

                $scope.selectedSects.push(sec.name);

            }

        });

		//console.log("$scope.selectedSects : "+$scope.selectedSects);
        angular.forEach($scope.Countries1, function (cont) {

            if (angular.isDefined(cont.selectcode) && cont.selectcode === true) {

                $scope.selectedContr.push(cont.name);

            }

        });
		//console.log("$scope.selectedContr : "+$scope.selectedContr);
        angular.forEach($scope.Years1, function (yyrs) {

            if (angular.isDefined(yyrs.selectcode) && yyrs.selectcode === true) {

                $scope.selectedYyrs.push(yyrs.name);

            }

        });
		//console.log("$scope.selectedYyrs : "+$scope.selectedYyrs);

        for (i = 0; i < $scope.topDragList.length; i++) {
            lftSideListArr = $scope.topDragList[i].val;
            valflag += parseInt(lftSideListArr);
        }

        $scope.sector_count = $scope.selectedSects.length;
        $scope.contry_count = $scope.selectedContr.length;
        $scope.yyrss_count = $scope.selectedYyrs.length;

		//console.log("$scope.selectedSects : "+$scope.selectedSects);
		//console.log("$scope.selectedContr : "+$scope.selectedContr);
		//console.log("$scope.selectedYyrs : "+$scope.selectedYyrs);
		
		
		
		getSurveyData.query(function(data){
		var s=[];
		surveyJSON=data;
		//console.log(JSON.stringify(surveyJSON)+"---"+data.length)
		for(k=0;k<data.length;k++){
		s.push(data[k].value);
		}

		console.log("survey data is :"+ s);
		//console.log("$scope.surveyData : "+data);
		
		
		
		 $(".tbleStru").createGTable({
            SectorsArr: $scope.selectedSects,
            CountriesArr: $scope.selectedContr,
            YearsArr: $scope.selectedYyrs,
			datavalueArr: s,
            initPos: valflag
        });
		});		
       





	  

    };
	
	
	$scope.dragdataActions();

	});// END OF getYears
	});//end of getCountries
	});//end of getsectors
	});
	
 // Pagination

    $scope.pageSize = 3;
    var intialPageSize = 3;
    $scope.shLess = false;
    $scope.shMore = true;


    $scope.nxtPage = function (num) {
        var EndPageSize = $scope.datasets.length - num;
        if (($scope.pageSize - intialPageSize) == intialPageSize) {
            $scope.shMore = false;
        }

        if (EndPageSize > 0) {
            $scope.pageSize = num + 3;
            $scope.shLess = true;
        }

    };

    $scope.prevPage = function (num) {
        if (($scope.pageSize - intialPageSize) == intialPageSize) {
            $scope.shLess = false;
        }
        if (num != intialPageSize) {
            $scope.pageSize = num - 3;
            $scope.shMore = true;
        }
    };

    // Pagination Ends
	
	
	
	
	
    $scope.optionsList1 = {
        accept: function (dragEl) {
            return true;
        }
    };

    $scope.openModal = function () {
        $("html").animate({
            scrollTop: 0
        }, 600).css("overflow", "hidden");
        $modal.open({
            templateUrl: 'partials/completeData.html',
            controller: function () {
                openPops = setTimeout(function () {
                    $("#tbleBase").clone().appendTo($("#appndTable"));
                    $(".modal").addClass("adjusModal");
                    chartOpens('', 1);
                }, 10)

            }
        })
    };
	$scope.acc2open = true;
	$scope.$on('$viewContentLoaded', addControls());
    $scope.activePath = null;
  	$scope.$on('$routeChangeSuccess', function(){
    $scope.$parent.activePath ="#"+ $location.path();
  	});
	
};

function parseSurveyData(getSurveyData) {
var surveyJSON;
var s = [];
getSurveyData.query(function(data){
surveyJSON=data;
//console.log(JSON.stringify(surveyJSON)+"---"+data.length)
for(k=0;k<data.length;k++){
s.push(data[k].value);
}

console.log("survey data is :"+ s);
});
return surveyJSON;
}

function infinitiPageController($scope, $http, $modal, dataSetData1, $location) {
    $scope.activePath = null;
  	$scope.$on('$routeChangeSuccess', function(){
    	$scope.$parent.activePath ="#"+ $location.path();
  	});
}

function ChartCtrl($scope, $location, $routeParams, Project) {
Project.get({id: $routeParams.countryId},function(data){
var xdata=data;
if(xdata.length > 0) {
var xcategories=[];
var ycategories = [];
var ucheck;
var scheck;
var sectors=[];
var temp1=[];
var temp2=[];
for(var i = 0; i < xdata.length; i++) {
if (xdata[i].year != ucheck ) {
xcategories.push(xdata[i].year);
}
ucheck = xdata[i].year;
temp1.push(xdata[i].sector_name);
temp1.sort();
if (temp1[i] != scheck ) {
sectors.push(temp1[i]);
}
scheck = temp1[i];
}
var j=0;
while ( j < sectors.length)
{
for(var i = 0; i < xdata.length; i++) {
 
 if ( sectors[j]==xdata[i].sector_name) {
   temp2.push(parseInt(xdata[i].value));
}
}
ycategories.push({name: sectors[j], data: temp2});
temp2=[];
j++;
}
var hdata = {
            title: {
                text: 'Ashoka Stats',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: www.ashoka.org',
                x: -20
            },
            xAxis: {
                categories: xcategories
            },
            yAxis: {
                title: {
                    text: 'Penitration (Millions)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ' Millions'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: ycategories
        };

$scope.basicAreaChart = hdata;
}
else {
var hdata = {
title: {
                text: 'No data to dispaly',
                x: -20 
       }
};
$scope.basicAreaChart = hdata;
}
});
}

function slideStarts(){
	$("#slides").slidesjs({
			  height: 300,
	          play: {
	          auto: true,
	          interval: 3000
	          },
	          pagination: {
		      active: false 
		      },
		      navigation: {
		      active: false
		      }
	  });
}

function isPresent(obj, Arr) {
	for(i in Arr)
	{
		if (obj==Arr[i])
		return true;
	}
	return false;
};

function addControls() {
	var t=0; // the height of the highest element (after the function runs)
	var t_elem;  // the highest element (after the function runs)
	$(".mainContent .clumContnt").each(function () {
	    $this = $(this);
	    if ( $this.innerHeight() > t ) {
	        t_elem=this;
	        t=$this.innerHeight();
	    }
	});
	 var hghtAdju = setTimeout(function () {
        $(".mainContent .clumContnt").innerHeight(t);
        
        $(".tbleStru").createGTable({
            initPos: 12
        });
        $(".datasetList").children("li:first").find(".dataDetails").click();
        $(".bysctor").css({
            "margin-top": "20px",
            "display": "none"
        });
   	 }, 500);
    $("#closepop").live("click", function () {
        $(".modal-backdrop").trigger("click");
        $("html").css("overflow", "auto");
    });
    $(".sectorMenu a").live("click", function () {
        $iid = $(this).attr("id");
        $nxtiid = $(this).siblings("a").attr("id");
        $(".selecType").fadeOut("fast");
        $('#TC1').children("div").remove();
        $('.' + $nxtiid).fadeOut("fast");
        $('.' + $iid).fadeIn("slow");
    });
    $(".mapChoosefnt li input").live("click", function () {
        var typeChart = $(this).val();
        chartOpens(typeChart, 0);
    });
    $(".listCountry a, .bysctor a").live("click", function () {
        $(this).parents().eq(2).fadeOut();
        $(".selecType").fadeIn();
        chartOpens();
    });
    $(".browseTab").live("click", function () {
        $(".selecType").fadeOut("fast");
    });
    if($(".mainContentLogos").length){
    chartOpens();
    chartOpens("area", 1);
    }else{
    chartOpens("spline", 0);
    chartOpens("column", 1);    	
    }
    rearrangeData();
	slideStarts();
    
}

function rearrangeData(){
    	setTimeout(function(){
        if($("#sideDiv .thumbnail .btn").length == 2){
        $(".btn:first-child").animate({"transform-origin": "30px 17px 0"})
		$(".btn:last-child").animate({"transform-origin": "45px 32px 0"})
		}else if($("#sideDiv .thumbnail .btn").length == "3"){
		$(".btn:eq(1)").animate({"transform-origin": "45px 32px 0"})
		$(".btn:last-child").animate({"transform-origin": "63px 50px 0"})
		}else{
		$(".btn:first-child").animate({"transform-origin": "30px 17px 0"})	
		}
        }, 100)
}

function chartOpens(){
	//for chart purpose - temp approach
			if($('#TC1').length){
	        $('#TC1').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'Yearly Countries Stats'
            },
            xAxis: {
                categories: ['2000', '2003', '2004', '2005', '2010', '2011', '2012']
            },
            yAxis: {
                title: {
                    text: 'Stat Counts'
                }
            },
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y;
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: 'India',
                data: [7, 6, 9, 14, 18, 21, 25]
            }, {
                name: 'London',
                data: [3, 4, 5, 8, 11, 15, 17]
            }, {
                name: 'China',
                data: [13, 24, 25, 38, 6, 11, 7]
            }]
        });
		}
}

window.onload = function(){ setTimeout( function(){ isIphone(); }, 1000); };

function isIphone(){
	if($(document).width()<481){
     $("#rightColum").insertAfter( ".mainContent" );
    }
}

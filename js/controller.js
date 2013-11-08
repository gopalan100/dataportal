function ContactController($scope, $http, $modal, dataSetData, $location) {

    $scope.datasets = dataSetData.query();

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

    /*Some jsons for temp use*/
    $scope.Sectors1 = [{
        "name": "Agriculture",
        "code": "01",
        "selectcode": true
    }, {
        "name": "Education",
        "code": "01",
        "selectcode": true
    }, {
        "name": "Social",
        "code": "01",
        "selectcode": false
    }, {
        "name": "HealthCare",
        "code": "01",
        "selectcode": false
    }];

    $scope.Countries1 = [{
        "name": "India",
        "code": "02",
        "selectcode": true
    }, {
        "name": "England",
        "code": "02",
        "selectcode": true
    }, {
        "name": "Canada",
        "code": "02",
        "selectcode": ""
    }, {
        "name": "France",
        "code": "02",
        "selectcode": ""
    }, {
        "name": "South Africa",
        "code": "02",
        "selectcode": ""
    }, {
        "name": "China",
        "code": "02",
        "selectcode": ""
    }, {
        "name": "Japan",
        "code": "02",
        "selectcode": ""
    }];

    $scope.Years1 = [{
        "name": "2010",
        "code": "03",
        "selectcode": ""
    }, {
        "name": "2011",
        "code": "03",
        "selectcode": true
    }, {
        "name": "2012",
        "code": "03",
        "selectcode": true
    }, {
        "name": "2013",
        "code": "03",
        "selectcode": ""
    }, {
        "name": "2008",
        "code": "03",
        "selectcode": ""
    }, {
        "name": "2009",
        "code": "03",
        "selectcode": ""
    }, {
        "name": "2000",
        "code": "03",
        "selectcode": ""
    }];

    //Drags

    $scope.topDragList = [{
        'title': 'Sector',
        'drag': true,
        'val': '12'
    }];

    $scope.leftDragList = [{
        'title': 'Country',
        'drag': true,
        'val': '11'
    }, {
        'title': 'Year',
        'drag': true,
        'val': '10'
    }];

    $scope.dragdataActions = function () {

        valflag = 0;
        lftSideListArr = [];
        $scope.selectedContr = [];
        $scope.selectedSects = [];
        $scope.selectedYyrs = [];
        angular.forEach($scope.Sectors1, function (sec) {

            if (angular.isDefined(sec.selectcode) && sec.selectcode === true) {

                $scope.selectedSects.push(sec.name);

            }

        });

        angular.forEach($scope.Countries1, function (cont) {

            if (angular.isDefined(cont.selectcode) && cont.selectcode === true) {

                $scope.selectedContr.push(cont.name);

            }

        });

        angular.forEach($scope.Years1, function (yyrs) {

            if (angular.isDefined(yyrs.selectcode) && yyrs.selectcode === true) {

                $scope.selectedYyrs.push(yyrs.name);

            }

        });


        for (i = 0; i < $scope.topDragList.length; i++) {
            lftSideListArr = $scope.topDragList[i].val;
            valflag += parseInt(lftSideListArr);
        }

        $scope.sector_count = $scope.selectedSects.length;
        $scope.contry_count = $scope.selectedContr.length;
        $scope.yyrss_count = $scope.selectedYyrs.length;
        

        $(".tbleStru").createGTable({
            SectorsArr: $scope.selectedSects,
            CountriesArr: $scope.selectedContr,
            YearsArr: $scope.selectedYyrs,
            initPos: valflag
        });
        
        
        
		rearrangeData();
		$("#sideDiv .thumbnail .btn").dblclick();

    };

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
                    $("#tbleStru1").clone().appendTo($("#appndTable"));
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
   	 	
   	 	if ($(document).width() > 640) {
        $(".mainContent .clumContnt").innerHeight(t);
        }else{
        $("#rightColum").insertAfter(".mainContent");
        }
       
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
    chartOpens("", 0, '350');
    chartOpens("area", 1, '300');
    }else{
    chartOpens("spline", 0, '350');
    chartOpens("column", 1, '300');
    }
    
    rearrangeData();
    slideStarts();
    
}

function rearrangeData(){
    	if($.browser.msie){
    	setTimeout(function(){
    	$("#sideDiv .btn:eq(0)").css("top", "10px");
    	$("#sideDiv .btn:eq(1)").css("top", "45px");
        $("#sideDiv .btn:eq(2)").css("top", "85px");  
        }, 100)
       }
    	
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

function chartOpens(typeval, mode, setHeight) {
    
    if (mode == 1) {
        $initId = $('.TC1');
    } else {
        $initId = $('#TC1');
    }

    if (!typeval) {
        var typeChart = 'bar';
    } else {
        var typeChart = typeval;
    }

    //for chart purpose - temp approach

    if ($initId.length) {
        $initId.highcharts({
            chart: {
                type: typeChart,
				height: setHeight
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
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
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

function dataPageController($scope, $http, $modal, dataSetData, $location, getSurveyData, getSurveyDataDrag) {
	 $scope.datasets = dataSetData.query();
	 
	 // DataSet 'I'
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
    
    
    // DataSet 'II'
    
    	var valueArra=[];
		var cntryeArra=[];
		var sectorArra=[];
		var jusCheckS = [];
		var jusCheckY = [];
		var jusCheckC = [];
		var timestaArra = [];
		
		
			 //Drags

    $scope.topDragList = [{
        'title': 'Sector',
        'drag': true,
        'val': '12'
    }];

    $scope.leftDragList = [{
        'title': 'Country',
        'drag': true,
        'val': '11'
    }, {
        'title': 'Year',
        'drag': true,
        'val': '10'
    }];
    
	
   	getSurveyData.query(function(data){
		
		for(k=0;k<data.length;k++){
		data[k].sectorCode =true;
		data[k].countryCode =true;
		data[k].YearCode =true;
		if (jusCheckY.indexOf(data[k].year) == -1){
		jusCheckY.push(data[k].year);
		TimesArr={"name": data[k].year, "code": "03", "selectcode": true}
		timestaArra.push(TimesArr);	
		}
		if (jusCheckC.indexOf(data[k].country) == -1){
		jusCheckC.push(data[k].country);
		Countryi={"name": data[k].country, "code": "02", "selectcode": true}
		cntryeArra.push(Countryi);
		}
		if (jusCheckS.indexOf(data[k].sector) == -1){
		jusCheckS.push(data[k].sector);	
		//sectorArra.push(data[k].sector);
		Sectors={"name": data[k].sector, "code": "01", "selectcode": true}
		sectorArra.push(Sectors);
		}
		valueArra.push(data[k].value);
		}

	 $scope.Sectors1	= 	sectorArra;
	 $scope.Years1		=	timestaArra;
	 $scope.Countries1	= 	cntryeArra;
	 

    

	 $scope.dragdataActions = function () {
	 	

	 	
	 	valflag = 0;
        lftSideListArr = [];
        $scope.selectedContr = [];
        $scope.selectedSects = [];
        $scope.selectedYyrs = [];
        
        for (i = 0; i < $scope.topDragList.length; i++) {
            lftSideListArr = $scope.topDragList[i].val;
            valflag += parseInt(lftSideListArr);
        }
		console.log(valflag);
		
		getSurveyDataDrag.query({changeOrderBy: valflag},function(data){
		
			for(k=0;k<data.length;k++){
			data[k].sectorCode =true;
			data[k].countryCode =true;
			data[k].YearCode =true;
			}
			
		})
        
        angular.forEach($scope.Sectors1, function (sec) {

            if (angular.isDefined(sec.selectcode) && sec.selectcode === true) {

                $scope.selectedSects.push(sec.name);
                $.each(data, function(j, v) {
			        if (data[j].sector == sec.name) {

			            delete data[j].sectorCode;
			            data[j].sectorCode = "true";
			            return;
			        }
			    });
              

            }else{
            	 $.each(data, function(i, v) {
			        if (data[i].sector == sec.name) {
			            delete data[i].sectorCode;
			            data[i].sectorCode = "false";
			            return;
			        }
			    });
            }
        });

        angular.forEach($scope.Countries1, function (cont) {

            if (angular.isDefined(cont.selectcode) && cont.selectcode === true) {

                $scope.selectedContr.push(cont.name);
                
                $.each(data, function(j, v) {
			        if (data[j].country == cont.name) {

			            delete data[j].countryCode;
			            data[j].countryCode = "true";
			            return;
			        }
			    });

            }else{
            	
            	$.each(data, function(i, v) {
			        if (data[i].country == cont.name) {
			            delete data[i].countryCode;
			            data[i].countryCode = "false";
			            return;
			        }
			    });
            	
            }

        });

        angular.forEach($scope.Years1, function (yyrs) {

            if (angular.isDefined(yyrs.selectcode) && yyrs.selectcode === true) {

                $scope.selectedYyrs.push(yyrs.name);
                
                $.each(data, function(j, v) {
			        if (data[j].year == yyrs.name) {
			            delete data[j].YearCode;
			            data[j].YearCode = "true";
			            return;
			        }
			    });

            }else{
            	
            	$.each(data, function(i, v) {
			        if (data[i].year == yyrs.name) {
			            delete data[i].YearCode;
			            data[i].YearCode = "false";
			            return;
			        }
			    });
			    
            }

        });
       /* valueArra = [];
        $.each(data, function(kk, v) {
			if(data[kk].sectorCode!="false"){
				console.log(data[kk].sector)
				valueArra.push(data[kk].value);
			}
		})
		valueArra = [];
		for(v=0;v<data.length;v++){
			if(data[v].YearCode!="false"){
				valueArra.push(data[v].value);
			}else if(data[v].sectorCode!="false"){
				
			}else if(data[v].countryCode!="false"){
				
			}
		}
        
         console.log(valueArra)
        */
        

		  $(".tbleStru").createGTable({
	            SectorsArr: $scope.selectedSects,
	            CountriesArr: $scope.selectedContr,
	            YearsArr: $scope.selectedYyrs,
	            datavalueArr: data,
	            initPos: valflag
	      });

	 }

        
	 
	 })
    
}
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
        "name": "ENGLAND",
        "code": "02",
        "selectcode": true
    }, {
        "name": "CANADA",
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
    chartOpens();
    chartOpens("area", 1);
}


function chartOpens(typeval, mode) {
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
                type: typeChart
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

window.onload = function () {
    setTimeout(function () {
        isIphone();
    }, 1000);
};

function isIphone() {
    if ($(document).width() < 481) {
        $("#rightColum").insertAfter(".mainContent");
    }
}
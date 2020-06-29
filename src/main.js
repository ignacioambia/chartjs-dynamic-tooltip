//https://www.chartjs.org/docs/latest/configuration/tooltip.html#external-custom-tooltips

import Chart from 'chart.js'
import './index.css'

var myLineChart

const tooltipOpacity = 1

function callUser(name){
    console.log('Calling user ' + name)
}

window.onload = function(){

    var ctx = document.getElementById("canvas").getContext("2d");

        var data = 
        {
        labels: ["January","Februrary","March","April","May","June"],
        keepShowing: [],
        datasets: 
        [
            {
                label: "Autorating",
                data: 
                [
                    {
                        x: 0,
                        y: 50,
                        user : 'Jorge Rangel'
                    },
                    {
                        x: 3,
                        y: 25,
                        user : 'Susana Torres'
                    },
                    {
                        x: 2,
                        y: 45,
                        user : 'Ignacio Ambia'
                    },
                    {
                      x: 0,
                      y: 50,
                      user : 'Jorge Rangel'
                  },
                  {
                      x: 3,
                      y: 25,
                      user : 'Susana Torres'
                  },
                  {
                      x: 2,
                      y: 45,
                      user : 'Ignacio Ambia'
                  }
                ],
                backgroundColor: "rgba(26,179,148,0.6)", //green

            },
           
        ],
		};

		var options = {
		  scales: {
		    yAxes: [{
		      scaleLabel: {
		        display: true,
		        labelString: 'Y'
		      }
		    }],
		    xAxes: [{
		      scaleLabel: {
		        display: true,
		        labelString: 'X'
		      }
		    }]
		  },
      tooltips: {
          enabled: false,
          custom : function(tooltipModel){



            let customTooltip = document.getElementById('custom-tooltip')


            if(!customTooltip){
                customTooltip = document.createElement('div')
                customTooltip.id = 'custom-tooltip'
                customTooltip.classList.add('custom-tooltip')

                document.body.appendChild(customTooltip)
            }

                var cursorOnDiv = false;

                if(tooltipModel.opacity == 0 ){
                  customTooltip.style.opacity = 0
                  return;
                }


                customTooltip.addEventListener('mouseout',()=>{
                  customTooltip.style.opacity = 0
                })

                customTooltip.addEventListener('mouseover',()=>{

                  customTooltip.style.opacity = tooltipOpacity
                })
           

            let values  = ''



            tooltipModel.body.forEach(obj=>{
                values += '<div>' +obj.lines[0]+ '</div>'
            })


            customTooltip.innerHTML = `
                <div>
                    <div class="text-center mb-2">
                        <span class="font-weight-bold" >${tooltipModel.title}</span>
                    </div>

                    <div>
                    <div class="bar">
                    <span style="justify-content: start; width: 50%;">Ignacio Ambia</span>
                    
                    <div class="bar-content-green">
                        <div>
                            75%
                        </div>
                    </div>
                </div>
                    </div>

                    <div style="text-align:center;" >
                        
                    </div>
                </div>
            `

            var chartPosition = this._chart.canvas.getBoundingClientRect()
            var tooltipPosition = customTooltip.getBoundingClientRect()
           




            
            customTooltip.style.opacity = 1
            customTooltip.style.top = chartPosition.top + window.pageYOffset + tooltipModel.caretY + 'px'
            
            var tooltipPosition = customTooltip.getBoundingClientRect()
            if(window.innerWidth < chartPosition.left + window.pageXOffset + tooltipModel.caretX  + tooltipPosition.width){
              customTooltip.style.left = chartPosition.left + window.pageXOffset + tooltipModel.caretX - tooltipPosition.width -10 + 'px'
            }else{
              customTooltip.style.left = chartPosition.left + window.pageXOffset + tooltipModel.caretX + 'px'
            }
          },
          mode: 'label',

          callbacks : {
            title : function(tooltipItem,data){
             
              return tooltipItem[0].label +  ' autorating'
            }
          }

                },
           onClick: handleClick,


           

		};

	// 	var keepTooltipOpenPlugin = {

	// 	  beforeRender: function(chart) {
            
    //   	// We are looking for bubble which owns "keepTooltipOpen" parameter.
    //         var datasets = chart.data.datasets;
	// 	    chart.pluginTooltips = [];
    //     var abscissaToShow = chart.data.keepShowing;
    //     abscissaToShow.forEach(function(element) {
    //       var activeArray = [];
    //       for (i = 0; i < datasets.length; i++) {
    //       	if(!chart.getDatasetMeta(i).hidden)
	// 	      		activeArray.push(chart.getDatasetMeta(i).data[element])
    //       }
    //       chart.pluginTooltips.push(new Chart.Tooltip({
	// 	            _chart: chart.chart,
	// 	            _chartInstance: chart,
	// 	            _data: chart.data,
	// 	            _options: chart.options.tooltips,
	// 	            _active: activeArray
	// 	          }, chart));
    //     });
    //     console.log(chart.pluginTooltips)
	// 	  }, // end beforeRender
      
	// 	  afterDatasetsDraw: function(chart, easing) {

	// 	      // Draw tooltips
	// 	      Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
	// 	        tooltip.initialize();
	// 	        tooltip.update();
	// 	        tooltip.pivot();
	// 	        tooltip.transition(easing).draw();
	// 	      });


	// 	    } // end afterDatasetsDraw
	// 	}

	// Chart.pluginService.register(keepTooltipOpenPlugin);
    
    myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
		});

		function handleClick(evt) {
          var activeElement = myLineChart.getElementAtEvent(evt);
          console.log(activeElement)
		  if(activeElement.length>0){
        var keepShowing = myLineChart.data.keepShowing; 
        if(keepShowing.includes(activeElement[0]._index)){
          var index = keepShowing.indexOf(activeElement[0]._index);
					keepShowing.splice(index, 1);
        }else{
          keepShowing.push(activeElement[0]._index);
        }
      }
		};
}







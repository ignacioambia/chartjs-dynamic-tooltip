

//https://www.chartjs.org/docs/latest/configuration/tooltip.html#external-custom-tooltips
var hola
var myLineChart



function callUser(name){
    console.log('Calling user ' + name)
}




window.onload = function(){
    hola = 'hola a todos'

    // var cta = document.getElementById('chart').getContext('2d')
    // var chart = new Chart(cta,{
    //     type : 'line',
    //     data : {
    //         labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //         datasets : [
    //             {
    //                 label : 'My first dataset',
    //                 data : [0, 10, 5, 2, 20, 30, 45]
    //             }
                
    //         ]
            
    //     },

    //     options : {
    //         tooltips: {
    //             enabled : false,
    //             custom : function(tooltipModel){
    //                 var tooltipEl = document.getElementById('custom-tooltip')
                   
    //                 if(!tooltipEl){
    //                     tooltipEl =  document.createElement('div')
    //                     tooltipEl.id = 'custom-tooltip'
                        
    //                     tooltipEl.innerHTML = '<table></table>'

    //                     document.body.appendChild(tooltipEl)
    //                 }


    //                 if(tooltipModel.opacity === 0){
    //                     tooltipEl.style.opacity = 0;
    //                     return;
    //                 }

    //                 tooltipEl.classList.remove('above','below','no-transform',)

    //                 if(tooltipModel.yAlign){
    //                     tooltipEl.classList.add(tooltipModel.yAlign)
    //                 }else{
    //                     tooltipEl.classList.add('no-tranform')
    //                 }


    //                 function getBody(bodyItem){
    //                     return bodyItem.lines
    //                 }

    //                 if(tooltipModel.body){
    //                     var titleLines = tooltipModel.title || []
    //                     var bodyLines = tooltipModel.body.map(getBody)

    //                     var innerHTML = '<thead>'

    //                     titleLines.forEach(function(title){
    //                         innerHTML +=  '<tr><th>' +  title + '</th></tr>'
    //                     })

    //                     innerHTML += '</thead><tdboy>'

    //                     bodyLines.forEach(function(body,i){
    //                         var colors = tooltipModel.labelColors[i]
    //                         var style = `
    //                             background : ${colors.backgroundColor};
    //                             border-color : ${colors.borderColor};
    //                             border-width : 2px;
    //                         `

    //                         var span = '<span style="'+style+'"></span>'
    //                         innerHTML += '<tr><td>' + span + body + '</td></tr>'

    //                     })

    //                     innerHTML += '</tbody>'

    //                     innerHTML += '<button>button inside tooltip</button>'

    //                     var tableRoot = tooltipEl.querySelector('table')
    //                     tableRoot.innerHTML = innerHTML

    //                 }

    //                 var position = this._chart.canvas.getBoundingClientRect()

    //                 tooltipEl.classList.add('custom-tooltip')

    //                 tooltipEl.style.opacity = 1
    //                 tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px'
    //                 tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px'
    //                 // tooltipEl.style.pointerEvents = 'none'



    //             }
    //         }
    //     }
    
    // })

    var ctx = document.getElementById("canvas").getContext("2d");

        var data = 
        {
        labels: ["0","1","2"],
        keepShowing: [],
        datasets: 
        [
            {
                label: "set1",
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

                  customTooltip.style.opacity = 1
                })


            // setTimeout(function(){

            // },300)
           

            let values  = ''

            let mybutton = document.createElement('button')
            mybutton.innerHTML = 'New button'
            mybutton.onclick = ()=>{
                callUser(myLineChart.data.datasets[0].data[tooltipModel.dataPoints[0].index].user)
            }

            tooltipModel.body.forEach(obj=>{
                values += '<div>' +obj.lines[0]+ '</div>'
            })

            // console.log(tooltipModel)

            customTooltip.innerHTML = `
                <div>
                    <div>
                        <span class="font-weight-bold">${tooltipModel.title}</span>
                    </div>

                    <div>
                    `+values+`
                    </div>

                    <div style="text-align:center;" >
                        
                    </div>
                </div>
            `

            customTooltip.append(mybutton)


            var position = this._chart.canvas.getBoundingClientRect()

            customTooltip.style.opacity = 1
            customTooltip.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px'
            customTooltip.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px'
          },
          mode: 'label',
        //   callbacks: {
        //       label: function(tooltipItems, data) {
        //           if(tooltipItems.datasetIndex == 0)
        //                return "Marge globale" +': ' + tooltipItems.yLabel;
        //            else
        //                return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel;
        //                 }
        //             }
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







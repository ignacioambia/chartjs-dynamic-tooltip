//https://www.chartjs.org/docs/latest/configuration/tooltip.html#external-custom-tooltips

window.onload = function(){

    var ctx = document.getElementById('chart').getContext('2d')
    var chart = new Chart(ctx,{
        type : 'line',
        data : {
            labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets : [
                {
                    label : 'My first dataset',
                    data : [0, 10, 5, 2, 20, 30, 45]
                }
                
            ]
            
        },

        options : {
            tooltips: {
                enabled : false,
                custom : function(tooltipModel){
                    var tooltipEl = document.getElementById('custom-tooltip')
                   
                    if(!tooltipEl){
                        tooltipEl =  document.createElement('div')
                        tooltipEl.id = 'custom-tooltip'
                        tooltipEl.innerHTML = '<table></table>'

                        document.body.appendChild(tooltipEl)
                    }


                    if(tooltipModel.opacity === 0){
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    tooltipEl.classList.remove('above','below','no-transform')

                    if(tooltipModel.yAlign){
                        tooltipEl.classList.add(tooltipModel.yAlign)
                    }else{
                        tooltipEl.classList.add('no-tranform')
                    }


                    function getBody(bodyItem){
                        return bodyItem.lines
                    }

                    if(tooltipModel.body){
                        var titleLines = tooltipModel.title || []
                        var bodyLines = tooltipModel.body.map(getBody)

                        var innerHTML = '<thead>'

                        titleLines.forEach(function(title){
                            innerHTML +=  '<tr><th>' +  title + '</th></tr>'
                        })

                        innerHTML += '</thead><tdboy>'

                        bodyLines.forEach(function(body,i){
                            var colors = tooltipModel.labelColors[i]
                            var style = `
                                background : ${colors.backgroundColor};
                                border-color : ${colors.borderColor};
                                border-width : 2px;
                            `

                            var span = '<span style="'+style+'"></span>'
                            innerHTML += '<tr><td>' + span + body + '</td></tr>'

                        })

                        innerHTML += '</tbody>'

                        var tableRoot = tooltipEl.querySelector('table')
                        tableRoot.innerHTML = innerHTML

                    }

                    var position = this._chart.canvas.getBoundingClientRect()

                    tooltipEl.style.opacity = 1
                    tooltipEl.style.position = 'absolute'
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px'
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px'
                    tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily
                    tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px'
                    tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle
                    tooltipEl.style.padding = tooltipModel.yPadding + 'px' + tooltipModel.xPadding + 'px'
                    tooltipEl.style.pointerEvents = 'none'

                    tooltipEl.style.backgroundColor = 'black'
                    tooltipEl.style.color = 'white'

                }
            }
        }
    
    })
}

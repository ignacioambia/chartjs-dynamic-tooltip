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

                    console.log(tooltipEl)
                   
                    if(!tooltipEl){
                        tooltipEl =  document.createElement('div')
                        tooltipEl.id = 'custom-tooltip'

                        document.body.appendChild(tooltipEl)
                    }


                    if(tooltipModel.opacity === 0){
                        tooltipEl.style.opacity = 0;
                        return;
                    }
                }
            }
        }
    
    })
}

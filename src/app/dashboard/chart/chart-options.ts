
export class ChartOptions{

    public assetOptions:Object = {

        title: {text: ''},
        chart: {zoomType: 'x', type: 'pie', height: 250,width:500,
            options3d: {
                enabled: false,
                alpha: 45,
                beta: 0
            }
        },
        exporting: {
            enabled: true,
            buttons:{
                contextButton:{
                    align:'left'
                }
            }
        },
        credits: {enabled: false},
        colors:["#74E1E1","#90ED7D","#f7a35c"],
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    formatter:function () {
                        let name = this.point.name;
                        let perc = this.point.percentage.toFixed(1);
                        if(name.length>20)
                            name = name.substr(0,19)+"...";
                        return name+':'+ perc+'%';

                    },
                    distance:20
                },
                depth:10
            }
        },
        tooltip: {
            headerFormat: null,
            useHTML: true,
            pointFormat: '<span style="color:{point.color};text-transform: capitalize">{point.name}</span>: &#8377; <b>{point.y:,.0f}</b><br/>'
        },
        series :[{
            name: '',
            colorByPoint: true,
            allowPointSelect: true,
            data:[]
        }]
    };
    public assetBreakupOptions:Object = {
        title: {text: ''},
        chart: {zoomType: 'x', type: 'pie', height: 250, width: 500},
        exporting: {
            enabled: true,
            buttons:{
                contextButton:{
                    align:'left'
                }
            }
        },
        credits: {enabled: false},
        colors:["#FF4C4C","#023F5B","#6ACBAE", "#00BED5","#9AC872", "#63D8DD","#FD2F58","#F9A640",
            "#653F6C","#33A47E","#0A8BAA", "#EB6586", "#849F62"],
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    formatter:function () {
                        let name = this.point.name;
                        let perc = this.point.percentage.toFixed(1);
                        if(name.length>20)
                            name = name.substr(0,19)+"...";
                        return name+':'+ perc+'%';

                    },
                    distance:10
                },
                depth:5
            }
        },
        tooltip: {
            headerFormat: null,
            useHTML: true,
            pointFormat: '<span style="color:{point.color}; text-transform: capitalize">{point.name}</span><br/><span class="txt-10" style="color:{point.color};font-style: italic;">Plan-{point.plan}, Option-{point.growth}</span><br/> &#8377; <b>{point.y:,.0f} <br/>({point.percentage:.1f}%)</b><br/>'
        },
        series :[{
            name: '',
            colorByPoint: true,
            allowPointSelect: true,
            data:[]
        }]
    };



}
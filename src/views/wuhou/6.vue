<template>
    <div class="container">
        <IEcharts :option="bar" ref="pie" style="width: 100%;height:327px"></IEcharts>
    </div>
</template>

<script>
    import http from '@/common/fetch.js'
    import IEcharts from "vue-echarts-v3/src/full.js";
    import ElCol from "element-ui/packages/col/src/col";
    import ElRow from "element-ui/packages/row/src/row";
    export default {
        data() {
            return {
                bar :{
                    grid: {
                        top:15,
                        bottom:15,
                        containLabel: true
                    },
                    yAxis: [{
                        type: 'category',
                        data: [ "校务管理和制度执行情况", "招生、收费、择校情况", "课程开设和课堂教学情况", "学生学习、体育锻炼和课业负担情况", "教师师德和专业发展情况", "校园及周边安全情况，学生交通安全情况", "食堂、食品、饮水及宿舍卫生情况", "校风、教风、学风建设情况"],
                        inverse: true,
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 13,
                                color: '#D6D6D6'
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        max:'327'
                    }],
                    xAxis: [{
                        type: 'value',
                        axisLabel: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                        type: 'bar',
                        barWidth: 9,
                        data: [22,33,24,55,63,32,31,31],
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                offset: [10, -14],
                                color: '#38DBC4',
                                fontSize: 16,
                                fontFamily:'DS-DIGIB'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color:'#28FFC0',

                                barBorderRadius: 5,
                                shadowColor: 'rgba(40, 255, 192, 0.5)',
                                shadowBlur: 10
                            }
                        }
                    }, {
                        type: "bar",
                        barWidth: 9,
                        xAxisIndex: 0,
                        barGap: "-100%",
                        data: [71,71,71,71,71,71,71,71],
                        itemStyle: {
                            normal: {
                                color: '#838383',
                                barBorderRadius: 5,
                                opacity:0.4
                            }
                        },
                        zlevel: -1
                    }]
                },

            }
        },
        components: {
            ElRow,
            ElCol,
            IEcharts
        },
        mounted() {
            let params={}
            let data={}
            let pathParams={}
            let url=this.$route.query.url
            let method=this.$route.query.method
            let urlParams=this.$route.query.urlParams
            let getParams=this.$route.query.getParams
            let postParams=this.$route.query.postParams
            if(urlParams){
                let temp=''
                urlParams.split(",").forEach(item=>{
                    pathParams[item]=this.$route.query[item]
                    temp+='\/:'+item
                })
                url+=temp
            }
            if(getParams){
                getParams.split(",").forEach(item=>{
                    params[item]=this.$route.query[item]
                })
            }
            if(postParams){
                postParams.split(",").forEach(item=>{
                    data[item]=this.$route.query[item]
                })
            }

            if( url && method ){
               // this._fetchData(url,method,data,params,pathParams);
            }
        },
        methods:{
            _fetchData : function(url,method,data,params,pathParams) {
                http({
                    url: url,
                    method: method,
                    data,
                    params,
                    pathParams
                }).then((res)=>{
                    let total=0
                    let name=[]
                    let num=[]
                    let max=[]
                    res.data.result.forEach((item,index)=>{
                        total+=item.num
                        name.push(item.cmName)
                        num.push(item.num)
                    })
                    res.data.result.forEach((item,index)=>{
                        max.push(total)
                    })
                    this.bar.yAxis[0].data= name
                    this.bar.series[0].data=num
                    this.bar.series[1].data=max
                    console.log(this.bar.yAxis[0].data)
                    //console.log( this.bar.series[0].data)
                    //  console.log(this.bar.series[1].data)
                })
            },
        }
    };
</script>
<style lang="less" scoped>
.container{
    width: 100%;
    box-sizing: border-box;
}

</style>

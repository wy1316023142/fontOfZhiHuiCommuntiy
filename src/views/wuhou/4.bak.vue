<template>
    <div class="container">
        <el-row>
            <el-col :span="6" >
                <IEcharts :option="option0" ref="pie0" style="width: 100%;height:100px"></IEcharts>
            </el-col>
            <el-col :span="6">
                <IEcharts :option="option1" ref="pie1" style="width: 100%;height:100px"></IEcharts>
            </el-col>
            <el-col :span="6" >
                <IEcharts :option="option2" ref="pie2" style="width: 100%;height:100px"></IEcharts>
            </el-col>
            <el-col :span="6">
                <IEcharts :option="option3" ref="pie3" style="width: 100%;height:100px"></IEcharts>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import http from '@/common/fetch.js'
    import IEcharts from "vue-echarts-v3/src/full.js";
    import ElCol from "element-ui/packages/col/src/col";
    import ElRow from "element-ui/packages/row/src/row";
    export default {
        data() {
            return{
                option0 :{
                    title:{
                        text:'',
                        top: 'bottom',
                        left:'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: '14',
                            color: '#ffffff',
                        },
                    },
                    series: [
                        {
                            type:'pie',
                            radius: [24, 30],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            clockWise: false,
                            hoverAnimation: false,
                            center: ['50%', '40%'],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle:  {
                                normal: {
                                    color: '#60727D',
                                    shadowBlur: 0,
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                }
                            },
                            data:[{
                                value:0,
                                label: {
                                    normal: {
                                        formatter: function(params){
                                            return params.value+'人'
                                        },
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '12',
                                            color: '#ffffff',
                                        }
                                    }
                                }
                            },{
                                value: 0,
                                name: 'invisible',
                                itemStyle: {
                                    normal: {
                                        color: '#28FFC0'
                                    },
                                    emphasis: {
                                        color: '#28FFC0'
                                    }
                                }
                            }

                            ]
                        }
                    ]
                },
                option1 :{
                    title:{
                        text:'',
                        top: 'bottom',
                        left:'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: '14',
                            color: '#ffffff',
                        },
                    },
                    series: [
                        {
                            type:'pie',
                            radius: [24, 30],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            clockWise: false,
                            hoverAnimation: false,
                            center: ['50%', '40%'],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle:  {
                                normal: {
                                    color: '#60727D',
                                    shadowBlur: 0,
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                }
                            },
                            data:[{
                                value:0,
                                label: {
                                    normal: {
                                        formatter: function(params){
                                            return params.value+'人'
                                        },
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '12',
                                            color: '#ffffff',
                                        }
                                    }
                                }
                            },{
                                value: 0,
                                name: 'invisible',
                                itemStyle: {
                                    normal: {
                                        color: '#3E9BF1'
                                    },
                                    emphasis: {
                                        color: '#3E9BF1'
                                    }
                                }
                            }

                            ]
                        }
                    ]
                },
                option2 :{
                    title:{
                        text:'',
                        top: 'bottom',
                        left:'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: '14',
                            color: '#ffffff',
                        },
                    },
                    series: [
                        {
                            type:'pie',
                            radius: [24, 30],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            clockWise: false,
                            hoverAnimation: false,
                            center: ['50%', '40%'],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle:  {
                                normal: {
                                    color: '#60727D',
                                    shadowBlur: 0,
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                }
                            },
                            data:[{
                                value:0,
                                label: {
                                    normal: {
                                        formatter: function(params){
                                            return params.value+'人'
                                        },
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '12',
                                            color: '#ffffff',
                                        }
                                    }
                                }
                            },{
                                value: 0,
                                name: 'invisible',
                                itemStyle: {
                                    normal: {
                                        color: '#FBD135'
                                    },
                                    emphasis: {
                                        color: '#FBD135'
                                    }
                                }
                            }

                            ]
                        }
                    ]
                },
                option3 :{
                    title:{
                        text:'',
                        top: 'bottom',
                        left:'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: '14',
                            color: '#ffffff',
                        },
                    },
                    series: [
                        {
                            type:'pie',
                            radius: [24, 30],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            clockWise: false,
                            hoverAnimation: false,
                            center: ['50%', '40%'],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle:  {
                                normal: {
                                    color: '#60727D',
                                    shadowBlur: 0,
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                }
                            },
                            data:[{
                                value:20,
                                label: {
                                    normal: {
                                        formatter: function(params){
                                            return params.value+'人'
                                        },
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '12',
                                            color: '#ffffff',
                                        }
                                    }
                                }
                            },{
                                value: 100,
                                name: 'invisible',
                                itemStyle: {
                                    normal: {
                                        color: '#9868E4'
                                    },
                                    emphasis: {
                                        color: '#9868E4'
                                    }
                                }
                            }

                            ]
                        }
                    ]
                },
                data:[]
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
                this._fetchData(url,method,data,params,pathParams);
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
                    res.data.forEach((item,index)=>{
                        total+=item.total
                    })
                    res.data.forEach((item,index)=>{
                        this['option'+index].title.text=item.name
                        this['option'+index].series[0].data[0].value=total
                        this['option'+index].series[0].data[1].value=item.total
                    })
                })
            },
        }
    };
</script>
<style lang="less" scoped>
.container{
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
}

</style>

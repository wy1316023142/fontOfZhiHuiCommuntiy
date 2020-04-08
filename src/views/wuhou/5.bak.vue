<template>
    <div class="container">
        <el-row>
            <el-col :span="12">
                <IEcharts :option="pie" ref="pie" style="width: 100%;height:258px" @click="handleClick"></IEcharts>
            </el-col>
            <el-col :span="12">
                <ul>
                    <li class="flex title" >
                        <span class="flexItem">年级</span>
                        <span class="flexItem">人数</span>
                    </li>
                    <li class="flex" v-for="item in data">
                        <span class="flexItem">{{item.gradeName}}</span>
                        <span class="flexItem num">{{item.num}}</span>
                    </li>

                </ul>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    import Api from '@/common/api.js'
    import http from '@/common/fetch.js'
    import IEcharts from "vue-echarts-v3/src/full.js";
    import ElCol from "element-ui/packages/col/src/col";
    import ElRow from "element-ui/packages/row/src/row";
    export default {
        data() {
            return {
                pie :{
                    legend: {
                        bottom: 10,
                        left: 'center',
                        data:[],
                        textStyle: {
                            fontSize: '12',
                            color: '#ffffff',
                        },
                    },
                    series: [
                        {
                            type:'pie',
                            radius: [56, 66],
                            label: {
                                normal: {
                                    formatter: function(params){
                                        return params.value+'%'
                                    },
                                }
                            },
                            clockWise: false,
                            hoverAnimation: false,
                            center: ['50%', '45%'],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            color: ['#4DCB73','#F39700','#CE5A60'],
                            data:[]
                        }
                    ]
                },
                data:[],
                total:0,
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
            handleClick:function (event, instance, echarts) {
                console.log(event.data.code)
                this._fetchNum(event.data.code)
            },
            _fetchNum :  function(id='02') {
                Api.wuhouGetStuGradeDistri.get({}, {
                    pathParams: {
                        id: id
                    }
                }).then(res => {
                    this.data=res.data.result
                })
            },
            _fetchData : function(url,method,data,params,pathParams) {
                http({
                    url: url,
                    method: method,
                    data,
                    params,
                    pathParams
                }).then((res)=>{
                    let data=[]
                    let name=[]
                    let total=0
                    res.data.result.forEach((item,i)=>{total+=item.num})
                    res.data.result.forEach((item,i)=>{
                        data.push({
                            value:((item.num/total)*100).toFixed(0),
                            name:item.codedesc,
                            code:item.code
                        })
                        name.push(item.codedesc)
                    })
                    this.data=res.data.result
                    this.pie.legend.data=name
                    this.pie.series[0].data=data
                    this._fetchNum()
                })
            },
        }
    };
</script>
<style lang="less" scoped>
    .container{
        width: 100%;
        padding: 0 40px;
        box-sizing: border-box;
        ul {
            margin-top: 25px;
            li{
                list-style: none;
                color: #EEEEEE;
                height: 26px;
                line-height: 26px;
                font-size: 12px;
                text-align: center;
                background: #1D223C;
                margin-top :4px;
                &.title{
                    background: #151B2D;
                    color: #FAFAFA;
                    font-size: 14px;
                }
            }
        }
    }

</style>

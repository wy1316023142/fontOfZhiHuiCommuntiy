<template>
    <div class="container">
        <el-row>
            <el-col :span="12">
                <IEcharts :option="pie" ref="pie" style="width: 100%;height:180px"></IEcharts>
            </el-col>
            <el-col :span="12">
                <ul>
                    <li  v-for="item in data">
                        <el-row>
                            <el-col :span="12">
                                <span class="circle" :style="{backgroundColor:item.color}"> </span>{{item.name}}
                            </el-col>
                            <el-col :span="6">{{item.percentage}}</el-col>
                            <el-col :span="6">{{item.value}}所</el-col>
                        </el-row>

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
                    title: {
                        text: '学校总数',
                        subtext: '232',
                        top:'42%',
                        left :'center',
                        textVerticalAlign:'middle',
                        textStyle: {
                            fontSize:14,
                            fontWeight:'normal',
                            color: ['#FCFCFC'],
                            fontFamily: "PingFang SC"
                        },
                        subtextStyle: {
                            color: '#28FFC0',
                            fontSize: 30,
                            fontFamily:'DS-DIGIB'
                        },
                    },
                    series: [
                        {
                            type:'pie',
                            radius: [61, 78],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            clockWise: false,
                            hoverAnimation: false,
                            center: ['50%', '50%'],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            color: ['#3AA0FF','#975FE4','#F2637B','#FAD337','#4DCB73','#36CBCB'],
                            data:[
                                {value:1, name:'特殊教育'},
                                {value:4, name:'中职'},
                                {value:5, name:'高中'},
                                {value:23, name:'初中'},
                                {value:41, name:'小学'},
                                {value:160, name:'幼儿园'},
                            ]
                        }
                    ]
                },
                color: ['#3AA0FF','#975FE4','#F2637B','#FAD337','#4DCB73','#36CBCB'],
                data:[
                    {color:'#36CBCB',value:160, name:'幼儿园' ,percentage:"68%"},
                    {color:'#4DCB73',value:41, name:'小学',percentage:"41%"},
                    {color:'#FAD337',value:23, name:'初中',percentage:"23%"},
                    {color:'#F2637B',value:5, name:'高中',percentage:"5%"},
                    {color:'#975FE4',value:4, name:'中职',percentage:"4%"},
                    {color:'#3AA0FF',value:1, name:'特殊教育',percentage:"1%"},
                ],
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
                //this._fetchData(url,method,data,params,pathParams);
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
                    let data=[]
                    this.total=0
                    res.data.result.forEach((item,i)=>{this.total+=item.total})
                    res.data.result.forEach((item,i)=>{
                        res.data.result[i].Proportion =((item.total/this.total)*100).toFixed(0)+"%"
                        res.data.result[i].color=this.color[i]
                        data.push({
                            name:item.name,
                            value:item.total,
                        })
                    })
                    this.data=res.data.result
                    this.pie.title.subtext=this.total
                    this.pie.series[0].data=data
                    data=null
                })
            },
        }
    };
</script>
<style lang="less" scoped>
    .container{
        width: 100%;
        box-sizing: border-box;
        ul{
            li{
                font-size: 12px;
                color: #EEEEEE;
                margin-top: 12px;
                list-style: none;
                .circle{
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: 9px;
                }
            }
        }
    }

</style>

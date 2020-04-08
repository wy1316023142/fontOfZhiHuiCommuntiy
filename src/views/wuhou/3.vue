<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="12" >
                <IEcharts :option="option" ref="radar" style="width: 100%;height: 327px;"></IEcharts>
            </el-col>
            <el-col  :span="12">
                <ul>
                    <li class="flex title" >
                        <span class="flexItem">学科</span>
                        <span class="flexItem">人数</span>
                    </li>
                    <li class="flex" v-for="item in data">
                        <span class="flexItem">{{item.name}}</span>
                        <span class="flexItem num">{{item.total}}</span>
                    </li>
                </ul>
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
            return {
                option:{
                    radar: {
                        name: {
                            textStyle: {
                                color: '#D6D6D6',
                                fontSize: 14
                            }
                        },
                        indicator: [

                        ],
                        radius: 80,
                    },
                    series: [{
                        type: 'radar',
                        itemStyle: {
                            color:'#16B791'
                        },
                        areaStyle: {
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 0, color: '#070F1D' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#16B791' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            },
                        },
                        data : [

                        ]
                    }]
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
           /* let params={}
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
            }*/
            this.data=[
                {
                    "name": "语文",
                    "total": 3248
                },
                {
                    "name": "数学",
                    "total": 1938
                },
                {
                    "name": "英语",
                    "total": 1093
                },
                {
                    "name": "物理",
                    "total": 286
                },
                {
                    "name": "化学",
                    "total": 198
                },
                {
                    "name": "政治",
                    "total": 190
                },
                {
                    "name": "生物",
                    "total": 155
                },
                {
                    "name": "历史",
                    "total": 153
                }
            ]
            let total=0
            let data=[]
            let indicator=[]
            this.data.forEach(item=>{
                total= (item.total>total)?item.total:total
                indicator.push({
                    name:item.name,
                    max:0
                })
                data.push(item.total)
            })
            indicator.forEach(item=>{
                item.max=total
            })
            this.option.radar.indicator=indicator
            this.option.series[0].data[0]={value:data}


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


                })
            },
        }
    };
</script>
<style lang="less" scoped>
.container{
    width: 100%;
    height: 327px;
    padding: 0 40px;
    box-sizing: border-box;
    ul li{
        list-style: none;
        color: #EEEEEE;
        height: 30px;
        line-height: 30px;
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

</style>

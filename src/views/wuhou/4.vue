<template>
    <div class="container">
        <el-row>
            <el-col :span="12">
                <ul>
                    <li  v-for="(item,index) in data" @click="handleClick(index)" :class="{active:select==index}">
                        <el-row>
                            <el-col :offset="2" :span="16"><span class="label">{{item.label}}</span></el-col>
                            <el-col :span="6"> <span class="">{{item.value}}</span></el-col>
                        </el-row>
                    </li>
                </ul>
            </el-col>
            <el-col :span="11" :offset="1">
                <IEcharts :option="pie" ref="pie" style="width: 100%;height:200px"></IEcharts>
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
                select:0,
                pie :{
                    legend: {
                        bottom: 10,
                        left: 'center',
                        data:['1年级','2年级','3年级','4年级','5年级','6年级'],
                        textStyle: {
                            fontSize: '10',
                            color: '#ffffff',
                        },
                    },
                    series: [
                        {
                            type:'pie',
                            radius: 50,
                            label: {
                                normal: {
                                    formatter: function(params){
                                        return params.value
                                    },
                                }
                            },
                            clockWise: false,
                            hoverAnimation: false,
                            center: ['50%', '38%'],
                            label:{
                                position:'outside'
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            color: ['#3AA0FF','#975FE4','#F2637B','#FAD337','#4DCB73','#36CBCB'],
                            data:[
                                {value:1234, name:'1年级'},
                                {value:1313, name:'2年级'},
                                {value:1125, name:'3年级'},
                                {value:1456, name:'4年级'},
                                {value:1211, name:'5年级'},
                                {value:1512, name:'6年级'}
                            ]
                        }
                    ]
                },
                data:[
                    {label:'小学入学及在校学生',value:'66222'},
                    {label:'初中入学及在校学生',value:'23753'},
                    {label:'高中入学及在校学生',value:'5778'},
                    {label:'特殊教育学生数',value:'291'},
                    {label:'外国籍在校学生',value:'15786'},
                ],
                total:0,
                data1:{
                    name:['1年级','2年级','3年级','4年级','5年级','6年级'],
                    data:[
                        {value:10575, name:'1年级'},
                        {value:10575, name:'2年级'},
                        {value:10789, name:'3年级'},
                        {value:10864, name:'4年级'},
                        {value:11340, name:'5年级'},
                        {value:11241, name:'6年级'}
                    ]
                },
                data2:{
                    name:['1年级','2年级','3年级'],
                    data:[
                        {value:8295, name:'1年级'},
                        {value:8005, name:'2年级'},
                        {value:7453, name:'3年级'}
                    ]
                },
                data3:{
                    name:['1年级','2年级','3年级'],
                    data:[
                        {value:1936, name:'1年级'},
                        {value:1919, name:'2年级'},
                        {value:1923, name:'3年级'}
                    ]
                },
                data4:{
                    name:['小学','初中'],
                    data:[
                        {value:231, name:'小学'},
                        {value:40, name:'初中'}
                    ]
                },
                data5:{
                    name:['小学','初中'],
                    data:[
                        {value:1434, name:'小学'},
                        {value:1313, name:'初中'}
                    ]
                },
            }
        },
        components: {
            ElRow,
            ElCol,
            IEcharts,
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

                })
            },
            handleClick: function (index) {
                this.select = index
                switch (index){
                    case 0:
                        this.pie.legend.data=this.data1.name
                        this.pie.series[0].data=this.data1.data
                        break;
                    case 1:
                        this.pie.legend.data=this.data2.name
                        this.pie.series[0].data=this.data2.data
                        break;
                    case 2:
                        this.pie.legend.data=this.data3.name
                        this.pie.series[0].data=this.data3.data
                        break;
                    case 3:
                        this.pie.legend.data=this.data4.name
                        this.pie.series[0].data=this.data4.data
                        break;
                    case 4:
                        this.pie.legend.data=this.data5.name
                        this.pie.series[0].data=this.data5.data
                        break;
                }




            }
        }
    };
</script>
<style lang="less" scoped>
    .container{
        width: 100%;
        padding: 0 10px 0 40px;
        box-sizing: border-box;
        ul {
            margin-top: 15px;
            li{
                &.active{
                    background: #42bcff;
                }
                list-style: none;
                color: #EEEEEE;
                height: 26px;
                line-height: 26px;
                font-size: 12px;
                background: #1D223C;
                margin-bottom :7px;
                cursor: pointer;
                font-family: "DS-DIGIB";
                .label{
                    text-align: left;
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                }
            }
        }
    }

</style>

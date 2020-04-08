<template>
    <div class="container">
        <el-row style="width: 100%">
            <el-col :span="8" v-for="item in data" style="margin-bottom: 20px;">
                <div class="num">{{item.total}}</div>
                <div class="des">{{item.name}}</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echarts from "echarts";
    import http from '@/common/fetch.js'
    import ElCol from "element-ui/packages/col/src/col";
    export default {
        components: {ElCol},
        data() {
            return {
                data:[
                    {name: "公办学校总数", total: 96},
                    {name: "公办学生总数", total: 87449},
                    {name: "公办教师总数", total: 6038},
                  /*  {name: "公办幼儿园总数", total: 42},*/
                    {name: "民办学校总数", total: 138},
                    {name: "民办学生总数", total: 59104},
                    {name: "民办教师总数", total: 4072},
                /*    {name: "民办幼儿园总数", total: 118},*/
                ]
            }
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
                    let data=res.data.result;
                    data=data.concat(data)
                    console.log(data)
                    this.data=data
                })
            },
        }
    };
</script>
<style lang="less" scoped>
    .container{
        box-sizing: border-box;
        width: 100%;
        height: 100px;
        padding:25px 20px 0;
        font-family: "PingFang SC",sans-serif;
        .num{
            font-family: "DS-DIGIB";
            font-size: 36px;
            color: #28FFC0;
            text-align: center;
        }
        .des{
            font-size: 14px;
            color: #FCFCFC;
            text-align: center;
        }
    }
</style>

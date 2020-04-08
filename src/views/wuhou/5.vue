<template>
    <div class="container">
        <div class="flex title">
            <div class="flexItem">序号</div>
            <div class="flexItem" style="flex-basis: 20%">学校名称</div>
            <div class="flexItem">学校人数</div>
            <div class="flexItem">教职工人数</div>
        </div>
        <vue-seamless-scroll :data="data" :class-option="option" class="table-content">
            <ul >
                <li class="flex" v-for="(item,index) in data">
                    <div class="flexItem ">
                        <span class="num"> {{index+1}}</span>
                    </div>
                    <div class="flexItem" style="flex-basis: 20%">{{item.name}}</div>
                    <div class="flexItem">{{item.schoolNum}}</div>
                    <div class="flexItem">{{item.staffNum}}</div>
                </li>

            </ul>
        </vue-seamless-scroll>

    </div>
</template>

<script>
    import Api from '@/common/api.js'
    import http from '@/common/fetch.js'
    import IEcharts from "vue-echarts-v3/src/full.js";
    import ElCol from "element-ui/packages/col/src/col";
    import ElRow from "element-ui/packages/row/src/row";
    import vueSeamlessScroll from 'vue-seamless-scroll'
    export default {
        data() {
            return {
                data:[
                    {name:'成都市棕北中学校',schoolNum:2444,staffNum:198},
                    {name:'成都市武侯实验中学',schoolNum:2239,staffNum:214},
                    {name:'四川大学附属中学西区学校',schoolNum:1548,staffNum:143},
                    {name:'成都西川中学',schoolNum:1542,staffNum:104},
                    {name:'四川省成都市第十二中学',schoolNum:1468,staffNum:87},
                    {name:'成都市西北中学外国语学校',schoolNum:1298,staffNum:106},
                    {name:'成都市棕北中学西区实验学校',schoolNum:1135,staffNum:95},
                    {name:'成都石室双楠实验学校',schoolNum:1116,staffNum:95},
                    {name:'成都石室双楠实验学校',schoolNum:1116,staffNum:95},
                    {name:'成都市金花中学',schoolNum:1017,staffNum:87},
                    {name:'成都市第四十三中学校',schoolNum:978,staffNum:74},
                    {name:'成都石室锦城外国语学校',schoolNum:945,staffNum:71},
                    {name:'四川省成都市武侯高级中学',schoolNum:934,staffNum:78},
                    {name:'成都武侯外国语学校',schoolNum:758,staffNum:71},
                    {name:'成都石室佳兴外国语学校',schoolNum:648,staffNum:53},
                    {name:'成都市武侯区西蜀实验学校',schoolNum:643,staffNum:52},
                    {name:'成都市春晖学校',schoolNum:616,staffNum:40},
                    {name:'成都市武侯区光明实验学校',schoolNum:583,staffNum:43},
                    {name:'成都市启明学校',schoolNum:540,staffNum:28},
                    {name:'成都市第57实验学校',schoolNum:467,staffNum:31},
                    {name:'成都市武侯区育仁实验学校',schoolNum:397,staffNum:30},
                    {name:'北京第二外国语学院成都附属中学',schoolNum:345,staffNum:27},
                    {name:'四川大学附属中学新城分校',schoolNum:332,staffNum:27},
                    {name:'成都市武侯区西川实验学校',schoolNum:291,staffNum:30},
                    {name:'成都市金花实验学校',schoolNum:281,staffNum:16},
                    {name:'成都市金花光明学校',schoolNum:268,staffNum:19},
                    {name:'成都市武侯区星光学校',schoolNum:233,staffNum:15},
                    {name:'成都市凉井实验学校',schoolNum:221,staffNum:20},
                    {name:'成都市武侯区金辉实验学校',schoolNum:113,staffNum:16},
                    {name:'四川省运动技术学院附属学校',schoolNum:35,staffNum:5},
                ],
            }
        },
        components: {
            ElRow,
            ElCol,
            IEcharts,
            vueSeamlessScroll
        },
        computed:{
            option () {
                return {
                    step: 0.5, //步长 越大滚动速度越快
                }
            }
        },
        mounted() {
            this.scroll()
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
                    this.data=res.data.result
                })
            },
            scroll() {
                setTimeout(() => {
                    this.data.push(this.data[0]);
                    this.data.shift();
                }, 500)
            }
        }
    };
</script>
<style lang="less" scoped>
    .container{
        width: 100%;
        padding: 0 40px 0 40px;
        box-sizing: border-box;

        .title{
            background: #151B2D;
            color: #FAFAFA;
            font-size: 14px;
            margin-top: 15px;
            height: 30px;
            line-height: 30px;
            text-align: center;
        }
        .table-content {
            height: 170px;
            overflow: hidden;
            ul {
                &::-webkit-scrollbar { /*滚动条整体样式*/
                    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/

                }
                &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                    background: #28ffc0;
                }
                &::-webkit-scrollbar-track { /*滚动条里面轨道*/
                    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                    background: #1b4d87;
                }
                li{
                    list-style: none;
                    color: #EEEEEE;
                    height: 30px;
                    line-height: 30px;
                    font-size: 12px;
                    text-align: center;
                    background: #1D223C;
                    margin-top :4px;
                    font-family: "DS-DIGIB";
                    .num{
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        line-height: 14px;
                        background: #42bcff;
                        border-radius: 2px;
                    }
                }
            }
        }

    }

</style>

<template>
    <div class="container">
        <div class="tab flex">
            <div class="flexItem item" @click="select(1)" :class="{'active':active==1}">小学</div>
            <div class="flexItem item" @click="select(2)" :class="{'active':active==2}">初中</div>
        </div>
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
                data:[],
                primaryData:[
                    {name:'成都市红专西路小学',schoolNum:938,staffNum:49},
                    {name:'成都市玉林小学',schoolNum:1108,staffNum:57},
                    {name:'成都市武侯计算机实验小学',schoolNum:916,staffNum:44},
                    {name:'成都市新生路小学',schoolNum:901,staffNum:46},
                    {name:'四川大学附属实验小学',schoolNum:2119,staffNum:110},
                    {name:'成都市龙江路小学',schoolNum:1257,staffNum:64},
                    {name:'成都市磨子桥小学',schoolNum:945,staffNum:49},
                    {name:'成都市棕北小学',schoolNum:1187,staffNum:57},
                    {name:'成都市华西小学',schoolNum:837,staffNum:40},
                    {name:'成都市武侯实验小学',schoolNum:1357,staffNum:70},
                    {name:'成都市红牌楼小学校',schoolNum:1096,staffNum:56},
                    {name:'成都石室双楠实验学校',schoolNum:1898,staffNum:96},
                    {name:'成都市沙堰小学',schoolNum:508,staffNum:27},
                    {name:'成都市晋阳小学',schoolNum:2958,staffNum:161},
                    {name:'成都市磨子桥小学分校',schoolNum:2461,staffNum:136},
                    {name:'成都市马家河小学',schoolNum:1352,staffNum:74},
                    {name:'成都市武侯实验中学附属小学',schoolNum:1562,staffNum:81},
                    {name:'四川大学附属实验小学江安河分校',schoolNum:2592,staffNum:127},
                    {name:'成都市金兴北路小学',schoolNum:1159,staffNum:61},
                    {name:'成都市锦里小学',schoolNum:956,staffNum:49},
                    {name:'成都市龙江路小学分校',schoolNum:1097,staffNum:57},
                    {name:'成都市机投小学校',schoolNum:1251,staffNum:64},
                    {name:'成都市行知实验小学',schoolNum:1655,staffNum:86},
                    {name:'成都市科华中路小学',schoolNum:1263,staffNum:59},
                    {name:'成都市桐梓林小学',schoolNum:782,staffNum:40},
                    {name:'成都市三河小学',schoolNum:489,staffNum:25},
                    {name:'成都市华兴小学',schoolNum:1213,staffNum:63},
                    {name:'成都市太平寺西区小学',schoolNum:1278,staffNum:65},
                    {name:'成都市太平小学校',schoolNum:938,staffNum:56},
                    {name:'四川大学附属实验小学分校',schoolNum:1185,staffNum:62},
                    {name:'四川大学附属实验小学清水河分校',schoolNum:951,staffNum:49},
                    {name:'成都市龙祥路小学',schoolNum:1178,staffNum:61},
                    {name:'成都市棕北中学西区实验学校',schoolNum:1311,staffNum:61},
                    {name:'成都市龙江路小学武侯新城分校',schoolNum:1131,staffNum:60},
                    {name:'成都市簇桥小学校',schoolNum:1769,staffNum:83},
                    {name:'成都市龙江路小学中粮祥云分校',schoolNum:1111,staffNum:59},
                    {name:'成都市武侯科技园小学',schoolNum:1710,staffNum:91},
                    {name:'成都市百草园小学校',schoolNum:742,staffNum:38},
                    {name:'成都市武顺街小学',schoolNum:1362,staffNum:71},
                    {name:'成都市群星没事学校',schoolNum:420,staffNum:41},
                    {name:'成都市龙江路小学(南区)',schoolNum:1162,staffNum:107},
                    {name:'成都译华外国语学校',schoolNum:469,staffNum:33},
                    {name:'成都市锦官新城小学',schoolNum:881,staffNum:76},
                    {name:'四川省运动技术学院附属学校',schoolNum:137,staffNum:11},
                    {name:'成都市武侯区光明实验学校',schoolNum:850,staffNum:41},
                    {name:'成都市启明学校',schoolNum:912,staffNum:42},
                    {name:'成都市通江实验学校',schoolNum:1413,staffNum:73},
                    {name:'成都市武侯区育仁实验学校',schoolNum:1233,staffNum:69},
                    {name:'成都市凉井实验学校',schoolNum:606,staffNum:39},
                    {name:'成都市武侯区星光学校',schoolNum:538,staffNum:23},
                    {name:'成都市春晖学校',schoolNum:1326,staffNum:63},
                    {name:'成都武侯外国语学校',schoolNum:1072,staffNum:65},
                    {name:'成都市金花光明学校',schoolNum:472,staffNum:27},
                    {name:'成都市金花实验学校',schoolNum:657,staffNum:30},
                    {name:'成都市武侯区西蜀实验学校',schoolNum:1321,staffNum:69},
                    {name:'成都市第57实验学校',schoolNum:1035,staffNum:51},
                    {name:'成都市武侯区金辉实验学校',schoolNum:220,staffNum:20},
                    {name:'成都石室佳兴外国语学校',schoolNum:957,staffNum:65},
                ],
                juniorHighData:[
                    {name:'成都石室锦城外国语学校',schoolNum:945,staffNum:71},
                    {name:'成都市棕北中学校',schoolNum:2444,staffNum:198},
                    {name:'成都石室双楠实验学校',schoolNum:1116,staffNum:95},
                    {name:'四川大学附属中学西区学校',schoolNum:1548,staffNum:143},
                    {name:'成都市武侯实验中学',schoolNum:2239,staffNum:214},
                    {name:'成都市金花中学',schoolNum:1017,staffNum:87},
                    {name:'成都市西北中学外国语学校',schoolNum:1298,staffNum:106},
                    {name:'四川省成都市第十二中学',schoolNum:1468,staffNum:87},
                    {name:'成都市棕北中学西区实验学校',schoolNum:1135,staffNum:95},
                    {name:'成都市第四十三中学校',schoolNum:978,staffNum:74},
                    {name:'四川省成都市武侯高级中学',schoolNum:934,staffNum:78},
                    {name:'四川省运动技术学院附属学校',schoolNum:35,staffNum:5},
                    {name:'成都市武侯区光明实验学校',schoolNum:583,staffNum:43},
                    {name:'成都市启明学校',schoolNum:540,staffNum:28},
                    {name:'成都市武侯区西川实验学校',schoolNum:291,staffNum:30},
                    {name:'成都市武侯区育仁实验学校',schoolNum:397,staffNum:30},
                    {name:'成都市凉井实验学校',schoolNum:221,staffNum:20},
                    {name:'成都市武侯区星光学校',schoolNum:233,staffNum:15},
                    {name:'成都市春晖学校',schoolNum:616,staffNum:40},
                    {name:'成都武侯外国语学校',schoolNum:758,staffNum:71},
                    {name:'成都市金花光明学校',schoolNum:268,staffNum:19},
                    {name:'成都市金花实验学校',schoolNum:281,staffNum:16},
                    {name:'成都市武侯区西蜀实验学校',schoolNum:643,staffNum:52},
                    {name:'成都市第57实验学校',schoolNum:467,staffNum:31},
                    {name:'成都市武侯区金辉实验学校',schoolNum:113,staffNum:16},
                    {name:'成都西川中学',schoolNum:1542,staffNum:104},
                    {name:'北京第二外国语学院成都附属中学',schoolNum:345,staffNum:27},
                    {name:'四川大学附属中学新城分校',schoolNum:332,staffNum:27},
                    {name:'成都石室佳兴外国语学校',schoolNum:648,staffNum:53},
                ],
                active:1
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
            this.data=this.primaryData
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
            select:function (index) {
                this.active=index
                switch (index){
                    case 1:
                        this.data=this.primaryData
                        break;
                    case 2:
                        this.data=this.juniorHighData
                        break;
                }

            },
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
        .tab{
            height: 30px;
            line-height: 30px;
            margin-top: 10px;
            text-align: center;
            color: #ffffff;
            font-size: 12px;
            border: 1px solid #3ebafd;
            cursor: pointer;
            .item{
                background: #081629;
                &:first-child{
                    border-right: 1px solid #3ebafd;
                }
                &.active{
                    background-image: linear-gradient(to right, #3ebafd , #0a172b);
                }
            }
        }
        .title{
            background: #151B2D;
            color: #FAFAFA;
            font-size: 14px;
            margin-top: 10px;
            height: 30px;
            line-height: 30px;
            text-align: center;
        }
        .table-content {
            height: 135px;
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

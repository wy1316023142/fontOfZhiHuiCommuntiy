<template>
    <div class="carPerceptionBox">
        <div class="carPerceptionTitle">
            <p>
                <img src="../../assets/image/helong/2bb.png" alt="">
            </p>
            <p class="mlr">
                过车感知
            </p>
            <p>
                <span>{{totalNum}}</span>
            </p>
        </div>
        <div class="carPerceptionImg boxWrapper">
            <div class="noMesBox" v-show="noMesBoxShow">暂无数据</div>
            <div class="slideBox hornBox" :style="{marginLeft:ml150}">
                <div v-for="item in data" v-show="dataShow">
                    <p class="carImgBox">
                        <!-- <span class="identification">{{item.imageFragmentPath}}</span> -->
                        <img :src="item.imageFragmentPath" alt="">
                    </p>
                    <p><span>{{item.license}}</span> </p>
                    <p>{{item.deviceName}}</p>
                    <p>{{item.reportTime}}</p>
                </div>
            </div>
         
        </div>
        
    </div>
</template>

<script>
  import Api from '@/common/api.js'
  import { getUrlParame } from '@/common/util.js'
  import SockJS from 'sockjs-client'
  import Stomp from 'stompjs'
  import moment from 'moment'  
    export default {
        name: "carPerception", 
        data(){
          return{
                ml150:'',
                data:[],
                totalNum:0,
                numAdd:0,
                noMesBoxShow:false,
                dataShow:true,
                
              }
          },
          mounted(){
              if(getUrlParame('organId')){
                  let organId= getUrlParame('organId')
              }
                 this._fetchData(2323)
                 this.timer(2323)

              
          },
          methods:{
            timer(i){
                return setInterval(()=>{
                    this._fetchData(i)
                    },5000)
            },
            _fetchData :  function(organId) {
                Api.hlVehicleNumber.get({
                    pageSize:4
                },
                {
                     pathParams: {
                        orgId: organId,
                       
                    }
                }
                ).then(res => {
                    if(res.data.result.list.length==0){
                        this.noMesBoxShow=true
                        this.dataShow=false
                    }else{
                        this.noMesBoxShow=false
                        this.dataShow=true
                    }
                    this.data=res.data.result.list
                    this.totalNum=res.data.result.vehicleSnapCount
                    for (let i = 0; i <  this.data.length; i++) {
                        var str=this.data[i].reportTime
                        var num1=str.indexOf(' ')
                        this.data[i].reportTime=this.data[i].reportTime.substring(num1)
                    }
                })
            },
            handleMessage : function (event) {
                if(event.data.organId){
                    this._fetchData(event.data.organId)

                }
            }
          }
        
    }
</script>

<style lang="less" scoped>
.carPerceptionBox{
    margin-left: 10px;
    .carPerceptionTitle{
        display: flex;
        font-size: 18px;
        margin-bottom: 10px;
        margin-top: 10px;
        p{
            color: #61b4e9;
            height: 30px;
            line-height: 30px;
        }
    }
    .carPerceptionImg{
        width: 592px;
        height: 184px;
        font-size: 14px;
        border: 1px solid #112a6a; 
        overflow: hidden; 
        position: relative; 
        .slideBox{
            transition:all 0.5s linear 0s;
            display: flex;
            height: 100%;
            .carImgBox{
                width: 140px;
                height: 100px;
                position: relative;
                .identification{
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    background: red;
                    color: #fff;
                    font-size: 12px;
                    // padding: 2px;
                }
            }
        }             
        p{
            margin-left: 7px;
            margin-top: 6px;
            color: #61b4e9;   
            // text-align: center;         
            img{
                display: block;
                width: 140px;
                height: 100px;
            }
        }
    }
     span{
        color: #feb226;
        font-weight: bold;        
    }
    .mlr{
        margin-left: 6px;
        margin-right: 12px;
    }
}
</style>
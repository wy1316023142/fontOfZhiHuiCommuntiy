<template>
  <div>
    <div class="container">
      <h3 class="title flex">
        今日通行人次&nbsp;&nbsp;<span class="flexItem" >{{totalNum}}</span>
        今日访客人次&nbsp;&nbsp;<span class="flexItem" >{{visitorNum}}</span>
      </h3>
      <div class="main" >
        <el-row :gutter="20">
          <el-col :span="3" v-for="(item,index) in data" :key="index">
            <div class="img-box">
              <img :src="item.environmentImageUrl">
            </div>
            <p><span>{{item.personName}}</span></p>
            <p class="doorName"><span>{{item.deviceName}}</span></p>
            <!-- <p><span>{{item.captureTime | daterful('YYYY-MM-D HH:mm:ss')}}</span></p> -->
            <p><span>{{item.captureTime}}</span></p>
          </el-col>
        </el-row>
        
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/common/api.js'
  import { getUrlParame } from '@/common/util.js'
  import { getParentParame } from './mixins.js'
  import { debounce } from 'lodash'
  import SockJS from 'sockjs-client'
  import Stomp from 'stompjs'
  import moment from 'moment'      
export default {
    name: 'openDoor',
    mixins: [ getParentParame ],
  data() {
    return {
        data:[],
        totalNum:0,
        visitorNum:0,
        socket:null
    }
  },
    mounted(){
        if(getUrlParame('organId')){
            let organId= getUrlParame('organId')
            this.initWebSocket(organId)
            this._fetchData(organId)
        }
    },
  methods:{
      initWebSocket(organId){
            this.socketError=false;
        
          // this.socket = new SockJS('http://25.30.9.145:15674/stomp');
          this.socket = new SockJS('http://222.211.78.60:15674/stomp');
          //  this.socket = new SockJS('http://25.30.9.9:15674/stomp');
          
          const client = Stomp.over(this.socket);
          client.heartbeat.outgoing = 0 // 客户端每20000ms发送一次心跳检测
          client.heartbeat.incoming = 0 // 0 代表client不接收server端的心跳检测
          const on_connect = ()=> {
              client.subscribe(`/exchange/TopicExchangeFontAYIC/topic.open.door.front.record.#.${organId}.#`, (frame)=> {
                  let frames = JSON.parse(frame.body);
                  if(frames.type==1){
                      let data=JSON.parse(frames.data)
                      let time=data.captureTime                      
                            var str=moment(time).format('YYYY-MM-DD HH:mm:ss')
                            var num1=str.indexOf(' ')
                            data.captureTime=str.substring(num1)
                         
                      this.data.unshift(data)
                      if(data.personType==2){
                          this.visitorNum++;
                      }else{
                          this.totalNum++;
                      }
                      if (this.data.length >=9) {
                          this.data.pop();
                      }
                  }
              });
          };
          const on_error = ()=> {

          };
          // client.connect('guest','guest', on_connect, on_error, '/');
          client.connect('Scty-admin','mq@)!*2019@Scty', on_connect, on_error, '/');
          
      },
      _fetchData : debounce(function(organId) {
          Api.zhsqGetOpenDoorNumber.get({
            pageSize:8
          }, {
              pathParams: {
                  organId: organId
              }
          }).then(res => {
              this.data=res.data.result.openDoorList
              this.totalNum=res.data.result.totaleNum
              this.visitorNum=res.data.result.visitorNum
              for (let i = 0; i <  this.data.length; i++) {
                    var str=this.data[i].captureTime
                    var num1=str.indexOf(' ')
                    console.log(num1);
                    this.data[i].captureTime=this.data[i].captureTime.substring(num1)
              }
          })
      }, 100),
      handleMessage : function (event) {
          if(event.data.organId){
              this.socket.close()
              this._fetchData(event.data.organId)
              this.initWebSocket(event.data.organId)
          }
      }
  }
};
</script>
<style lang="less" scoped>
  .title {
    font-size: 18px;
    background: url('../../assets/image/zhsq/1.png') no-repeat left center;
    padding-left: 23px;
    line-height: 25px;
  }
  .container{
    box-sizing: border-box;
    width: 100%;
    height: 301px;
    padding: 25px 30px 0;
    font-size: 14px;
    color: #ADB9E4;
  }
  .img-box{
    height: 110px;
  }
  .img-box img{
    display: block;
    width: 100%;
    height: 110px;
    object-fit:cover
  }
  .container p{
    margin-top: 10px;
  }
  .container .main{
    margin-top: 16px;
  }
  .container .box6-main p span{
    color: #EBAB61;
  }
  .doorName{
    width: 86px;
    white-space: nowrap;
    overflow: hidden;
  }
</style>

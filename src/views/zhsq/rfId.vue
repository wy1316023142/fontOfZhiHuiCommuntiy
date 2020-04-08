<template>
  <div>
    <div class="container">
      <h3 class="title flex">
        今日通行车次 &nbsp;&nbsp; <span class="flexItem" >{{totalNum}}</span>
      </h3>
      <div class="main" >
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item,index) in data" :key='index'>
            <div class="img-box">
              <img :src="item.imageFragmentPath">
            </div>
            <!-- <span class="name">姓名：<span>{{item.personName}}</span></p> -->
            <p>车牌号：<span>{{item.license}}</span></p>
            <p >时间：<span>{{item.captureTime | daterful( 'HH:mm:ss')}}</span></p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
    import Api from '@/common/api.js'
    import { getUrlParame } from '@/common/util.js'
    import { debounce } from 'lodash'
    import SockJS from 'sockjs-client'
    import Stomp from 'stompjs'
    export default {
        name: 'openDoor',
        data() {
            return {
                data:[],
                totalNum:0,
                socket:null,
                time:'2019-10-10 07:12:42.0'
            }
        },
        mounted(){
            if(getUrlParame('organId')){
                let organId= getUrlParame('organId')
                this._fetchData(organId)
                this.initWebSocket(organId)
            }
        },
        methods:{
            initWebSocket(organId){
                // this.socket = new SockJS('http://25.30.9.145:15674/stomp');
                this.socket = new SockJS('http://222.211.78.60:15674/stomp');
                //  this.socket = new SockJS('http://25.30.9.9:15674/stomp');
                
                const client = Stomp.over(this.socket);
                client.heartbeat.outgoing = 0 // 客户端每20000ms发送一次心跳检测
                client.heartbeat.incoming = 0 // 0 代表client不接收server端的心跳检测
                const on_connect = ()=> {
                    client.subscribe(`/exchange/TopicExchangeFontAYIC/topic.open.door.front.record.#.${organId}.#`, (frame)=> {
                        let frames = JSON.parse(frame.body);
                        console.log(frames);
                        
                        if(frames.type==3){
                            let data=JSON.parse(frames.data)
                            this.data.unshift(data)
                            this.totalNum++;
                            if (this.data.length >= 3) {
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
                Api.zhsqGetVehicleNumber.get({ 
                   pageSize:2
                 }, {
                    pathParams: {
                        organId: organId
                    }
                }).then(res => {
                   this.data=res.data.result.list
                   this.totalNum=res.data.result.vehicleSnapCount
                })
            } , 100),
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
  .container .box6-main p span,.main .name span{
    color: #EBAB61;
  }
</style>

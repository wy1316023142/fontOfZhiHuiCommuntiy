<template>
    <div >
        <div class="container">
            <div class="rfid-box">
                    <h3 class="title flex">
                    <!-- 今日通行非机动车次 -->
                    今日通行非机动车次 &nbsp;&nbsp;<span class="flexItem" >{{totalNum}}</span>
                </h3>
                <div class="box" v-for="(item,index) in data" :key="index">
                    <p class="box-name">{{item.licenseNumber}}</p>
                    <p class="box-adress">{{item.deviceName}}</p>
                    <p class="box-time">{{item.captureTime | daterful(' HH:mm:ss')}}</p>
                </div>
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
    export default {
        name: 'openDoor',
        mixins: [ getParentParame ],
        data() {
            return {
                data:[
                    {licenseNumber:'电瓶车川A9513',deviceName:'物联小区b扣',time:"2019-10-22 12:22:11"},
                     {licenseNumber:'电瓶车川A9512',deviceName:'物联小区b扣',time:"2019-10-22 12:22:11"}, {licenseNumber:'电瓶车川A9512',deviceName:'物联小区b扣',time:"2019-10-22 12:22:11"},
                ],
                totalNum:0,
                socket:null,
            }
        },
        mounted(){
            if(getUrlParame('organId')){
                let organId= getUrlParame('organId')
                this._fetchData(organId)
                this.initWebSocket(organId)
            }
            //  this._fetchData()
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
                        if(frames.type==2){
                            let data=JSON.parse(frames.data)
                            // console.log(data);
                            
                            this.data.unshift(data)
                            this.totalNum++;
                            if (this.data.length >=6) {
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
                Api.zhsqGetRfidNumber.get({
                     pageSize:5
                }, {
                    pathParams: {
                        organId: organId
                    }
                }).then(res => {
                    this.data=res.data.result.recordLst
                    this.totalNum=res.data.result.totalNum
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
<style lang="less" >
.title {
  font-size: 18px;
  background: url("../../assets/image/zhsq/1.png") no-repeat left center;
  padding-left: 23px;
  line-height: 25px;
  color: #ADB9E4;
  margin: 16px 16px 16px 36px;
}
.title span{
  color: #0991ca;
   font-size: 18px;
   color: #ADB9E4;
}
.container {
  height: 100%;
  padding: 11px 32px 11px 30px;
}
.rfid-box{
    width: 340px;

}
.container .box {
  display: flex;
  width: 100%;
}
.container .box:not(:last-child) {
   border-bottom: 1px solid #adb9e4;  
}

.container .box p {
  padding: 8px 0px 2px 0px;
  color: #adb9e4;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
//   margin: 5px 0;
//   background: #203e6b
}

.container .box .box-name{
    width: 30%;
    color:#cd9a68;
    padding-left: 4px;
}
.container .box .box-adress{
    width: 50%;
}
.container .box .box-time{
    width: 20%;
}
</style>

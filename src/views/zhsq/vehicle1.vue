<template>
<div>
    <div class="container">
      <h3 class="title flex">
        今日通行车次 &nbsp;&nbsp;<span class="flexItem" >{{totalNum}}</span>
      </h3>
      <div class="main" >
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item,index) in data" :key="index">
            <div class="img-box">
              <img :src="item.imageFragmentPath">
            </div>
            <p>车牌号：<span>{{item.license}}</span></p>
           <p>时间：<span>{{item.reportTime | daterful(' HH:mm:ss')}}</span></p>
            
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
    handle: null,
  data() {
    return {
        data:[],
        totalNum:0,
        socket:null,
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
      _fetchData : debounce(function(organId) {
          Api.zhsqGetVehicleNumber.get({}, {
              pathParams: {
                  organId: organId
              }
          }).then(res => {
              this.data=res.data.result.list
              this.totalNum=res.data.result.vehicleSnapCount
          })
      } ,100),
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
</style>

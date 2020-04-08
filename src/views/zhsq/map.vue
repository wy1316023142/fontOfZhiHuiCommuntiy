<template>
  <div class="container">
    <baidu-map class="map" :center="center" :zoom="zoom" mapType="BMAP_HYBRID_MAP" @ready="handler" :scroll-wheel-zoom="true" :inertial-dragging="true" ak="MGoVka4kmzYKHimt4LEvl8KhpNz5GFF4" >
      <bm-marker v-for="(item,index) in data1" :position="item.position" :icon="icon1" :offset="{width: -16, height: -16}" @click="openInfoWindow(index)">
        <bm-info-window :show="item.show" @open="openInfoWindow(index)" @close="closeInfoWindow(index)">{{item.name}}<br/>{{item.status}}</bm-info-window>
      </bm-marker>
      <bm-marker v-for="item in data2" :position="item.position" :icon="icon2" :offset="{width: -16, height: -16}"></bm-marker>
      <bm-marker v-for="item in data3" :position="item.position" :icon="icon3"  :offset="{width: -16, height: -16}"></bm-marker>
      <bm-marker v-for="item in data4" :position="item.position" :icon="icon4"  :offset="{width: -16, height: -16}"></bm-marker>
      <bm-marker v-for="item in data5" :position="item.position" :icon="icon5"  :offset="{width: -16, height: -16}"></bm-marker>
      <bm-marker v-for="item in data6" :position="item.position" :icon="icon6"  :offset="{width: -16, height: -16}"></bm-marker>
    </baidu-map>
    <div class="map-tools">
      <div>
        <img src="@/assets/image/zhsq/111.png">门禁设备 <span>{{num1}}</span>
      </div>
      <div>
        <img src="@/assets/image/zhsq/122.png">监控设备 <span>{{num2}}</span>
      </div>
      <div>
        <img src="@/assets/image/zhsq/133.png">消防栓 <span >{{num3}}</span>
      </div>
      <div>
        <img src="@/assets/image/zhsq/144.png">井盖 <span >{{num4}}</span>
      </div>
      <div>
        <img src="@/assets/image/zhsq/155.png">一键报警 <span >{{num5}}</span>
      </div>
      <div>
        <img src="@/assets/image/zhsq/166.png">烟感 <span>{{num6}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/common/api.js'
  import { debounce } from "lodash"
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
  import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
  import { getUrlParame } from '@/common/util.js'
  import icon1 from '@/assets/image/zhsq/11.png'
  import icon2 from '@/assets/image/zhsq/22.png'
  import icon3 from '@/assets/image/zhsq/33.png'
  import icon4 from '@/assets/image/zhsq/44.png'
  import icon5 from '@/assets/image/zhsq/55.png'
  import icon6 from '@/assets/image/zhsq/66.png'
export default {
    components: {
        BaiduMap,
        BmMarker,
        BmInfoWindow
    },
    data() {
      return {
          center: {lng: 0, lat: 0},
          zoom: 3,
          icon1:{},
          icon2:{},
          icon3:{},
          icon4:{},
          icon5:{},
          icon6:{},
          data1:[],
          data2:[],
          data3:[],
          data4:[],
          data5:[],
          data6:[],
          num1:0,
          num2:0,
          num3:0,
          num4:0,
          num5:0,
          num6:0,
      }
    },
    mounted() {

    },
    methods:{
        _fetchData : debounce(function(organId) {
            Api.zhsqGetDeviceList.get({}, {
                pathParams: {
                    organId: organId
                }
            }).then(res => {
                res.data.result.forEach((item,index)=>{
                    if(item.locationX&&item.locationY) {
                        switch (item.type) {
                            case 'IDT2':
                                this.num1++
                                this.data1.push({
                                    'position':{lng: item.locationX, lat:item.locationY},
                                    'name':item.name,
                                    'status':item.status==0?'在线':'离线',
                                    'show':false
                                })
                                break;
                            case 'IDT0':
                                this.num2++
                                var temp=item.status==0?'在线':'离线'
                                this.data2.push({
                                    'position':{lng: item.locationX, lat:item.locationY},
                                    'name':item.name,
                                    'status':item.status==0?'在线':'离线'
                                })
                                break;
                            case 'IDT6':
                                this.num3++
                                var temp=item.status==0?'在线':'离线'
                                this.data3.push({
                                    'position':{lng: item.locationX, lat:item.locationY},
                                    'name':item.name,
                                    'status':item.status==0?'在线':'离线'
                                })
                                break;
                            case 'IDT7':
                                this.num4++
                                var temp=item.status==0?'在线':'离线'
                                this.data4.push({
                                    'position':{lng: item.locationX, lat:item.locationY},
                                    'name':item.name,
                                    'status':item.status==0?'在线':'离线'
                                })
                                break;
                            case 'IDT4':
                                this.num5++
                                var temp=item.status==0?'在线':'离线'
                                this.data5.push({
                                    'position':{lng: item.locationX, lat:item.locationY},
                                    'name':item.name,
                                    'status':item.status==0?'在线':'离线'
                                })
                                break;
                            case 'IDT5':
                                this.num6++
                                var temp=item.status==0?'在线':'离线'
                                this.data6.push({
                                    'position':{lng: item.locationX, lat:item.locationY},
                                    'name':item.name,
                                    'status':item.status==0?'在线':'离线'
                                })
                                break;
                        }

                    }
                })
            })
        } ,100),
        handler ({BMap, map}) {
            this.center.lng = 104.04289015403499
            this.center.lat = 30.63011823139385
            this.zoom = 18
            this.icon1={url: icon1, size: {width: 32, height: 32}}
            this.icon2={url: icon2, size: {width: 32, height: 32}}
            this.icon3={url: icon3, size: {width: 32, height: 32}}
            this.icon4={url: icon4, size: {width: 32, height: 32}}
            this.icon5={url: icon5, size: {width: 32, height: 32}}
            this.icon6={url: icon6, size: {width: 32, height: 32}}
            let organId=getUrlParame('organId')? getUrlParame('organId') : 1
            this._fetchData(organId)
        },
        openInfoWindow:function (index) {
            this.data1[index].show=true
        },
        closeInfoWindow:function (index) {
            this.data1[index].show=false
        }
    }
};
</script>
<style lang="less" scoped>
  .container{
    box-sizing: border-box;
    width: 100%;
    height: 577px;
    position: relative;
    color: #ADB9E4;
    font-size: 14px;
    .map-tools{
      position: absolute;
      top: 22px;
      right: 22px;
      z-index: 99;
      div{
        width: 123px;
        height: 29px;
        line-height: 29px;
        background: #0C0A2A;
        border-radius:3px;
        margin-top: 5px;
        font-size: 14px;
        vertical-align: middle;
        cursor: pointer;
        &.active{
          background: #2E2C6F;
        }
        img{
          width: 16px;
          height: 16px;
          vertical-align: middle;
          margin-left: 8px;
          margin-right: 10px;
        }
      }
    }
    .map{
      width: 100%;
      height: 100%;
      z-index: 1;

    }
  }

</style>

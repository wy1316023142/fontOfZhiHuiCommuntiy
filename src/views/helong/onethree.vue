<template>
    <div class="onethreeBigBox">
        <div>
            <p class="colorfbb mt">{{data.personNum}}</p>
            <div>
                  <img src="../../assets/image/helong/11aa.png" alt="">
            </div>
            <p class="color93d">
              实有人口
            </p>
        </div>
        <div>
            <p class="colorfbb mt">{{data.totalHouseNum}}</p>
            <div>
                <img src="../../assets/image/helong/22aa.png" alt="">
            </div>
            <p class="color93d">
                实有房屋
            </p>
        </div>
        <div>
            <p class="colorfbb mt">{{data.totalOrganNum}}</p>
            <div>
                 <img src="../../assets/image/helong/33aa.png" alt="">
            </div>
            <p class="color93d">
               实有单位
            </p>
        </div>
    </div>
</template>

<script>
  import Api from '@/common/api.js'
  import { getUrlParame } from '@/common/util.js'
  import { getParentParame } from '../zhsq/mixins.js'
    export default {
        mixins: [ getParentParame ],
        name: "onethree",
        data() {
            return{
                data:{}
            }
        },
        mounted(){
            if(getUrlParame('organId')){
                  let organId= getUrlParame('organId')
                  this._fetchData(organId)
              }
        },
        methods:{
             _fetchData :  function(organId) {
                Api.hlPHONumber.get({}, {
                    pathParams: {
                        orgId: organId
                    }
                }).then(res => {
                    this.data=res.data.result
                })
            },
        }
    }
</script>

<style lang="less" scoped>
.onethreeBigBox{
    display: flex;
    justify-content: space-around;
    width: 336px;
    height: 260px;
    .colorfbb{
        height: 18px;
        line-height: 18px;
        font-size: 18px;
        color: #fbb22a;
        text-align: center;
        font-weight: bold;
        padding-top: 50px;
        padding-bottom: 20px;
    }
    .color93d{
        color: #93d2f9;
        width: 34px;
        margin-left: 24px;
        margin-top: 5px;
        font-size: 12px;
    }
}
</style>
<template>
  <div>
    <div class="container">
      <div class="box fl">
        <h3 class="text_r">常住人口</h3>
        <section class="digitalBoard" >
          <div  class="digit" v-for="(item,index) in residentPopulationData" :key="index">
            <span class="num top">{{item}}</span>
            <span  class="num bottom"><div  class="bottomContainer">{{item}}</div></span>
          </div>

        </section>
      </div>
      <div class="box fr" >
        <h3>流动人口</h3>
        <section class="digitalBoard">
          <div  class="digit" v-for="(item,index) in floatingPopulationData" :key="index">
            <span class="num top">{{item}}</span>
            <span  class="num bottom"><div  class="bottomContainer">{{item}}</div></span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/common/api.js'
  import { getParentParame } from './mixins.js'
  import { dual } from '@/common/util.js'
export default {
    name: 'populationNumber',
    mixins: [ getParentParame ],
  data() {
    return {
        floatingPopulationData:[0,0,0,0,0],
        residentPopulationData:[0,0,0,0,0],
    }
  },
  methods:{
      _fetchData :  function(organId) {
          Api.zhsqGetPoulationNumber.get({}, {
              pathParams: {
                  organId: organId
              }
          }).then(res => {
              this.floatingPopulationData = dual(res.data.result.floatingNum).split('')
              this.residentPopulationData = dual(res.data.result.longLivedNum).split('')
          })
      },
  }
};
</script>
<style lang="less" scoped>
  .container{
    box-sizing: border-box;
    width: 100%;
    height: 129px;
    padding: 11px 32px 11px 30px;
    background: url("../../assets/image/zhsq/renkou.png") no-repeat center center;
  }
  .container .box{
    margin-top: 20px;
    width: 35%;
  }
  .container .box h3{
    color: #ADB9E4;
    font-size: 14px;
  }
  .digitalBoard{
    display: inline-block;
    overflow: hidden;
    font-size: 24px;
    width: 100%;
    margin-top: 10px;
    font-family: "DS-DIGIB";
  }
  .digit{
    width: 18%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    float: left;
    position: relative;
    color: white;
    margin-left: 2.5%;
    overflow: hidden;
  }
  .digit:first-child{
    margin-left: 0;
  }
  .num {
    position: absolute;
    top: 0px;
    left: 0px;
    display: inline-block;
    z-index: 1;
    height: 50%;
    overflow: hidden;
    width: 100%;
  }
  .num.bottom {
    top: 54%;
    height: 46%;
  }
  .digit .num {
    background-color: #4842b2;
    -webkit-border-radius: 2px;
    border-radius: 2px;
  }
  .bottomContainer{
    margin-top: -15px;
  }
</style>

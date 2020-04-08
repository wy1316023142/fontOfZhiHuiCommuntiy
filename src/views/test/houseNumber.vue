<template>
  <div>
    <div class="container">
      <div class="box fl">
        <h3 class="text_r">实有房屋</h3>
        <section class="digitalBoard" >
          <div  class="digit" v-for="item in total">
            <span class="num top">{{item}}</span>
            <span  class="num bottom"><div  class="bottomContainer">{{item}}</div></span>
          </div>

        </section>
      </div>
      <div class="box fr" >
        <h3>租住房屋</h3>
        <section class="digitalBoard">
          <div  class="digit" v-for="item in leaseCount">
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
                leaseCount:[0,0,0,0,0],
                total:[0,0,0,0,0],
            }
        },
        methods:{
            _fetchData :  function(organId) {
                Api.zhsqGetHouseNumber.get({}, {
                    pathParams: {
                        organId: organId
                    }
                }).then(res => {
                    this.leaseCount = dual(res.data.result.leaseCount).split('')
                    this.total = dual(res.data.result.total).split('')
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
    background: url("../../assets/image/zhsq/fangwu.png") no-repeat center center;
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

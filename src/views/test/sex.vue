<template>
  <div>
    <h3 class="title">性别</h3>
    <div class="container">
      <div class="flex">
        <div class="flexItem center" @click="sex(5)">
          <img src="@/assets/image/zhsq/nan.png">
          <p class="p1">男士 <span >{{maleNumPercentage}}</span></p>
        </div>
        <div class="flexItem center">
          <p class="p2">人群总体</p>
          <p class="p3">{{total}}</p>
        </div>
        <div class="flexItem center" @click="sex(1)">
          <img src="@/assets/image/zhsq/nv.png">
          <p class="p1">女士 <span>{{femaleNumPercentage}}</span></p>
        </div>
      </div>
      <div class="line" ref="line">
        <div class="line1" :style="{width:width}"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/common/api.js'
  import { getParentParame } from './mixins.js'
export default {
    name: 'sex',
    mixins: [ getParentParame ],
  data() {
    return {
        total:'2',
        maleNumPercentage:'100%',
        femaleNumPercentage:'0%',
        width:'0px',
        boxWidth:"",
    }
  },
mounted(){
      this.boxWidth=this.$refs.line.clientWidth
  },
  methods:{
      _fetchData :  function(organId) {
          Api.zhsqGetSexStructure.get({}, {
              pathParams: {
                  organId: organId
              }
          }).then(res => {
              this.maleNumPercentage=res.data.result.maleNumPercentage
              this.femaleNumPercentage=res.data.result.femaleNumPercentage
              this.total=res.data.result.femaleNum+res.data.result.maleNum
              this.width=this.boxWidth*parseInt(res.data.result.maleNumPercentage)*0.01+'px'
          })
      },
      sex:function (sex) {
          top.postMessage(sex, '*')
      }
  }
};
</script>
<style lang="less" scoped>
  .title{
    text-align: center;
    padding-top: 5px;
    color: #ADB9E4;
    font-size: 18px;
  }
  .container{
    width: 100%;
    height: 189px;
    box-sizing: border-box;
    background: url("../../assets/image/zhsq/xingbieshuliang.png") no-repeat center center;
    padding: 20px 20px;
    color: #ADB9E4;
  }
  .container img{
    display: block;
    margin: 0 auto;
  }
  .container .p1{
    font-size: 14px;
    margin-top: 10px;
  }
  .container .p2{
    font-size: 16px;
  }
  .container .p3{
    font-size: 30px;
    margin-top: 0px;
  }
  .container .p4{
    height: 36px;
  }
  .container .line{
    height: 10px;
    margin: 25px auto 0;
    background: #8954d4;
    border-radius: 10px;
    position: relative;
  }
  .container .line1{
    position: absolute;
    left: 0;
    top:0;
    width:0px;
    height: 10px;
    background: #00c2ff;
    border-radius: 10px 0 0 10px;
  }
</style>

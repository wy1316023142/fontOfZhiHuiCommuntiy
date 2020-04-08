<template>
  <div>
    <div class="container">
      <IEcharts :option="rich" ref="rich" ></IEcharts>
    </div>
  </div>
</template>

<script>
  import Api from '@/common/api.js'
  import IEcharts from "vue-echarts-v3/src/full.js";
  import { getParentParame } from './mixins.js'

export default {
    mixins: [ getParentParame ],
    name: 'houseManagement',
    data() {
      return {
          rich :{
              tooltip : {
                  show:false
              },
              color:['#00c2ff','#ebab61',"#ec5f68"],
              series : [
                  {
                      name:'辖区房屋',
                      type:'pie',
                      radius: ['30%', '45%'],
                      center: ['50%', '58%'],
                      label: {
                          normal: {
                              formatter: '{b|{b}}\n{c|{c}}\n{d|{d}%} ',
                              rich: {
                                  b: {
                                      fontSize: 14,
                                      color:'#ADB9E4'
                                  },
                                  c:{
                                      fontSize: 20,
                                      lineHeight: 25
                                  },
                                  d:{
                                      fontSize: 14,
                                      color:'#ADB9E4'
                                  }

                              }
                          }
                      },
                      data :[]
                  }
              ]
          },
      }
    },
    components: {
        IEcharts
    },
    mounted() {
        window.onresize =()=> {
            this.$refs.rich.resize();
        };
        // this._fetchData()
    },
    methods:{
        _fetchData :  function(organId) {
           Api.zhsqGetHouseClassification.get({}, {
                pathParams: {
                    organId: organId
                }
            }).then(res => {
               const data =  [
                   {value:res.data.result.vacantCount, name:'空置'},
                   {value:res.data.result.leaseCount, name:'出租'},
                   {value:res.data.result.selfOccupiedCount, name:'自住'},
               ];
               this.rich.series[0].data=data
               this.$refs.rich.resize();
            })
        },
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
    height: 172px;
  }

</style>

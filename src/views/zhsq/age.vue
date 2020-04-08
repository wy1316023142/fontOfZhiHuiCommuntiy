<template>
  <div>
    <h3 class="title">年龄结构</h3>
    <div class="container">
      <IEcharts :option="pie" ref="pie" ></IEcharts>
    </div>
  </div>
</template>

<script>
  import Api from '@/common/api.js'
  import IEcharts from "vue-echarts-v3/src/full.js";
  import { getParentParame } from './mixins.js'

export default {
    mixins: [ getParentParame ],
    name: 'echartPie',
    data() {
      return {
          pie :{
              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c}人"
              },
              legend : {
                  orient: 'vertical',
                  right: 50,
                  top: 20,
                  bottom: 20,
                  textStyle:{
                      color:'#ADB9E4'
                  },
                  data : []
              },
              color:['#ec5f68','#ebab61','#5fda8a',"#00c2ff","#8954d4","#9bcd66"],
              series : [
                  {
                      name:'年龄结构',
                      type:'pie',
                      radius : ['20%','65%'],
                      center: ['25%', '50%'],
                      roseType : 'radius',
                      label: {
                          normal: {
                              show: false
                          }
                      },
                      data : []
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
            this.$refs.pie.resize();
        };
    },
    methods:{
        _fetchData :  function(organId) {
           Api.zhsqGetAge.get({}, {
                pathParams: {
                    organId: organId
                }
            }).then(res => {
                const data = res.data.rows
                let legend=[];
                let pie=[];
                data.forEach(item=>{
                    legend.push(item.rangeName+'     '+item.percentage);
                    pie.push({
                        value:item.count,
                        name:item.rangeName+'     '+item.percentage
                    });
                })
                this.pie.series[0].data=pie
                this.pie.legend.data=legend
                this.$refs.pie.resize();
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
    height: 180px;
  }

</style>

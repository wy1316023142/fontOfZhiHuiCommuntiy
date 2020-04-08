<template>
  <div>
    
    <div class="container">
      <IEcharts :option="pie" ref="pie" style="width: 100%;height:160px"></IEcharts>
    </div>
  </div>
</template>

<script>
  import Api from '@/common/api.js'
  import IEcharts from "vue-echarts-v3/src/full.js";
export default {
    name: 'login',
    data() {
      return {
          pie :{
              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c}人"
              },
              legend : {
                  orient: 'vertical',
                  right: 40,
                  top: 20,
                  bottom: 20,
                  itemWidth: 8,
                  itemHeight: 8,
                  itemGap: 6,　
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
     this._fetchData()
    },
    methods:{
        _fetchData: function(){
            const data=[{
                "index": 1,
                "rangeName": "17岁(含以下)",
                "count": 10,
                "percentage": "10%"
            }, {
                "index": 2,
                "rangeName": "18岁到25岁",
                "count": 11,
                "percentage": "10%"
            }, {
                "index": 3,
                "rangeName": "26岁到35岁",
                "count": 7,
                "percentage": "10%"
            }, {
                "index": 4,
                "rangeName": "36岁到45岁",
                "count": 12,
                "percentage": "10%"
            }, {
                "index": 5,
                "rangeName": "46岁到59岁",
                count: 13,
                "percentage": "10%"
            }, {
                "index": 6,
                "rangeName": "60岁(含以上)",
                count: 15,
                "percentage": "50%"
            }]
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

</style>

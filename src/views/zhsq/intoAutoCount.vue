<template>
    <div>
        <h3 class="title">出入口通行统计</h3>
        <!-- <div class="table_change">
          <div class="table_box" :class="flag ? 'active_color' : 'color'" @click="getData(1)">今日</div>
          <div class="table_box border_left" :class="flag == false ? 'active_color' : 'color'" @click="getData(7)">近7日</div>

        </div> -->
        <div class="container">
            <div id="myLine" style="width: 100%;height:136px"></div>
        </div>
    </div>
   
</template>
<script>
import echarts from "echarts";
import Api from '@/common/api.js'
import { getParentParame } from './mixins.js'
export default {
  mixins: [ getParentParame ],
  name: "",
  data() {
    return {
      flag:true,
      charts: "",
      activeName: 'first',
      popData: [],
      vehicleData:[],
      nonMotorData:[],
      title: [],
      data: [],
      opinionData:[120, 102, 101, 134, 200, 130, 210]
    };
  },
  mounted(){
    // this._fetchData(1)
  },
  methods: {
    drawLine(id) {


      var data = this.opinionData.map(item => {
        return item;
      });
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          // formatter: "{a} : {c} "
        },

        xAxis: {
          type: "category",
          data: this.title,
          axisTick: {
            //x轴刻度线
            show: false
          },
          axisLine: {
            //x轴
            show: false
          },
          axisLabel: {
            color: "#86bde4" //刻度线标签颜色
          }
          //   show: false
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#86bde4"],
              width: 1,
              type: "solid"
            }
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          axisLine: {
            //y轴
            show: false
          },
          axisLabel: {
            color: "#86bde4" //刻度线标签颜色
          }
          // show: false
        },
        legend: {
          itemWidth: 16,
          itemHeight: 8,
          textStyle: {
            color: "#ced7db",
            fontSize: 9,
            fontFamily: "MicrosoftYaHei"
          },
          show: true
        },
        series: [
           {
          name: "通行人次",
          type: "line",
          symbol: "emptyCircle",
          symbolSize: 8,
          showSymbol: true,
          smooth: true,
          data: this.popData,
          areaStyle: {
            normal: {
              //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,222,173,0.85)"
                },
                {
                  offset: 0.34,
                  color: "rgba(255,222,173,0.55)"
                },
                {
                  offset: 1,
                  color: "rgba(255,222,173,0.00)"
                }
              ])
            }
          },
          lineStyle: {
            color: "#dfa053"
          },
          itemStyle: {
            normal: {
              color: "#dfa053"
            }
          }
        },
        {
          name: "通行车次",
          type: "line",
          symbol: "emptyCircle",
          symbolSize: 8,
          showSymbol: true,
          smooth: true,
          data: this.vehicleData,
          areaStyle: {
            normal: {
              //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(173,216, 230,0.85)"
                },
                {
                  offset: 0.34,
                  color: "rgba(173 ,216 ,230,0.55)"
                },
                {
                  offset: 1,
                  color: "rgba(173 ,216 ,230,0.00)"
                }
              ])
            }
          },
          lineStyle: {
            color: "#18aad9"
          },
          itemStyle: {
            normal: {
              color: "#18aad9"
            }
          }
        },
        {
          name: "通行非机动车次",
          type: "line",
          symbol: "emptyCircle",
          symbolSize: 8,
          showSymbol: true,
          smooth: true,
          data: this.nonMotorData,
          areaStyle: {
            normal: {
              //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255 ,193 ,193,0.85)"
                },
                {
                  offset: 0.34,
                  color: "rgba(255 ,193 ,193,0.55)"
                },
                {
                  offset: 1,
                  color: "rgba(255 ,193 ,193,0.00)"
                }
              ])
            }
          },
          lineStyle: {
            color: "#d87c8a"
          },
          itemStyle: {
            normal: {
              color: "#d87c8a"
            }
          }
        },
        ],
        grid:{
          top:20,
          x:70,
          y:20,
          x2:40,
          y2:20,
        },
        // series: data
      });
    },
      _fetchData: function(organId) {
       
      Api.zhsqGetTodayNumber
        .get(
          {type:1},
          {
            pathParams: {
              organId: organId
            }
          }
        )
        .then(res => {
          // debugger
          this.data = res.data.result;
           this.$nextTick(() => {
            this.drawLine("myLine");
          });
          this.data.map(item => {
            this.title.push(item.title);
            this.popData.push(item.popCount);
            this. vehicleData.push(item.vehicleCount);
            this.nonMotorData.push(item.nonMotorCount);
          });
        });
    },
    getData(type){
      if(type == 1){
        this.flag = true
      }else if(type == 7){
        this.flag = false
      }
    } 
  }, 
};
</script>
<style lang="less" scoped>
.title {
  text-align: center;
  padding-top: 5px;
  color: #adb9e4;
  font-size: 18px;
}
.table_change{
  margin: 0 auto;
  width: 132px;
  margin-top: 15px;
  margin-bottom: 10px;
  display: flex;
  border: 1px #8cc7ec solid; 
}
.table_change .table_box{
  width: 66px;
  line-height: 20px;
  text-align: center;
  color: #8cc7ec;
  font-size: 12px;
  cursor:pointer
}
.border_left{
  border-left: 1px #8cc7ec solid;
}
.color{
  background: #04144b;
}
.active_color{
 background: #063c75;
}
.container #myLine {
  margin: 0 auto;
  padding-top:20px;
}
</style>

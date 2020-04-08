<template>
    <div>
        <div class="container">
            <div id="myLine" style="width: 100%;height:160px"></div>
        </div>
    </div>
   
</template>
<script>
import echarts from "echarts";
import Api from "@/common/api.js";
import { getParentParame } from "./mixins.js";
export default {
  mixins: [getParentParame],
  name: "",
  data() {
    return {
      charts: "",
      opinionData: [],
      title: [],
      data: []
    };
  },
  methods: {
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          formatter: "通行车次 : {c}"
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
        grid: {
          top: 20,
          x: 70,
          y: 20,
          x2: 40,
          y2: 20
        },
        series: [
          {
            type: "line",
            symbol: "emptyCircle",
            symbolSize: 8,
            showSymbol: true,
            smooth: true,
            data: this.opinionData,
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
          }
        ]
      });
    },
     _fetchData: function(organId) {
      Api.zhsqGetTodayNumber
        .get(
          { type: 3 },
          {
            pathParams: {
              organId: organId
            }
          }
        )
        .then(res => {
          this.data = res.data.result;
          this.$nextTick(() => {
            this.drawLine("myLine");
          });
          this.data.map(item => {
            this.title.push(item.title);
            this.opinionData.push(item.vehicleCount);
          });
        });
    },
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
.container #myLine {
  margin: 0 auto;
  overflow: hidden;
  overflow-y: hidden;
}
</style>

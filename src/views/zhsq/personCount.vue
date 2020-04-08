<template>
    <div >
     
        <div class="container">
              <h3 class="title flex">
                 今日通行人统计&nbsp;&nbsp;<span class="flexItem" >{{totalNum}}</span>
              </h3>
            <div id="myLine" style="width: 100%;height:250px"></div>
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
      totalNum: 0,
      opinionData: [],
      title: [],
      data: []
    };
  },
  mounted() {
s  },
  methods: {
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          formatter: "通行行人 : {c}"
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
        },
        grid: {
          top: 20,
          x: 70,
          x2: 40
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
                    color: "rgba(255,192,203,0.85)"
                  },
                  {
                    offset: 0.34,
                    color: "rgba(255,192,203,0.55)"
                  },
                  {
                    offset: 1,
                    color: "rgba(255,192,203,0.00)"
                  }
                ])
              }
            },
            lineStyle: {
              color: "#e64e5d"
            },
            itemStyle: {
              normal: {
                color: "#e64e5d"
              }
            }
          }
        ]
      });
    },
    _fetchData: function(organId) {
      Api.zhsqGetTodayNumber
        .get(
          { type: 2 },
          {
            pathParams: {
              organId: organId
            }
          }
        )
        .then(res => {
          debugger
          this.data = res.data.result;
          this.$nextTick(() => {
            this.drawLine("myLine");
          });
          this.data.map(item => {
            this.title.push(item.title);
            this.opinionData.push(item.popCount);
            this.totalNum += item.popCount
          });
        
          
        });
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  font-size: 18px;
  background: url("../../assets/image/zhsq/1.png") no-repeat left center;
  padding-left: 23px;
  line-height: 25px;
  margin: 16px 16px 16px 36px;
}
.box-title1 span {
  color: #8954d4;
  font-size: 24px;
  margin-left: 8px;
}
.container {
  box-sizing: border-box;
  width: 100%;
  height: 301px;

  font-size: 14px;
  color: #adb9e4;
}
.container #myLine {
  margin: 0 auto;
}
</style>

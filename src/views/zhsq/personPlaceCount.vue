<template>
    <div >
        <div class="container">
            <div class="box fl">
                <p>国内人员统计</p>
                  <el-table
                    :data="tableData1"
                    style="width: 100%"
                    :show-header="hiddenHeader"
                    :cell-style="cellStyle"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                    type="index"
                    width="16"
                     :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    width="80"
                     :show-overflow-tooltip="true">
                    </el-table-column>
                    
                    <el-table-column
                    prop="percentage"
                    width="70"
                     :show-overflow-tooltip="true">
                    </el-table-column>
                   
                </el-table>
            </div>
            <div class="box fr">
                <p>境外人员统计</p>
                  <el-table
                    :data="tableData2"
                    style="width: 100%"
                    :show-header="hiddenHeader"
                    :cell-style="cellStyle"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                    type="index"
                    width="16"
                     :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    width="90"
                     :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column
                    prop="count"
                    width="60"
                     :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                    <span>{{ scope.row.count }}人</span>
                     </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
import Api from "@/common/api.js";
import { getParentParame } from "./mixins.js";
export default {
  mixins: [getParentParame],
  data() {
    return {
      hiddenHeader: false,
      tableData1: [],
      tableData2: []
    };
  },
  methods: {
    _fetchData: function(organId) {
      Api.zhsqGetPersonPlaceCount
        .get(
          {},
          {
            pathParams: {
              organId: organId
            }
          }
        )
        .then(res => {
          this.tableData1 = res.data.result;
        });
      Api.zhsqGetPersonCountryCount
        .get(
          {},
          {
            pathParams: {
              organId: organId
            }
          }
        )
        .then(res => {
          this.tableData2 = res.data.result;
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if ((rowIndex + 1) % 2 === 0) {
        return "double"; //对应的类
      } else {
        return "single"; //单行
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        //指定坐标
        return "color: #e94f5b;";
      } else if (rowIndex === 1) {
        return "color: #edab5f;";
      } else if (rowIndex === 2) {
        return "color: #42a028;";
      }
    }
  }
};
</script>
<style lang="less" >
.title {
  text-align: center;
  padding-top: 5px;
  color: #adb9e4;
  font-size: 18px;
}
.container {
  //   background: rgb(25, 25, 112);
  height: 100%;
  padding: 11px 32px 11px 30px;
}
.container .box {
  width: 48%;
  height: 100%;
}
.container .box p {
  padding: 8px;
  color: #adb9e4;
  font-size: 14px;
}
.el-table {
  color: #91d1f7;
}
.el-table .double {
  background: #283359 !important;
}
.el-table .single {
  background: #203e6b !important; //单格
}
.el-table,
.el-table tr,
.el-table th {
  background-color: transparent;
}
.el-table th {
  background: #203e6b !important;
  color: #91d1f7;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: transparent !important;
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 20px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 20px;
}
</style>

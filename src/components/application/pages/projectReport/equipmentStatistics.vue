<template>
  <div class="equipmentStatistics">
    <a-breadcrumb>
        <a-breadcrumb-item>项目报表</a-breadcrumb-item>
        <a-breadcrumb-item>设备统计</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="buttons">
      <a-button @click="searchSwitch=true">查询</a-button>
      <a-button style="margin-left:10px;" @click="reRequst()">刷新</a-button>
      <a-button style="margin:0 10px;" type="primary">打印</a-button>
      <a-button>导出</a-button>
    </div>
    <a-table class="table1" :columns="columns" :dataSource="list" :pagination="false" bordered>
      <template slot="projectName" slot-scope="text">
        <a-tooltip placement="right" :title="text">
          <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
        </a-tooltip>
      </template>
      <template slot="buildingSide" slot-scope="text">
        <a-tooltip placement="right" :title="text">
          <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
        </a-tooltip>
      </template>
      <template slot="supervisionUnit" slot-scope="text">
        <a-tooltip placement="right" :title="text">
          <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
        </a-tooltip>
      </template>
      <template slot="constructionUnit" slot-scope="text">
        <a-tooltip placement="right" :title="text">
          <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
        </a-tooltip>
      </template>
      <template slot="num" slot-scope="text,record,index">
        <span>{{(index+1)}}</span>
      </template>
      <template slot="status" slot-scope="text,record">
        <span
          class="status"
          :style="{background:record.projectStatus==1?'#edf7f1':'#f8f2f1',color:record.projectStatus==1?'#1bd177':'#f6485c'}"
        >{{statuss(record.projectStatus)}}</span>
        <span
          class="status"
          v-if="record.wisdomProject"
          style="color:#1890ff;background:#e6f7ff"
        >智慧工程</span>
        <span
          class="status"
          style="color:#fa8c16;background:#fff7e6;"
        >{{record.demoProject==1?'示范':'非示范'}}</span>
      </template>
    </a-table>
    <a-pagination
      showQuickJumper
      class="pagination"
      @change="preNextPage"
      :defaultCurrent="pageNum"
      :defaultPageSize="pageSize"
      :total="total"
    />
    <!-- 查询界面 -->
    <div v-if="searchSwitch" class="searchBlock">
      <div class="bac" @click="searchSwitch=false"></div>
      <div class="cont">
        <div class="selects">
          <span>项目状态：</span>
          <div>
            <a-select
              style="width:100%;"
              :defaultValue="show_searchData.projectStatus"
              @change="selectProjectStatus"
            >
              <a-select-option value="1">筹备</a-select-option>
              <a-select-option value="3">在建</a-select-option>
              <a-select-option value="4">完工</a-select-option>
              <a-select-option value="5">停工</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="selects">
          <span>项目名称：</span>
          <div>
            <a-select
              style="width:100%;"
              :defaultValue="show_searchData.projectName"
              @change="selectProjectName"
            >
              <a-select-option
                :value="item.projectName"
                v-for="(item,index) in projectList"
                :key="'pro'+index"
              >{{item.projectName}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="selects">
          <span>建设单位：</span>
          <div>
            <input style="width:100%" v-model="show_searchData.buildingSide" type="text" />
          </div>
        </div>
        <div class="selects">
          <span>监理单位：</span>
          <div>
            <input style="width:100%" v-model="show_searchData.supervisionUnit" type="text" />
          </div>
        </div>
        <div class="selects">
          <span>施工单位：</span>
          <div>
            <input style="width:100%" v-model="show_searchData.constructionUnit" type="text" />
          </div>
        </div>
        <div class="buttons">
          <a-button @click="searchSwitch=false">取消</a-button>
          <a-button type="primary" @click="submitSearch()">查询</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {projectStatus,technicalTypes} from "../../../../utils/dataDictionary.js";
import { pullProjectLists } from "../../../../utils/pubFunc.js";
export default {
  data() {
    return {
      // 查询界面开关
      searchSwitch: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      columns: [
        {
          title: "序号",
          align: "center",
          scopedSlots: { customRender: "num" }
        },
        {
          title: "项目名称",
          align: "center",
          dataIndex: "projectName",
          scopedSlots: { customRender: "projectName" }
        },
        {
          title: "建设单位",
          align: "center",
          dataIndex: "buildingSide",
          scopedSlots: { customRender: "buildingSide" }
        },
        {
          title: "监理单位",
          align: "center",
          dataIndex: "supervisionUnit",
          scopedSlots: { customRender: "supervisionUnit" }
        },
        {
          title: "施工单位",
          align: "center",
          dataIndex: "constructionUnit",
          scopedSlots: { customRender: "constructionUnit" }
        },
        {
          title: "项目状态",
          align: "center",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "环境监测状态",
          align: "center",
          dataIndex: "environmentStatus"
        },
        {
          title: "摄像头个数",
          align: "center",
          dataIndex: "sheXiangTou"
        },
        {
          title: "起重设备个数",
          align: "center",
          dataIndex: "qiZhongJi"
        },
        {
          title: "升降设备个数",
          align: "center",
          dataIndex: "shengJiangJi"
        }
      ],
      list: [],
      // 查询用数据
      searchData: {
        projectStatus: "",
        projectName: "",
        buildingSide: "",
        supervisionUnit: "",
        constructionUnit: ""
      },
      show_searchData: {
        projectStatus: "",
        projectName: "",
        buildingSide: "",
        supervisionUnit: "",
        constructionUnit: ""
      },
      // 项目列表
      projectList: []
    };
  },
  watch: {
    searchSwitch: function(n, o) {
      if (n) {
        // 拉取项目列表
        pullProjectLists(this).then(res => {
          this.projectList = res;
        });
      } else {
        this.show_searchData = {
          projectStatus: "",
          projectName: "",
          buildingSide: "",
          supervisionUnit: "",
          constructionUnit: ""
        }
      }
    }
  },
   mounted() {
    this.getDeviceStatistics();
  },
  methods: {
    // 获取实名制管理报表
    getDeviceStatistics() {
      this.$axios
        .post('/t_dz_device/selectDeviceStatistics', {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.searchData
        })
        .then(res => {
          this.list = res.data;
          this.total = res.count;
          this.searchSwitch=false
        });
    },
    //项目状态字典
    statuss(num) {
      return projectStatus(num);
    },
    // 翻页
    preNextPage(e) {
      this.pageNum = e;
      this.DeviceStatistics()
    },
    //岗位数组字典
    gangWei(num) {
      return technicalTypes(num);
    },
    // 查询项目状态选择
    selectProjectStatus(e) {
      this.show_searchData.projectStatus = e;
    },
    // 查询项目名称选择
    selectProjectName(e) {
      this.show_searchData.projectName = e;
    },
    // 提交查询
    submitSearch() { 
        // if(!this.show_searchData.projectStatus){
        //     this.$message.warning('请选择项目状态')
        // }else if(!this.show_searchData.projectName){
        //     this.$message.warning('请选择项目名称')
        // }else if(!this.show_searchData.buildingSide){
        //     this.$message.warning('请输入建设单位')
        // }else if(!this.show_searchData.supervisionUnit){
        //     this.$message.warning('请输入监理单位')
        // }else if(!this.show_searchData.constructionUnit){
        //     this.$message.warning('请输入施工单位')
        // }else{
            this.pageNum = 1;
            this.searchData = JSON.parse(JSON.stringify(this.show_searchData));
            this.getDeviceStatistics();
        // }   
    },
    reRequst() {
      this.pageNum = 1;
      this.searchData = {
        projectStatus: "",
        projectName: "",
        buildingSide: "",
        supervisionUnit: "",
        constructionUnit: ""
      }
      this.getDeviceStatistics();
    }
  }
};
</script>
<style lang="less" scoped>
.equipmentStatistics {
    height: 100%;
    overflow-y: scroll;
    position: relative;
    padding: 10px;
    .buttons {
      text-align: right;
      margin-bottom: 20px;
    }
    .status {
        font-size: 10px !important;
        display: block !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .status:nth-of-type(2) {
        margin: 5px 0;
    }
    .searchBlock {
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        left: 0;
        top: 0;
        z-index: 99;
        .bac {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        }
        .cont {
        background: #fff;
        position: absolute;
        width: 40%;
        left: 50%;
        top: 20%;
        transform: translateX(-50%);
        box-sizing: border-box;
        padding: 20px 40px;
        border-radius: 4px;
        .selects {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          span {
            width:30%;
          }
          div {
            width: 70%;
            input {
              border: 1px solid #d9d9d9;
              height: 30px;
              box-sizing: border-box;
              border-radius: 4px;
              padding: 11px;
            }
          }
        }
        .buttons {
            margin: 0 auto;
            width: 60%;
            display: flex;
            justify-content: space-between;
        }
        }
    }
}
    .pagination {
    text-align: right;
    margin-top: 10px;
    }
</style>
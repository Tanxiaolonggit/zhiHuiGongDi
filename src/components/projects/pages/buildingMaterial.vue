<template>
  <div class="building">
    <div class="tab">
      <span :style="{color:type==0?'#1890ff':'#333',borderColor:type==0?'#1890ff':'transparent'}" @click="tabPage(0)">概括</span>
      <span :style="{color:type==1?'#1890ff':'#333',borderColor:type==1?'#1890ff':'transparent'}" @click="tabPage(1)">出厂合格证{{certificates+'份'}}</span>
      <span :style="{color:type==2?'#1890ff':'#333',borderColor:type==2?'#1890ff':'transparent'}" @click="tabPage(2)">抗压强度报告{{pressure+'份'}}</span>
      <span :style="{color:type==3?'#1890ff':'#333',borderColor:type==3?'#1890ff':'transparent'}" @click="tabPage(3)">抗折强度报告{{bending+'份'}}</span>
      <span :style="{color:type==4?'#1890ff':'#333',borderColor:type==4?'#1890ff':'transparent'}" @click="tabPage(4)">抗渗强度报告{{leakage+'份'}}</span>
    </div>
    <div>
      <div v-if="type==0" class="tabsOne">
        <div class="basicMsg">
          <div class="basicMsgLeft">
            <div id="echarss" style="height:400px;"></div>
          </div>
          <div v-if="materialBasic" class="basicMsgRight">
            <section>
              <span class="spanOne">混凝土搅拌站</span>
              <span>{{materialBasic.mixer}}</span>
            </section>
            <section>
              <span class="spanOne">供应车次</span>
              <span class="spanTwo">
                {{materialBasic.supplyCarNum}}
                <span>车</span>
              </span>
            </section>
            <section>
              <span class="spanOne">供应量</span>
              <span class="spanTwo">
                {{Number(materialBasic.supplyCount).toFixed(2)}}
                <span>吨</span>
              </span>
            </section>
          </div>
        </div>
        <div class="list">
          <div style="text-align:center;margin:30px 0 10px 0;"><a-range-picker @change="dateChange" /></div>           
          <a-table :columns="columns0" :dataSource="list" :pagination='false'  bordered>
          </a-table>
          <a-pagination style="text-align:right;margin-top:10px;"  class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
        </div>
      </div>
      <div v-if="type==1" class="tabother">
            <div>
                <div style="text-align:center;margin:10px 0;"><a-range-picker @change="dateChange" /></div>           
                <a-table :columns="columns1" :dataSource="list" :pagination='false'  bordered>
                    <template slot="checkWay" slot-scope="text">
                        <span>{{text==0?'统计方法':'非统计方法'}}</span>
                    </template>
                    <template slot="caozuo" slot-scope="record">
                        <a @click="chaKanDetail(record)">详情</a>
                    </template>
                </a-table>
                <a-pagination  class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
            </div>
      </div>
      <div v-if="type==2" class="tabother">
            <div>
                <div style="text-align:center;margin:10px 0;"><a-range-picker @change="dateChange" /></div>           
                <a-table :columns="columns2" :dataSource="list" :pagination='false'  bordered>
                    <template slot="caozuo" slot-scope="record">
                        <a @click="chaKanDetail(record)">详情</a>
                    </template>
                </a-table>
                <a-pagination  class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
            </div>
      </div>
      <div v-if="type==3" class="tabother">
            <div>
                <div style="text-align:center;margin:10px 0;"><a-range-picker @change="dateChange" /></div>           
                <a-table :columns="columns3" :dataSource="list" :pagination='false'  bordered>
                    <template slot="caozuo" slot-scope="record">
                        <a @click="chaKanDetail(record)">详情</a>
                    </template>
                </a-table>
                <a-pagination  class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
            </div>
      </div>
      <div v-if="type==4" class="tabother">
            <div>
                <div style="text-align:center;margin:10px 0;"><a-range-picker @change="dateChange" /></div>           
                <a-table :columns="columns4" :dataSource="list" :pagination='false'  bordered>
                    <template slot="caozuo" slot-scope="record">
                        <a @click="chaKanDetail(record)">详情</a>
                    </template>
                </a-table>
                <a-pagination  class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
            </div>
      </div>
    </div>
    <div v-if='detailModal' class="detailModal">
        <div class="bac" @click="detailModal=null"></div>
        <div class="cont">
            <div class="title">
              {{type==1?'出厂合格证':type==2?'抗压强度报告':type==3?'抗折强度报告':'抗渗强度报告'}}
            </div>
            <div class='block' v-if='type==1'>
                <div>
                  <section><span>发证日期:</span><span>{{detailModal.cerfnDate}}</span></section>
                  <section><span>组数:</span><span>{{detailModal.groupNum}}</span></section>
                  <section><span>判定系数:</span><span>{{detailModal.judgeFactor}}</span></section>
                </div>
                <div>
                  <section><span>合格证编号:</span><span>{{detailModal.cerfnNum}}</span></section>
                  <section><span>评定方法:</span><span>{{detailModal.checkWay}}</span></section>
                  <section><span>结论:</span><span>{{detailModal.checkResult}}</span></section>
                </div>
                <div>
                  <section><span>搅拌站:</span><span>{{detailModal.mixer}}</span></section>
                  <section><span>强度偏差:</span><span>{{detailModal.strengthGap}}</span></section>
                </div>
            </div>
            <div class='block' v-else>
                <div>
                  <section><span>检验日期:</span><span>{{detailModal.checkDate}}</span></section>
                  <section><span>设计强度等级:</span><span>{{detailModal.strengthGrade}}</span></section>
                  <section><span>强度百分比(%):</span><span>{{detailModal.strengthPercent}}</span></section>
                  <section><span>成型日期:</span><span>{{detailModal.moldingDate}}</span></section>
                </div>
                <div>
                  <section><span>报告编码:</span><span>{{detailModal.reportNum}}</span></section>
                  <section><span>设计强度代表值(MPa):</span><span>{{detailModal.strengthGrade}}</span></section>
                  <section><span>尺寸(%):</span><span>{{detailModal.sampleSize}}</span></section>
                  <section><span>结论:</span><span>{{detailModal.checkResult}}</span></section>
                </div>
                <div>
                  <section><span>工程部位:</span><span>{{detailModal.projectUse}}</span></section>
                  <section><span>实际强度代表值(MPa):</span><span>{{detailModal.realQLevel}}</span></section>
                  <section><span>养护条件:</span><span>{{detailModal.curingCondition}}</span></section>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import {serverTimestamp} from '../../../utils/util_one.js'
export default {
  data() {
    return {
      checkDateBegin:'',
      checkDateEnd:'',
      projectId: this.$route.params.projectId,
      // 出厂合格证
      certificates: 0,
      // 抗压强度
      pressure: 0,
      // 抗折强度
      bending: 0,
      // 抗渗强度
      leakage: 0,
      // 趋势表格数据
      monthProvideMap: [],
      //概况基本信息
      materialBasic: null,
      // 报告类型
      type: 0,
      // 建材管理列表
      pageSize: 10,
      pageNum: 1,
      total: 0,
      list: [],
      // 概况下方表格
      columns0:[
        {
          title: "生产日期",
          align: "center",
          dataIndex: "productionDate"
        },
        {
          title: "工程部位",
          align: "center",
          dataIndex: "projectUse"
        },
        {
          title: "强度等级",
          align: "center",
          dataIndex: "strengthLevel"
        },
        {
          title: "搅拌站",
          align: "center",
          dataIndex: "mixer"
        },
        {
          title: "供应量(吨)",
          align: "center",
          dataIndex: "supplyCount"
        }
      ],
      // 出厂合格
      columns1: [
        {
          title: "检测日期",
          align: "center",
          dataIndex: "checkDate"
        },
        {
          title: "强度偏差",
          align: "center",
          dataIndex: "strengthGap"
        },
        {
          title: "混凝土供应商",
          align: "center",
          dataIndex: "supplyCompany"
        },
        {
          title: "结论",
          align: "center",
          dataIndex: "checkResult"
        },
        {
          title: "操作",
          align: "center",
          scopedSlots: { customRender: "caozuo" }
        }
      ],
      //抗压强度   
      columns2: [
        {
          title: "检测日期",
          align: "center",
          dataIndex: "checkDate"
        },
        {
          title: "检验方式",
          align: "center",
          dataIndex: "checkWay",
          scopedSlots: { customRender: "checkWay" }
        },
        {
          title: "工程部位",
          align: "center",
          dataIndex: "projectUse"
        },
        {
          title: "设计强度等级",
          align: "center",
          dataIndex: "idealQLevel"
        },
        {
          title: "实际强度",
          align: "center",
          dataIndex: "realQLevel"
        },
        {
          title: "混凝土供应商",
          align: "center",
          dataIndex: "supplyCompany"
        },
        {
          title: "结论",
          align: "center",
          dataIndex: "checkResult"
        },
        {
          title: "操作",
          align: "center",
          scopedSlots: { customRender: "caozuo" }
        }
      ],
      // 扛折
      columns3: [
        {
          title: "检测日期",
          align: "center",
          dataIndex: "checkDate"
        },
        {
          title: "工程部位",
          align: "center",
          dataIndex: "projectUse"
        },
        {
          title: "设计强度等级",
          align: "center",
          dataIndex: "idealQLevel"
        },
        {
          title: "实际强度",
          align: "center",
          dataIndex: "realQLevel"
        },
        {
          title: "混凝土供应商",
          align: "center",
          dataIndex: "supplyCompany"
        },
        {
          title: "结论",
          align: "center",
          dataIndex: "checkResult"
        },
        {
          title: "操作",
          align: "center",
          scopedSlots: { customRender: "caozuo" }
        }
      ],
      //抗渗强度
      columns4: [
        {
          title: "检测日期",
          align: "center",
          dataIndex: "checkDate"
        },
        {
          title: "工程部位",
          align: "center",
          dataIndex: "projectUse"
        },
        {
          title: "设计强度等级",
          align: "center",
          dataIndex: "idealQLevel"
        },
        {
          title: "实际强度",
          align: "center",
          dataIndex: "realQLevel"
        },
        {
          title: "混凝土供应商",
          align: "center",
          dataIndex: "supplyCompany"
        },
        {
          title: "结论",
          align: "center",
          dataIndex: "checkResult"
        },
        {
          title: "操作",
          align: "center",
          scopedSlots: { customRender: "caozuo" }
        }
      ],
      //详情
      detailModal:null   
    };
  },
  watch: {
    type: function(n, o) {
      this.pageNum=1;
      this.checkDateBegin='';
      this.checkDateEnd='';
      if (n == 0) { 
        this.getMonthProvide();
        this.getMaterialBasic();
        this.getSelectMaterial();
      }else{
        this.getMaterialReport(this.type - 1);
      }
      this.getReportNum();
    }
  },
  mounted() {
    this.getMonthProvide();
    this.getMaterialBasic();
    this.getSelectMaterial();
    this.getReportNum();
  },
  methods: {
    // 标签页切换
    tabPage(e) {
      if (e != this.type) {
        this.type = e;
      }
    },
    //查询趋势
    getMonthProvide() {
      this.$axios
        .post("/t_dz_material/selectMaterialMonthProvide", {
          projectId: this.projectId
        })
        .then(res => {
          this.monthProvideMap = res.data;
          this.createEchar();
        });
    },
    // 查询概况基本信息
    getMaterialBasic() {
      this.$axios
        .post("/t_dz_material/selectMaterialBasic", {
          projectId: this.projectId,
          pageSize: 1,
          pageNum: 10
        })
        .then(res => {
          this.materialBasic = res.data[0];
        });
    },
    // 查询概况下方表格
    getSelectMaterial(){
      this.$axios.post('/t_dz_material/selectMaterial',{
        projectId: this.projectId,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        productionDateBegin:this.checkDateBegin,
        productionDateEnd:this.checkDateEnd,
      }).then((res)=>{
        this.total = res.count;
        this.list=res.data;
      })
    },
    // 获取建材管理报告列表
    getMaterialReport(num) {
      this.$axios
        .post("/t_dz_materialreport/selectMaterialReport", {
          projectId: this.projectId,
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          reportType: num,
          checkDateBegin:this.checkDateBegin,
          checkDateEnd:this.checkDateEnd,
        })
        .then(res => {
          this.total = res.count;
          this.list = res.data;
        });
    },
    // 获取报告的数量
    getReportNum(){
        this.$axios.post('/t_dz_materialreport/selectMaterialReportFilesCount',{
          projectId: this.projectId,
        }).then((res)=>{
            res.data.forEach((item)=>{
                switch(parseInt(item.reportType)){
                    case 0:
                        this.certificates=item.reportTypeCount
                        break;
                    case 1:
                        this.pressure=item.reportTypeCount
                        break;
                    case 2:
                        this.bending=item.reportTypeCount
                        break;
                    case 3:
                        this.leakage=item.reportTypeCount
                        break;          
                }
            })
        })
    },
    // 翻页
    preNextPage(e) {
      this.pageNum = e;
      if(this.type==0){
        this.getSelectMaterial();
      }else{
        this.getMaterialReport(this.type-1);
      }
      
    },
    // 查看详情
    chaKanDetail(record) {
        this.detailModal=record
    },
    // 选择日期
    dateChange(e){
      if(e.length==2){
        this.checkDateBegin=serverTimestamp(e[0]._d)
        this.checkDateEnd=serverTimestamp(e[1]._d)
        if(this.type==0){
          this.getSelectMaterial()
        }else{
          this.getMaterialReport(this.type - 1);
        }
      }
    },
    // 生成趋势图标
    createEchar() {
      let myChart = this.$echarts.init(document.getElementById("echarss"));
      let times = this.monthProvideMap.map(item => {
        return item.materialMonth;
      });
      let data = this.monthProvideMap.map(item => {
        return item.supplyCount;
      });
      let option = {
        title: {
          text: "近一年混凝土供应趋势"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["混凝土月供应量"]
        },
        calculable: true,
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     // containLabel: true
        // },
        xAxis: [
          {
            type: "category",
            data: times
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} 吨"
            }
          }
        ],
        series: [
          {
            name: "混凝土月供应量",
            type: "bar",
            data: data
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.building {
  height: 100%;
  overflow-y: scroll;
  background: #fff;
  padding-top: 10px;
  box-sizing: border-box;
  .tab{
      margin-bottom: 20px;
      span{
          display: inline-block;
          margin:0 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid;
          cursor: pointer;
      }
  }
  .tabsOne {
    box-sizing: border-box;
    padding: 20px;
    .basicMsg {
        display:flex;
      .basicMsgLeft {
          flex: 1;
      }
      .basicMsgRight {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        section {
          font-size: 16px;
          margin-bottom: 30px;
          display: flex;
          span {
            display: block;
          }
          .spanOne {
            display: inline-block;
            width: 35%;
            margin-right: 20px;
          }
          .spanTwo {
            color: rgb(0, 139, 69);
            font-size: 22px;
            span {
              display: inline;
              font-size: 16px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  .tabother{
    box-sizing: border-box;
    padding: 20px;
    text-align: right;
    .pagination {
      margin-top: 10px;
    }
  }
}
.detailModal{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .bac{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5)
    }
    .cont{
        width: 80%;
        position: absolute;
        top: 30%;
        left:50%;
        transform: translateX(-50%);
        background: #fff;
        .title{
          padding:20px 20px 0 20px;
          font-size: 18px;
          color: #333;
          font-weight: 600;
        }
        .block{
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          padding: 20px;
          box-sizing: border-box;
          div{
            section{
              span{
                line-height: 28px;
              }
              span:nth-of-type(1){
                margin-right:20px;
              }
            }
          }
        }
    }
}
</style>
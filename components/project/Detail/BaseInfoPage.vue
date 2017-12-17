<template>
<div class="detail-pages">
  <div class="type-veiws">
    <div class="img-content" :style="{backgroundColor: project.theme.themeType.color}">
      <i :class="project ? project.theme.themeType.icon : ''" />
    </div>
  </div>

  <h2 class="project-title">{{project ? project.name : ''}}</h2>
  <hr />
  <div class="actions">
    <el-popover
      ref="popover1"
      placement="bottom"
      width="400"
      trigger="click">
      <el-button type="text">单位情况</el-button>
      <el-button type="text" @click="handleShowGuidePDF">申报指南</el-button>
      <el-button type="text" @click="handleShowProjectDiff">项目查重</el-button>
      <el-button type="text" @click="handleShowInvoiceDiff">发票查重</el-button>
      <el-button type="text">历史项目</el-button>
      <el-button type="text">税收贡献</el-button>
      <el-button type="text">企业信用</el-button>
    </el-popover>
    <el-button type="primary" @click="handleShowProjectPDF"><i class="el icon-shenpitongguo" title="项目申请书"></i></el-button>
    <el-button type="primary" @click="handleShowAttachments"><i class="el icon-fujian" title="附件"></i></el-button>
    <el-button type="primary" v-popover:popover1><i class="el icon-quanbu" title="更多"></i></el-button>
  </div>
  <hr />
  <div class="subhead">
    <div class="time-info">
      <p><span class="title">申报金额：</span><span class="money">¥ {{project ? project.money : '' | formatMoneyToWan}} 万</span></p>
      <p><span class="title">申报单位：</span><span class="org">{{project ? project.organization.name : ''}}</span></p>
      <p><span class="title">专题类型：</span>{{project ? project.theme.themeType.name : ''}}</p>
      <p><span class="title">项目编号：</span>{{project ? project.code : ''}}</p>
      <p><span class="title">申报日期：</span><span class="time">{{project ? project.requestDate : ''}}</span></p>
      <p><span class="title">负&nbsp;&nbsp;责&nbsp;&nbsp;人：</span>{{ project ? project.contactPerson : '' }}</p>
      <p><span class="title">联系电话：</span>{{ project ? project.contactPhone : '' }}</p>
      <p><span class="title">项目介绍：</span>{{ project ? project.description : '' }}</p>
    </div>
  </div>
</div>
</template>

<script>
import EventHub from './EventHub'

export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    showProjectDialog: {
      type: Function,
      required: true
    },
    showInvoiceDialog: {
      type: Function,
      required: true
    }
  },
  methods: {
    async handleShowProjectPDF() {
      EventHub.$emit('show-project-pdf', this.project)
    },
    async handleShowGuidePDF() {
      EventHub.$emit('show-guide-pdf', this.project)
    },
    async handleShowAttachments() {
      EventHub.$emit('show-attachments', this.project)
    },
    async handleShowProjectDiff() {
      const data = await this.$store.dispatch('GetProjectDiff', this.project.id)
      const projectDiff = {
        visible: true,
        data
      }
      this.showProjectDialog(projectDiff)
    },
    async handleShowInvoiceDiff() {
      const data = await this.$store.dispatch('GetInvoiceDiff', this.project.id)
      const invoiceDiff = {
        visible: true,
        data
      }
      this.showInvoiceDialog(invoiceDiff)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-pages {
  position: relative;
  height: 100%;
  padding: 25px;
  overflow: initial;
  background: #fbf9fa;
  font-size: 14px;
  .project-title {
    text-align: center;
    font-size: 16px;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .time-info {
    padding: 10px 35px;
    p {
      margin: 0 0 6px;
    }
  }
  .el-button--primary {
    background-color: #b1040e;
    border-color: #b1040e;
  }
  .money {
    color: red;
  }
  .org {
    color: #4490db;
  }
}
.actions {
  text-align: center;
  .el-button {
    width: 55px;
    height: 55px;
    text-align: center;
    padding: 0;
    border-radius: 100%;
    background-color: #fff;
    border-color: #fff;
    color: #e53a43;
  }
}
.type-veiws {
  .f-content {
    width: 48px;
    right: 22px;
    position: absolute;
    z-index: 11;
    color: white;
    .day {
      span {
          font-size: 14px;
          letter-spacing: 1px;
      }
    }
    p {
      margin: 0;
    }
  }
  .img-content {
    position: relative;
    i {
      color: #fff;
      font-size: 32px;
      line-height: 60px;
    }
    background-color: #21a6f5;
    border-radius: 5px;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    text-align: center;
    img {
      z-index: 1;
      width: 42px;
      margin: 0;
      right: 24px;
      top: 0;
      position: absolute;
    }
  }

  .last-time {
    border-radius: 0 50% 50% 0/180%;
    margin-top: 20px;
    width: 100px;
    line-height: 26px;
    height: 30px;
    padding: 3px 6px;
    background: #a0a0a0;
    color: white;
    text-align: left;
  }

    .type-operation {
      i {
        font-size: 16px;
      }
      margin-left: -10px;
      margin-right: -10px;
      text-align: center;
      width: 180px;
      margin: 0 auto;
      line-height: 24px;
      padding: 12px;
      color: #5a5a5a;
      font-weight: 300;
    }
}

.type-desc-content {
  position: relative;
  width: 83%;
  margin: 30px auto;
  height: 100%;
  .subhead {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .time-info {
    color: #4a4a4a;
    padding: 10px 0;
    margin-bottom: 0;
    border-bottom: 1px solid #efefef;
    .title {
      color: #666;
    }
    .money {
      color: $theme-color;
      font-size: 16px;
    }
    .time {
      color: #2196F3;
    }
    p {
      margin: 0 0 10px;
      line-height: 28px;
      font-size: 12px;
    }
  }
  .important {
    margin: 5px 0;
    font-size: 18px;
  }
  p {
    margin: 0;
  }

  h3 {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 25px;
    margin-top: 20px;
  }
  .desc {
    font-size: 12px;
    color: #4a4a4a;
    line-height: 28px;
  }
  .submit {
    margin-top: 25px;
    margin-bottom: 45px;
    button {
      width: 170px;
      height: 42px;
      font-size: 18px;
    }
  }

}
</style>

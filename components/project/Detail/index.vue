<template>
<div class="fc-dialog">
  <el-dialog
    :style="{background: 'url(' + G.path.resolvePicPath('/project/detail/bg.jpg') + ') no-repeat'}"
    class="book-dialog el-dialog--full" :visible="visible" :before-close="handleCloseDialog" size="full"
    top="2%">
    <el-button class="btn-back" type="primary" @click="handleCloseDialog">返 回</el-button>
    <!-- <div class="seal-todo"></div> -->
    <Container :index.sync="index" :pages="pages" :handlePrePage="handlePrePage" :handleNextPage="handleNextPage" :handleChangePage="handleChangePage">
      <div v-if="pages.length > 0" class="first-page" :style="{zIndex: index === 0 ? 999 : 0}">
        <BaseInfoPage :project="project" @handle-next-page="handleNextPage" :enableSteps="enableSteps" :enableLogs="enableLogs" :enableApprove="enableApprove" :showProjectDialog="handleShowProjectDiff" :showInvoiceDialog="handleShowInvoiceDiff" />
      </div>
      <div id="pages">
        <template v-for="(item,key) in pages">
          <div :key="key" class="page">
            <AuditPage :project="project" :logs="logs" @handle-next-page="handleNextPage" :enableSteps="enableSteps" :enableLogs="enableLogs" :enableApprove="enableApprove" :showProjectDialog="handleShowProjectDiff" :showInvoiceDialog="handleShowInvoiceDiff" />
          </div>
          <div v-if="pages.length > 1 && key < pages.length - 1" :key="key" class="page">
            <BaseInfoPage :project="project" @handle-next-page="handleNextPage" :enableSteps="enableSteps" :enableLogs="enableLogs" :enableApprove="enableApprove" :showProjectDialog="handleShowProjectDiff" :showInvoiceDialog="handleShowInvoiceDiff" />
          </div>
        </template>
      </div>
    </Container>
    <div class="page-number">
      {{ index + 1 }} / {{ pages.length }}
    </div>
  </el-dialog>
<!--
  <ProjectPDF />

  <GuidePDF />
  -->
  <!--
  <ProjectAttachments :datas="project" />
-->
  <!--
  <ProjectDiff :visible.sync="projectDiff.visible" :data="projectDiff.data" />
  <InvoiceDiff :visible.sync="invoiceDiff.visible" :data="invoiceDiff.data" />
-->
</div>
</template>

<script>
require('~/libs/plugins/turn')
import BaseInfoPage from './BaseInfoPage'
import AuditPage from './AuditPage'
// import ProjectPDF from './ProjectPDF'
// import GuidePDF from './GuidePDF'
// import ProjectAttachments from './Attachments'
import ProjectDiff from './ProjectDiff'
// import InvoiceDiff from './InvoiceDiff'
import Container from './Container'
import EventHub from './EventHub'
import apiProject from '~/libs/api/project'
import apiAudit from '~/libs/api/audit'

export default {
  name: 'projectDetail',
  components: {
    AuditPage,
    BaseInfoPage,
    // ProjectPDF,
    // GuidePDF,
    // ProjectAttachments,
    ProjectDiff,
    // InvoiceDiff,
    Container
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    index: {
      type: Number,
      default: 0
    },
    pages: {
      type: Array,
      required: true,
      default: []
    },
    enableSteps: {
      type: Boolean,
      default: false
    },
    enableLogs: {
      type: Boolean,
      default: false
    },
    enableApprove: {
      type: Boolean,
      default: false
    },
    updatePageList: {
      type: Function
    }
  },
  data() {
    return {
      projectDiff: {
        visible: false,
        data: []
      },
      invoiceDiff: {
        visible: false,
        data: []
      },
      logs: []
    }
  },
  asyncComputed: {
    async project() {
      if (this.pages.length <= 0) {
        return {
          organization: {},
          theme: {
            themeType: {}
          }
        };
      }
      const data = await apiProject.get({requestId: this.pages[this.index].id})
      console.info(data)
      this.updateProjectInfo(this.pages[this.index].id)
      EventHub.$emit('turn-set-page', this.index);
      return data
    }
  },
  methods: {
    handleCloseDialog(done) {
      this.$emit('update:visible', false)
      if (this.updatePageList) this.updatePageList();
      done();
    },
    handleShowProjectDiff(projectDiff) {
      this.projectDiff = projectDiff
    },
    handleShowInvoiceDiff(invoiceDiff) {
      this.invoiceDiff = invoiceDiff
    },
    async updateProjectInfo(id) {
      if (this.enableLogs) {
        let logs = await  apiAudit.logs({requestId: id}) // this.$store.dispatch('GetDeclareLogs', id);
        this.logs = logs;
      }
    },
    handlePrePage() {
      this.$emit('update:index', this.index - 1)
    },
    handleChangePage(index) {
      this.$emit('update:index', index)
    },
    handleNextPage() {
      if ((this.index + 1) < this.pages.length) {
        this.$emit('update:index', this.index + 1)
      } else {
        this.$message.success('操作成功，已到最后一页');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fc-dialog {
    .btn-back {
      position: absolute;
      left: -53px;
      top: 0;
      padding-right: 8px;
      padding-left: 6px;
      border-radius: 0 3px 3px 0;
      background-color: #eb3240;
      border-color: #eb3240;
      border-left: 0;
      &::before {
        content:"";
        position: absolute;
        right: 100%;
        top: -1px;
        width: 0;
        height: 0;
        border-top: 16px solid transparent;
        border-right: 12px solid #eb3240;
        border-bottom: 16px solid transparent;
      }
    }
    /deep/.el-dialog {
      min-width: 1000px;
      top: 5% !important;
    }
    .book-dialog {
      // background: url(../../../assets/project/bg.jpg) no-repeat;
      background-size: cover;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    .book-dialog /deep/.el-dialog {
        background-color: rgba(0,0,0,.1);
        top: 0 !important;
        margin-top: 2%;
        width: 78%;
        max-width: 1200px;
        height: 90%;
        max-height: 750px;
        overflow: initial;
        .el-dialog__header {
          display: none;
        }
        .el-dialog__body {
            background: #fff;
            height: 100%;
            padding: 0;
            margin: 0;
            .el-tabs__header {
              text-align: center;
            }
            .el-tabs__nav {
              float: none;
              display: inline-block;
            }
        }
    }
    .page {
      background: #fff;
    }
    .page-number {
      position: absolute;
      right: 15px;
      bottom: 10px;
    }
}

.first-page {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
}

#pages {
  height: 100%;
}
/*
.seal-todo {
  position: absolute;
  top: 30px;
  right: 0;
  width: 77px;
  height: 108px;
  z-index: 1;
  background: url(../../../assets/gov/seal-todo.png) no-repeat;
  background-size: contain;
}
*/

.projectPDF, .guidePDF {
  height: 530px;
  overflow: auto;
}

@media (min-width: 1600px) {
  .projectPDF, .guidePDF {
    height: 800px;
  }
}

@media (min-width: 1900px) {
  .projectPDF, .guidePDF {
    height: 900px;
  }
}
</style>

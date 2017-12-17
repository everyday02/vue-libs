<template>
<div class="detail-pages">
  <div class="approve-logs" v-if="enableLogs" :style="{height: enableApprove ? '40%' : '90%'}">
    <ul>
      <li :key="key" v-for="(item, key) in logs ? logs : []">
        {{ `【${item.action}】 ${item.flowNode ? item.flowNode.name : ''}` }}
        <span v-if="G.auth.isGov()">
          ({{item.user.name}})
        </span>
        <span class="date">{{ moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
        <br />
        <p class="remark">{{ item.remark }}</p>
        <p v-if="item.attachments">
          &nbsp;&nbsp;&nbsp;附件：<a v-bind:href="item.attachments[0].url" target="_blank">{{item.attachments[0].name}}</a>
        </p>
      </li>
    </ul>
  </div>
  <div v-if="enableApprove" class="approve text-center">
    <hr />
    <el-form label-position="left" label-width="180px" style="width: 90%; margin: 0 auto;">
      <el-form-item label="具体意见（300字以内）：" label-width="160px">
        <el-select v-model="region" placeholder="常用意见" @change="changeRemark" @visible-change="getRemarks">
          <el-option
            v-for="item in remarks"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-input type="textarea" placeholder="请输入你的意见描述" v-model="remark" :rows="6"></el-input>
      <el-form-item label-width="0" class="approve-actions">
        <el-row>
          <el-col :span="6">
            <el-upload
              class="no-upload-input"
              :file-list="[]"
              action=""
              :before-upload="function (file) {
                submitUpload(file)
                return false;
              }">
              <el-button slot="trigger" type="text" class="btn-fujian"><span class="el icon-fujian"></span> 上传附件</el-button>
              <div v-if="attachment.name" class="upload-file">
                {{ attachment.name }}
                <span class="remove-file" @click="handleRemoveFile">&nbsp;&nbsp;删除</span>
              </div>
            </el-upload>
          </el-col>
          <el-col :span="18">
            <el-button style="z-index: 99" @click="handleReject('退回修改')">退回修改</el-button>
            <el-button style="z-index: 99" @click="handleReject('不予申报')">不予申报</el-button>
            <el-button style="z-index: 99" type="primary" @click="handleAgree">同意</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import apiUtils from '~/libs/api/utils';

export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    enableLogs: {
      type: Boolean,
      default: false
    },
    logs: {
      type: Array,
      default: []
    },
    enableApprove: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      action: '同意',
      region: '',
      remark: '',
      attachment: {},
      remarks: []
    };
  },
  methods: {
    moment(date) {
      return moment(date);
    },
    async getRemarks(visible) {
      if (visible) {
       const remarks = await this.$store.dispatch('GetRemarks')
        this.remarks = remarks
      }
    },
    changeRemark(value) {
      this.remark = value
    },
    handleRemoveFile() {
      this.attachment = {};
    },
    submitUpload(file, index) {
      const formData = new FormData();
      formData.append('file', file);
      apiUtils.upload(formData).then((data) => {
        this.attachment = data;
      }).catch((resp) => {
        this.$message((resp.response && resp.response.data.message) || '上传失败，请重新上传');
      })
      return false;
    },
    async handleAgree() {
      const data = Object.assign({}, this.project);
      try {
        await this.$store.dispatch('AgreeDeclare', {
          requestIds: data.id,
          money: 0,
          remark: this.remark,
          attachmentIds: this.attachment.id || ''
        });
        this.$message.success('操作成功');
        this.$emit('handle-next-page');
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    async handleReject(action) {
      const data = Object.assign({}, this.project);
      try {
        if (this.remark) {
          await this.$store.dispatch('RejectDeclare', {
            requestIds: data.id,
            action: action,
            remark: this.remark,
            attachmentIds: this.attachment.id || ''
          });
          this.$message.success('操作成功');
          this.$emit('handle-next-page');
        } else {
          this.$message.error('请填写具体意见')
        }
      } catch (e) {
        this.$message.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-pages {
  position: relative;
  height: 100%;
  margin: 25px;
  background: #fff;
  font-size: 12px;
  .el-button--primary {
    background-color: #b1040e;
    border-color: #b1040e;
  }
  .no-upload-input {
    position: relative;
    text-align: left;
    .upload-file {
      width: 400px;
    }
    .remove-file {
      cursor: pointer;
      color: $theme-color;
    }
  }
  .money {
    color: red;
  }
  .org {
    color: #4490db;
  }
  .remark {
    font-size: 12px;
    color: #aaa;
    margin-top: 5px;
    padding: 1px 10px;
  }
}
.btn-fujian {
  color: #aaa;
  float: left;
  margin-top: 1px;
  margin-left: -10px;
}
.approve-logs {
  height: 40%;
  padding-left: 10px;
  overflow: auto;
  li {
    position: relative;
    margin-bottom: 20px;
    padding-left: 10px;
  }
  li::before {
    content: "";
    position: absolute;
    top: 9px;
    left: -8px;
    width: 6px;
    height: 6px;
    background-color: #a4a4a4;
    border-radius: 50%;
  }
  li::after {
    content: "";
    position: absolute;
    top: 22px;
    left: -6px;
    width: 1px;
    height: 100%;
    background-color: #a4a4a4;
  }
  li:last-child::after {
    display: none;
  }
  .date {
    color: #a4a4a4;
    font-weight: 300;
    margin-left: 12px;
  }
}
.approve {
  position: absolute;
  top: 37%;
  width: 100%;
  z-index: 2;
}
.approve-actions {
  text-align: right;
  padding-top: 12px;
  .el-button {
    border-radius: 0;
    width: 90px;
    font-size: 12px;
  }
  .el-button--default {
    color: #e53a43;
    border-color: #e53a43;
  }
}
</style>

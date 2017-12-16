<template>
<el-dialog title="请填写意见" :visible="visible" :before-close="handleCloseDialog">
  <el-form label-position="right" label-width="180px" style="width: 90%; margin: 0 auto;">
    <el-radio-group v-if="data.dialogStatus == 'reject'" v-model="action" style="margin-bottom: 10px;margin-left: 6px;">
      <el-radio style="margin-bottom: 10px;" label="退回修改">退回修改（注：退回给项目申报人修改）</el-radio>
      <br/>
      <el-radio label="不予申报">不予申报</el-radio>
    </el-radio-group>
    <template v-else>
      <el-form-item label="项目申报金额（万元）：">
        {{ data.money | formatMoneyToWan }}
      </el-form-item>
      <el-form-item label="上一岗的建议金额（万元）：">
        {{ data.allocateMoney | formatMoneyToWan }}
      </el-form-item>
      <el-form-item label="请输入本岗建议金额（万元）：">
        <el-input v-model="currentMoney"></el-input>
      </el-form-item>
    </template>
    <el-form-item label="具体建议（300字以内）" :label-width="data.dialogStatus == 'reject' ? '150px' : '180px'">
      <el-select v-model="data.region" placeholder="常用意见">
        <el-option label="常用意见1" value="yijian"></el-option>
      </el-select>
    </el-form-item>
    <el-input type="textarea" v-model="remark" :rows="4"></el-input>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button style="float: left;">附件上传</el-button>
    <el-button @click="handleCloseDialog">取 消</el-button>
    <el-button type="primary" v-if="data.dialogStatus == 'reject'" @click="reject">确 定</el-button>
    <el-button type="primary" v-else @click="agree">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { formatMoneyToYuan } from '@/filters/formatMoney'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      action: '退回修改',
      currentMoney: '',
      remark: ''
    }
  },
  methods: {
    async agree() {
      try {
        await this.$store.dispatch('AgreeDeclare', {
          'requestIds': this.data.id,
          'money': formatMoneyToYuan(this.currentMoney),
          'remark': this.remark,
          'attachmentIds': ''
        })
        this.$message.success('操作成功');
        this.handleCloseDialog();
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    async reject() {
      try {
        await this.$store.dispatch('RejectDeclare', {
          'requestIds': this.data.id,
          action: this.action,
          'remark': this.remark,
          'attachmentIds': ''
        })
        this.$message.success('操作成功');
        this.handleCloseDialog();
      } catch (e) {
        this.$message.error(e);
      }
    },
    handleCloseDialog(done) {
      this.$emit('update:visible', false)
      if (done && done instanceof Function) done();
    }
  }
}
</script>

<style lang="scss">
</style>

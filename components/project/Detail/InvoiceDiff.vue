<template>
<el-dialog title="发票查重" :visible="visible" :before-close="handleCloseDialog">
  <h4>提示：不存在重复发票。</h4>
  <el-table
    :data="data"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="项目名称"
      min-width="100"
      >
    </el-table-column>
    <el-table-column
      prop="orgName"
      label="申报单位">
    </el-table-column>
    <el-table-column
      prop="date"
      label="年份">
    </el-table-column>
    <el-table-column
      prop="invoiceCode"
      label="发票代码">
    </el-table-column>
    <el-table-column
      prop="invoiceNum"
      label="发票号码">
    </el-table-column>
    <el-table-column
      prop="money"
      label="发票金额（元）">
    </el-table-column>
    <el-table-column
      prop="file"
      label="附件"
      >
    </el-table-column>
  </el-table>
</el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleCloseDialog(done) {
      this.$emit('update:visible', false)
      done();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

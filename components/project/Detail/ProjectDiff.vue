<template>
<el-dialog title="项目查重" :visible="visible" :before-close="handleCloseDialog">
  <h4>提示：项目查重结果仅供参考！</h4>
  <el-table
    :data="data"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="项目名称">
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
      prop="xsd"
      label="相似度">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100"
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

<template>
<el-dialog title="项目申请书" :visible="visible" :before-close="handleCloseDialog">
  <div class="projectPDF" ref="projectPDF"></div>
</el-dialog>
</template>

<script>
import PDFObject from 'pdfobject'
import EventHub from './EventHub'

export default {
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    EventHub.$on('show-project-pdf', async (project) => {
      this.visible = true
      const url = await this.$store.dispatch('GetProjectPdfUrl', project.id)
      this.$nextTick(function() {
        PDFObject.embed(url, this.$refs.projectPDF)
      })
    });
  },
  beforeDestroy() {
    EventHub.$off('show-project-pdf')
  },
  methods: {
    handleCloseDialog(done) {
      this.visible = false
      done();
    }
  }
}
</script>

<style lang="scss" scoped>
.projectPDF {
  width: 100%;
  height: 600px;
}
</style>

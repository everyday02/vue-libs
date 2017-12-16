<template>
<el-dialog title="申报指南" :visible="visible" :before-close="handleCloseDialog">
  <div class="projectPDF" ref="guidePDF"></div>
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
    EventHub.$on('show-guide-pdf', async (project) => {
      this.visible = true
      let url = project.theme.guide.url
      this.$nextTick(function() {
        PDFObject.embed(url, this.$refs.guidePDF)
      })
    });
  },
  beforeDestroy() {
    EventHub.$off('show-guide-pdf')
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

<template>
<el-dialog title="附件" :visible="visible" :before-close="handleCloseDialog">
  <FileList :attachments-config="attachmentsConfig" :read="true" />
  <Invoice v-if="datas" :invoices="datas.invoices || []" :read="true" />
  <Contract v-if="datas" :contracts="datas.contracts || []" :read="true" />
</el-dialog>
</template>

<script>
import FileList from '@/components/File/List'
import Invoice from '@/components/Project/Invoice'
import Contract from '@/components/Project/Contract'
import EventHub from './EventHub'

export default {
  components: {
    FileList,
    Invoice,
    Contract
  },
  data() {
    return {
      visible: false,
      attachmentsConfig: []
    }
  },
  mounted() {
    EventHub.$on('show-attachments', async (project) => {
      this.visible = true
      const data = await this.$store.dispatch('GetAttachments', project)
      this.attachmentsConfig = data
    });
  },
  beforeDestroy() {
    EventHub.$off('show-attachments')
  },
  methods: {
    handleCloseDialog(done) {
      this.visible = false
      done();
    }
  },
  props: ['datas']
}
</script>

<style lang="scss" scoped>
</style>

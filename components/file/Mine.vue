<template lang="html">
<div class="project-files-container">
  <el-table
    :data="attachmentsConfig"
    style="width: 100%">
    <el-table-column
      prop="config.title"
      label="附件描述">
      <template slot-scope="scope">
        <span>
          <span class="require">
            {{scope.row.config.require === 1 ? '【必备材料】': ''}}
          </span>
          <el-tooltip class="item" effect="dark" :content="scope.row.config.title" placement="bottom-end">
            <span>{{scope.row.config.title}}</span>
          </el-tooltip>
        </span>
      </template>
    </el-table-column>
    <el-table-column
      prop="attachment.name"
      label="附件名称"
      width="200">
      <template slot-scope="scope">
        <template v-if="scope.row.attachment !== null">
          <el-tooltip class="item" effect="dark" :content="scope.row.attachment.name" placement="bottom-end">
            <a target="_blank" :href="scope.row.attachment.url">{{scope.row.attachment.name}}</a>
          </el-tooltip>
        </template>
      </template>
    </el-table-column>
    <el-table-column
      prop="operation"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button type="text" @click="handleSelectFile(scope.row)">选择</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
// import { getOrganizationAttachmentsConfig } from '@/api/organization'
import apiOrganization from '~/libs/api/organization'
export default {
  data () {
    return {
      attachmentsConfig: []
    }
  },
  mounted () {
    apiOrganization.getAttachments().then((resp) => {
      console.info(resp.data)
      this.attachmentsConfig = resp.data.filter((item) => item.attachment !== null)
    })
  },
  attached () {},
  methods: {
    handleSelectFile(item) {
      this.$emit('selectFile', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.project-files-container {
  padding: 25px 0px;
  .box-card {
    margin: 15px 0px;
    box-shadow: none;
  }
  .el-upload {
    text-align: left;
  }

  .require {
    color: $theme-color;
  }

  .upload-btns {
    padding: 5px;
  }

  .upload-desc {
    color: #8291a5;
    padding: 8px 0px;
    font-size: 14px;
  }

}
</style>

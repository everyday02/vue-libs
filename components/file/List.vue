<template lang="html">
<div class="project-files-container">
  <el-row v-if="!read" :gutter="20" class="file-upload-rule">
    <el-col :span="2" class="info-icon">
      <i class="el-icon-warning"></i>
    </el-col>
    <el-col :span="22" style="padding-left: 0px;">
      <p>注意事项：</p>
      <p>1）下表附件，请按照附件文件的要求。</p>
      <p>2）每个附件材料的复印件或者原件，以彩色扫描或者拍照的形式，确保足够清晰、可辨，否则将影响单位信息的审核，直至专项资金的审批拨付。</p>
      <p>3）请选择大小不超过10M，格式为JPG、DOC、WPS、PDF、XLS、TIFF文件。</p>
      <p>4）附件文件建议采用JPG格式（可以扫描或用数码相机拍照方式获得），对于大于一页的单个附件，如审计报告等，建议采用PDF格式。</p>
    </el-col>
  </el-row>
  <el-table
    :data="attachmentsConfig"
    style="width: 100%">
    <el-table-column
      prop="config.title"
      label="附件描述">
      <template slot-scope="scope">
        <span class="require">
          {{scope.row.config.require === 1 ? '【必备材料】': ''}}
        </span>
        {{scope.row.config.title}}
      </template>
    </el-table-column>
    <el-table-column
      prop="attachment.name"
      label="附件名称"
      width="240">
      <template slot-scope="scope">
        <template v-if="scope.row.attachment !== null">
          <a target="_blank" :href="scope.row.attachment.url">{{scope.row.attachment.name}}</a>
        </template>
        {{(status.uploading === true && status.index === scope.$index) ? status.message : ''}}
      </template>
    </el-table-column>
    <el-table-column
      v-if="!read"
      prop="operation"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-upload
          class="no-upload-input"
          ref="upload"
          :file-list="[]"
          :before-upload="function (file) {
            submitUpload(file, scope.$index)
            return false;
          }"
          action=""
          :auto-upload="true">
          <el-button slot="trigger" size="mini" type="primary">上传文件</el-button>
          <template v-if="select !== false">
            <el-button size="mini" @click="handleSelectFileModal(scope.$index)" >选择</el-button>
          </template>
        </el-upload>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="我的文件" size="large" :visible.sync="dialogVisible">
    <MineFile @selectFile="handleSelectMineFile" />
  </el-dialog>
</div>
</template>

<script>
import apiUtils from '~/libs/api/utils'
import MineFile from './Mine'
export default {
  components: {
    MineFile
  },
  data () {
    return {
      dialogVisible: false,
      dialogImageUrl: null,
      activeIndex: [],
      status: {
        uploading: false,
        index: -1,
        message: '上传中...'
      }
    }
  },
  computed: {},
  attached () {},
  methods: {
    submitUpload (file, index) {
      const thiz = this;
      const formData = new FormData()
      formData.append('file', file)
      this.status.uploading = true
      this.status.index = index;
      apiUtils.upload(formData).then((resp) => {
        thiz.attachmentsConfig[index].attachment = resp.data
        this.status.uploading = false
      })
      return false;
    },
    handleRemove ($index) {
      console.info($index)
    },
    handleSelectMineFile (item) {
      this.dialogVisible = false;
      this.attachmentsConfig[this.activeIndex].attachment = item.attachment
    },
    handleSelectFileModal (index) {
      this.dialogVisible = true
      this.activeIndex = index
    }
  },
  props: ['attachmentsConfig', 'select', 'read']
}
</script>

<style lang="scss" scoped>
.project-files-container {
  padding: 0px 0px 25px 0px;
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

  .info-icon {
    font-size: 36px;
    text-align: center;
    color: $theme-assist-color;
  }

  .file-upload-rule {
    border-radius: 4px;
    margin: 20px 0px!important;
    border: 1px solid #d0dbe5;
    padding: 10px;
    color: #8291a5;
  }
}
</style>

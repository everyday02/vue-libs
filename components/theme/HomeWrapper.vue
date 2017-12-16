<template lang="html">
<div id="theme-detail-wrapper" class="second-page-layout" >
  <div class="second-banner" >
    <img v-bind:src="banner" />
  </div>
  <el-card class="width-wrap box-card second-content no-border">
    <template v-if="id!==null">
      <ThemeDetail :id.sync="id" />
    </template>
  </el-card>
</div>
</template>

<script>
const banner = require('@/assets/second/01.jpg');
import ThemeDetail from './Detail';
export default {
  data () {
    return {
      banner: banner,
      id: null
    }
  },
  computed: {},
  ready () {},
  attached () {},
  mounted() {
    console.info(this.$route.params.id);
    this.id = this.$route.params.id;
  },
  methods: {},
  components: { ThemeDetail }
}
</script>

<style lang="scss" scoped >
#theme-detail-wrapper {
  background: #f8f8f8;
  min-height: 540px;
  .box-card {
    padding: 0px;
    // top: -175px;
  }
  .d-content {
    padding: 20px 0px;
  }
  .banner {
    img {
      width: 100%;
      max-width: 1440px;
    }
  }
}
</style>

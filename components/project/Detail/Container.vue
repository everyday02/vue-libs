<template>
<div id="pages-container">
  <div class="pages-container">
    <slot />
  </div>
  <el-button class="page-btn page-prev" v-if="index > 0" @click="handlePrePageClick"></el-button>
  <el-button class="page-btn page-next" v-if="index < pages.length - 1" @click="handleNextPageClick"></el-button>
</div>
</template>

<script>
import EventHub from './EventHub'

export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    pages: {
      type: Array,
      required: true,
      default: []
    },
    handlePrePage: {
      type: Function
    },
    handleNextPage: {
      type: Function
    },
    handleChangePage: {
      type: Function
    }
  },
  created() {
    EventHub.$on('turn-set-page', (index) => {
      let page
      if (index === 0) {
        page = 1
      } else {
        page = index * 2
      }
      $('#pages').turn('page', page);
    });
  },
  beforeDestroy() {
    EventHub.$off('turn-set-page')
  },
  mounted() {
    $('#pages').turn({
      elevation: 0,
      duration: 1000
    });

    var _this = this;
    $('#pages').bind('turning', function(e, page) {
      let index = 1
      if (page < 2) {
        index = 0
      } else {
        if (page % 2 !== 0) {
          page -= 1
        }
        index = page / 2
      }
      _this.handleChangePage(index);
    });
  },
  methods: {
    handlePrePageClick() {
      this.handlePrePage();
    },
    handleNextPageClick() {
      this.handleNextPage();
    }
  }
}
</script>

<style lang="scss">
#pages-container, .pages-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: initial;
}
.page-btn {
  position: absolute;
  width: 34px;
  height: 138px;
  border: none;
  .el {
    font-size: 1.5em;
  }
}
.page-prev {
  left: -33px;
  top: 36%;
  border-radius: 100% 0 0 100%;
  background: #fbf9fa;
  background: url(../../../assets/project/left@2x.png) no-repeat;
  background-size: contain;
  .el {
    position: relative;
    left: -8px;
  }
}
.page-next {
  right: -36px;
  top: 36%;
  border-radius: 0 100% 100% 0;
  background: url(../../../assets/project/right@2x.png) no-repeat;
  background-size: contain;
  .el {
    position: relative;
    left: -12px;
  }
}
</style>

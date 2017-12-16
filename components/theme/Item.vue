<template lang="html">
  <el-col class="theme-card" :span="8" >
    <div @click="goToReport" >
      <el-card
        body-style="padding: 0px;"
        class="box-card theme-item">
        <div class="theme-header">
          <el-row>
            <el-col class="organization" :span="12">
              {{item.organization.name}}
            </el-col>
            <el-col class="time-content" :span="12">
              <template v-if="item.status === 1">
              剩
              <span class="time">{{item.remainDay}}</span>
              天
              </template>
              <template v-if="item.status === 2">
                申报已截止
              </template>
            </el-col>
          </el-row>
          <hr />
        </div>
        <div class="theme-content">
          <el-row>
            <el-col :span="4">
              <i v-bind:style="{ background: item.status== 2 ? '#bdc0bf': item.themeType.color}" :class="item.themeType.icon"/>
            </el-col>
            <el-col class="t-title" :span="20">
              <span v-if="item.subscribed === 1 && isLogin" class="sub">
                <!--<i class="arrow" />-->
                订阅
              </span>
              {{item.name}}
            </el-col>
          </el-row>
          <el-row class="t-message-content">
            <el-col class="money" :span="8">
              <template v-if="item.moneyMin === 0 && item.moneyMax === 0">
                <span style="font-size: 14px;">金额不限</span>
              </template>
              <template v-if="item.moneyMin !==0 || item.moneyMax !== 0">
                {{item.moneyMin | formatMoneyToWan(0)}}万～{{item.moneyMax | formatMoneyToWan(0)}}万
              </template>
            </el-col>
            <el-col class="tags" :span="8">
              {{item.supportType | baseDataMap('supportType')}}
              |
              {{item.toward | baseDataMap('toward')}}
            </el-col>
            <el-col class="views" :span="8">
              {{item.visitCount}}人浏览
            </el-col>
          </el-row>
        </div>
        <div class="theme-footer">
          <el-row :gutter="20">
            <el-col :span="8" class="share">
              <el-popover
                @show="handleShareChange(item)"
                @hide="shareShow = false"
                ref="popover1"
                placement="top"
                width="170"
                trigger="hover">
                <template v-if="shareShow">
                  <share slot :config="shareConfig"></share>
                </template>
              </el-popover>
              <a @click.stop="" v-popover:popover1 >
                <i class="el icon-fenxiang" />
                分享
              </a>
            </el-col>
            <el-col :span="8" class="attention">
              <template v-if="item.followed === 1 && isLogin">
                <a @click.stop="handleunfollowTheme(item)" class="active" >
                  <i class="el icon-guanzhu2" />
                  关注
                </a>
              </template>
              <template v-if="item.followed === 0 || isLogin === false">
                <a @click.stop="handlefollowTheme(item)" >
                  <i class="el icon-guanzhu-" />
                  关注
                </a>
              </template>
            </el-col>

            <template v-if="item.status === 1">
              <el-col :span="8" class="report">
                <a class="report-btn" @click.stop="goToReport">
                  <i class="el icon-shenbao2" />
                  申报
                </a>
              </el-col>
            </template>
            <template v-if="item.status === 2">
              <el-col :span="8" class="attention">
                <i class="el icon-gonggao" />
                公示
              </el-col>
            </template>
          </el-row>
        </div>
      </el-card>
    </div>
  </el-col>
</template>

<script>
// import { followTheme, unfollowTheme } from '@/api/themes';
export default {
  data () {
    return {
      isLogin: false,
      shareShow: false,
      shareConfig: {
        url: '',
        source: '',
        title: '',
        description: '',
        image: '',
        sites: ['qzone', 'qq', 'weibo', 'wechat', 'douban', 'wx', 'weixin'],
        disabled: ['google', 'facebook', 'twitter']
      }
    }
  },
  ready () {},
  attached () {},
  mounted () {
    const loginUser = localStorage.getItem('loginUser');
    this.isLogin = (loginUser !== 'null' && loginUser !== null && loginUser);
  },
  methods: {
    handleShareChange(item) {
      const url = `http://${window.location.host}${window.location.pathname}#/theme/wrapper/${item.id}`;
      this.shareConfig.title = item.name;
      this.shareConfig.description = item.name;
      this.shareConfig.url = url;
      this.shareConfig.source = url;
      this.shareShow = true;
    },
    goToReport () {
      sessionStorage.setItem('theme', JSON.stringify(this.item));
      const theme = this.item;
      this.$emit('itemClick');
    },
    handlefollowTheme (item) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$message('请先登录');
        return false;
      }
      /*
      followTheme(item.id).then((resp) => {
        console.info(resp);
        this.item.followed = 1;
      }).catch((resp) => {
        this.$message('操作失败');
      })
      */
    },
    handleunfollowTheme (item) {
      /*
      unfollowTheme(item.id).then((resp) => {
        console.info(resp);
        this.item.followed = 0;
      }).catch((resp) => {
        this.$message('操作失败');
      })
      */
    }
  },
  components: {},
  props: ['item']
}
</script>

<style lang="scss">
.theme-item {
  margin: 0px 1px;
}
.theme-card {
  padding-right: 7px!important;
  position: relative;
  .tuijian {
    position: absolute;
    z-index: 99;
    font-size: 42px;
    color: #F44336;
    top: -11px;
    left: 8px;
  }
  .el-card {
    position: relative;
    cursor: pointer;
    transition: all .4s;
    border: 1px solid #e4e4e4;
    border-radius: 2px;
    box-shadow: none;
    margin-bottom: 25px;
    .theme-header {
      padding: 5px 15px 0px 15px;
      .el-row {
        line-height: 32px;
        .organization {
          font-size: 14px;
          color: #555;
        }
        .time-content {
          text-align: right;
          color: #aaa;
          .time {
            background: #F44336;// $theme-color;// #09a6be;
            padding: 0px 4px;
            color: white;
          }
        }
      }
      hr {
        margin: 0px;
      }
    }
    .theme-content {
      margin-top: 12px;
      padding: 5px 15px;
      i.el {
        top: 2px;
        padding: 6px;
        color: #fff;
        font-size: 21px;
        border-radius: 5px;
        position: relative;
        // background: #2196F3;
      }
      .sub {
        min-width: 32px;
        border-radius: 2px;
        // margin-left: 6px;
        position: relative;
        display: inline-block;
        background: #F44336;// $theme-color; // #0aa6bf;
        font-size: 12px;
        color: white;
        padding: 0px 6px;
        .arrow {
          left: -10px;
          top: 3px;
          border-left-width: 0;
          border-right-color: rgba(217, 217, 217, 0.7);
          position: absolute;
          display: block;
          border-width: 5px;
          width: 0;
          height: 0;
          border-color: white;
          border-style: solid;
          &:after {
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-color: white;
            border-style: solid;
            border-width: 4px;
            content: "";
            content: " ";
            left: 1px;
            bottom: -4px;
            border-left-width: 0;
            border-right-color: white;// $theme-color;// #0aa6bf;
          }
        }
      }
      .t-title {
        line-height: 16px;
        min-height: 34px;
        font-size: 13px;
        color: #555;
      }
      .t-message-content {
        margin: 18px 0px;
        line-height: 14px;
        .money {
          color: $theme-color;
          font-size: 14px;
        }
        .tags {
          color: #aaa;
        }
        .views {
          font-size: 12px;
          color: #aaa;
          font-weight: 300;
          text-align: right;
          zoom: 0.8;
        }
      }
    }

    .theme-footer {
      margin: 0px 25px 20px 25px;
      .share, .attention, .report {
        letter-spacing: 2px;
        cursor: pointer;
        border: 1px solid #eaeaea;
        padding: 7px 6px;
        text-align: center;
        margin-left: -1px;
        font-size: 12px;
        color: #999;
        line-height: 13px;
        i {
          font-size: 12px;
        }
        a {
          color: #fc6b76;
          &:hover {
            color: #e4393c;
          }
        }
      }
      .affiliation {
        i {
          color: #009688;
          font-size: 13px;
        }
        margin: 5px 0px;
      }
      .active {
        color: #fc6b76;
      }
    }
    &:hover {
      margin-top: -8px;
      margin-bottom: 33px;
      // border: 1px solid #00c1de;
      // box-shadow: 0 0 10px 5px rgb(241, 227, 226);
      box-shadow: 0 0 10px 5px #f1f0f0;
      .theme-header {
        // background: #00c1de;
        // color: white;
        .organization {
          // color: #fff;
        }
        hr {
          // border-top: 1px solid #00c1de;
        }
        .time-content {
          // color: #fff;
        }
      }
    }
  }
}


</style>

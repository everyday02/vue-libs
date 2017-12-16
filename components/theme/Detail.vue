<template>
  <div id="theme-detail-container">
    <el-row v-if="theme" :gutter="20" class="d-content">
      <el-col :span="1" >&nbsp;</el-col>
      <el-col :span="6" class="left">
        <div class="type-veiws">
          <div class="img-content">
            <div class="f-content">
              <div class="day">
                <template v-if="theme && theme.status === 1">
                  剩
                  <span class="time">{{theme.remainDay}}</span>
                  天
                </template>
                <template v-if="theme && theme.status === 2">
                  申报已截止
                </template>
              </div>
            </div>
            <template v-if="theme">
              <i v-bind:style="{ background: theme.status== 2 ? '#bdc0bf': theme.themeType.color}" :class="theme.themeType.icon"/>
            </template>
          </div>
          <div class="type-operation">
            <el-row :gutter="20">
              <el-col :span="12">
                <i class="theme-assist-color el-icon-share"></i>&nbsp;分享
              </el-col>
              <el-col :span="12">
                <i class="theme-assist-color el-icon-star-on"></i>&nbsp;关注
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="sider">
          <div >
            <h4>相似专题</h4>
          </div>
          <ul class="sider-projects">
            <template v-if="similarThemes.length > 0">
              <li v-for="(item, i) in similarThemes" @click="handleItemClick(item)">
                <div class="p-logo">
                  <i v-bind:style="{ background: item.status== 2 ? '#bdc0bf': item.themeType.color}" :class="item.themeType.icon"/>
                </div>
                <p class="money">
                  ¥ {{item.moneyMin | formatMoneyToWan(0)}}万～{{item.moneyMax | formatMoneyToWan(0)}}万
                </p>
                <p class="desc">
                  {{item.name}}
                </p>
                <div class="tag">
                  <span>{{item.organization.name}}</span>
                  <span>{{item.toward | baseDataMap('supportType')}}</span>
                </div>
              </li>
            </template>
            <template v-if="similarThemes.length === 0">
              <div class="text-center">暂无相似专题</div>
            </template>
          </ul>
        </div>
      </el-col>
      <el-col :span="1" >&nbsp;</el-col>
      <el-col :span="14" >
        <template v-if="theme!==null">
          <div class="type-desc-content">
            <h2>{{theme.name}}</h2>
            <div class="subhead">
              <!--
              <div class="important">
                <span class="range-money">¥3.00- 10.00万</span>
                &nbsp;
                <span class="tags">/市经信局 / 前支持 / 奖补 / 企业申报</span>
              </div>
              -->
              <div class="time-info">
                <p><span class="title">资金范围：</span><span class="money">¥{{theme.moneyMin / 10000}}万～{{theme.moneyMax/10000}}万</span></p>
                <p><span class="title">申报时间：</span><span class="time">{{theme.startDate}}至{{theme.endDate}}</span></p>
                <p><span class="title">申报对象：</span>{{theme.toward | baseDataMap('toward')}}</p>
                <p><span class="title">支持方式：</span>{{theme.supportType | baseDataMap('supportType')}}</p>
                <p><span class="title">扶持形式：</span>{{theme.supportKind | baseDataMap('supportKind')}}</p>
                <p><span class="title">主管部门：</span>{{theme.organization.name}}</p>
                <p><span class="title">联系人员：</span>{{theme.contactPerson}}</p>
                <p><span class="title">联系电话：</span>{{theme.contactPhone}}</p>
                <!--
                <span>申报时间： 2017-09-20 到 2018-01-08</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>编号：201798234343</span>
                -->
              </div>
            </div>
            <div class="submit">
              <el-button @click="goToReport" type="danger">立即申报</el-button>
            </div>
            <h3>项目描述</h3>
            <div class="desc">
              <p v-html="replaceEnterToBr(theme.description)"></p>
            </div>
            <h3>申报单位要求</h3>
            <div class="desc">
              <p v-html="replaceEnterToBr(theme.organizationRequirments)"></p>
            </div>
            <h3>项目申报要求</h3>
            <div class="desc">
              <p v-html="replaceEnterToBr(theme.projectRequirments)"></p>
            </div>
            <h3>政策文件与文号</h3>
            <div class="desc">
              <p v-html="replaceEnterToBr(theme.policyText)"></p>
            </div>
            <h3>依据条款</h3>
            <div class="desc">
              <p v-html="replaceEnterToBr(theme.article)"></p>
            </div>
            <h3>相关附件</h3>
            <div class="files">
              <ul>
                <li>
                  <label class="file-label">1.申报指南：</label>
                  <a v-if="theme.guide" v-bind:href="theme.guide.url" target="_blank">{{theme.guide.name}}</a>
                  <span v-else>暂无</span>
                </li>
                <li>
                  <label class="file-label">2.申报书样本：</label>
                  <a v-if="theme.sample" v-bind:href="theme.sample.url" target="_blank">{{theme.sample.name}}</a>
                  <span v-else>暂无</span>
                </li>
                <li>
                  <label class="file-label">3.管理办法：</label>
                  <a v-if="theme.regulation" v-bind:href="theme.regulation.url" target="_blank">{{theme.regulation.name}}</a>
                  <span v-else>暂无</span>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </el-col>
    </el-row>
    <img class="pinglun" v-bind:src="G.resolvePicPath('/common/pinglun.png')" alt="" />
    <img class="wenda" v-bind:src="G.resolvePicPath('/common/wenda.png')" alt="" />
  </div>
</template>

<script>
// import { getThemeDetail, getSimilarThemes } from '@/api/themes';

export default {
  name: 'home-detail',
  data: function () {
    return {
      similarThemes: []
    };
  },
  asyncComputed: {
    async theme () {
      if (!this.id) return null;
      // const { data } = await getThemeDetail(this.id)
      // return data;
      return null;
    }
  },
  methods: {
    replaceEnterToBr(text) {
      if (!text) return null;
      return text.replace(/\r\n/g, '<br />').replace(/\n/g, '<br />');
    },
    handleItemClick (item) {
      this.$emit('update:id', item.id);
      this.$router.push({
        path: `/theme/wrapper/${item.id}`
      });
    },
    goToReport: function () {
      this.$router.push({
        path: '/business/project/add',
        query: {
          themeId: this.id
        }
      });
    }
  },
  mounted () {
    /*
    getSimilarThemes(this.id).then((resp) => {
      console.info(resp.data);
      this.similarThemes = resp.data.slice(0, 3);
    })
    */
    setTimeout(function () {
      document.documentElement.scrollTop = 0;
    }, 100);
  },
  props: ['id']
}
</script>

<style lang="scss" >

#theme-detail-container {
  padding-top: 15px;
  img.pinglun,img.wenda {
    width: 100%;
    padding-top: 20px;
    background: #f8f8f8;
  }

  h2 {
    color: $title-color;
    font-size: 18px;
  }

  .returned {
    padding: 10px 20px;
  }

  .left {
    padding-top: 55px;
    padding: 25px;
  }

  .files {
    .file-label {
      margin-left: 15px;
      width: 100px;
      line-height: 28px;
      font-weight: 400;
      // text-align: right;
    }
  }

  .type-veiws {
    .f-content {
      margin-right: 10px;
      line-height: 32px;
      text-align: right;
      color: #aaa;
      .day {
        span {
          background: #f44336;
          padding: 0 4px;
          color: #fff;
          font-size: 14px;
          letter-spacing: 1px;
        }
      }
      p {
        margin: 0px;
      }
    }
    .img-content {
      position: relative;
      i {
        color: white;
        padding: 12px;
        font-size: 32px;
        border-radius: 8px;
        line-height: 140px;
      }
      background-color: #fafafa;
      border: 1px solid #f6f0f0;
      // width: 180px;
      height: 210px;
      margin: 0 auto;
      text-align: center;
      img {
        z-index: 1;
        width: 42px;
        margin: 0px;
        right: 24px;
        top: 0px;
        position: absolute;
      }
    }

    .last-time {
      border-radius: 0 50% 50% 0/180%;
      margin-top: 20px;
      width: 100px;
      line-height: 26px;
      height: 30px;
      padding: 3px 6px;
      background: #a0a0a0;
      color: white;
      text-align: left;
    }

    .type-operation {
      i {
        font-size: 16px;
      }
      margin-left: -10px;
      margin-right: -10px;
      text-align: center;
      width: 180px;
      margin: 0 auto;
      line-height: 24px;
      padding: 12px;
      color: #5a5a5a;
      font-weight: 300
    }
  }

  .sider {
    // padding: 20px 10px;
    height: 640px;
    margin-top: 95px;
    border: 1px solid #efefef;
    h4 {
      margin: 12.5px 14.5px;
      color: #666;
    }
  }
  .sider-projects {
    li {
      cursor: pointer;
      margin-top: 42px;
    }
    .p-logo {
      text-align: center;
      i {
        font-size: 24px;
        line-height: 54px;
        color: white;
        padding: 6px;
        border-radius: 4px;
      }
      img {
        width: 64px;
      }
    }
    .money {
      text-align: center;
      color: $theme-color;
    }
    .desc {
      color: #666;
      width: 150px;
      margin: 0 auto;
      text-align: center;
      margin-bottom: 12px;
    }
    .tag {
      color: #ccc;
      text-align: center;
      span {
        border: 1px solid #ccc;
        border-radius: 12px;
        font-weight: 200;
        padding: 1px 6px;
        margin: 0px 2px;
      }
    }
  }


  .type-desc-content {
    padding: 10px 0px 75px 0px;
    .range-money {
      color: $theme-color;
    }
    .tags {
      color: $title-assist-color;
    }
    .subhead {
      margin-top: 10px;
    }
    .time-info {
      color: #4a4a4a;
      padding: 10px 0px;
      margin-bottom: 0px;
      border-bottom: 1px solid #efefef;
      .title {
        color: #666;
      }
      .money {
        color: $theme-color;
        font-size: 16px;
      }
      .time {
        color: #2196F3;
      }
      p {
        line-height: 28px;
        font-size: 12px;
      }
    }
    .important {
      margin: 5px 0px;
      font-size: 18px;
    }
    p {
      margin: 0px;
    }

    h3 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 25px;
      margin-top: 20px;
    }
    .desc {
      font-size: 12px;
      color: #4a4a4a;
      line-height: 28px;
    }
    .submit {
      margin-top: 25px;
      margin-bottom: 45px;
      button {
        width: 170px;
        height: 42px;
        font-size: 18px;
      }
    }

  }
  .banner {
    img {
      width: 100%;
      max-width: 1440px;
    }
  }
}
</style>

<template>
<div @click="handleOnClick" >
  <el-col class="project-card" :span="8" >
    <el-card
      body-style="padding: 0px;"
      class="box-card project-item">
      <div class="header">
        <span class="organization">{{item.theme.organization.name}}</span>
        <template v-if="item.status === 0">
          <img class="status" v-bind:src="G.path.resolvePicPath('/project/item/Uncommitted@2x.png')" alt="草稿箱">
        </template>
        <template v-if="item.status === 2">
          <img class="status" v-bind:src="G.path.resolvePicPath('/project/item/inapproval@2x.png')" alt="审批中">
        </template>
        <template v-if="item.status === 8">
          <img class="status" v-bind:src="G.path.resolvePicPath('/project/item/appropriated@2x.png')" alt="已拨付">
        </template>
        <template v-if="item.status === 4">
          <img class="status" v-bind:src="G.path.resolvePicPath('/project/item/needmodify@2x.png')" alt="需修改">
        </template>
        <template v-if="item.status === 5">
          <img class="status" v-bind:src="G.path.resolvePicPath('/project/item/inadmissible@2x.png')" alt="不予申报">
        </template>
        <!--
        <i v-bind:style="{ background: item.theme.themeType.color, marginBottom: '20px'}" :class="item.theme.themeType.icon" />
      -->
      </div>
      <div class="content">
        <!--
        <img v-bind:src="agriculture" alt="项目类型">
        -->
        <div class="title">
          <h4>{{item.name}}</h4>
        </div>
        <div class="text">
          <i v-bind:style="{ background: item.theme.themeType.color, color: 'white', padding: '3px', fontSize: '12px', borderRadius: '2px'}" :class="item.theme.themeType.icon" />
            {{item.theme.name.length > 10 ? `${item.theme.name.substring(0,10)}...` : item.theme.name}}(专题)
        </div>
        <el-row class="subhead" :gutter="20">
          <el-col class="money-content" style="padding-left: 0px; color: #aaa" :span="12">
            申报：<span class="money">{{item.money | formatMoneyToWan}}万</span>
          </el-col>
          <el-col :span="12">
            <span class="number">
              {{'ID：**' + subNumber(item.code)}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="footer">
        <el-row :gutter="20">
          <el-col class="time" :span="11">
          {{toLocalDate(item.createdAt)}}
          </el-col>
          <el-col class="operation" :span="13">
            <template v-if="item.status === 0">
              <i @click.stop="handleUpdate(item.id, item.theme)" class="el icon-huaban" />
              &nbsp;
              <i @click.stop="handleRemove(item.id)" class="el icon-huishouzhan" />
            </template>
            <template v-if="item.status === 2">
              <span class="approve">{{item.flowNode.name}}</span>
            </template>
            <template v-if="item.status === 3">
              <span>分享</span>
              <span>关注</span>
              <span>邮件</span>
            </template>
            <template v-if="item.status === 4">
              <span @click.stop="handleUpdate(item.id, item.theme)" class="returned">审核退回，请修改</span>
            </template>
            <template v-if="item.status === 5">
              <span class="end">审核退回，不予申报</span>
            </template>
            <template v-if="item.status === 8">
              <span>已拨&nbsp;
                <span class="money">¥{{item.appropriateMoney | formatMoneyToWan}}&nbsp;万</span>
              </span>
            </template>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </el-col>
</div>
</template>
<script>
    import moment from 'moment';
    // import { deleteProject } from '@/api/project';

    export default {
        data: function () {
          return { }
        },
        methods: {
          handleOnClick() {
            // console.info(item);
            this.$emit('on-click', this.item);
          },
          toLocalDate(unix) {
            return moment(unix).format('YY-MM-DD HH:mm:ss');
          },
          subNumber(code) {
            // console.info(String(code).length);
            return (String(code).substring(String(code).length - 4, String(code).length));
          },
          handleUpdate(id, theme) {
            sessionStorage.setItem('theme', JSON.stringify(theme));
            console.info(id);
            this.$router.push({
              path: '/business/project/add',
              query: {
                id
              }
            })
          },
          handleRemove(id) {
            console.info(id);
            /*
            this.$confirm('确定删除该项目吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              deleteProject(id).then((resp) => {
                console.info(resp.data);
                this.$emit('refresh');
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch((resp) => {
                this.$message({
                  type: 'error',
                  message: '删除出现异常，请再次尝试!'
                });
              });
            }).catch(() => {
            });
            */
          }
        },
        mounted: function () {
        },
        props: ['item']
    }
</script>
<style lang="scss" scoped>
.project-card {
  // padding-left: 0px!important;
  // padding-right: 0px!important;
}
.project-item {
  position: relative;
  border-radius: 2px;
  box-shadow: none;
  color: #5a5a5a;
  border: 1px solid #eaeaea;
  margin-bottom: 25px;
  cursor: pointer;
  .header {
    text-align: center;
    // background: #f8f8f8;
    height: 33px;
    .organization {
      position: absolute;
      font-size: 14px;
      left: 10px;
      top: 10px;
    }
    i.el {
      line-height: 135px;
      color: white;
      padding: 6px;
      font-size: 24px;
      border-radius: 2px;
      margin-bottom: 20px;
    }
  }
  &:hover {
    // border: 1px solid $theme-color;
    box-shadow: 0 0 10px 0 rgba(56,81,76,.12);
  }
  .status {
    width: 48px;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .title {
    height: 36px;
    h4 {
      line-height: 18px;
    }
  }

  .end {
    font-size: 12px;
  }

  .content {
    margin-top: 15px;
    text-align: center;
    padding: 0px 15px;

    img {
      width: 60px;
    }
    .text {
      color: #888;
      font-weight: 300;
      padding: 3px 0px;
    }
    .subhead {
      margin-left: 0px!important;
      font-size: 12px;
      line-height: 42px;
      .department {
        float: left;
      }
      i {
        color: #009688;
        font-size: 13px;
      }
      .money-content {
        text-align: left;
      }
      .money {
        font-size: 14px;
        color: $theme-color;
      }
      .number {
        float: right;
        color: #aaa;
      }
    }
  }
  .footer {
    padding: 9px 15px;
    margin: 0px 15px;
    border-top: 1px dashed #ddd;
    .el-col {
      padding: 0px!important;
    }
    .money {
      color: $theme-color;
    }
    .returned {
      font-size: 12px;
      font-weight: 400;
      color: #ff6000;
      text-decoration: underline;
    }
    .approve {
      color: $theme-color;
      font-weight: 400;
    }
    .time {
      color: #aaa;
      line-height: 24px;
      font-size: 12px;
    }
    .operation {
      line-height: 21px;
      text-align: right;
      .el {
        &:hover {
          color: $theme-color;
        }
        color: #aaa;
        font-size: 21px;
      }
    }
  }
}

/*
.work-item {
    position: relative;
    float: left;
    width: 285px;
    height: 267px;
    border: 1px solid #e7e7e7;
    margin-right: 28px;
    margin-bottom: 28px;
    .item-header {
        padding: 5px 15px;
        .modify-text {
            height: 25px;
            line-height: 25px;
            color: #666;
        }
        .modify-time {
            height: 20px;
            line-height: 20px;
            color: #999;
            .red {
                color: #fe3e3b;
                margin: 0 5px;
            }
        }
    }
    .item-mid {
        padding: 0 28px 19px;
        .item-logo {
            text-align: center;
            height: 70px;
            padding-top: 12px;
            span {
                font-size: 45px;
                color: #999;
            }
        }
        .item-title {
            height: 24px;
            line-height: 24px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .item-tags {
            height: 40px;
            padding: 7px 0 8px;
            text-align: center;
            span {
                display: inline-block;
                height: 25px;
                line-height: 23px;
                color: #999;
                border: 1px solid #eee;
                padding: 0 10px;
                border-radius: 2px;
                margin: 0 5px;
            }
        }
    }
    .item-footer {
        margin: 0 16px;
        padding: 15px 0;
        line-height: 28px;
        border-top: 1px dashed #ddd;
        .pull-left {
            span {
                font-size: 22px;
                color: #999;
            }
        }
        .pull-right {
            a {
                text-decoration: none;
            }
            .right-operate {
                display: inline-block;
                width: 30px;
                color: #4ba4f6;
                margin-left: 13px;
                span {
                    font-size: 22px;
                }
            }
            .right-link {
                color: #666;
                span {
                    top: 2px;
                    color: #a7b4c4;
                }
            }
        }
    }
    .stamp {
        position: absolute;
        top: -1px;
        right: -1px;
        width: 60px;
        height: 60px;
        background-size: 60px 60px;
    }
    .stamp-applying {
        background-image: url(../../assets/ihome/approval.png);
    }
    .stamp-approved {
        background-image: url(../../assets/ihome/b-established.png);
    }
    .stamp-failed {
        background-image: url(../../assets/ihome/b-returned.png);
    }
}
*/
</style>

<template lang="html">
  <div class="project-multiple" >
      <div class="multi-table">
          <div class="multi-line" v-for="(lineitem, lineidx) in multiList" :key="'multi-row-' + lineidx">
              <div class="multi-left">{{lineitem.name}}:</div>
              <div class="multi-right">
                  <span v-if="(lineitem.expand === false && idx < 8) || (lineitem.expand)" v-for="(item, idx) in lineitem.list" :key="'multi-item-' + lineidx + idx" @click="multiItemClick($event, lineitem.type, item)"
                       class="condition-item" :class="{active: item.isSelect}">
                       <template v-if="item.count === 0 || !item.count">
                         {{item.shortName ? item.shortName : item.name }}
                       </template>
                       <template v-if="item.count !== 0 && item.count">
                         {{item.shortName ? item.shortName : item.name }}
                         <span class="count">
                           ({{item.count}})
                         </span>
                       </template>
                       <i class="el icon-guanbi" v-show="item.isSelect" @click="cancelSelect" ></i>
                  </span>
              </div>
              <div class="multi-operation">
                <template v-if="lineitem.name !=='资金范围'">
                  <span @click="handleToggleItem(lineitem.expand, lineidx)" class="toggle-item-btn">
                    {{lineitem.expand ? '收起' : '更多'}}
                    <template v-if="lineitem.expand">
                      <i class="el icon-shouqi2-copy" />
                    </template>
                    <template v-if="!lineitem.expand">
                      <i class="el icon-gengduo2" />
                    </template>
                  </span>
                </template>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { getConditionsByTheme } from '@/api/themes'

export default {
  data () {
    return {
      multiList: [],
      params: {}
    }
  },
  computed: {},
  ready () {},
  attached () {},
  mounted: function () {
      if (this.multiList.length === 0) {
          this.getMultiData();
      }
  },
  methods: {
    handleToggleItem (expand, index) {
      this.multiList[index].expand = !expand;
    },
    getMultiData: function (param = {}) {
        const thiz = this;
        getConditionsByTheme(param).then(function (resp) {
          const {moneyRange, organizations, themeTypes, industries} = resp.data;
          moneyRange[0].isSelect = true;
          organizations[0].isSelect = true;
          themeTypes[0].isSelect = true;
          industries[0].isSelect = true;
          const multiList = [{
              name: '行业分类',
              type: 'industryIds',
              list: industries,
              srcList: industries,
              expand: false
          }, {
              name: '主管部门',
              type: 'organizationIds',
              list: organizations,
              srcList: organizations,
              expand: false
          }, {
              name: '专项类型',
              type: 'themeTypeIds',
              list: themeTypes,
              srcList: themeTypes,
              expand: false
          }, {
              name: '资金范围',
              type: 'moneyRange',
              list: moneyRange,
              srcList: moneyRange,
              expand: false
          }];
          thiz.multiList = multiList;
        });
    },
    // 按综合条件查找，item点击
    multiItemClick: function (e, type, cell) {
        console.info(e, type, cell);
        const id = cell.id;
        const name = cell.name;
        const $target = $(e.currentTarget);
        if ($target.hasClass('active')) {
            return
        }
        let params = {};
        params[type] = id;
        const typeIdx = $target.parent().parent().index();
        this.multiList.forEach((tyItem, tyIdx) => {
            console.info(tyItem.name);
            if (tyItem.type === type) {
              tyItem.list.forEach((item, idx) => {
                  if (item.id === id && item.name === name) {
                      this.$set(this.multiList[typeIdx].list[idx], 'isSelect', true);
                  } else {
                      this.$set(this.multiList[typeIdx].list[idx], 'isSelect', false);
                  }
              })
            }
            tyItem.list.forEach((item, idx) => {
                if (item.isSelect === true) {
                    if (tyItem.type === 'moneyRange') {
                      params['moneyMin'] = item.min;
                      params['moneyMax'] = item.max;
                    } else {
                      params[tyItem.type] = item.id;
                    }
                    return;
                }
            })
        })
        this.params = params;
        this.$emit('onFilter', params);
    },
    // 取消综合条件条目点击
    cancelSelect: function (e) {
        e.stopPropagation();
        let params = {
          ...this.params
        };
        const $target = $(e.currentTarget);
        const typeIdx = $target.parent().parent().parent().index();
        const itemIdx = $target.parent().index();
        this.$set(this.multiList[typeIdx].list[itemIdx], 'isSelect', false);
        this.$set(this.multiList[typeIdx].list[0], 'isSelect', true);
        this.multiList.forEach((tyItem, tyIdx) => {
          tyItem.list.forEach((item, idx) => {
              if (item.isSelect === true) {
                  if (tyItem.type === 'moneyRange') {
                    params['moneyMin'] = item.min;
                    params['moneyMax'] = item.max;
                  } else {
                    params[tyItem.type] = item.id;
                  }
                  return;
              }
          });
        });
        this.$emit('onFilter', params);
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

.project-multiple {
    .multi-table {
      width: 100%;
      border-top: 1px solid #eaeaea;
      display: table;
      border-bottom: none;
    }
    .multi-line {
        display: block;
        border-bottom: 1px solid #eaeaea;
        .multi-left {
            width: 100px;
            display: table-cell;
            vertical-align: middle;
            flex: none;
            background: #f3f3f3;
            text-align: center;
            vertical-align: middle;
        }
        .multi-operation {
          display: table-cell;
          width: 80px;
          .toggle-item-btn {
            cursor: pointer;
            height: 23px;
            line-height: 23px;
            color: #888;
            background: #fff;
            padding: 0 7px 0 4px;
            border: 1px solid #ddd;
            display: inline-block;
            i {
              font-size: 12px;
            }
          }
        }
        .multi-right {
            width: 85%;
            display: table-cell;
            padding: 5px 0 5px 10px;
            .condition-item {
                display: inline-block;
                position: relative;
                font-family: tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
                height: 28px;
                font-size: 12px;
                color: #ccc;
                line-height: 26px;
                padding: 0px 20px 0px 10px;
                color: #005aa0;
                border: 1px solid white;
                cursor: pointer;
                .count {
                  color: $theme-color;
                }
            }
            .active {
                // background: #00afff;
                border: 1px solid #f30214;
                // color: #fff;
            }
            i.icon-guanbi {
              top: 2px;
              right: 4px;
              color: #f64b58;
              font-size: 12px;
              font-weight: 800;
              position: absolute;
            }
        }
    }
}
</style>

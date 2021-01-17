<template>
  <div class="content-box">
    <!-- <div class="page-title">项目模板</div> -->
    <a-tabs :activeKey="active" size="small" @change="setActive">
      <a-tab-pane :key="tab" v-for="tab in tabs">
        <template #tab>
          <span>
            <icon-font :type="tab"/>
            {{ tab }}
          </span>
        </template>
        <ul class="list">
          <li v-for="(item, index) in curList" :key="index">
            <div class="title">{{ item.name }}</div>
            <div class="title keywords">
              <icon-font v-for="keyword in item.keywords" :key="keyword" :type="keyword"/>
            </div>
            <div class="author" v-if="item.author"><UserOutlined /> {{ item.author }}</div>
            <div class="des">{{ item.description }}</div>
            <div class="control">
              <link-url :url="item.value"><GlobalOutlined/></link-url>
              <CloudDownloadOutlined @click="handleDownload"/>
            </div>
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import {remote} from 'electron';
import { defineComponent, ref, ComputedRef, computed } from 'vue';
import { GlobalOutlined,CloudDownloadOutlined,UserOutlined } from '@ant-design/icons-vue';
import list from '@/config/templateList';
import IconFont from '@/components/IconFont.vue';
import LinkUrl from '@/components/LinkUrl.vue';
interface Template {
  name: string;
  description: string;
  value: string;
}
interface TemplateList {
  [key: string]: Template[];
}
export default defineComponent({
  components:{
    GlobalOutlined,
    CloudDownloadOutlined,
    IconFont,
    UserOutlined,
    LinkUrl
  },
  setup() {
    const tabs: string[] = Object.keys(list);
    let active = ref<string>(tabs[0] || '');
    const setActive = (val: string) => (active.value = val);
    const curList:ComputedRef<Template[]> = computed(() => (list as TemplateList)[active.value]);
    function handleDownload(){
      remote.dialog.showOpenDialog({});
    }
    return {
      tabs,
      active,
      curList,
      setActive,
      handleDownload
    };
  }
});
</script>
<style lang="less" scoped>
.type-title {
  font-size: 20px;
}
.list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  flex-wrap: wrap;
  li {
    margin: 16px;
    border-radius: 10px;
    // border: 1px solid @border-color-base;
    box-shadow: @box-shadow-base;
    // flex: 1;
    white-space: pre-wrap;
    word-break: break-all;
    // flex: 1 1 33.3333%;
    width: calc(33.3333% - 32px);
    padding: 20px;
    box-sizing: border-box;
    transition: all .5s ease;
    &:hover{
      transform: translateY(-5px);
    }
    .title{
      font-weight: bold;
      font-size: 14px;
      color: #777;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .author{
      line-height: 2;
      margin-bottom: 4px;
      font-size: 12px;
      color: #aaa;
    }
    .keywords{
      margin-bottom: 4px;
      color: #999;
      span{
        margin: 0 3px;
      }
    }
    .des{
      font-size: 12px;
      color: #aaa;
      height: 4em;
    }
    .control{
      display: flex;
      justify-content: center;
      align-items: center;
      color: #aaa;
      & > span{
        margin: 10px;
        display: inline-block;
        cursor: pointer;
        position: relative;
        &:hover{
          color: @primary-color;
        }
        &:after{
          content: '';
          width: 1px;
          right: -10px;
          height: 10px;
          top: 50%;
          margin-top: -5px;
          background-color: #eee;
          position: absolute;
        }
        &:last-child:after{
          display: none;
        }
      }
    }
  }
}
@media (prefers-color-scheme: dark) {
  .list {
    li {
      background: lighten(#000,15%);
    }
  }
}
</style>

<template>
  <div class="list-item">
    <div class="base-info">
      <div class="title-info">
        <span class="title">{{ data.name }} </span>
        <span class="meta path" @click="openPath(data.path)"> <FolderOutlined /> {{ data.path }}</span>
        <span class="meta"> <ClockCircleOutlined /> {{ data.time || '无' }}</span>
      </div>
      <div class="control">
        <a-tooltip title="部署"><CloudUploadOutlined  @click="$emit('deploy')"/></a-tooltip>
        <a-tooltip title="编辑"><EditOutlined @click="$emit('edit')"/></a-tooltip>
        <a-tooltip title="删除"><DeleteOutlined  @click="$emit('del')"/></a-tooltip>
      </div>
    </div>
    <a-tabs size="small" class="mode-info">
      <a-tab-pane v-for="(subitem, subindex) in data.modes" :key="subindex" :tab="subitem.name" class="mode-info">
        <span
          >地址：<em>{{ subitem.host }}:{{ subitem.port }}</em></span
        >
        <span
          >部署目录：<em :title="subitem.webDir">{{ subitem.webDir }}</em></span
        >
        <!-- <span
          >备份目录：<em :title="subitem.backupDir">{{ subitem.backupDir }}</em></span
        > -->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { DeleteOutlined,  CloudUploadOutlined, EditOutlined, ClockCircleOutlined,FolderOutlined } from '@ant-design/icons-vue';
import { IDeploy } from '@/interfaces/settings';
import {shell} from 'electron';
export default defineComponent({
  props:{
    data:{
      type: Object as PropType<IDeploy>,
      required: true
    }
  },
  components:{
    CloudUploadOutlined,
    EditOutlined,
    DeleteOutlined,
    ClockCircleOutlined,
    FolderOutlined,
  },
  setup() {
    function openPath(path:string){
      shell.openPath(path);
    }
    return {
      openPath
    };
  }
});
</script>

<style lang="less" scoped>
.list-item {
  border-radius: 10px;
  box-shadow: @box-shadow-base;
  white-space: pre-wrap;
  word-break: break-all;
  padding: 20px;
  box-sizing: border-box;
  transition: all 0.5s ease;
  margin-bottom: 32px;
  width: 100%;
  overflow: hidden;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 2px 8px rgba(@primary-color, 0.3);
  }
  .title {
    font-weight: bold;
    font-size: 14px;
    color: #777;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .author {
    line-height: 2;
    margin-bottom: 4px;
    font-size: 12px;
    color: #aaa;
  }
  .meta {
    font-size: 12px;
    color: #aaa;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.path{
      cursor: pointer;
      &:hover{
        color: @primary-color;
      }
    }
  }
  .base-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }
  .title-info{
    flex: 1;
    min-width: 0;
  }
  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
    font-size: 16px;
    & > span {
      margin: 3px 10px;
      display: inline-block;
      cursor: pointer;
      position: relative;
      &:hover {
        color: @primary-color;
      }
      &:after {
        content: '';
        width: 1px;
        right: -10px;
        height: 10px;
        top: 50%;
        margin-top: -5px;
        background-color: #eee;
        position: absolute;
      }
      &:last-of-type:after {
        display: none;
      }
    }
  }
}
.mode-info span {
  display: block;
  // width: calc(50% - 10px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 5px;
  line-height: 1.6;
  color: #aaa;
  em {
    font-style: normal;
    color: #888;
  }
}
@media (prefers-color-scheme: dark) {
  .list-item {
    background: lighten(#000, 15%);
  }
  .list-item .control > span:after {
    background-color: #555;
  }
}
</style>
<template>
  <div class="content-box">
    <!-- <div class="page-title">项目模板</div> -->
    <a-tabs v-model:activeKey="active" size="small" :tabBarGutter="20">
      <a-tab-pane :key="tab" v-for="tab in tabs">
        <template #tab>
          <span>
            <icon-font :type="tab" />
            {{ tab }}
          </span>
        </template>
        <a-list :grid="{ gutter: 32, xs: 1, md: 2, lg: 3, xl: 3, xxl: 4 }" :data-source="curList" class="list" size="small">
          <template #renderItem="{ item }">
            <a-list-item class="list-item">
              <div class="list-item">
                <div class="title">{{ item.name }}</div>
                <div class="title keywords">
                  <icon-font v-for="keyword in item.keywords" :key="keyword" :title="keyword" :type="keyword" />
                </div>
                <div class="author" v-if="item.author"><UserOutlined /> {{ item.author }}</div>
                <div class="des">{{ item.description }}</div>
                <div class="control">
                  <!-- <link-url :url="item.value"><EyeOutlined /></link-url> -->
                  <link-url :url="item.link"><ChromeOutlined /></link-url>
                  <link-url :url="item.value"><GithubOutlined /></link-url>
                  <CloudDownloadOutlined @click="handleDownload(item)" />
                </div>
              </div>
            </a-list-item>
          </template>
        </a-list>
      </a-tab-pane>
    </a-tabs>
    <a-modal v-model:visible="isShowDown" title="下载模板" @ok="handleSubmit" :afterClose="resetFields" :maskClosable="false" :confirmLoading="spinning">
      <a-spin :tip="loadingTips" :spinning="spinning">
        <a-form hideRequiredMark :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
          <a-form-item label="项目名称" v-bind="validateInfos.name" validateTrigger="change">
            <a-input v-model:value="modelRef.name" />
          </a-form-item>
          <a-form-item label="存放目录" v-bind="validateInfos.path">
            <a-input v-model:value="modelRef.path">
              <template #addonAfter>
                <FolderOpenOutlined style="cursor: pointer" @click="openFileDialog" />
              </template>
            </a-input>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
    <!-- <a-modal v-model:visible="process" :title="null" :footer="null" :width="300" :closable="false" centered>
      <div class="process-box">
        <a-progress strokeColor="#F05929" type="circle" class="progress" :percent="processMete.percent" />
        <div class="progress-txt">{{ processMete.txt }}</div>
        <div class="footer">
          <a-button> 打开项目 </a-button>
        </div>
      </div>
    </a-modal> -->
  </div>
</template>
<script lang="ts">
import path from 'path';
import fs from 'fs';
import { defineComponent, ref, computed, reactive, toRaw } from 'vue';
import { remote, shell } from 'electron';
import { ChromeOutlined, CloudDownloadOutlined, GithubOutlined, UserOutlined, FolderOpenOutlined } from '@ant-design/icons-vue';
import { message, Modal } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import list from '@/config/templateList';
import IconFont from '@/components/IconFont.vue';
import LinkUrl from '@/components/LinkUrl.vue';
import { gitClone } from '@/utils/index';
import { ITemplate, ITemplateList } from '@/interfaces/template';
export default defineComponent({
  components: {
    ChromeOutlined,
    CloudDownloadOutlined,
    IconFont,
    UserOutlined,
    LinkUrl,
    GithubOutlined,
    // EyeOutlined,
    FolderOpenOutlined
  },
  setup() {
    const tabs: string[] = Object.keys(list);
    let active = ref<string>(tabs[0] || '');
    const curList = computed<ITemplate[]>(() => (list as ITemplateList)[active.value]);
    // 下载
    let isShowDown = ref(false);
    let select = reactive({});
    function handleDownload(item: ITemplate) {
      select = item;
      isShowDown.value = !isShowDown.value;
    }
    const modelRef = reactive({
      name: '',
      path: ''
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: '请输入项目名称'
        },
        {
          pattern: /[A-Za-z0-9_-]+/g,
          message: '项目名称存在非法字符',
          trigger: 'blur'
        }
      ],
      path: [
        {
          required: true,
          message: '请设置项目存放目录',
          trigger: 'blur'
        }
      ]
    });
    const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
    const openFileDialog = () => {
      remote.dialog
        .showOpenDialog({
          title: '选择保存目录',
          // defaultPath: '/Users/bwrong/WorkSpace',
          // filters:(),
          properties: ['openDirectory', 'createDirectory']
        })
        .then(({ filePaths }) => {
          if (filePaths[0]) {
            modelRef.path = filePaths[0];
          }
        });
    };
    let spinning = ref(false);
    let loadingTips = ref('');
    const handleSubmit = (e: Event) => {
      e.preventDefault();
      validate().then(async () => {
        const data = toRaw(modelRef);
        const projectPath = path.resolve(data.path, data.name);
        if (fs.existsSync(projectPath)) return message.error('文件已存在');
        spinning.value = true;
        loadingTips.value = '正在下载模板...';
        try {
          await gitClone(`direct:${(select as ITemplate).value}`, projectPath, { clone: true }).catch(err=>{
            message.error('模板下载失败');
          });
        } catch (error) {
          message.error('模板下载失败');
        }
        loadingTips.value = '正在写入配置...';
        let pkg = fs.readFileSync(path.resolve(projectPath, 'package.json'), 'utf8');
        let pkgJson = JSON.parse(pkg);
        pkgJson.name = data.name;
        pkgJson.author = '';
        fs.writeFileSync(path.resolve(projectPath, 'package.json'), JSON.stringify(pkgJson), { encoding: 'utf8' });
        loadingTips.value = '';
        spinning.value = false;
        isShowDown.value = false;
        Modal.confirm({
          title: '提示',
          content: '模板已下载，是否打开？',
          onOk() {
            shell.openPath(projectPath);
          }
        });
      });
    };

    return {
      tabs,
      active,
      curList,
      handleDownload,
      isShowDown,
      validateInfos,
      validate,
      modelRef,
      resetFields,
      handleSubmit,
      openFileDialog,
      spinning,
      loadingTips
    };
  }
});
</script>
<style lang="less" scoped>
.type-title {
  font-size: 20px;
}
.list {
  padding: 16px;
}
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
  .keywords {
    margin-bottom: 4px;
    color: #999;
    span {
      margin: 0 3px;
    }
  }
  .des {
    font-size: 12px;
    color: #aaa;
    height: 50px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-bottom: 4px;
  }
  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
    font-size: 16px;
    & > span {
      margin: 10px;
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
      &:last-child:after {
        display: none;
      }
    }
  }
}

.process-box {
  text-align: center;
  .progress {
    margin: 40px auto 10px;
  }
  .progress-txt {
    margin-bottom: 40px;
    font-size: 12px;
    color: #666;
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

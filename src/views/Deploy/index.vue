<template>
  <div class="content-box">
    <a-row class="head-bar" justify="space-between">
      <a-col :span="3">
        <a-button type="primary" title="新建" shape="circle" @click="handleAdd"
          ><template #icon><PlusOutlined /></template
        ></a-button>
      </a-col>
      <a-col :span="6">
        <a-input-search v-model:value="searchKey" placeholder="请输入项目名称" @search="handleSearch" />
      </a-col>
    </a-row>
    <a-list :grid="{ gutter: 32, xs: 1, md: 2, lg: 2, xl: 2, xxl: 3 }" :data-source="list" class="list" size="small" rowKey="name">
      <template #renderItem="{ item }">
        <a-list-item>
          <deploy-item :data="item" @edit="handleEdit(item)" @deploy="handleShowDeploy(item)" @del="handleDel(item)"></deploy-item>
        </a-list-item>
      </template>
    </a-list>
    <a-modal v-model:visible="isShowAdd" :width="600" title="新建项目" :afterClose="resetFields" :maskClosable="false">
      <a-steps :current="addStep" size="small" class="step-bar">
        <a-step title="基本信息"></a-step>
        <a-step title="环境配置"></a-step>
      </a-steps>
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" size="small">
        <div class="base-form" v-if="addStep === 0">
          <a-form-item label="项目名称" v-bind="validateInfos.name" validateTrigger="change">
            <a-input v-model:value="addData.name" :maxlength="12" />
          </a-form-item>
          <a-form-item label="选择项目" v-bind="validateInfos.path">
            <a-input v-model:value="addData.path">
              <template #addonAfter>
                <FolderOpenOutlined style="cursor: pointer" @click="openFileDialog" />
              </template>
            </a-input>
          </a-form-item>
        </div>
        <div class="env-form" v-if="addStep === 1">
          <a-tabs v-model:activeKey="modeTabActive" size="small" type="editable-card" @edit="handleTabEdit" :hide-add="modes.length >= 5">
            <a-tab-pane v-for="(item, index) in modes" :key="index" :tab="item.name" :closable="modes.length !== 1">
              <a-row :gutter="20">
                <a-col :span="12">
                  <a-form-item label="环境名称" required validateTrigger="change" :labelCol="{ span: 7 }" :wrapperCol="{ span: 17 }">
                    <a-input v-model:value="item.name" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="打包命令" :labelCol="{ span: 7 }" :wrapperCol="{ span: 17 }">
                    <a-input v-model:value="item.script"
                      ><template #suffix>
                        <a-tooltip title="不设置打包命令将不会执行打包操作">
                          <QuestionCircleOutlined class="input-tips" />
                        </a-tooltip> </template
                    ></a-input> </a-form-item
                ></a-col>
                <a-col :span="12"
                  ><a-form-item label="服务器" required :labelCol="{ span: 7 }" :wrapperCol="{ span: 17 }"> <a-input v-model:value="item.host"></a-input> </a-form-item
                ></a-col>
                <a-col :span="12"
                  ><a-form-item label="端口" required :labelCol="{ span: 7 }" :wrapperCol="{ span: 17 }"> <a-input v-model:value="item.port"></a-input> </a-form-item
                ></a-col>
                <a-col :span="12"
                  ><a-form-item label="用户名" required :labelCol="{ span: 7 }" :wrapperCol="{ span: 17 }"> <a-input v-model:value="item.username"></a-input> </a-form-item
                ></a-col>
                <a-col :span="12">
                  <a-form-item label="密码" :labelCol="{ span: 7 }" :wrapperCol="{ span: 17 }">
                    <a-input v-model:value="item.password" type="password"
                      ><template #suffix>
                        <a-tooltip title="不设置将使用privateKey方式登录">
                          <QuestionCircleOutlined class="input-tips" />
                        </a-tooltip> </template
                    ></a-input> </a-form-item
                ></a-col>
                <a-col :span="12"
                  ><a-form-item label="打包目录" required :labelCol="{ span: 7 }" :wrapperCol="{ span: 17 }"> <a-input v-model:value="item.distPath"></a-input> </a-form-item
                ></a-col>
                <a-col :span="12"
                  ><a-form-item label="部署目录" required :labelCol="{ span: 7 }" :wrapperCol="{ span: 17 }"> <a-input v-model:value="item.webDir"></a-input> </a-form-item
                ></a-col>
                <a-col :span="12"
                  ><a-form-item label="备份目录" :labelCol="{ span: 7 }" :wrapperCol="{ span: 17 }">
                    <a-input v-model:value="item.backupDir">
                      <template #suffix>
                        <a-tooltip title="不设置目录将不执行备份操作">
                          <QuestionCircleOutlined class="input-tips" />
                        </a-tooltip> </template></a-input></a-form-item
                ></a-col>
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-form>
      <template #footer>
        <a-button v-if="addStep === 1" @click="handlePrevStep"> 上一步 </a-button>
        <a-button v-if="addStep === 0" @click="handleNextStep"> 下一步 </a-button>
        <a-button v-if="addStep === 1" type="primary" @click="handleSubmit"> 完成 </a-button>
      </template>
    </a-modal>
    <a-modal v-model:visible="isShowModes" title="选择环境" :maskClosable="false" @ok="handleDeploy">
      <a-button type="primary" ghost size="small" style="margin-bottom: 20px" @click="selectAllModes">全选</a-button>
      <a-checkbox-group v-model:value="selectModes" :options="checkModeList" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import fs from 'fs';
import path from 'path';
import { defineComponent, ref, reactive, computed } from 'vue';
import { PlusOutlined, FolderOpenOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { useForm } from '@ant-design-vue/use';
import { remote } from 'electron';
import DeployModel from '@/models/DeployModel';
import SettingModel from '@/models/SettingModel';
import { IDeploy, IDeployMode } from '@/interfaces/settings';
import { message, Modal } from 'ant-design-vue';
import DeployItem from './components/DeployItem.vue';
import config from '@/config';
import useDeploy from '@/hooks/useDeploy';
export default defineComponent({
  name: 'DeployPage',
  components: {
    PlusOutlined,
    FolderOpenOutlined,
    QuestionCircleOutlined,
    DeployItem
  },
  setup() {
    // 初始数据
    let list = ref<IDeploy[]>([]);
    const getData = () => {
      list.value = DeployModel.getAll();
    };
    getData();
    // 搜索
    let searchKey = ref('');
    function handleSearch() {
      list.value = DeployModel.find(searchKey.value);
    }
    // 增加
    let isShowAdd = ref(false);
    const addModeData = {
      name: '',
      script: 'npm run build',
      host: '',
      port: 22,
      username: 'root',
      password: '',
      distPath: 'dist',
      webDir: '',
      backupDir: ''
    };
    let addData = reactive<IDeploy>({
      name: '',
      path: '',
      lastTime: '',
      modes: []
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: '请输入项目名称',
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
    const { resetFields, validate, validateInfos } = useForm(addData, rulesRef);
    const modes = computed(() => addData.modes);
    let modeTabActive = ref(0);
    let addStep = ref(0);
    let isAdd = ref(true);
    function handleAdd() {
      addData.modes = [{ ...addModeData, name: '环境1' }];
      isShowAdd.value = true;
      modeTabActive.value = 0;
      addStep.value = 0;
      isAdd.value = true;
    }
    function handleEdit(data: IDeploy) {
      Object.assign(addData, { ...data, modes: [...data.modes] });
      isShowAdd.value = true;
      modeTabActive.value = 0;
      addStep.value = 0;
      isAdd.value = false;
    }

    function handleAddMode() {
      if (!checkMode(addData.modes[modeTabActive.value])) return;
      if (addData.modes.length >= config.deployModeLimit) return message.warn('该项目环境已达上限');
      addData.modes.push({ ...addModeData, name: `环境${modes.value.length + 1}` });
      modeTabActive.value = modes.value.length - 1;
    }
    function openFileDialog() {
      remote.dialog
        .showOpenDialog({
          title: '选择项目',
          properties: ['openDirectory']
        })
        .then(({ filePaths }) => {
          if (filePaths[0]) {
            addData.path = filePaths[0];
          }
        });
    }
    function handleRemoveMode(index: number) {
      addData.modes.splice(index, 1);
      modeTabActive.value = modeTabActive.value >= index ? Number(index) - 1 : modeTabActive.value;
    }
    function handleTabEdit(targetKey: string, action: 'add' | 'remove') {
      if (action === 'add') {
        handleAddMode();
      }
      if (action === 'remove') {
        handleRemoveMode((targetKey as unknown) as number);
      }
    }
    function checkMode({ name, host, port, username, distPath, webDir }: IDeployMode): boolean {
      if (name && host && port && username && distPath && webDir) {
        return true;
      } else {
        message.error('请完善该环境必填信息');
        return false;
      }
    }
    function handlePrevStep() {
      addStep.value = 0;
    }
    function handleNextStep() {
      validate(['name', 'path']).then(() => {
        addStep.value = 1;
        // checkHasConfigFile(addData.path);
      });
    }
    function checkHasConfigFile(dir: string) {
      const configPath = path.resolve(dir, 'misthin.config.js');
      if (fs.existsSync(configPath)) {
        Modal.confirm({
          title: '提示',
          content: '该项目已包含配置文件，是否导入配置',
          onOk() {
            let temp = fs.readFileSync(configPath, 'utf8');
            console.log(temp);
            import(configPath).then((file) => {
              console.log(file);
            });
          }
        });
      }
    }
    function handleSubmit(e: Event) {
      e.preventDefault();
      validate()
        .then(async () => {
          if (modes.value.every((item) => checkMode(item))) {
            let result = isAdd.value ? DeployModel.add(addData) : DeployModel.update(addData);
            if (result.code) {
              return message.error(result.msg);
            }
            message.success(result.msg);
            getData();
            isShowAdd.value = false;
          }
        })
        .catch((err) => {
          message.error('错误：请检查配置信息');
          console.log(err);
        });
    }
    let isShowModes = ref(false);
    let checkModeList = ref<any[]>([]);
    let selectModes = ref<IDeployMode[]>([]);
    function handleShowDeploy(data: IDeploy) {
      checkModeList.value = data.modes.map((item) => ({ label: item.name, value: item, }));
      selectModes.value = [];
      isShowModes.value = true;
      console.log(data);
    }
    function selectAllModes() {
      selectModes.value = selectModes.value.length ? [] : checkModeList.value.map((item) => item.value);
    }
    function handleDeploy() {
      console.log(selectModes.value);
      let {privateKey,passphrase}= SettingModel.getAll();

      selectModes.value.map(item => {
        const {status} = useDeploy(item,{privateKey:'',passphrase:'',path:'/Users/bwrong/WorkSpace/00.MyStudy/vue3-demo'});
      });
    }
    function handleDel(data: IDeploy) {
      DeployModel.delete(data.name);
      getData();
    }
    return {
      list,
      searchKey,
      handleSearch,
      isShowAdd,
      handleAdd,
      handleEdit,
      handleTabEdit,
      modeTabActive,
      addStep,
      openFileDialog,
      validateInfos,
      addData,
      modes,
      handlePrevStep,
      handleNextStep,
      resetFields,
      handleSubmit,
      isShowModes,
      checkModeList,
      selectModes,
      selectAllModes,
      handleShowDeploy,
      handleDeploy,
      handleDel
    };
  }
});
</script>
<style lang="less" scoped>
.content-box {
  padding-bottom: 0;
}
.head-bar {
  padding-bottom: 10px;
  border-bottom: 1px solid lighten(@border-color-base, 10%);
}
.step-bar {
  margin-bottom: 10px;
}
.input-tips {
  color: rgba(0, 0, 0, 0.45);
}
.list {
  padding: 26px 10px 0;
  max-height: calc(100vh - 73px);
  overflow-x: inherit;
  overflow-y: auto;
}

@media (prefers-color-scheme: dark) {
  .head-bar {
    border-bottom: 1px solid #333;
  }
  .input-tips {
    color: #888;
  }
}
</style>

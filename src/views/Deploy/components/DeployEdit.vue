<template>
  <a-modal v-model:visible="showModal" :width="600" title="新建项目" :maskClosable="false" :after-close="handleClose">
    <a-steps :current="addStep" size="small" class="step-bar">
      <a-step title="基本信息"></a-step>
      <a-step title="环境配置"></a-step>
    </a-steps>
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" size="small">
      <div class="base-form" v-if="addStep === 0">
        <a-form-item label="项目名称" v-bind="validateInfos.name" validateTrigger="change">
          <a-input v-model:value="addData.name" :maxlength="36" />
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
                ><a-form-item label="部署目录" required :labelCol="{ span: 7 }" :wrapperCol="{ span: 17 }"> <a-input v-model:value="item.webDir"><template #suffix>
                      <a-tooltip title="该目录下的文件将会被清除覆盖">
                        <QuestionCircleOutlined class="input-tips" />
                      </a-tooltip> </template></a-input> </a-form-item
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
</template>

<script lang="ts">
import fs from 'fs';
import path from 'path';
import { defineComponent, PropType, reactive, ref,computed, onUnmounted, onMounted } from 'vue';
import { message,Modal } from 'ant-design-vue';
import { FolderOpenOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { useForm } from '@ant-design-vue/use';
import { remote } from 'electron';
import config from '@/config';
import { IDeploy, IDeployMode } from '@/interfaces/settings';
import DeployModel from '@/models/DeployModel';
export default defineComponent({
  name: 'DeployAdd',
    components: {
    FolderOpenOutlined,
    QuestionCircleOutlined
  },
  props:{
    show: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    initData:{
      type: Object,
      default: ()=>({})
    }
  },
  setup(props,{emit}) {
    let modeTabActive = ref(0);
    let addStep = ref(0);
    let isAdd = computed(()=> !props.initData);
    let showModal = ref(false);
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
    if(isAdd.value){
      addData.modes.push({...addModeData,name:'环境1'});
    }else{
      Object.assign(addData,{...props.initData});
    }
    const modes = computed(() => addData.modes);
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
        isAdd.value && checkHasConfigFile(addData.path);
      });
    }
    function checkHasConfigFile(dir: string) {
      const configPath = path.resolve(dir, 'misthin.config.js');
      if (fs.existsSync(configPath)) {
        Modal.confirm({
          title: '提示',
          content: '该项目已包含配置文件，是否导入配置',
          onOk() {
            try {
              let temp = fs.readFileSync(configPath, 'utf8');
              let config = eval(temp);
              let modes = Object.values(config.modes||{}) as IDeployMode[];
              addData.modes = modes;
            } catch (error) {
              console.log(error);
            }
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
            emit('submit');
            showModal.value = false;
          }
        })
        .catch((err) => {
          message.error('错误：请检查配置信息');
          console.log(err);
        });
    }
    function handleClose(){
      emit('update:show',false);
      modeTabActive.value = 0;
      addStep.value = 0;
      resetFields();
    }
    onUnmounted(handleClose);
    onMounted(() => { showModal.value=true; });
    return {
      showModal,
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
      handleClose
    };
  }
});
</script>

<style scoped lang="less">

.step-bar {
  margin-bottom: 10px;
}
.input-tips {
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-color-scheme: dark) {
  .input-tips {
    color: #888;
  }
}
</style>
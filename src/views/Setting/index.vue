<template>
  <div class="content-box">
    <div class="page-title">设置</div>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row>
        <a-col :span="14">
          <a-form-item label="privateKey">
            <a-input v-model:value="formData.privateKey">
              <template #addonAfter>
                <FolderOpenOutlined style="cursor: pointer" @click="openFileDialog" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="passphrase">
            <a-input-password v-model:value="formData.passphrase"></a-input-password>
          </a-form-item>
        </a-col>
        <a-col :span="24" class="split-line"></a-col>
        <a-col :span="14">
          <a-form-item label="自动更新">
            <a-switch v-model:checked="formData.autoUpdate" />
          </a-form-item>
          <a-form-item label="主题偏好">
            <a-radio-group v-model:value="formData.theme">
              <a-radio :value="item.name" v-for="item in themeList" :key="item.name"> {{ item.title }} </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24" class="split-line"></a-col>
        <a-col :span="12" push="2" class="btn-group">
          <a-button type="primary" @click="handleSubmit">保存</a-button>
          <!-- <a-button type="primary" @click="handleSubmit"></a-button> -->
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { FolderOpenOutlined } from '@ant-design/icons-vue';
import { remote } from 'electron';
import config from '@/config';
import SettingModel from '@/models/SettingModel';
import { ISetting } from '@/interfaces/settings';
import { message } from 'ant-design-vue';
export default defineComponent({
  components: {
    FolderOpenOutlined
  },
  setup() {
    const state = reactive({
      formData: {
        privateKey: '',
        passphrase: '',
        autoUpdate: true,
        theme: 'system'
      }
    });
    state.formData = SettingModel.getAll();
    const openFileDialog = () => {
      remote.dialog
        .showOpenDialog({
          title: '选择privateKey',
          defaultPath: state.formData.privateKey || `${config.homePath}/.ssh/id_rsa`,
          properties: ['openFile']
        })
        .then(({ filePaths }) => {
          if (filePaths[0]) {
            state.formData.privateKey = filePaths[0];
          }
        });
    };
    function handleSubmit() {
      let result = SettingModel.updateAll(state.formData as ISetting);
      if (result.code) {
        return message.error(result.msg);
      }
      message.success(result.msg);
    }
    return {
      themeList: config.themeList,
      formData: state.formData,
      openFileDialog,
      handleSubmit
    };
  }
});
</script>

<style scoped lang="less">
.btn-group {
  margin-top: 40px;
}
</style>
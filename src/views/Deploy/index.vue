<template>
  <div class="content-box">
    <a-row class="head-bar" justify="space-between">
      <a-col :span="3">
        <a-button type="primary" ghost @click="handleAdd"
          ><template #icon><PlusOutlined /></template>新建</a-button
        >
      </a-col>
      <a-col :span="6">
        <a-input-search v-model:value="searchKey" placeholder="请输入项目名称" enter-button @search="handleSearch" />
      </a-col>
    </a-row>
    <a-modal v-model:visible="isShowAdd" title="新建项目" @ok="handleSubmit" :afterClose="resetFields" :maskClosable="false" :confirmLoading="addLoading">
      <a-form hideRequiredMark :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-item label="项目名称" v-bind="validateInfos.name" validateTrigger="change">
          <a-input v-model:value="modelRef.name" />
        </a-form-item>
        <a-form-item label="选择项目" v-bind="validateInfos.path">
          <a-input v-model:value="modelRef.path">
            <template #addonAfter>
              <FolderOpenOutlined style="cursor: pointer" @click="openFileDialog" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="项目名称" v-bind="validateInfos.name" validateTrigger="change">
          <a-input v-model:value="modelRef.name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { PlusOutlined,FolderOpenOutlined } from '@ant-design/icons-vue';
import { useForm } from '@ant-design-vue/use';
import { remote } from 'electron';
export default defineComponent({
  components: {
    PlusOutlined,
    FolderOpenOutlined
  },
  setup() {
    let searchKey = ref('');
    const handleSearch = () => {
      isShowAdd.value = true;
    };
    let isShowAdd = ref(false);
    let addLoading = ref(false);
    const handleAdd = () => {
      isShowAdd.value = true;
    };
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
    const handleSubmit = (e: Event) => {
      e.preventDefault();
      validate().then(async () => {
        console.log(1);
      });
    };
    return {
      searchKey,
      handleSearch,
      isShowAdd,
      addLoading,
      handleAdd,
      openFileDialog,
      validateInfos,
      validate,
      modelRef,
      resetFields,
      handleSubmit
    };
  }
});
</script>
<style lang="less" scoped>
.head-bar {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid lighten(@border-color-base, 10%);
}
</style>

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
    <deploy-edit v-if="isShowAdd" v-model:show="isShowAdd" @submit="getData" :init-data="initEditData"></deploy-edit>
    <a-modal v-model:visible="isShowModes" title="选择环境" :maskClosable="false" @ok="handleDeploy">
      <div><a-button type="primary" ghost size="small" style="margin-bottom: 20px" @click="selectAllModes">全选</a-button></div>
      <a-checkbox-group v-model:value="selectModes" :options="checkModeList" />
    </a-modal>
    <a-modal v-model:visible="deployLoading" :title="null" :footer="null" :maskClosable="false" width="340px">
      <water-progress :logs="deployLogs" :status="deployStatus" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import DeployModel from '@/models/DeployModel';
import SettingModel from '@/models/SettingModel';
import { IDeploy, IDeployMode } from '@/interfaces/settings';
import DeployItem from './components/DeployItem.vue';
import DeployEdit from './components/DeployEdit.vue';
import useDeploy from '@/hooks/useDeploy';
import WaterProgress from '@/components/WaterProgress.vue';
import { ILog } from '@/interfaces/common';
import { formatTimestamp } from '@/utils';
export default defineComponent({
  name: 'DeployPage',
  components: {
    PlusOutlined,
    DeployItem,
    DeployEdit,
    WaterProgress
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
    let initEditData = ref<IDeploy | null>(null);
    function handleAdd() {
      isShowAdd.value = true;
      initEditData.value = null;
    }
    // 编辑
    function handleEdit(data: IDeploy) {
      isShowAdd.value = true;
      initEditData.value = { ...data, modes: [...data.modes] };
    }
    // 部署
    let isShowModes = ref(false);
    let checkModeList = ref<{ label: string; value: IDeployMode }[]>([]);
    let selectProject = ref<IDeploy | {}>({});
    let selectModes = ref<IDeployMode[]>([]);
    function handleShowDeploy(data: IDeploy) {
      checkModeList.value = data.modes.map((item) => ({ label: item.name, value: item }));
      selectProject.value = data;
      selectModes.value = [];
      isShowModes.value = true;
    }
    function selectAllModes() {
      selectModes.value = selectModes.value.length ? [] : checkModeList.value.map((item) => item.value);
    }
    let deployLoading = ref(false);
    let deployLogs = ref<ILog[]>([]);
    let deployStatus = ref(0);
    async function handleDeploy() {
      let { privateKey, passphrase } = SettingModel.getAll();
      isShowModes.value = false;
      deployLoading.value = true;
      deployStatus.value = 0;
      const { logs, startDeploy } = useDeploy(selectModes.value, selectProject.value as IDeploy, { privateKey, passphrase });
      deployLogs.value = logs.value;
      await startDeploy()
        .then(() => {
          DeployModel.update({
            ...(selectProject.value as IDeploy),
            lastTime: formatTimestamp(+new Date())
          });
          deployStatus.value = 1;
          getData();
        })
        .catch((error) => {
          deployStatus.value = -1;
          console.log(error);
        });
    }
    // 删除
    function handleDel(data: IDeploy) {
      DeployModel.delete(data.name);
      getData();
    }
    return {
      list,
      getData,
      searchKey,
      handleSearch,
      isShowAdd,
      handleAdd,
      handleEdit,
      initEditData,
      isShowModes,
      checkModeList,
      selectModes,
      selectAllModes,
      handleShowDeploy,
      handleDeploy,
      handleDel,
      deployLoading,
      deployLogs,
      deployStatus
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
}
</style>

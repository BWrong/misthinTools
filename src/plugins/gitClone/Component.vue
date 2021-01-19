<template>
  <div class="progress-wrap">
    <div class="progress-box">
      <div class="process-head">
        <img src="../../assets/img/update.png">
        <span>数据更新</span>
      </div>
      <div class="progress-bar">
        <Progress :percent="percent" :stroke-width="18" :status="type" text-inside ></Progress>
      </div>
      <div class="progress-log" ref="detail">
        <span v-for="(item, index) in detail" :key="index" :class="['txt',item.type]">- <em v-html="item.msg"></em></span>
      </div>
    </div>
  </div>
</template>
<script>
let SOCKET = null;
export default {
  data() {
    return {
      percent: 0,
      type: 'active',
      isDone: 0,
      detail: []
    };
  },
  created() {
    this.$Spin.hide();
    this.pushMsg('开始更新，正在初始化...');
    const URL = this.socketUrl;
    try {
      SOCKET = new WebSocket(URL);
    } catch (error) {
      this.pushMsg(`初始化失败:${error}`,'wrong');
    }
    SOCKET.onopen = e => {
      this.pushMsg('初始化成功！','active');
    };
    SOCKET.onmessage = e => {
      let messege = JSON.parse(e.data);
      switch (messege.type) {
        case 'init':
          this.$api.system.update.startUpdate({
            website_id: this.wid,
            client_id: messege.client_id
          });
          break;
        case 'render.update':
          this.isDone = messege.data.isdone;
          messege.data.progress.type && (this.type = messege.data.progress.type);
          if(messege.data.progress.percent && parseInt(messege.data.progress.percent) > this.percent) {
            this.percent = parseInt(messege.data.progress.percent);
          }
          this.pushMsg(messege.data.progress.msg, messege.data.progress.type);
          this.$nextTick(() => {
            this.$refs.detail && (this.$refs.detail.scrollTop = this.$refs.detail.scrollHeight);
          });
      }
    };
    SOCKET.onclose = e => {
      let delay = this.isDone ? 2000 : 5000;
      setTimeout(() => {
        this.$emit('confirm');
      }, delay);
    };
    SOCKET.onerror = err => {
      this.pushMsg(`初始化失败:${err}`,'wrong');
    };
  },
  props: {
    wid: {
      type: [String,Number],
      required: true
    },
    socketUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    /* type: 'active'：本项完成, 'success'：成功 ，'wrong': 错误*/
    pushMsg(msg, type = '') {
      this.detail.push({ msg, type });
    }
  }
};
</script>
<style lang="less" scoped>
.progress-wrap{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55,55,55,.6);
    height: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  .progress-box{
    width: 500px;
    background: #FEFDFE;
    padding: 30px;
    border-radius: 5px;
  }
  .process-head{
    text-align: center;
    span{
      display: block;
      font-size: 20px;
      margin: 10px auto;
    }
  }
  .progress-log{
    background-color: #fff;
    height: 200px;
    padding: 10px;
    overflow: auto;
    margin-top: 12px;
    border: 1px solid #dddee1;
    padding-bottom: 20px;
    em{
      font-style: normal
    }
    .txt {
      color: #80848f;
      display: block;
      text-align: left;
      font-size: 12px;
      line-height: 2;
      &.success{
        color: #19BE6B;
      }
      &.active{
        color: #2DB7F5;
      }
      &.warn{
        color: #ff9900;
      }
      &.wrong{
        color: #ed3f14;
      }
    }
  }
}
</style>

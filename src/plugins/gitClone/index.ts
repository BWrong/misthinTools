import { createApp } from 'vue';
import Component from './Component.vue';
let tempInstance: any = null;
Component.newInstance = (properties) => {
  const _props = properties || {};
  const Instance = createApp({
    name: 'process-wrap',
    data() {
      return Object.assign({}, _props);
    },
    render(h) {
      return h(Component, {
        props: { ...this.$data },
        on: {
          confirm: (data) => {
            _props.resolve && _props.resolve(data);
            this.remove();
          }
        }
      });
    },
    methods: {
      remove() {
        // setTimeout(() => {
        this.$destroy();
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
        // this.$el && document.body.removeChild(this.$el);
        this.onRemove();
        // }, 300);
      },
      onRemove() {}
    }
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const nowComp = Instance.$children[0];

  return {
    show(props) {
      nowComp.$parent.onRemove = props.onRemove;
      // nowComp.show();
    },
    remove() {
      nowComp.$parent.remove();
    },
    component: nowComp
  };
};
Component.update = (options = {}) => {
  return new Promise((resolve, reject) => {
    options.resolve = resolve;
    options.reject = reject;
    let instance = tempInstance || Component.newInstance(options);
    options.onRemove = () => {
      tempInstance = null;
    };
    instance.show(options);
  });
};
Component.remove = () => {
  if (!tempInstance) return false;
  const instance = Component.newInstance();
  instance.remove();
};
export default {
  install: (Vue) => {
    Vue.prototype.$webUpdate = Component;
  }
};

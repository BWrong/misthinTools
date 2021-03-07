
const mixin: any = {
  mounted() {
    this.disableDragEvent();
  },
  methods: {
    disableDragEvent() {
      window.addEventListener('dragenter', this.disableDrag, false);
      window.addEventListener('dragover', this.disableDrag);
      window.addEventListener('drop', this.disableDrag);
    },
    disableDrag(e: DragEvent) {
      // const dropzone = document.getElementById('upload-area'); // 这个是可拖拽的上传区
      // if (dropzone === null || !dropzone.contains(e.target)) {
      e.preventDefault();
      // e.dataTransfer.effectAllowed = 'none';
      // e.dataTransfer.dropEffect = 'none';
      // }
    }
  },
  beforeDestroy() {
    window.removeEventListener('dragenter', this.disableDrag, false);
    window.removeEventListener('dragover', this.disableDrag);
    window.removeEventListener('drop', this.disableDrag);
  }
};
export default mixin;

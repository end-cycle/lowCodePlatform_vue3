<template>
  <div class="background">
    <el-dialog title="生成的链接" v-model="sendVisiable" width="30%" top="20vh">
      <a :href="src" target="_blank">{{ src }}</a>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click.stop="copyUrl(src)">复 制</el-button>
          <el-button @click.stop="unVisiable">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  emits: ['update:sendVisiable'],
  props: ['sendVisiable', 'src'],
  methods: {
    unVisiable() {
      this.$emit("update:sendVisiable", false)
    },
    copyUrl(url) {
      let urlTmpNode = document.createElement('input');
      urlTmpNode.value = url;
      document.body.appendChild(urlTmpNode);
      urlTmpNode.select();
      document.execCommand("Copy");
      urlTmpNode.remove();
      this.unVisiable();
      this.$message.success("复制成功");
    }
  },
}
</script>

<style scoped>
.background {
  background: #fff;
  z-index: 104;
}
</style>
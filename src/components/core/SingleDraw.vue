<template>
  <div :style="flexStyle">
    <div class="block tpl-container " v-for="(view, index) in views" :key="view.id"
      :style="{ width: view.style.width, height: view.style.height, position: view.style.position }">
      <component :comContent="view.comContent" :views="view" :draggable="edit && view.component != 'FlexBox'"
        :class="{ componenthover: edit, selected: index == currentIndex && edit }" :myStyle="view.style"
        :is="view.component" :edit="edit" @dragstart.native.stop="dragstart(view, index)"
        @click.native.stop="select(index, view)">
      </component>
    </div>
  </div>
</template>

<script>
import '@/assets/css/componentBox.scss'
export default {
  name: 'DynamicDraw',
  props: [
    'myStyle',
    'views',
    'edit',
    "currentCom",
    'flexStyle',
    'flexFocus'
  ],
  data() {
    return {
      centerCom: false, //是否是画布内的组件
      currentIndex: -1,//选中组件的索引
    }
  },
  mounted() {
    this.$bus.on("deleteFlexBoxCom", () => {
      this.currentIndex = -1
    })
  },
  methods: {
    //选中组件
    select(index, view) {
      if (!this.edit) return // 如果不是编辑状态，无效
      this.$bus.emit("clearFocus")
      // 全局相对寻址
      this.$bus.emit("refreshCurrentViews", this.views, index)
      // 单views相对寻址
      this.$bus.emit("updateCurrentCom", view)
      this.$bus.emit('sendDeleteIndex', index)
      this.$bus.emit("deleteFlexBoxCom")// 重置其余索引
      this.currentIndex = index
      // 激活向右发送数据事件
      this.$bus.emit('views', view);
    },
    dragstart(view, index) {
      if (!this.edit) return // 如果不是编辑状态，无效

      this.$bus.emit("clearFocus")
      this.$bus.emit("refreshCurrentViews", this.views, index)
      this.$bus.emit("onCenter")
      this.centerCom = true;
      // this.currentCom = view;
      this.$bus.emit("updateCurrentCom", view)
      this.$bus.emit("refreshCurrentCom", this.centerCom)
    },
  },
  components: {
  },
}
</script>

<style lang="scss" scoped>
.showBorder {
  border: 1px dashed #06c;
  width: 100%;
}

.selected {
  /*hp修正点击组件因增加边框而偏移*/
  border: 1px solid rgba(0, 108, 255) !important
}

.flex {
  display: flex;
  width: 100%;
  height: 100%;
}

.mask {
  position: absolute;
  left: 0;
  top: 0px;
  bottom: 0;
  right: 0;
  background-color: #baf8ff;
  border: 2px solid #06c;
  opacity: 0.7;
  z-index: 10;
}

.component-hover {
  display: inline-block;
  /*hp修正点击组件因增加边框而偏移*/
  border: 1px solid transparent;
}

.component-hover:hover {
  border: 1px dashed rgb(0, 108, 255);
}
</style>
<template>
  <div class="top">
    <div class="top-center">
      <div class="top-center-pc" :class="{ active: isPC }" @click="toPC">
        <img v-lazy="require('@/' + 'assets/pc.png')" class="" />
      </div>
      <div class="top-center-phone" :class="{ active: !isPC }" @click="toPhone">
        <img v-lazy="require('@/' + 'assets/phone.png')" />
      </div>
    </div>
    <div class="top-right">
      <div class="top-right-operator">
        <img v-lazy="require('@/' + 'assets/ctrl-z.png')" class="show" alt=""
          :style="centerStep !== 1 ? '' : 'opacity:0.2;'" @click="backOff" />
        <img v-lazy="require('@/' + 'assets/ctrl-z.png')" class="show restore" :style="{ opacity: opacityValue }"
          @click="forward" alt="" />
      </div>
      <div class="top-right-function">
        <el-button size="small" type="danger" v-if="hasSelectEvent" @click="deleteEvent">删除</el-button>
        <el-button border size="small" @click="absolute = !absolute" :type="absolute ? 'info' : ''">{{
          absolute ? "绝对定位"
          : "静态定位"
        }}</el-button>
        <el-button size="small" @click="save">保 存</el-button>
        <el-button size="small" @click="$refs.file.click()">导入 Json</el-button>
        <el-button size="small" @click="reset" type="primary">重 置</el-button>
        <el-button size="small" @click="switchState" type="primary">{{
          edit ? "预览" : "编辑"
        }}</el-button>
        <el-button size="small" @click="release" type="primary">发 布</el-button>
      </div>
      <!-- 隐藏起来的json输入 -->
      <input type="file" ref="file" id="file" accept=".json" @change="importJSON" style="display: none" />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isPC: true,
      edit: true,
      centerStep: 1,
      hasSelectEvent: false,
      absolute: false,
      opacityValue: '',
    };
  },
  mounted() {
    let self = this;
    document.onkeydown = function (event) {
      let key = window.event.keyCode;
      console.log();
      if (event.key && self.edit === false) {
        self.$bus.emit("switchState");
      }
    }

    //获取画布区的阶段
    this.$bus.on("getStep", (step) => {
      this.centerStep = step;
    });
    // 监听选中事件
    this.$bus.on("selectEvent", (index) => {
      this.hasSelectEvent = index === -1 ? false : true;
    });
    this.$bus.on("switchState", () => {
      this.edit = !this.edit;
    });
  },
  destroyed() {
    window.onkeydown = null;
  },
  methods: {
    reset() {
      this.$bus.emit("reset");
    },
    save() {
      this.$bus.emit("save");
    },
    offDelete() {
      this.hasSelectEvent = false;
    },
    deleteEvent() {
      this.$bus.emit("showDeleteDialog");
    },
    backOff() {
      this.$bus.emit("backOff");
    },
    forward() {
      if (sessionStorage.getItem(String(this.centerStep + 1)) !== null) {
        this.$bus.emit("forward");
      }
    },
    toPC() {
      this.isPC = true;
      this.$bus.emit("toPc");
    },
    toPhone() {
      this.isPC = false;
      this.$bus.emit("toPhone");
    },
    // 切换编辑预览状态
    switchState() {
      this.$bus.emit("switchState");
    },
    inputJsonEvent(data) {
      this.$bus.emit("inputJson", data);
    },
    // 导入json
    importJSON() {
      const file = document.getElementById("file").files[0];
      this.$refs.file.value = '';
      const reader = new FileReader();
      reader.readAsText(file);
      let _this = this;
      reader.onload = function () {
        // this.result为读取到的json字符串，需转成json对象
        let ImportJSON = JSON.parse(this.result);
        // 检测是否导入成功
        // console.log(ImportJSON, '-----------------导入成功')
        // 导入JSON数据
        _this.inputJsonEvent(ImportJSON);
      };
    },
    // 发布页面
    release() {
      this.$bus.emit("release");
    },
  },
  watch: {
    centerStep: {
      immediate: true,
      handler() {
        if (sessionStorage.getItem(String(this.centerStep + 1)) == null) {
          // console.log("hasMore", sessionStorage.getItem(String(this.centerStep + 1)));
          this.opacityValue = 0.2;
        } else {
          this.opacityValue = '';
        }
      }
    },
    absolute: {
      immediate: true,
      handler(newVal) {
        this.$bus.emit("switchPattern", newVal);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #eee;
  height: 39px;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  margin-bottom: 5px;
  border-bottom: 1px solid #eee;
  position: sticky;
  z-index: 101;
  top: 0px;

  &-left-logo {
    width: 130.8px;
    height: 36px;
    opacity: 0;
  }

  &-center {
    display: flex;
    width: 67px;
    height: 30px;
    justify-content: space-between;
    align-items: center;

    &-pc img {
      width: 20px;
      height: 25px;
    }

    &-pc {
      width: 35px;
      height: 35px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-phone {
      width: 35px;
      height: 35px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-phone img {
      width: 18px;
      height: 20px;
      opacity: 0.65;
    }
  }

  &-right {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-operator {
      display: flex;
      width: 60px;
      height: 40px;
      align-items: center;
      justify-content: space-around;
    }

    &-operator img {
      width: 20px;
      height: 20px;
    }

    &-function {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-left: 15px;
      margin-right: 3px;
    }
  }
}

.active {
  background: #f2f2f2;
}

.restore {
  transform: rotateY(180deg);
}

.show {
  opacity: 0.5;
}

.show:hover {
  opacity: 0.6;
  cursor: pointer;
}
</style>
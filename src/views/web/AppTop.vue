<template>
    <div id="goTop">
        <div class="goTop" v-show="goTopShow" @click="goTop">
          <img src="../../assets/img/top.png" class="goTopIcon">
        </div>
    </div>
</template>

<script>
export default {
  name: 'goTop',
  data () {
    return {
      scrollTop: '',
      goTopShow: false
    }
  },
  watch: {
    scrollTop (val) {
      if (this.scrollTop > 500) {
        this.goTopShow = true
      } else {
        this.goTopShow = false
      }
    }
  },
  methods: {
    handleScroll () {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (this.scrollTop > 500) {
        this.goTopShow = true
      }
    },
    goTop () {
      let timer = new RegExp('(^| )' + name + '=([^;]*)(;|$)'),
        _that = this
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn () {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 20
          document.body.scrollTop = document.documentElement.scrollTop =
          _that.scrollTop
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
          _that.goTopShow = false
        }
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.goTop {
    position: fixed;
    right: 80px;
    bottom: 60px;
    width: 40px;
    height: 40px;
    padding: 10px;
    cursor: pointer;

}
.goTopIcon {
    width: 80px;
    height: 80px;
    font-size: 20px;
    margin: 0 auto;
}
</style>

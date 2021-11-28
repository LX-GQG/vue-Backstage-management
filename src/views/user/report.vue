<template>
    <div id="report">
        <div class="reportwz">
            <Echarts class="rr"></Echarts>
            <profit class="qq"></profit>
            <Ecstock class="ww"></Ecstock>
            <Ecrefund class="ff"></Ecrefund>
        </div>
    </div>
</template>

<script>
import Echarts from '@/views/user/Echarts'
import profit from '@/views/user/profit'
import Ecstock from '@/views/user/Ecstock'
import Ecrefund from '@/views/user/Ecrefund'

export default {
  data () {
    return {}
  },
  components: {
    Echarts,
    profit,
    Ecstock,
    Ecrefund
  },
  methods: {}
}
</script>

<style>
#report{
    width: 100%;
}
#report .reportwz{
    width: 1200px;
    min-width: 500px;
}
#report .reportwz .rr{
    float: left;
    margin-left: 10px;
}
#report .reportwz .qq{
    float: left;
    margin-left: 150px;
}
#report .reportwz .ww{
    float: left;
    margin-top: 80px;
    margin-left: 10px;
}
#report .reportwz .ff{
    float: left;
    margin-top: 80px;
    margin-left: 150px;
}
</style>

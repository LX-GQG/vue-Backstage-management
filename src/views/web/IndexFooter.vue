<template>
  <div id="indexfooder">
    <div class="indexfooderpl">
      <div class="footertop">
         <ul>
           <li>
             <i class="weixiu"></i>
             预约维修服务
           </li>
           <li>
             <i class="stian"></i>
             7天无理由退货
           </li>
           <li>
             <i class="fttian"></i>
             15天免费换货
           </li>
           <li>
             <i class="libao"></i>
             满69包邮
           </li>
           <li class="bordernone">
             <i class="didian"></i>
             520余家售后网点
           </li>
         </ul>
      </div>
      <div class="footermain">
        <dl>
          <dt>帮助中心</dt>
          <dd>账户管理</dd>
          <dd>购物指南</dd>
          <dd>订单操作</dd>
        </dl>
        <dl>
          <dt>服务支持</dt>
          <dd>售后政策</dd>
          <dd>自助服务</dd>
          <dd>相关下载</dd>
        </dl>
        <dl>
          <dt>线下门店</dt>
          <dd>BABE之家</dd>
          <dd>服务网点</dd>
          <dd>授权体验店</dd>
        </dl>
        <dl>
          <dt>关于BABE</dt>
          <dd>了解BABE</dd>
          <dd>加入BABE</dd>
          <dd>投资者关系</dd>
          <dd>企业社会责任</dd>
          <dd>廉洁举报</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd>新浪微博</dd>
          <dd>官方微信</dd>
          <dd>联系我们</dd>
          <dd>公益基金会</dd>
        </dl>
        <dl>
          <dt>特色服务</dt>
          <dd>| 码通道</dd>
          <dd>礼物码</dd>
          <dd>防伪查询</dd>
        </dl>
        <div class="footermain-coller">
          <p class="phone">400-100-5555</p>
          <p>8:00-18:00（仅收市话费）</p>
          <a rel="nofollow" class="btn-line-primary btn-small">
            <em class="iconfont-message2"></em>
             人工客服
          </a>
        </div>
      </div>
      <div class="footercopy">
        &copy; 2021 BABE 版权所有 粤ICP备14012291号 | 隐私政策 | 用户使用协议 | 资质证照 | 知识产权
        <div>
          <img src="../../assets/img/police.png" >
          粤公安安备 44190002016546号
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
  #indexfooder{
    width: 100%;
    height: 405px;
    position: relative;
    bottom: 0;
    background-color: white;
  }
  .indexfooderpl{
    width: 1200px;
    margin: 0 auto;
    padding-top: 10px;
  }
  .footertop{
    width: 1200px;
    margin: 22px auto;
    height: 46px;
    border-bottom: 1px solid #cdcdcd;
  }
  .footertop ul li{
    list-style: none;
    float: left;
    text-align: center;
    width: 220px;
    margin-left: 10px;
    border-right: 1px solid #cdcdcd;
    position: relative;
    color: #8a8a8a;
  }
  .weixiu{
    width: 25px;
    height: 25px;
    left: 27px;
    position: absolute;
    background-image: url(../../assets/img/weixiu.png);
    background-size: 24px;
    background-position: 1px 1px;
  }
  .stian{
    width: 25px;
    height: 22px;
    left: 25px;
    top: 0px;
    position: absolute;
    background-image: url(../../assets/img/stian.png);
    background-size: 24px;
    background-position: 1px 0;
  }
  .fttian{
    width: 25px;
    height: 25px;
    left: 29px;
    top: -1px;
    position: absolute;
    background-image: url(../../assets/img/fttian.png);
    background-size: 24px;
    background-position: 1px 1px;
  }
  .libao{
    width: 25px;
    height: 25px;
    left: 45px;
    top: -2px;
    position: absolute;
    background-image: url(../../assets/img/libao.png);
    background-size: 24px;
    background-position: 1px 1px;
  }
  .didian{
    width: 25px;
    height: 25px;
    left: 20px;
    top: -2px;
    position: absolute;
    background-image: url(../../assets/img/didian.png);
    background-size: 24px;
    background-position: 1px 1px;
  }
  .footertop ul .bordernone{
    border: none;
  }
  .footermain{
    width: 1200px;
    height: 210px;
    margin: 25px auto;
    position: relative;
  }
  .footermain dl{
    width: 155px;
    float: left;
  }
  .footermain dl dt{
    margin: -1px 0 26px;
    font-size: 14px;
    line-height: 1.25;
    color: #424242;
  }
  .footermain dl dd{
    margin: 10px 0 0;
    font-size: 12px;
    color: #757575;
  }
  .footermain dl dd:hover{
    color: #FF6700;
  }
  .footermain-coller{
    float: right;
    width: 250px;
    border-left: 1px solid #cdcdcd;
    text-align: center;
    margin-top: 12px;
  }
  .footermain-coller .phone{
    font-size: 24px;
    font-weight: 300;
    color: #ff6700;

  }
  .footermain-coller p{
    margin: 0 0 5px 0;
    font-size: 11px;
    color: #616161;
  }
  .btn-line-primary{
    font-size: 11px;
    border-color: #ff6700;
    background: #fff;
    color: #ff6700;
    margin-top: 10px;
  }
  .btn-line-primary:hover{
    color: white;
    background-color: #ff6700;
  }
  .btn-small{
    width: 118px;
    height: 30px;
    display: inline-block;
    line-height: 30px;
    border: 1px solid #FF6700;
  }
  .footercopy{
    width: 1200px;
    position: relative;
    margin: 0 auto;
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #cdcdcd;
    margin-bottom: 10px;
  }
  .footercopy{
    font-size: 12px;
    color: #8a8a8a;
  }
  .footercopy div{
    margin-top: 13px;
    margin-bottom: 10px;
  }
  .footercopy div img{
    padding-top: 5px;
  }
</style>

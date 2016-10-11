<template>
  
  <div class="page-wrapper">

      <header class="clearfix" id="header">
        <div class="ant-row">
          <div class="ant-col-xs-24 ant-col-sm-7 ant-col-md-6 ant-col-lg-4 ">
            <a id="logo" href="/"><img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"><span>WCD COMPONENTS</span></a>
          </div>
        
          <div class="ant-col-xs-0 ant-col-sm-17 ant-col-md-18 ant-col-lg-11 ant-col-lg-offset-9" style="display:block; padding-top: 17px;">
            <vue-menu :source-data="menuData" :mode="'horizontal'">
              <!-- <vue-icon type="appstore" slot="beforeIcon"></vue-icon> -->
            </vue-menu>
          </div>
        </div>
      </header>
      <router-view  keep-alive></router-view>
      <footer>WCD COMPONENTS 版权所有 © 2015 由wcd技术部支持</footer>


  </div>
</template>
<script>
  import vueMenu from '../components/menu/vue-menu'
  import vueIcon from '../components/icon/vue-icon'
  import vueContent from '../components/vueContent.vue'
  export default {
    data () {
      return {
        menuData: [
          {key: '1', title: '首页', iconType: 'cloud', link: '/vueComponent/index.html'},
          {key: '2', title: '实践', iconType: 'aliwangwang-o'},
          {key: '3', title: '模式', iconType: 'star'},
          {key: '4', title: '组件', iconType: 'appstore', link: '/vueComponent'},
          {key: '5', title: '语言', iconType: 'paper-clip'},
          {key: '6', title: '资源', iconType: 'github'},
        ],
        
      }
    },
    components: {
      vueMenu,
      vueIcon,
      vueContent
    },
  }
</script>
<style lang="less">
@import "../style/index.less";
body {
    background: #ececec;
}
header {
    transition: opacity .5s;
    background: #fff;
    border-bottom: 1px solid #eee;
    height: 80px;
    margin-bottom: 24px;
    padding: 0 4%;
    width: 100%;
}
footer {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  color: #999;
}

#logo, #logo img {
    height: 80px;
    line-height: 80px;
}

#logo {
    float: left;

    img{
      width: 40px;
      margin-right: 8px;
    }

    span {
        float: right;
        font-size: 16px;
        font-family: Raleway,Hiragino Sans GB,sans-serif;
        height: 80px;
        line-height: 80px;
        text-transform: uppercase;
    }
}
.main-wrapper {
    width: 96%;
    margin: 0 auto;
    border-radius: 6px;
    padding: 24px 0 0;
    margin-bottom: 24px;
    background-color: #fff;
    overflow: hidden;
    position: relative;
}
.main-container {
    padding: 0 6% 120px 4%;
    margin-left: -1px;
    min-height: 500px;
    border-left: 1px solid #e9e9e9;
}
.markdown{
  color: #666;
  font-size: 14px;
  line-height: 1.8;
  h1 {
      color: #404040;
      font-weight: 500;
      line-height: 40px;
      margin-bottom: 24px;
      margin-top: 8px;
      font-size: 28px;
      font-family: lato,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
  }
  hr{
    border-radius: 10px;
    height: 3px;
    border: 0;
    background: #eee;
    margin: 20px 0;
  }
  p, pre {
      margin: 1em 0;
  }
  pre{
    padding: 1em;
    background-color: #F7F7F7;
    border-radius: 6px;
  }
  h2 {
      font-size: 22px;
  }
  h2, h3,  h4,  h5,  h6 {
      color: #404040;
      font-family: lato,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
      margin: 1.6em 0 .6em;
      font-weight: 500;
      clear: both;
  }
  code,kbd,pre,samp{
    font-family: Consolas, monospace;
  }
  code{
    margin: 0 3px;
  }
  & > ul li{
    list-style: circle;
    margin-left: 20px;
  }
  & > ol li{
    list-style: decimal;
    margin-left: 20px;
    padding-left: 8px;
  }
}
.code-boxes-col-2-1{
  display: inline-block;
  vertical-align: top;
  padding: 0 8px;
}
.aside-container {
    padding-bottom: 50px;
    float:left;
    width: 200px;
}
.aside-container .ant-menu-item a, .aside-container .ant-menu-submenu-title span, .aside-container>.ant-menu-item {
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>

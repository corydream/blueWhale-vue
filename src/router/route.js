import Vue from "vue";
import VueRouter from "vue-router";
// import tempRole from './../components/manageCogs/template/tempRole.vue'
// import tempUserMenu from './../components/manageCogs/template/tempUserMenu.vue'
// import leftnav from './../components/manageCogs/leftnav/leftnav.vue'
// import dashboard from './../components/databoard/databoard.vue'
// import dataMarket from './../components/datamarket/datamarket.vue';
// import dataInsight from './../components/dataInsight/datainsight.vue';
// import dataApplication from './../components/dataAppLication/dataAppLication.vue'
// import ponelOne from './../components/dataAppLication/contain/bottom/panel/ponelOne.vue'
// import ponelTwo from './../components/dataAppLication/contain/bottom/panel/ponelTwo.vue'
// import ponelThree from './../components/dataAppLication/contain/bottom/panel/ponelThree.vue'
// import helpCenter from './../components/helpCenter/helpCenter.vue'
// import crawler from './../components/helpCenter/contain/pages/crawler.vue'
// import news from "./../components/dataInsight/newRecommend.vue"
// import explode from "./../components/dataInsight/explodeProduct.vue"
const cogBoard = () =>
  import("./../components/manageCogs/template/cogboard.vue");
const cogData = () =>
  import("./../components/manageCogs/template/cogdata.vue");
const cogroup = () =>
  import("./../components/manageCogs/template/cogroup.vue");
const cogUser = () =>
  import("./../components/manageCogs/template/coguser.vue");

const leftnav = () => import("./../components/manageCogs/leftnav/leftnav.vue");
const dashboard = () => import("./../components/databoard/databoard.vue");
const dataMarket = () => import("./../components/datamarket/datamarket.vue");
const dataInsight = () => import("./../components/dataInsight/datainsight.vue");
const dataApplication = () =>
  import("./../components/dataAppLication/dataAppLication.vue");
const ponelOne = () =>
  import("./../components/dataAppLication/contain/bottom/panel/ponelOne.vue");
const ponelTwo = () =>
  import("./../components/dataAppLication/contain/bottom/panel/ponelTwo.vue");
const ponelThree = () =>
  import("./../components/dataAppLication/contain/bottom/panel/ponelThree.vue");
const helpCenter = () => import("./../components/helpCenter/helpCenter.vue");
const crawler = () =>
  import("./../components/helpCenter/contain/pages/crawler.vue");
const news = () => import("./../components/dataInsight/news/news.vue");
const newRecommend = () =>
  import("./../components/dataInsight/news/newRecommend.vue");
const newRecommendSum = () =>
  import("./../components/dataInsight/news/newRecommendSum.vue");
const newRecommendTendency = () =>
  import("./../components/dataInsight/news/newRecommendTendency.vue");
const newRecommendCrossList = () =>
  import("./../components/dataInsight/news/newRecommendCrossList.vue");
const newsKeyword = () =>
  import("./../components/dataInsight/news/newsWordManage.vue");
const explode = () => import("./../components/dataInsight/explode/explode.vue");
const explodeProduct = () =>
  import("./../components/dataInsight/explode/explodeProduct.vue");
const explodeProductSum = () =>
  import("./../components/dataInsight/explode/summary/explodeProductSum.vue");
const explodeProductAmazonSum = () =>
  import("./../components/dataInsight/explode/summary/explodeProductAmazonSum.vue");
const explodeProductEbaySum = () =>
  import("./../components/dataInsight/explode/summary/explodeProductEbaySum.vue");
const explodeProductTendency = () =>
  import("./../components/dataInsight/explode/explodeProductTendency.vue");
const explodeProductCrossList = () =>
  import("./../components/dataInsight/explode/explodeProductCrossList.vue");
const explodekeyword = () =>
  import("./../components/dataInsight/explode/explodeWordManage.vue");
const keyword = () =>
  import("./../components/dataInsight/keyWordAnalysis/keyWordAnalysis.vue");
const keywordContain = () =>
  import("./../components/dataInsight/keyWordAnalysis/keyWordAnalysisContain.vue");
const keywordManage = () =>
  import("./../components/dataInsight/keyWordAnalysis/keyManagement.vue");
const keyAnalysiskeyword = () =>
  import("./../components/dataInsight/keyWordAnalysis/keyAnalysisManage.vue");

const share = () => import("./../components/container/share.vue");
Vue.use(VueRouter);

export default new VueRouter({
  //mode: 'history',
  routes: [
    {
      path: "",
      redirect: "/dataBoard/0"
    },
    {
      path: "/dataBoard/:id",
      name: "dashboard",
      component: dashboard
    },
    {
      path: "/share",
      name: "share",
      component: share
    },
    {
      path: "/dataMarket/:id",
      name: "dataMarket",
      component: dataMarket
    },
    {
      path: "/dataObserve/:id",
      name: "dataObserve",
      redirect: "/dataObserve/:id/news",
      component: dataInsight,
      children: [
        {
          path: "news",
          name: "news",
          component: news,
          redirect: "news/newRecommend",
          children: [
            {
              path: "newRecommend",
              name: "newRecommend",
              component: newRecommend,
              props: true,
              redirect: "newRecommend/newRecommendCrossList",
              children: [
                {
                  path: "newRecommendCrossList",
                  name: "newRecommendCrossList",
                  component: newRecommendCrossList,
                  meta: { keepAlive: true }
                },
                {
                  path: "newRecommendSum",
                  name: "newRecommendSum",
                  component: newRecommendSum,
                  props: true,
                  meta: { keepAlive: true }
                },
                {
                  path: "newRecommendTendency",
                  name: "newRecommendTendency",
                  component: newRecommendTendency,
                  props: true,
                  meta: { keepAlive: false }
                }
              ]
            },
            {
              path: "newsKeyword",
              name: "newsKeyword",
              component: newsKeyword,
              props: true
            }
          ]
        },
        {
          path: "explode",
          name: "explode",
          redirect: "explode/explodeProduct",
          component: explode,
          children: [
            {
              path: "explodeProduct",
              name: "explodeProduct",
              component: explodeProduct,
              redirect: "explodeProduct/explodeProductCrossList",
              props: true,
              children: [
                {
                  path: "explodeProductSum",
                  name: "explodeProductSum",
                  component: explodeProductSum,
                  props: true,
                  redirect: "explodeProductSum/explodeProductAmazonSum",
                  children: [
                    {
                      path: "explodeProductAmazonSum",
                      name: "explodeProductAmazonSum",
                      component: explodeProductAmazonSum,
                      props: true,
                      meta: { keepAlive: true }
                    },
                    {
                      path: "explodeProductEbaySum",
                      name: "explodeProductEbaySum",
                      component: explodeProductEbaySum,
                      props: true
                    }
                  ]
                },
                {
                  path: "explodeProductTendency",
                  name: "explodeProductTendency",
                  component: explodeProductTendency,
                  props: true,
                  meta: { keepAlive: false }
                },
                {
                  path: "explodeProductCrossList",
                  name: "explodeProductCrossList",
                  component: explodeProductCrossList,
                  meta: { keepAlive: true }
                }
              ]
            },
            {
              path: "explodekeyword",
              name: "explodekeyword",
              component: explodekeyword,
              props: true
            }
          ]
        },
        {
          path: "keyword",
          name: "keyword",
          component: keyword,
          redirect: "keyword/keywordContain",
          children: [
            {
              path: "keywordContain",
              name: "keywordContain",
              component: keywordContain,
              props: true
            },
            {
              path: "keywordManage",
              name: "keywordManage",
              component: keywordManage
            },
            {
              path: "keyAnalysiskeyword",
              name: "keyAnalysiskeyword",
              component: keyAnalysiskeyword,
              props: true
            }
          ]
        }
      ]
    },
    {
      path: "/dataApplication",
      name: "dataApplication",
      component: dataApplication,
      children: [
        {
          path: "ponelOne",
          name: "ponelOne",
          component: ponelOne
        },
        {
          path: "ponelTwo",
          name: "ponelTwo",
          component: ponelTwo
        },
        {
          path: "ponelThree",
          name: "ponelThree",
          component: ponelThree
        }
      ]
    },
    // 权限区块
    {
      path: "/cog",
      name: "leftnav",
      component: leftnav,
      children: [
        {
          path: "board",
          name: "cogBoard",
          component: cogBoard
        },
        {
          path: "data",
          name: "cogData",
          component: cogData
        },
        {
          path: "user",
          name: "cogUser",
          component: cogUser
        },
        {
          path: "group",
          name: "cogroup",
          component: cogroup
        }
      ]
    },
    {
      path: "/helpCenter",
      name: "helpCenter",
      component: helpCenter,
      children: [
        {
          path: "crawler",
          name: "crawler",
          component: crawler
        }
      ]
    }
  ]
});

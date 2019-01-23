<template>
  <div>
    <div class="main container" style="width: 100%;height: 100%">
      <div class="row" style="margin: 0 0;height:90%">
        <div class="col-xs-2 sidebar" style="">
          <div class="version text-center">
            <div class="dropdown center-block" style="width: 80%;">
              <button class="btn dropdown-toggle" data-toggle="dropdown" style="width: 100%">
                IoTDB v0.7
                <b class="caret right-block"></b>
              </button>
              <ul class="dropdown-menu">
                <li v-for="entry in versions">
                  <router-link :to="entry.url">{{entry.text}}</router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="content center-block" style="width: 14%;overflow: auto">
            <!--<div v-for="(chap,index) in ver7doc" :key="index">-->
            <!--<h4>{{chap.name}}</h4>-->
            <!--<ul class="list-group">-->
            <!--<li :class="chap.name" v-for="item in chap.Chapter"-->
            <!--@click="change_navi_content($event)">{{item.section}}-->
            <!--</li>-->
            <!--</ul>-->
            <!--</div>-->
            <!--<h4>Overview</h4>-->
            <!--<ul class="list-group">-->
            <!--<li class="overview" v-for="item in Chapter1" @click="change_navi_content($event)">{{item.section}}</li>-->
            <!--</ul>-->
            <!--<h4>Chapter2</h4>-->
            <!--<ul class="list-group">-->
            <!--<li class="chapter2" v-for="item in Chapter2" @click="change_navi_content($event)">{{item.section}}</li>-->
            <!--</ul>-->
            <!--<h4>Chapter3</h4>-->
            <!--<ul class="list-group">-->
            <!--<li class="chapter3" v-for="item in Chapter3" @click="change_navi_content($event)">{{item.section}}</li>-->
            <!--</ul>-->
            <!--<h4>Chapter4</h4>-->
            <!--<ul class="list-group">-->
            <!--<li class="chapter4" v-for="item in Chapter4" @click="change_navi_content($event)">{{item.section}}</li>-->
            <!--</ul>-->
            <!--<h4>Chapter5</h4>-->
            <!--<ul class="list-group">-->
            <!--<li class="chapter5" v-for="item in Chapter5" @click="change_navi_content($event)">{{item.section}}</li>-->
            <!--</ul>-->
            <!--<h4>Chapter6</h4>-->
            <!--<ul class="list-group">-->
            <!--<li class="chapter6" v-for="item in Chapter6" @click="change_navi_content($event)">{{item.section}}</li>-->
            <!--</ul>-->
            <!--<h4>Chapter7</h4>-->
            <!--<ul class="list-group">-->
            <!--<li class="chapter7" v-for="item in Chapter7" @click="change_navi_content($event)">{{item.section}}</li>-->
            <!--</ul>-->

          </div>
        </div>

        <div class="col-xs-10 fixed-middle">
          <ul class="breadcrumb direct" id="bread_chapter">
            <li><a style='color:#fcac45;'>IoTDB 0.7</a></li>
            <li><a style='color:#fcac45;'>overview</a></li>
            <li><a style='color:#fcac45;'>What is IoTDB</a></li>
          </ul>
          <div id="text_content" class="text_field">
            <vue-markdown class="markdown-area" :source="document_test" :toc="true"
                          :toc-anchor-link="true"></vue-markdown>
          </div>
          <div class="find-mistake">
            <p>This documentation is open source. Find mistakes? Want to contribute? Go for it.</p>
          </div>
        </div>
      </div>

    </div>
    <footer_bar/>
  </div>
</template>

<script>
  import Footer from "../components/FooterFixed"
  // import Chapter from "../components/Chapter"
  import MarkDown from "vue-markdown"
  import axios from 'axios'

  export default {
    name: "Documents",
    data() {
      return {
        versions: [
          {text: 'IoTDB v0.7', url: '/Documents/ver7/sec1'},
          {text: 'IoTDB v0.6', url: '/Documents/ver6/sec1'},
          {text: 'IoTDB v0.5', url: '/Documents/ver5/sec1'}
        ],
        ver7doc: [
          {
            Chapter: [
              {section: "What is IoTDB"},
              {section: "Architecture"},
              {section: "Scenario"},
              {section: "Features"}
            ],
            name: "overview"
          },
          {
            Chapter: [
              {section: "Build"},
              {section: "Configure"},
              {section: "Start"},
            ],
            name: "chapter2"
          },
          {
            Chapter: [
              {section: "Key Concepts and Terminology"},
              {section: "Data Type"},
              {section: "Coding"},
              {section: "Compression"},
            ],
            name: "chapter3"
          },
          {
            Chapter: [
              {section: "Scenario Description and Sample Data"},
              {section: "Data Model Selection and Creation"},
              {section: "Data Access"},
              {section: "Data Query"},
            ],
            name: "chapter4"
          },
          {
            Chapter: [
              {section: "Deployment"},
              {section: "Configuration"},
              {section: "System log"},
              {section: "Data Management"},
              {section: ""}
            ],
            name: "chapter5"
          },
          {
            Chapter: [
              {section: "Cli/shell tool"},
              {section: "Spark"},
            ],
            name: "chapter6"
          },
          {
            Chapter: [
              {section: "IoTDB Query Statement"},
              {section: "Reference"},
            ],
            name: "chapter7"
          }
        ],

        version7: {
          overview: require("../assets/version0.7/ch1.md"),
          chapter2: require("../assets/version0.7/ch2.md"),
          chapter3: require("../assets/version0.7/ch3.md"),
          chapter4: require("../assets/version0.7/ch4.md"),
          chapter5: require("../assets/version0.7/ch5.md"),
          chapter6: require("../assets/version0.7/ch6.md"),
          chapter7: require("../assets/version0.7/ch7.md")
        },
        active: "overview",
        document_test: "",
      }
    },
    components: {
      'footer_bar': Footer,
      // 'chapter_bar': Chapter,
      'vue-markdown': MarkDown,
    },
    created() {
      // this.selectedVersionUrl=this.downloadVersionList[0].url;
      this.generateCatalogue();
      this.fetchData();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData',

    },
    methods: {
      change_navi_content: function (event) {
        let version = this.$route.params.version;
        var chapter = event.currentTarget.className;
        var section = event.currentTarget.innerText;
        var x = document.getElementById("bread_chapter");
        // var y = document.getElementById("markdown-area");
        x.innerHTML = "<li><a style='color:#fcac45;'>IoTDB 0.7</a></li>" + "<li><a href='#' style='color:#fcac45;'>" +
          chapter + "</a></li>" + "<li><a style='color:#fcac45;'>" + section + "</a></li>";
        // y.innerText = version;
        this.active = chapter;
      },
      // changeButtonVersion() {
      //   console.log(this.getVersion() == "ver7");
      //   if (this.getVersion() == "ver7") {
      //     this.selectVersionObj = this.downloadVersionList[0];
      //     console.log("versionchangecom");
      //   }
      //   else if (this.getVersion() == "ver6") {
      //     this.selectVersionObj = this.downloadVersionList[1];
      //   }
      //   else if (this.getVersion() == "ver5") {
      //     this.selectVersionObj = this.downloadVersionList[2];
      //   }
      // },
      getVersion() {
        return this.$route.params.version;
      },
      getSection() {
        return this.$route.params.section;
      },
      fetchData() {
        const dict = {
          "ver7sec1": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/1-Overview.md",
          "ver7sec2": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/2-Concept.md",
          "ver7sec3": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/3-Operation Manual.md",
          "ver7sec4": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/4-Deployment and Management.md",
          "ver7sec5": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/5-SQL Documentation.md",
          "ver7sec6": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/6-JDBC Documentation.md",
          // "ver7sec7": "https://github.com/apache/incubator-iotdb/blob/doc/docs/Documentation/UserGuideV0.7/1-Overview.md",

        };
        // console.log(this.getVersion() + this.getSection());
        const content = this.getVersion() + this.getSection();
        let url = null;
        if (content in dict) {
          url = dict[content];
        } else {
          this.$router.push('/404');
        }
        console.log(url);
        const pointer = this;
        axios.get(url)
          .then(function (response) {
            console.log(response.data);
            pointer.document_test = response.data;
            // console.log(pointer);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
          });
      },
      generateCatalogue() {
        const dict = {
          "ver7sec1": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/1-Overview.md",
          "ver7sec2": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/2-Concept.md",
          "ver7sec3": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/3-Operation Manual.md",
          "ver7sec4": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/4-Deployment and Management.md",
          "ver7sec5": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/5-SQL Documentation.md",
          "ver7sec6": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Documentation/UserGuideV0.7/6-JDBC Documentation.md",
          // "ver7sec7": "https://github.com/apache/incubator-iotdb/blob/doc/docs/Documentation/UserGuideV0.7/1-Overview.md",

        };
        for (let section in dict) {
          let url = dict[section];
          axios.get(url)
            .then(function (response) {
              console.log(response.data);

            })
        }


      }
    }
  }
</script>

<style scoped>

  .text_field {
    position: fixed;
    overflow-x: hidden;
    overflow-y: auto;
    top: 100px;
    left: 20%;
    right: 2%;
    bottom: 100px;
  }

  .fixed-middle {
    position: fixed;
    top: 60px;
    left: 17%;
    /*height: 50px;*/
  }

  .fixed-middle > ul {
    height: 36px;
  }

  .main {
    padding: 0;
  }

  .direct > li > a {
    color: #fcac45;
  }

  .find-mistake {
    text-align: center;
    position: fixed;
    left: 20%;
    right: 0;
    bottom: 50px;
  }

  .col-xs-2 {
    background: #222222;
    padding: 0 0;
  }

  .sidebar {
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: block;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  .dropdown {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .dropdown > ul {
    width: 100%;
  }

  .list-group > li {
    cursor: pointer;
  }

  h4 {
    color: #fcac45;
  }

  .list-group > li {
    list-style-type: none;
    color: #eff0f8;
    margin-bottom: 5px;
  }

  .direct > li > a:link {
    color: #fcac45;
  }

  .version {
    border-bottom: 1px solid #eff0f8;
  }

  button {
    background: #fcac45;
  }

  #select-version {
    background: #fcac45;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 6px 12px;
    height: 35px;
    width: 80%;
    text-align: center;
  }

  .version-message {
    text-align: center;
  }

  .dropdown-menu {
    text-align: center;
  }

  .content.center-block {
    position: fixed;
    left: 2%;
    top: 120px;
    bottom: 50px;
  }

  .text_field>.markdown-area>p{
    width:50px;
  }

  div.mark-down>p>img{
    width:50px;
  }


</style>

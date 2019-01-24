<template>
  <div>
    <div class="container">
      <router-link to="/Development#xxx" class="nav-link"><span>heading23</span></router-link>
      <div class="row">
        <div class="col-sm-8">
          <vue-markdown v-bind:source="development" :toc="true" :toc-anchor-link-symbol="toc" :postrender="isReadyForPrerender"></vue-markdown>
        </div>
        <my-sidebar/>
      </div>
      <p id="xxx">123</p>
    </div>
    <br>
    <br>
    <br>
    <footer-bar/>
  </div>

</template>

<script>
  import Footer from "../components/FooterFixed"
  import SideBar from '../components/SideBar'
  import markdown from 'vue-markdown'
  import axios from 'axios'
  const cheerio = require('cheerio');

  export default {
    name: "Development",
    components: {
      'footer-bar': Footer,
      'my-sidebar': SideBar,
      'vue-markdown': markdown,
    },
    data() {
      return {
        msg: 'Welcome to Community Page',
        toc: "",
        development: "",
        locate: ""
      }
    },
    created() {
      this.fetchData();
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      content: function () {
        return this.$route.params.content
      },
      fetchData() {
        let url = "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Development.md";
        let pointer = this;
        axios.get(url).then(function (response) {
            pointer.development = response.data;
          })
      },
      isReadyForPrerender (html){
        const $ = cheerio.load(html);

        $('ul a').each( function(i, elem) {
          console.log($(this).attr('href'));
          $(this).attr('href', "#/Development"+$(this).attr('href'));
          // $(this).attr('id', $(this).text().toLowerCase().replace(/\s/g, '') );
        });
        // $('h2').each( function(i, elem) {
        //   $(this).attr('id', $(this).text().toLowerCase().replace(/\s/g, '') );
        // });
        return $('body').html();
      },
    }
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  body {
    font-family: Georgia, "Times New Roman", Times, serif;
    color: #555;
  }

  .pager > li > a {
    width: 140px;
    padding: 10px 20px;
    text-align: center;
    border-radius: 30px;
  }

  .blog-footer p:last-child {
    margin-bottom: 0;
  }

</style>

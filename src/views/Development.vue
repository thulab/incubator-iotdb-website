<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          <vue-markdown v-bind:source="development"></vue-markdown>
        </div>
        <my-sidebar/>
      </div>
    </div>
    <footer-bar/>
  </div>
</template>

<script>
  import Footer from "../components/FooterFixed"
  import SideBar from '../components/SideBar'
  import markdown from 'vue-markdown'
  import axios from 'axios'

  export default {
    name: "Development",
    components: {
      'footer-bar': Footer,
      'my-sidebar': SideBar,
      'vue-markdown':markdown,
    },
    data() {
      return {
        msg: 'Welcome to Community Page',
        development: ""
      }
    },
    created(){
      this.fetchData();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      content: function () {
        return this.$route.params.content
      },
      fetchData () {
        const dict = {
          "Have Questions": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Development.md",
          "How to contribute": "https://raw.githubusercontent.com/apache/incubator-iotdb/doc/docs/Development.md"
        };
        console.log(this.content());
        const content = this.content();
        let url = null;
        if(content in dict){
          url = dict[content];
        } else {
          this.$router.push('/404');
        }
        console.log(url);
        const pointer = this;
        axios.get(url)
          .then(function (response) {
            console.log(response.data);
            pointer.development = response.data;
            console.log(pointer);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
          });
      }
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

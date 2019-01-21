<template>
  <div>
    <div class="main container" style="width: 100%;height: 100%">
      <div class="row" style="margin: 0 0;height:90%">
        <chapter_bar/>

        <div class="col-xs-10 fixed-middle">
          <ul class="breadcrumb direct" id="bread_chapter">

          </ul>
          <div id="text_content" class="text_field">

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
  import Chapter from "../components/Chapter"

  export default {
    name: "Documents",
    data() {
      return{
        section:'fuck',
      }
    },
    components: {
      'footer_bar': Footer,
      'chapter_bar': Chapter
    },
    methods: {}
  }
</script>

<style scoped>

  .text_field {
    /*position: fixed;*/
    overflow: auto;
    height: 550px;
    width: 100%;
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
    left:20%;
    right: 0;
    bottom: 70px;
  }


</style>

<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-8 blog-main">
          <markdown></markdown>
        </div>
        <my-sidebar/>
      </div>
    </div>
    <footer-bar/>
  </div>
</template>

<script>
  import markdown from '../../assets/markdown/Community/Powered By.md'
  import 'highlight.js/styles/github.css'
  import Footer from "../../components/FooterFixed"
  import SideBar from '../../components/SideBar'

  export default {
    name: "CommunityMailingList",
    components: {
      'footer-bar': Footer,
      'my-sidebar': SideBar,
      markdown,
    },
    data() {
      return {
        msg: 'Welcome to Community Page'
      }
    }
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  /*
 * Globals
 */

  body {
    font-family: Georgia, "Times New Roman", Times, serif;
    color: #555;
  }

  h1, .h1,
  h2, .h2,
  h3, .h3,
  h4, .h4,
  h5, .h5,
  h6, .h6 {
    margin-top: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: normal;
    color: #333;
  }

  /*
   * Override Bootstrap's default container.
   */

  @media (min-width: 1200px) {
    .container {
      width: 970px;
    }
  }

  /* Active state gets a caret at the bottom */
  .blog-nav .active {
    color: #fff;
  }

  .blog-nav .active:after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -5px;
    vertical-align: middle;
    content: " ";
    border-right: 5px solid transparent;
    border-bottom: 5px solid;
    border-left: 5px solid transparent;
  }

  /*
   * Blog name and description
   */

  /*
   * Main column and sidebar layout
   */

  .blog-main {
    font-size: 18px;
    line-height: 1.5;
    font-size: medium;
  }

  .sidebar-module-inset p:last-child,
  .sidebar-module-inset ul:last-child,
  .sidebar-module-inset ol:last-child {
    margin-bottom: 0;
  }

  /* Pagination */
  .pager {
    margin-bottom: 60px;
    text-align: left;
  }

  .pager > li > a {
    width: 140px;
    padding: 10px 20px;
    text-align: center;
    border-radius: 30px;
  }

  /*
   * Blog posts
   */

  .blog-post {
    margin-bottom: 60px;
  }

  .blog-post-title {
    margin-bottom: 5px;
    font-size: 40px;
  }

  .blog-post-meta {
    margin-bottom: 20px;
    color: #999;
  }

  .blog-footer p:last-child {
    margin-bottom: 0;
  }

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }
</style>

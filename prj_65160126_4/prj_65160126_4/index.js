new Vue({
  el: "#app",
  data: {
    pageTitle: "Blog DB",
    sortByTime: "newest",
    blogs: [],
  },
  computed: {
    sortedBlogs() {
      if (this.sortByTime === "newest") {
        return this.blogs.slice().reverse();
      } else {
        return this.blogs.slice();
      }
    },
  },
  methods: {
    goToAddEditBlog() {
      document.location = "addeditblog.html";
    },
    deleteBlog(id) {
      this.blogs = this.blogs.filter((blog) => blog.id !== id);
      localStorage.setItem("blogs", JSON.stringify(this.blogs));
    },
    editBlog(id) {
      document.location = `addeditblog.html?id=${id}`;
    },
  },
  created() {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs"));
    this.blogs = storedBlogs ? storedBlogs : [];
  },
});

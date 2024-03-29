new Vue({
  el: "#app",
  data: {
    pageTitle: "Blog DB :: Add / Edit",
    blogId: "",
    blogTitle: "",
    blogContent: "",
    blogCreationTime: "",
  },
  methods: {
    saveBlog() {
      const title = this.blogTitle.trim();
      const content = this.blogContent.trim();
      const creationTime = new Date().toISOString();

      if (!title || !content) {
        alert("กรุณากรอกชื่อ Blog และเนื้อหา Blog");
        return;
      }

      const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
      if (!this.blogId) {
        const newBlog = {
          id:
            storedBlogs.length > 0
              ? Math.max(...storedBlogs.map((blog) => blog.id)) + 1
              : 1,
          title: title,
          content: content,
          creationTime: creationTime,
        };
        storedBlogs.push(newBlog);
      } else {
        const index = storedBlogs.findIndex((blog) => blog.id == this.blogId);
        if (index !== -1) {
          storedBlogs[index].title = title;
          storedBlogs[index].content = content;
          storedBlogs[index].creationTime = creationTime;
        }
      }

      localStorage.setItem("blogs", JSON.stringify(storedBlogs));
      this.clearForm();
      document.location = "index.html";
    },
    clearForm() {
      this.blogId = "";
      this.blogTitle = "";
      this.blogContent = "";
      this.blogCreationTime = "";
    },
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.blogId = urlParams.get("id");

    if (this.blogId) {
      const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
      const blog = storedBlogs.find((blog) => blog.id == this.blogId);
      if (blog) {
        this.blogTitle = blog.title;
        this.blogContent = blog.content;
        this.blogCreationTime = blog.creationTime;
      }
    }
  },
});

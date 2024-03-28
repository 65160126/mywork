const urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get("id");
var blogid = -1;
var blogs = [];
if (localStorage.getItem("blogs")) {
  var dataArray = localStorage.getItem("blogs");
  blogs = JSON.parse(dataArray);
} else {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

if (id) {
  for (var i = 0, j = blogs.length; i < j; i++) {
    if (blogs[i].id == id) {
      blogid = i;
      document.getElementById("blog_id").value = blogs[i].id;
      document.getElementById("blog_title").value = blogs[i].title;
      document.getElementById("blog_content").value = blogs[i].content;
      document.getElementById("blog_creation_time").value =
        blogs[i].creationTime;
      break;
    }
  }
}

document
  .getElementById("blog_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var title = document.getElementById("blog_title").value;
    var content = document.getElementById("blog_content").value;
    var creationTime = document.getElementById("blog_creation_time").value;
    if (blogid == -1) {
      blogid = findMaxblogId() + 1;
      var blog = {
        id: blogid,
        title: title,
        content: content,
        creationTime: creationTime,
      };
      blogs.push(blog);
    } else {
      blogs[blogid].title = title;
      blogs[blogid].content = content;
      blogs[blogid].creationTime = creationTime;
    }
    localStorage.setItem("blogs", JSON.stringify(blogs));
    window.location.href = "search.html";
  });

function findMaxblogId() {
  var max = 0;
  for (var i = 0; i < blogs.length; i++) {
    if (blogs[i].id > max) {
      max = blogs[i].id;
    }
  }
  return max;
}
// เพิ่มโค้ดที่จะตั้งค่าค่าเริ่มต้นของ blog_creation_time
if (id) {
  document.getElementById("blog_creation_time").value = new Date(
    blogs[blogid].creationTime
  ).toISOString();
} else {
  document.getElementById("blog_creation_time").value =
    new Date().toISOString();
}

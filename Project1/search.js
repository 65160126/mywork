
if (!localStorage.getItem("blogs")) {
  localStorage.setItem("blogs", JSON.stringify([]));
}

var blogs = JSON.parse(localStorage.getItem("blogs"));

function showAllBlogs(sortedBlogs) {
  var result = document.getElementById("blog-list");
  var html = "";
  if (sortedBlogs.length === 0) {
    result.innerHTML = "<p>ไม่พบผลลัพธ์</p>";
    return;
  }
  for (var i = 0; i < sortedBlogs.length; i++) {
    html += `
    <div class="blog-item">
      <h3>${sortedBlogs[i].title}</h3>
      <p>${sortedBlogs[i].content}</p>
      <p>ลงเมื่อ: ${new Date(sortedBlogs[i].creationTime).toLocaleString(
        "th-TH",
        { hour12: false }
      )}</p>
      <button onclick="deleteBlog(${sortedBlogs[i].id})">ลบ</button>
      <button onclick="editBlog(${sortedBlogs[i].id})">แก้ไข</button>
    </div>
  `;
  }
  result.innerHTML = html;
}

function deleteBlog(id) {
  var confirmDelete = confirm("ยืนยันการลบ Blog นี้?");
  if (confirmDelete) {
    for (var i = 0; i < blogs.length; i++) {
      if (blogs[i].id == id) {
        blogs.splice(i, 1);
        console.log("delete at " + id);
      }
    }

    localStorage.setItem("blogs", JSON.stringify(blogs));
    showAllBlogs(blogs.slice()); // Pass a copy to avoid modifying original array
  }
}

function editBlog(id) {
  window.location.href = `addeditblog.html?id=${id}`;
}

const sortByTimeSelect = document.getElementById("sort-by-time");
sortByTimeSelect.addEventListener("change", function () {
  const sortBy = this.value;
  let sortedBlogs = blogs.slice(); // Create a copy to avoid modifying original array
  if (sortBy === "newest") {
    sortedBlogs.sort(
      (a, b) => new Date(b.creationTime) - new Date(a.creationTime)
    ); // Sort by descending creation time (newest first)
  } else if (sortBy === "oldest") {
    sortedBlogs.sort(
      (a, b) => new Date(a.creationTime) - new Date(b.creationTime)
    ); // Sort by ascending creation time (oldest first)
  }
  showAllBlogs(sortedBlogs);
});

// Add creationTime property to each blog object during initial load or edit/add
for (let i = 0; i < blogs.length; i++) {
  if (!blogs[i].hasOwnProperty("creationTime")) {
    blogs[i].creationTime = new Date().toISOString(); // Set creation time if it doesn't exist
  }
}

showAllBlogs(blogs.slice()); // Pass a copy to avoid modifying original array

function searchBlog() {
  var searchInput = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  if (searchInput === "") {
    showAllBlogs(blogs.slice());
    return;
  }
  var filteredBlogs = blogs.filter(function (blog) {
    var titleMatch = blog.title.toLowerCase().startsWith(searchInput);
    var contentMatch = blog.content.toLowerCase().includes(searchInput);
    return titleMatch || contentMatch;
  });
  showAllBlogs(filteredBlogs);
}

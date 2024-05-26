// Function to fetch blogs from database
async function fetchDbBlogs() {
  const getBlogUrl = "http://localhost:8080/blogs";
  try {
    const response = await fetch(getBlogUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Function to get user data
async function getUser(user_id) {
  const getUserUrl = `http://localhost:8080/users/${user_id}`;
  try {
    const response = await fetch(getUserUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Function to create a blog post in the database
async function createDbBlogPost(blogDetails) {
  const postReqUrl = "http://localhost:8080/blogs";
  try {
    const response = await fetch(postReqUrl, {
      method: "POST",
      body: JSON.stringify(blogDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create blog post: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Function to create a blog post template in HTML
async function createBlogPostTemplate(
  title,
  userId,
  authorImageUrl,
  content,
  blogImageUrl,
  creationDate
) {
  const blogPost = document.createElement("div");
  blogPost.className = "blog-post";

  const blogTitle = document.createElement("h2");
  blogTitle.textContent = title;
  blogPost.appendChild(blogTitle);

  const blogDate = document.createElement("p");
  blogDate.className = "blog-date";
  blogDate.textContent = new Date(creationDate).toLocaleDateString();
  blogPost.appendChild(blogDate);

  const blogAuthor = document.createElement("div");
  blogAuthor.className = "blog-author";

  const authorInfo = document.createElement("div");
  authorInfo.className = "author-info";

  const authorPicture = document.createElement("div");
  authorPicture.className = "author-picture";

  const authorImg = document.createElement("img");
  authorImg.src = "img/default_profile_pic.png";
  authorImg.alt = "Author's Profile Picture";
  authorPicture.appendChild(authorImg);

  const authorNameSpan = document.createElement("span");
  authorNameSpan.className = "author-name";
  authorInfo.appendChild(authorPicture);
  authorInfo.appendChild(authorNameSpan);

  blogAuthor.appendChild(authorInfo);
  blogPost.appendChild(blogAuthor);

  try {
    const user = await getUser(userId);
    authorNameSpan.textContent = user.nick || "Unknown Author";
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    authorNameSpan.textContent = "Unknown Author";
  }

  const blogContent = document.createElement("p");
  blogContent.textContent = content;
  blogPost.appendChild(blogContent);

  const blogImage = document.createElement("div");
  blogImage.className = "blog-image";

  const blogImg = document.createElement("img");
  blogImg.src = blogImageUrl || "/img/default-event.png";
  blogImg.alt = "Blog Image";
  blogImage.appendChild(blogImg);

  blogPost.appendChild(blogImage);

  const blogList = document.getElementById("blog-list");
  blogList.appendChild(blogPost);

  return blogPost;
}

// Function to create a blog post from HTML
async function createBlogFromHtml() {
  var title = document.querySelector("#title").value;
  var imageUrl = document.querySelector("#image").value;
  var body = document.querySelector("#body").value;

  console.log("Title:", title);
  console.log("Image URL:", imageUrl);
  console.log("Body:", body);

  const blogDetails = {
    title: title,
    image: imageUrl,
    body: body,
    date: new Date().toISOString(),
    user_id: 2,
    film_id: 3,
    number_of_likes: 0,
    number_of_dislikes: 0,
  };

  const response = await createDbBlogPost(blogDetails);

  if (response) {
    console.log("Blog post created successfully:", response);
  } else {
    console.log(response);
    console.error("Failed to create blog post");
  }
}

// Fetch and display blogs
fetchDbBlogs().then((blogs) => {
  blogs.forEach((blog) => {
    createBlogPostTemplate(
      blog.title,
      blog.user_id,
      "public/img/default_profile_pic.png",
      blog.body,
      blog.image,
      blog.date
    );
  });
});

document
  .getElementById("blog-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    await createBlogFromHtml();
    var title = document.querySelector("#title").value;
    var imageUrl = document.querySelector("#image").value;
    var body = document.querySelector("#body").value;
    location.reload();
  });

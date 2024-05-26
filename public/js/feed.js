async function fetchActivities() {
  // Specify the URL you want to make the GET request to
  const url = "http://localhost:8080/activity";

  // Make the GET request using fetch
  fetch(url)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      // Do something with the JSON data
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function fetchActivityDetails(activity_id) {
  // Specify the URL you want to make the GET request to
  const url = `http://localhost:8080/activity${activity_id}`;

  // Make the GET request using fetch
  fetch(url)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      // Do something with the JSON data
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error("There was a problem with the fetch operation:", error);
    });
}

function createPost(postDetails) {
  /*
    [
  {
    "activity_id": 5,
    "user_id": 5,
    "number_of_likes": 10,
    "number_of_dislikes": 1,
    "film_id": 5,
    "f_name": "Pulp Fiction",
    "nick": "beste",
    "photo": "https://s2-ug.ap4r.com/image-aigc-article/seoPic/origin/cbe22e6227a5e5ec637b8664da964d1e27eb7369.png",
    "comment": null,
    "rating": "8.70"
  }
]
    */
  // Create the feed container
  const feedContainer = document.createElement("div");
  feedContainer.classList.add("feed-container");

  // Create the post
  const post = document.createElement("div");
  post.classList.add("post");

  // Create the post header
  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");

  // Create the avatar link
  const avatarLink = document.createElement("a");
  avatarLink.href = "user-profile1.html";
  avatarLink.classList.add("avatar-link");

  // Create the avatar image
  const avatarImg = document.createElement("img");
  avatarImg.src = postDetails.photo;
  avatarImg.alt = "User Avatar";
  avatarImg.classList.add("avatar");

  // Append the avatar image to the avatar link
  avatarLink.appendChild(avatarImg);

  // Create the user info
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");

  // Create the user name link
  const userNameLink = document.createElement("a");
  userNameLink.href = "user-profile1.html";

  // Create the user name
  const userName = document.createElement("h4");
  userName.textContent = `${postDetails.nick}`;

  // Append the user name to the user name link
  userNameLink.appendChild(userName);

  // Create the user handle
  const userHandle = document.createElement("p");
  userHandle.textContent = `@${postDetails.nick}`;

  // Append the user name link and user handle to the user info
  userInfo.appendChild(userNameLink);
  userInfo.appendChild(userHandle);

  // Append the avatar link and user info to the post header
  postHeader.appendChild(avatarLink);
  postHeader.appendChild(userInfo);

  // Create the post content
  const postContent = document.createElement("div");
  postContent.classList.add("post-content");

  // Create the post text
  const postText = document.createElement("p");
  postText.innerHTML = `Added ${postDetails.f_name} to their watchlist.`;

  // Append the post text to the post content
  postContent.appendChild(postText);

  // Create the post footer
  const postFooter = document.createElement("div");
  postFooter.classList.add("post-footer");

  // Create the like button
  const likeButton = document.createElement("button");
  likeButton.classList.add("like-button");
  likeButton.textContent = "Like";

  // Create the like count
  const likeCount = document.createElement("span");
  likeCount.classList.add("like-count");
  likeCount.textContent = `${postDetails.number_of_likes} Likes`;

  // Append the like button and like count to the post footer
  postFooter.appendChild(likeButton);
  postFooter.appendChild(likeCount);

  // Append the post header, post content, and post footer to the post
  post.appendChild(postHeader);
  post.appendChild(postContent);
  post.appendChild(postFooter);

  // Append the post to the feed container
  feedContainer.appendChild(post);

  // Append the feed container to the document body or any other desired parent element
  document.body.appendChild(feedContainer);
}

function likePost(button) {
  let likeCountSpan = button.nextElementSibling;
  let likeCount = parseInt(likeCountSpan.textContent.split(" ")[0]);
  likeCount++;
  likeCountSpan.textContent = likeCount + " Likes";
}

async function createPostFromDb() {
  try {
    // Fetch activities/posts
    const posts = await fetchActivities();

    // Iterate through each post and make additional GET requests
    posts.forEach(async (post) => {
      try {
        // Make additional GET request for each post
        const postDetails = await fetchPostDetails(post.activity_id); // Assuming post.id is the identifier for each post
        // Process the post details
        postDetails.forEach()
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const posts = await createPostFromDb();
});

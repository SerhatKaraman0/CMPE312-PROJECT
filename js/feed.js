function likePost(button) {
    let likeCountSpan = button.nextElementSibling;
    let likeCount = parseInt(likeCountSpan.textContent.split(" ")[0]);
    likeCount++;
    likeCountSpan.textContent = likeCount + " Likes";
}

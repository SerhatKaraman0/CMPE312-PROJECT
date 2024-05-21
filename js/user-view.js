function toggleRecommendSection() {
  var section = document.getElementById("recommend-section");
  if (section.classList.contains("show")) {
    section.classList.remove("show");
  } else {
    section.classList.add("show");
  }
}

function selectMood(mood) {
  console.log("Selected mood:", mood);
  // Add your logic here for what happens when a mood is selected
}

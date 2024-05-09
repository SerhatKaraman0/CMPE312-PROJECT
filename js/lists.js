async function fetchData() {
  const url =
    "https://flixster.p.rapidapi.com/reviews/list?emsId=cbad9abb-8440-31a6-8caf-61ae45c2263b&limit=20&offset=0&withComments=true";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "231e8c0a41msh425246a33b3dfb4p1d8bb5jsn65619af7d609",
      "X-RapidAPI-Host": "flixster.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Parse response as JSON
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

fetchData(); // Call the async function to start fetching data

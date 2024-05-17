function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const options = {
    weekday: "long", // Full name of the day
    year: "numeric",
    month: "long", // Full name of the month
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour clock (AM/PM)
  };

  return date.toLocaleString("en-US", options);
}

function openModal(eventDetails) {
  var modal = document.getElementById("ticketModal");
  var eventName = document.querySelector(".modal-event-name");
  var date = document.querySelector(".modal-date");
  var location = document.querySelector(".modal-location");
  var description = document.querySelector(".modal-description");
  var ticketSellers = document.querySelector(".ticket-buttons");
  var eventThumbnail = document.querySelector(".event-thumbnail");

  eventName.innerHTML += `<a href=${eventDetails.link} style="color: white; text-decoration: none;">${eventDetails.name}</a>`;
  date.innerHTML = formatDateTime(eventDetails.start_time);
  location.innerHTML = eventDetails.venue.name;
  description.innerHTML = "Tags: ";

  if (eventDetails.tags && Array.isArray(eventDetails.tags)) {
    for (var tag of eventDetails.tags) {
      description.innerHTML += tag + " ";
    }
  }
  // Clear the ticket sellers content before adding new links
  ticketSellers.innerHTML = "";

  // Check if eventDetails has ticket_links property before iterating over it
  if (eventDetails.ticket_links && Array.isArray(eventDetails.ticket_links)) {
    eventDetails.ticket_links.forEach((ticket) => {
      ticketSellers.innerHTML += `<a href="${ticket.link}">${ticket.source}</a>`;
    });
  } else {
    // Handle the case where ticket_links is undefined or not an array
    console.error("No ticket links found for the event.");
  }
  var defaultImageSrc = "/img/default-event.png";

  if (eventDetails.thumbnail && eventDetails.thumbnail.trim() !== "") {
    eventThumbnail.src = eventDetails.thumbnail;
  } else {
    // If thumbnail is missing or empty, use the default image source
    eventThumbnail.src = defaultImageSrc;
  }

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("ticketModal").style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
  const modal = document.getElementById("ticketModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function createEventDiv(eventData) {
  const eventDiv = document.createElement("div");
  const eventImgDiv = document.createElement("div");
  const eventImg = document.createElement("img");
  const eventCardContentDiv = document.createElement("div");
  const eventCardContentTopDiv = document.createElement("div");
  const eventCardContentTitle = document.createElement("h3");
  const eventCardContentDate = document.createElement("p");
  const eventCardContentBottomDiv = document.createElement("div");
  const eventCardContentBottomLocation = document.createElement("p");
  const eventCardContentBottomButton = document.createElement("button");

  eventCardContentBottomButton.innerHTML = "See More";
  eventDiv.classList.add("event-card");
  eventImgDiv.classList.add("event-card__image-wrapper");

  var defaultImageSrc = "/img/default-event.png";

  if (eventData.thumbnail && eventData.thumbnail.trim() !== "") {
    eventImg.src = eventData.thumbnail;
  } else {
    // If thumbnail is missing or empty, use the default image source
    eventImg.src = defaultImageSrc;
  }
  eventCardContentDiv.classList.add("event-card__content");
  eventCardContentTopDiv.classList.add("event-card__content-top");
  eventCardContentTitle.classList.add("event-card__title");

  // add title here
  eventCardContentTitle.innerHTML = eventData.name;

  eventCardContentDate.classList.add("event-card__date");

  // add date here
  eventCardContentDate.innerHTML = formatDateTime(eventData.start_time);

  eventCardContentBottomDiv.classList.add("event-card__content-bottom");
  eventCardContentBottomLocation.classList.add("event-card__location");

  // add location here
  eventCardContentBottomLocation.innerHTML = eventData.venue.name;

  eventCardContentBottomButton.classList.add("see-more-btn");
  eventCardContentBottomButton.onclick = function () {
    openModal(eventData);
  };

  // Append children elements
  eventImgDiv.appendChild(eventImg);

  eventCardContentTopDiv.appendChild(eventCardContentTitle);
  eventCardContentTopDiv.appendChild(eventCardContentDate);

  eventCardContentBottomDiv.appendChild(eventCardContentBottomLocation);

  eventCardContentDiv.appendChild(eventCardContentTopDiv);
  eventCardContentDiv.appendChild(eventCardContentBottomDiv);
  eventCardContentDiv.appendChild(eventCardContentBottomButton);

  eventDiv.appendChild(eventImgDiv);
  eventDiv.appendChild(eventCardContentDiv);

  const eventCardsContainer = document.getElementById("event-cards");
  eventCardsContainer.appendChild(eventDiv);
}

async function fetchEventsFunc(userQuery, userDate) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "039f4362d8msh1e002813001473dp1ead56jsn7b66c36a0d8a",
      "X-RapidAPI-Host": "real-time-events-search.p.rapidapi.com",
    },
  };

  const url = new URL(
    "https://real-time-events-search.p.rapidapi.com/search-events"
  );
  url.searchParams.append("query", userQuery);
  url.searchParams.append("date", userDate);
  url.searchParams.append("start", "0");

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const fetchEvents = (locationText) => {
    var selectedDate = document.getElementById("dates");
    fetchEventsFunc(`Events in ${locationText}`, `${selectedDate.value}`).then(
      (events) =>
        events.forEach((eventDetail) => {
          createEventDiv(eventDetail);
        })
    );
  };

  const findMyState = () => {
    const success = (position) => {
      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longtitude=${longitude}&localityLanguage=en`;
      fetch(geoApiUrl)
        .then((res) => res.json())
        .then((data) => {
          const locationDiv = document.querySelector(".location");
          let locationText = "";
          if (data.city) {
            locationText += data.city;
            if (data.principalSubdivision) {
              locationText += ` ${data.principalSubdivision}`;
            } else if (data.countryName) {
              locationText += ` ${data.countryName}`;
            }
          } else if (data.countryName) {
            locationText += data.countryName;
          }

          console.log(data);
          fetchEvents(locationText); // Call fetchEvents with the locationText
        })
        .catch((error) => {
          console.error("Error fetching location data:", error);
        });
    };

    navigator.geolocation.getCurrentPosition(success);
  };

  // Call findMyState function when DOM content is loaded
  findMyState();

  // Add click event listener to the button group
  const buttons = document.querySelectorAll(".button-group button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("selected");
    });
  });

  // Add click event listener to the find-state button
  document.querySelector(".find-state").addEventListener("click", findMyState);
});

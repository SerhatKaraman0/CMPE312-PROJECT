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

  eventName.innerHTML = `<a href=${eventDetails.link} style="color: white; text-decoration: none;">${eventDetails.name}</a>`;
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

function openDbModal(eventDetails) {
  var modal = document.getElementById("ticketModal");
  var eventName = document.querySelector(".modal-event-name");
  var date = document.querySelector(".modal-date");
  var location = document.querySelector(".modal-location");
  var description = document.querySelector(".modal-description");
  var ticketSellers = document.querySelector(".ticket-buttons");
  var eventThumbnail = document.querySelector(".event-thumbnail");

  eventName.innerHTML = `<a href=${eventDetails.link} style="color: white; text-decoration: none;">${eventDetails.event_name}</a>`;
  date.innerHTML = formatDateTime(eventDetails.date);
  location.innerHTML = eventDetails.location;
  description.innerHTML = `${eventDetails.description}`;
  ticketSellers.innerHTML = `Tags: ${eventDetails.tag_name}`;

  var defaultImageSrc = "/img/default-event.png";

  if (eventDetails.photo && eventDetails.photo.trim() !== "") {
    eventThumbnail.src = eventDetails.photo;
  } else {
    // If thumbnail is missing or empty, use the default image source
    eventThumbnail.src = defaultImageSrc;
  }

  modal.style.display = "block";
}

function closeDbModal() {
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

function createDbEventDiv(eventData) {
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
  // New element for description

  eventCardContentBottomButton.innerHTML = "See More";
  eventDiv.classList.add("event-card");
  eventImgDiv.classList.add("event-card__image-wrapper");

  eventImg.src = eventData.photo;

  eventCardContentDiv.classList.add("event-card__content");
  eventCardContentTopDiv.classList.add("event-card__content-top");
  eventCardContentTitle.classList.add("event-card__title");

  // add title here
  eventCardContentTitle.innerHTML = eventData.event_name;

  eventCardContentDate.classList.add("event-card__date");

  // add date here
  eventCardContentDate.innerHTML = eventData.date;

  eventCardContentBottomDiv.classList.add("event-card__content-bottom");
  eventCardContentBottomLocation.classList.add("event-card__location");

  // add location here
  eventCardContentBottomLocation.innerHTML = eventData.location;

  eventCardContentBottomButton.classList.add("see-more-btn");
  eventCardContentBottomButton.onclick = function () {
    openDbModal(eventData);
  };

  // Append children elements
  eventImgDiv.appendChild(eventImg);
  eventCardContentTopDiv.appendChild(eventCardContentTitle);
  eventCardContentTopDiv.appendChild(eventCardContentDate);
  eventCardContentBottomDiv.appendChild(eventCardContentBottomLocation); // Append description to the bottom div
  eventCardContentDiv.appendChild(eventCardContentTopDiv);
  eventCardContentDiv.appendChild(eventCardContentBottomDiv);
  eventCardContentDiv.appendChild(eventCardContentBottomButton);
  eventDiv.appendChild(eventImgDiv);
  eventDiv.appendChild(eventCardContentDiv);

  const eventCardsContainer = document.getElementById("database-events");
  eventCardsContainer.appendChild(eventDiv);
}

async function fetchEventsFunc(userQuery, userDate) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a6cc142f64msh717235eb0600797p14895ajsn160776a45425",
      "X-RapidAPI-Host": "real-time-events-search.p.rapidapi.com",
    },
  };

  const url = new URL(
    "https://real-time-events-search.p.rapidapi.com/search-events"
  );
  url.searchParams.append("query", userQuery);
  url.searchParams.append("date", userDate);
  url.searchParams.append("start", "0");

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function fetchDatabaseEvents() {
  const databaseApiUrl = "http://localhost:8080/events/";
  try {
    const response = await fetch(databaseApiUrl);
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

fetchDatabaseEvents().then((events) => {
  events.forEach((eventDetail) => {
    createDbEventDiv(eventDetail);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const showDatabaseEventsButton = document.querySelector(
    ".show-database-events"
  );
  const showApiEventsButton = document.querySelector(".show-api-events");

  const dbEventsContainer = document.getElementById("db-events-container");
  const apiEventsContainer = document.getElementById("api-events-container");

  showDatabaseEventsButton.addEventListener("click", function () {
    dbEventsContainer.style.display = "block";
    apiEventsContainer.style.display = "none";
  });

  showApiEventsButton.addEventListener("click", function () {
    apiEventsContainer.style.display = "block";
    dbEventsContainer.style.display = "none";
  });

  // Initially display database events
  dbEventsContainer.style.display = "block";
  apiEventsContainer.style.display = "none";

  let selectedEventTypes = [];

  const fetchEvents = (locationText, eventTypes) => {
    const selectedDate = document.getElementById("dates").value;
    const query = `Events in ${locationText} ${eventTypes.join(" ")}`;
    const selectedSortingStyle = document.getElementById("sorting").value;

    fetchEventsFunc(query, selectedDate).then((events) => {
      if (events && Array.isArray(events)) {
        // Clear existing events before adding new ones
        const eventCardsContainer = document.getElementById("event-cards");
        eventCardsContainer.innerHTML = "";

        // Sort events based on the selected sorting style
        if (selectedSortingStyle == "a-z") {
          events.sort((a, b) => (a.name > b.name ? 1 : -1));
        } else if (selectedSortingStyle == "z-a") {
          events.sort((a, b) => (a.name > b.name ? -1 : 1));
        } else if (selectedSortingStyle == "date") {
          events.sort(
            (a, b) => new Date(a.start_time) - new Date(b.start_time)
          );
        } else if (selectedSortingStyle == "rating") {
          events.sort((a, b) => (a.venue.rating > b.venue.rating ? 1 : -1));
        }

        // Create event cards
        const locationTextHtml = document.querySelector(
          ".events-in-location-text"
        );
        locationTextHtml.innerHTML = "Events in " + locationText;
        events.forEach((eventDetail) => {
          createEventDiv(eventDetail);
        });
      } else {
        console.error("No events found or data format is incorrect.");
      }
    });
    fetchDatabaseEvents().then((events) => {
      if (events && Array.isArray(events)) {
        const eventCardsContainer = document.getElementsByClassName(
          "user-created-events events-container"
        )[0];
        eventCardsContainer.innerHTML = "";
        events.forEach((eventDetail) => {
          createDbEventDiv(eventDetail);
        });
      } else {
        console.error("Cant fetch the events");
      }
    });
  };

  document
    .querySelector(".show-database-events")
    .addEventListener("click", function () {
      document.getElementById("event-cards").style.display = "none";
      document.getElementsByClassName("user-created-events")[0].style.display =
        "block";
    });
  const findEventsButton = document.querySelector(".find-events");

  findEventsButton.addEventListener("click", function () {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      fetch(geoApiUrl)
        .then((res) => res.json())
        .then((data) => {
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

          fetchEvents(locationText, selectedEventTypes); // Pass selected event types
        })
        .catch((error) => {
          console.error("Error fetching location data:", error);
        });
    };

    navigator.geolocation.getCurrentPosition(success);
  });

  // Add click event listener to the button group
  const buttons = document.querySelectorAll(".button-group button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("selected");

      const eventType = this.dataset.eventType;
      if (this.classList.contains("selected")) {
        selectedEventTypes.push(eventType);
      } else {
        const index = selectedEventTypes.indexOf(eventType);
        if (index > -1) {
          selectedEventTypes.splice(index, 1);
        }
      }
    });
  });
});

async function createNewEvent(eventDetails) {
  /* 
  {
    "event_id": 1,
    "event_name": "Classic Movie Marathon",
    "photo": "https://m.media-amazon.com/images/I/616hqRzIcTL._AC_UF894,1000_QL80_.jpg",
    "date": "2023-07-14T21:00:00.000Z",
    "description": "Join us for a marathon of classic films from the golden age of cinema. From timeless comedies to epic dramas, experience the magic of the big screen like never before.",
    "location": "Famagusta, Cyprus",
    "user_id": 4
  },
  */
  const postReqUrl = "http://localhost:8080/events";
  fetch(postReqUrl, {
    method: "POST",
    body: JSON.stringify({
      event_name: eventDetails.name,
      photo: eventDetails.photo,
      date: eventDetails.date,
      description: eventDetails.description,
      location: eventDetails.location,
      user_id: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

// Event creation modal functions
const createEventButton = document.querySelector(".create-event");
const createEventModal = document.getElementById("createEventModal");
const createEventForm = document.getElementById("createEventForm");

createEventButton.addEventListener("click", function () {
  createEventModal.style.display = "block";
});

function closeCreateEventModal() {
  createEventModal.style.display = "none";
}

createEventForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const eventName = document.getElementById("eventName").value;
  const eventDate = document.getElementById("eventDate").value;
  const eventTime = document.getElementById("eventTime").value;
  const eventLocation = document.getElementById("eventLocation").value;
  const eventDescription = document.getElementById("eventDescription").value;
  const eventTags = document.getElementById("eventTags").value.split(",");
  const eventPhoto = document.getElementById("eventImage").value;
  const newEvent = {
    name: eventName,
    photo: eventPhoto,
    date: eventDate,
    time: eventTime,
    location: eventLocation,
    description: eventDescription,
    tags: eventTags,
  };

  // Function to handle creating the event (e.g., sending to a server)
  createNewEvent(newEvent);

  closeCreateEventModal();
});

window.onclick = function (event) {
  if (event.target == createEventModal) {
    closeCreateEventModal();
  }
};

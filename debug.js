// 1: API keys should not be exposed in client-side JavaScript.
const API_KEY = "YOUR_API_KEY";

const list = document.getElementById("list");
const status = document.getElementById("status");

async function loadEvents() {
    // 6: The request can fail, so use try/catch to handle the error.
    try {
        // 2: fetch() returns a Promise, so await it before using the response.
        const res = await fetch(
            "https://api.gutech.example/events?key=" + API_KEY
        );

        // Check that the server returned a successful response.
        if (!res.ok) {
            throw new Error("Failed to load events.");
        }

        const data = await res.json();

        // 3: Use === for comparison instead of =, which assigns a value.
        const free = data.results.filter(e => e.place === "Hall A");

        // 4: The events are inside the results array.
        list.textContent = free.map(e => e.title).join(", ");

        // 5: textContent is safer than innerHTML for displaying data.
        status.textContent = "Loaded: " + free.length + " events";

    } catch (error) {
        status.textContent = "Unable to load events.";
    }
}

loadEvents();

//The AI did well by adding a retry button that runs the loading function again when the request fails. I had to check that the response.ok check and try/catch were still present so that failed requests were handled safely.
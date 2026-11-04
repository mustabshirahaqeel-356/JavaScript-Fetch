const API_URL = "https://api.gutech.example/courses";

const courseList = document.getElementById("courseList");
const statusMessage = document.getElementById("status");

async function loadCourses() {
    statusMessage.textContent = "Loading courses...";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to load courses.");
        }

        const courses = await response.json();

        if (courses.length === 0) {
            statusMessage.textContent = "No courses are available.";
            return;
        }

        statusMessage.textContent = "";
        displayCourses(courses);

    } catch (error) {
        statusMessage.textContent =
            "Sorry, we could not load the courses. Please try again.";
    }
}

function displayCourses(courses) {
    courseList.innerHTML = "";

    courses.forEach(function(course) {
        const card = document.createElement("article");
        card.className = "course-card";

        const price = course.price === 0
            ? "Free"
            : "PKR " + course.price;

        card.innerHTML = `
            <h2>${course.title}</h2>
            <p>Category: ${course.category}</p>
            <p>Price: ${price}</p>
            <p>Duration: ${course.hours} hours</p>
        `;

        courseList.appendChild(card);
    });
}

loadCourses();
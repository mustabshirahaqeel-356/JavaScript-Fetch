const apiURL = "https://api.gutech.example";

async function getAllCourses() {
    console.log("TASK 1");

    const res = await fetch(apiURL + "/courses");
    const courses = await res.json();

    console.log("Courses received:", courses);
    console.log("Total courses:", courses.length);
}

async function getCourseDetails() {
    console.log("TASK 2");

    const res = await fetch(apiURL + "/courses/4");
    const courseInfo = await res.json();

    console.log("Course title:", courseInfo.title);
    console.log("Course price:", courseInfo.price);
}

async function getWebCourses() {
    console.log("TASK 3");

    const res = await fetch(apiURL + "/courses?category=Web");
    const webCourses = await res.json();

    console.log("Web course titles:");

    webCourses.forEach(function(course) {
        console.log(course.title);
    });
}

async function getAllEvents() {
    console.log("TASK 4");

    const res = await fetch(apiURL + "/events");
    const eventData = await res.json();

    console.log("Total events:", eventData.count);

    eventData.results.forEach(function(event) {
        console.log("Event:", event.title);
    });
}

async function checkMissingCourse() {
    console.log("TASK 5");

    const res = await fetch(apiURL + "/courses/99");
    const errorInfo = await res.json();

    console.log("Request successful:", res.ok);
    console.log("Status code:", res.status);
    console.log("Error:", errorInfo.error);
}

async function safeLoad(url) {
    try {
        const res = await fetch(url);

        const result = await res.json();

        if (res.ok) {
            console.log("Data loaded successfully:", result);
        } else {
            console.log(
                "Unable to load data. Status:",
                res.status,
                "Message:",
                result.error
            );
        }

    } catch (error) {
        console.log("Network problem. Please try again later.");
    }
}

async function testSafeLoad() {
    console.log("TASK 6");

    await safeLoad(apiURL + "/courses");
    await safeLoad(apiURL + "/courses/99");
    await safeLoad(apiURL + "/broken");
    await safeLoad("https://offline.gutech.example/x");
}

async function checkCoursePrices() {
    console.log("TASK 7");

    const res = await fetch(apiURL + "/courses");
    const allCourses = await res.json();

    let highestPriceCourse = allCourses[0];
    let freeCourses = 0;

    for (let i = 0; i < allCourses.length; i++) {

        if (allCourses[i].price > highestPriceCourse.price) {
            highestPriceCourse = allCourses[i];
        }

        if (allCourses[i].price === 0) {
            freeCourses++;
        }
    }

    console.log(
        "Most expensive course:",
        highestPriceCourse.title,
        "Price:",
        highestPriceCourse.price
    );

    console.log("Number of free courses:", freeCourses);
}

async function runTasks() {
    await getAllCourses();
    await getCourseDetails();
    await getWebCourses();
    await getAllEvents();
    await checkMissingCourse();
    await testSafeLoad();
    await checkCoursePrices();
}
runTasks();

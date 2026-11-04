// practice-api.js (GuTech practice server)
// Add this file BEFORE your own script. It pretends that a small server
// lives at https://api.gutech.example. Every other address is passed on
// to the real fetch, so real APIs still work.
(function () {
  const realFetch = window.fetch.bind(window);

  const courses = [
    { id: 1, title: "HTML Basics", category: "Web", price: 0, hours: 6 },
    { id: 2, title: "CSS Layouts", category: "Web", price: 1500, hours: 8 },
    { id: 3, title: "JavaScript Starter", category: "Web", price: 2500, hours: 10 },
    { id: 4, title: "Python for Beginners", category: "Programming", price: 2000, hours: 12 },
    { id: 5, title: "Data Analysis", category: "Data", price: 3500, hours: 14 },
    { id: 6, title: "UI Design Basics", category: "Design", price: 1800, hours: 7 }
  ];

  const events = [
    { id: 1, title: "Web Open Day", place: "Hall A" },
    { id: 2, title: "Hackathon", place: "Lab 4" },
    { id: 3, title: "Career Talk", place: "Hall B" }
  ];

  // waits for some milliseconds, like a real server would
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  // builds a fake response that looks like a real fetch response
  function reply(status, body) {
    return {
      ok: status >= 200 && status < 300,
      status: status,
      json: () => wait(30).then(() => JSON.parse(JSON.stringify(body)))
    };
  }

  // our fake fetch
  window.fetch = function (url, options) {
    const u = new URL(url, window.location.href);

    // pretend the network is down
    if (u.hostname === "offline.gutech.example") {
      return wait(400).then(() => { throw new TypeError("Failed to fetch"); });
    }

    // not our fake server? use the real fetch
    if (u.hostname !== "api.gutech.example") return realFetch(url, options);

    const path = u.pathname.replace(/\/$/, "");
    const category = u.searchParams.get("category");
    let answer;

    if (path === "/courses") {
      answer = reply(200, category ? courses.filter(c => c.category === category) : courses);
    } else if (/^\/courses\/\d+$/.test(path)) {
      const course = courses.find(c => c.id === Number(path.split("/")[2]));
      answer = course ? reply(200, course) : reply(404, { error: "Course not found" });
    } else if (path === "/events") {
      answer = reply(200, { count: events.length, results: events });
    } else if (path === "/empty") {
      answer = reply(200, []);
    } else if (path === "/broken") {
      answer = reply(500, { error: "Server error" });
    } else {
      answer = reply(404, { error: "Not found" });
    }

    return wait(300).then(() => answer);
  };
})();
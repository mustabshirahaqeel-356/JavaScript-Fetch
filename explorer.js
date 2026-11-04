const API_URL = "https://jsonplaceholder.typicode.com/users";

let allUsers = [];

const searchBox = document.getElementById("searchBox");
const userList = document.getElementById("userList");
const statusMessage = document.getElementById("status");

async function loadUsers() {
    statusMessage.textContent = "Loading users...";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to load users.");
        }

        allUsers = await response.json();

        showUsers(allUsers);

    } catch (error) {
        statusMessage.textContent =
            "Sorry, we could not load the users. Please try again.";
    }
}

function showUsers(users) {
    userList.innerHTML = "";

    if (users.length === 0) {
        statusMessage.textContent = "No users found.";
        return;
    }

    statusMessage.textContent =
        "Showing " + users.length + " of " + allUsers.length;

    users.forEach(function(user) {
        const card = document.createElement("article");
        card.className = "user-card";

        card.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;

        userList.appendChild(card);
    });
}

searchBox.addEventListener("input", function() {
    const searchText = searchBox.value.toLowerCase();

    const matchingUsers = allUsers.filter(function(user) {
        return user.name.toLowerCase().includes(searchText);
    });

    showUsers(matchingUsers);
});

loadUsers();
const loadUsersButton = document.getElementById("loadUsersButton");
const clearButton = document.getElementById("clearButton");
const searchInput = document.getElementById("searchInput");

const userContainer = document.getElementById("userContainer");
const status = document.getElementById("status");


let users = [];



const API_URL = "https://jsonplaceholder.typicode.com/users";



loadUsersButton.addEventListener("click", loadUsers);



clearButton.addEventListener("click", function () {

    userContainer.innerHTML = "";

    status.textContent = "";

    searchInput.value = "";

});



searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase();

    const filteredUsers = users.filter(function (user) {

        return user.name.toLowerCase().includes(searchText);

    });

    displayUsers(filteredUsers);

});



async function loadUsers() {

    status.textContent = "Loading users...";

    userContainer.innerHTML = "";

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        users = await response.json();

        displayUsers(users);

        status.textContent =
            `Total Users: ${users.length}`;

    } catch (error) {

        status.textContent =
            "Unable to load users. Please try again.";

        console.error(error);
    }
}



function displayUsers(userList) {

    userContainer.innerHTML = "";

    if (userList.length === 0) {

        userContainer.innerHTML =
            "<p>No users found.</p>";

        return;
    }


    userList.forEach(function (user) {


        const card = document.createElement("div");

        card.classList.add("user-card");


        card.innerHTML = `
            <h2>${user.name}</h2>

            <p>
                <strong>Username:</strong>
                ${user.username}
            </p>

            <p>
                <strong>Email:</strong>
                ${user.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${user.phone}
            </p>

            <p>
                <strong>Website:</strong>
                ${user.website}
            </p>

            <p>
                <strong>City:</strong>
                ${user.address.city}
            </p>
        `;



        userContainer.appendChild(card);

    });

}
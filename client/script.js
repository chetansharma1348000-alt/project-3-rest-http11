const API_URL = "";


// ==========================================
// Common Request Function
// ==========================================

async function makeRequest(url, options = {}) {

    const startTime = performance.now();

    try {

        const response = await fetch(url, options);

        const data = await response.json();

        const endTime = performance.now();

        const responseTime = (endTime - startTime).toFixed(2);

        // Method
        document.getElementById("method").textContent =
            options.method || "GET";

        // Endpoint
        document.getElementById("endpoint").textContent =
            url;

        // Status
        document.getElementById("status").textContent =
            `${response.status} ${response.statusText}`;

        // Response Time
        document.getElementById("responseTime").textContent =
            `${responseTime} ms`;

        // JSON Response
        document.getElementById("result").textContent =
            JSON.stringify(data, null, 2);

    } catch (error) {

        document.getElementById("status").textContent =
            "ERROR";

        document.getElementById("result").textContent =
            error.message;
    }
}


// ==========================================
// GET /users
// ==========================================

function getUsers() {

    makeRequest("/users");
}


// ==========================================
// GET /users/1
// ==========================================

function getUser() {

    makeRequest("/users/1");
}


// ==========================================
// POST /users
// ==========================================

function createUser() {

    makeRequest("/users", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: "New User",
            email: "newuser@gmail.com"
        })

    });
}


// ==========================================
// PUT /users/1
// ==========================================

function updateUser() {

    makeRequest("/users/1", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: "Updated User",
            email: "updated@gmail.com"
        })

    });
}


// ==========================================
// DELETE /users/3
// ==========================================

function deleteUser() {

    makeRequest("/users/3", {

        method: "DELETE"

    });
}
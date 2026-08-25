const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5000;

// ==========================================
// Dummy Users Data
// ==========================================

const users = [
    {
        id: 1,
        name: "Chetan Sharma",
        email: "chetan@gmail.com"
    },
    {
        id: 2,
        name: "Rahul Kumar",
        email: "rahul@gmail.com"
    },
    {
        id: 3,
        name: "Amit Sharma",
        email: "amit@gmail.com"
    }
];

// ==========================================
// Helper: Send JSON Response
// ==========================================

function sendJSON(res, statusCode, data) {

    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data, null, 2));
}

// ==========================================
// Create HTTP Server
// ==========================================

const server = http.createServer((req, res) => {

    const startTime = Date.now();

    console.log(`${req.method} ${req.url}`);

    // ==========================================
    // Serve Frontend - index.html
    // ==========================================

    if (req.method === "GET" && req.url === "/") {

        const filePath = path.join(
            __dirname,
            "..",
            "client",
            "index.html"
        );

        fs.readFile(filePath, "utf8", (error, content) => {

            if (error) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Unable to load index.html");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(content);
        });

        return;
    }

    // ==========================================
    // Serve CSS
    // ==========================================

    if (req.method === "GET" && req.url === "/style.css") {

        const filePath = path.join(
            __dirname,
            "..",
            "client",
            "style.css"
        );

        fs.readFile(filePath, (error, content) => {

            if (error) {
                res.writeHead(404);
                res.end("CSS not found");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/css"
            });

            res.end(content);
        });

        return;
    }

    // ==========================================
    // Serve JavaScript
    // ==========================================

    if (req.method === "GET" && req.url === "/script.js") {

        const filePath = path.join(
            __dirname,
            "..",
            "client",
            "script.js"
        );

        fs.readFile(filePath, (error, content) => {

            if (error) {
                res.writeHead(404);
                res.end("JavaScript not found");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "application/javascript"
            });

            res.end(content);
        });

        return;
    }

    // ==========================================
    // GET /users/:id
    // ==========================================

    if (
        req.method === "GET" &&
        req.url.startsWith("/users/")
    ) {

        const id = parseInt(req.url.split("/")[2]);

        const user = users.find(user => user.id === id);

        const responseTime = `${Date.now() - startTime} ms`;

        if (!user) {

            sendJSON(res, 404, {
                success: false,
                message: "User not found",
                responseTime: responseTime
            });

            return;
        }

        sendJSON(res, 200, {
            success: true,
            message: "User fetched successfully",
            data: user,
            responseTime: responseTime
        });

        return;
    }

    // ==========================================
    // GET /users
    // ==========================================

    if (
        req.method === "GET" &&
        req.url === "/users"
    ) {

        sendJSON(res, 200, {
            success: true,
            message: "Users fetched successfully",
            data: users,
            responseTime: `${Date.now() - startTime} ms`
        });

        return;
    }

    // ==========================================
    // POST /users
    // ==========================================

    if (
        req.method === "POST" &&
        req.url === "/users"
    ) {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {

                const newUser = JSON.parse(body);

                if (!newUser.name || !newUser.email) {

                    sendJSON(res, 400, {
                        success: false,
                        message: "Name and email are required",
                        responseTime: `${Date.now() - startTime} ms`
                    });

                    return;
                }

                const newId =
                    users.length > 0
                        ? Math.max(...users.map(user => user.id)) + 1
                        : 1;

                const user = {
                    id: newId,
                    name: newUser.name,
                    email: newUser.email
                };

                users.push(user);

                sendJSON(res, 201, {
                    success: true,
                    message: "User created successfully",
                    data: user,
                    responseTime: `${Date.now() - startTime} ms`
                });

            } catch (error) {

                sendJSON(res, 400, {
                    success: false,
                    message: "Invalid JSON data",
                    responseTime: `${Date.now() - startTime} ms`
                });
            }
        });

        return;
    }

    // ==========================================
    // PUT /users/:id
    // ==========================================

    if (
        req.method === "PUT" &&
        req.url.startsWith("/users/")
    ) {

        const id = parseInt(req.url.split("/")[2]);

        const userIndex =
            users.findIndex(user => user.id === id);

        if (userIndex === -1) {

            sendJSON(res, 404, {
                success: false,
                message: "User not found",
                responseTime: `${Date.now() - startTime} ms`
            });

            return;
        }

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {

                const updateData = JSON.parse(body);

                if (
                    !updateData.name ||
                    !updateData.email
                ) {

                    sendJSON(res, 400, {
                        success: false,
                        message: "Name and email are required",
                        responseTime: `${Date.now() - startTime} ms`
                    });

                    return;
                }

                users[userIndex].name =
                    updateData.name;

                users[userIndex].email =
                    updateData.email;

                sendJSON(res, 200, {
                    success: true,
                    message: "User updated successfully",
                    data: users[userIndex],
                    responseTime: `${Date.now() - startTime} ms`
                });

            } catch (error) {

                sendJSON(res, 400, {
                    success: false,
                    message: "Invalid JSON data",
                    responseTime: `${Date.now() - startTime} ms`
                });
            }
        });

        return;
    }

    // ==========================================
    // DELETE /users/:id
    // ==========================================

    if (
        req.method === "DELETE" &&
        req.url.startsWith("/users/")
    ) {

        const id = parseInt(req.url.split("/")[2]);

        const userIndex =
            users.findIndex(user => user.id === id);

        if (userIndex === -1) {

            sendJSON(res, 404, {
                success: false,
                message: "User not found",
                responseTime: `${Date.now() - startTime} ms`
            });

            return;
        }

        const deletedUser =
            users.splice(userIndex, 1)[0];

        sendJSON(res, 200, {
            success: true,
            message: "User deleted successfully",
            data: deletedUser,
            responseTime: `${Date.now() - startTime} ms`
        });

        return;
    }

    // ==========================================
    // Route Not Found
    // ==========================================

    sendJSON(res, 404, {
        success: false,
        message: "Route not found",
        responseTime: `${Date.now() - startTime} ms`
    });
});

// ==========================================
// Start Server
// ==========================================

server.listen(PORT, () => {

    console.log("--------------------------------------");
    console.log("REST HTTP/1.1 Server Started");
    console.log(`Server: http://localhost:${PORT}`);
    console.log("--------------------------------------");

});
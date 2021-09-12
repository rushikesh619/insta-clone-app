const users = require("./users");
const posts = require("./post")

module.exports = (app) => {
    app.use("/api/users", users);
    app.use("/api/posts",posts);
}
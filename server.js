const app = require("./app");

const PORT  = 8080;


app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.MONGODB_URL}`);
})
require("dotenv/config");
require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");

//const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require("express");

const routes = require("./routes");
migrationsRun();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes);

app.use((error, request, response, next) => {
    if (typeof error === "string") {
        return response.status(401).json(error);
    }

    console.error(error);

    return response.status(500).json("Internal server error");
});

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`server is running at port ${port}`));
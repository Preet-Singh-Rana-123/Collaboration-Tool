const express = require("express");
const http = require("http");
const connectDb = require("./utils/db");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const documentRouter = require("./routes/documentRoutes");
const dasboardRouter = require("./routes/dashboardRoutes");
const userRouter = require("./routes/userRoutes");

const { setupYSocketServer } = require("./utils/ySocketServer");

dotenv.config();

const app = express();
const server = http.createServer(app);

connectDb();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/document", documentRouter);
app.use("/api/dashboard", dasboardRouter);
app.use("/api/user", userRouter);

setupYSocketServer(server);

const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});

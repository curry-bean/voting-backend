import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";
import connect from "./utils/connect.js";

dotenv.config();

const app = express();

app.use(express.json());
const corsOptions = {
  origin: "https://e-rayon.netlify.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.listen(process.env.PORT, async () => {
  console.info(`Server is running at http://localhost:${process.env.PORT}`);
  await connect();
  routes(app);
});

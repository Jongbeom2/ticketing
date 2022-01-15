import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFoundError } from "@n11334-test/common";
import { createChargeRouter } from "./routes/new";
const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);
app.use(createChargeRouter);
app.use(errorHandler);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

export { app };

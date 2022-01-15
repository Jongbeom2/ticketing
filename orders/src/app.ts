import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFoundError } from "@n11334-test/common";
import { createOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";

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

app.use(indexOrderRouter);
app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);

app.use(errorHandler);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

export { app };

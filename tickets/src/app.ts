import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFoundError } from "@n11334-test/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

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

app.use(indexTicketRouter);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(updateTicketRouter);

app.use(errorHandler);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

export { app };

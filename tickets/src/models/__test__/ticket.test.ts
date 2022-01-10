import { Ticket } from "../ticket";

it("implements optimisitc concurrency control", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "1234",
  });
  await ticket.save();

  const firstTicket = await Ticket.findById(ticket.id);
  const secondTicket = await Ticket.findById(ticket.id);

  firstTicket!.set({
    price: 10,
  });
  secondTicket!.set({
    price: 15,
  });

  await firstTicket!.save();
  try {
    await secondTicket!.save();
  } catch (err) {
    return;
  }
  throw new Error("Should not reach this poin");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "1234",
  });
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
});

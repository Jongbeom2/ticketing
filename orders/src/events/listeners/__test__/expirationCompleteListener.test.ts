import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { ExpirationCompleteCreatedListener } from "../expirationCompleteListener";
import { ExpirationCompleteEvent, OrderStatus } from "@n11334-test/common";
import { Order } from "../../../models/order";

const setup = async () => {
  const listener = new ExpirationCompleteCreatedListener(natsWrapper.client);
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const order = Order.build({
    status: OrderStatus.Created,
    userId: "asdf",
    expiresAt: new Date(),
    ticket,
  });
  await order.save();
  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id,
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg, order, ticket };
};

it("updates the order status to cancelled", async () => {
  const { listener, data, msg, order, ticket } = await setup();
  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits the OrderCancelled event", async () => {
  const { listener, data, msg, order, ticket } = await setup();
  await listener.onMessage(data, msg);
  const orderUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  console.log(data);
  console.log(order);
  console.log(orderUpdatedData);
  expect(orderUpdatedData.id).toEqual(order.id);
});

it("acks the message", async () => {
  const { listener, data, msg, order, ticket } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

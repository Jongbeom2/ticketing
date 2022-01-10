import { Listener, OrderCreatedEvent, Subjects } from "@n11334-test/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queueGroupName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  readonly queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { id, userId, version, status, ticket } = data;
    const order = Order.build({
      id,
      userId,
      version,
      status,
      price: ticket.price,
    });
    await order.save();
    msg.ack();
  }
}

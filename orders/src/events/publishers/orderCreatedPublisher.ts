import { OrderCreatedEvent, Publisher, Subjects } from "@n11334-test/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}

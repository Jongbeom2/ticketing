import { OrderCancelledEvent, Publisher, Subjects } from "@n11334-test/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}

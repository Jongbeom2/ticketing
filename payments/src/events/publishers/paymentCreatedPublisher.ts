import { PaymentCreatedEvent, Publisher, Subjects } from "@n11334-test/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}

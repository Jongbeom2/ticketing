import { Publisher, Subjects, TicketUpdatedEvent } from "@n11334-test/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

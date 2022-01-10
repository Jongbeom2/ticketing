import { Publisher, Subjects, TicketCreatedEvent } from "@n11334-test/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

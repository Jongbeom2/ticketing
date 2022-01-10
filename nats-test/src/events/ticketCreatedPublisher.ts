import Publisher from "./basePublisher";
import Subjects from "./subject";
import TicketCreatedEvent from "./ticketCreatedEvent";

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

export default TicketCreatedPublisher;

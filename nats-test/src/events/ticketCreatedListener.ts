import { Message } from "node-nats-streaming";
import Listener from "./baseListener";
import Subjects from "./subject";
import TicketCreatedEvent from "./ticketCreatedEvent";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "payments-service";
  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("Event Data : ", data);
    msg.ack();
  }
}

export default TicketCreatedListener;

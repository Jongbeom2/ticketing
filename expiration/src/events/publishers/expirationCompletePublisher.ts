import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@n11334-test/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}

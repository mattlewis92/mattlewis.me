export interface BackgroundSyncMessage<PayloadType> {
  type: string;
  payload: PayloadType;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormBackgroundSyncPayload {
  contactForm: ContactForm;
}
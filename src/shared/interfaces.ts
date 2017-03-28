export interface BackgroundSyncMessage<PayloadType> {
  type: string;
  payload: PayloadType;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface BackgroundSyncContactFormMessage {
  contactForm: ContactForm;
}

export interface BackgroundSyncResult<PayloadType> {
  id: string;
  result: any;
  isError: boolean;
  message: BackgroundSyncMessage<PayloadType>;
}

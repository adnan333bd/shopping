export class MessageService {
  messages: string[] = [];

  add(message: string) {
    console.log(message);
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}

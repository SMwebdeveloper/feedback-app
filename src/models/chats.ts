import { Model } from "pinia-orm";

export class Chats extends Model {
  static entity = "chats";

  static fields(): any {
    return {
      id: this.string(""),
      users: this.attr([]),
      messages: this.attr([]),
    };
  }
}

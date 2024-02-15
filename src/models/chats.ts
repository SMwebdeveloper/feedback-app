import { Model } from "pinia-orm";

export class Chats extends Model {
  static entity = "chats";

  static fields(): any {
    return {
      id: this.string("") || this.number(0),
      name: this.string(""),
      img: this.string("")
    };
  }
}

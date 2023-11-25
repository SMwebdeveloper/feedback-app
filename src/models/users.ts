import { Model } from "pinia-orm";

export class Users extends Model {
  static entity = "users";

  static fields(): any {
    return {
      id: this.string(""),
      name: this.string(""),
      email: this.string(""),
      password: this.string(""),
      image: this.string(""),
      userId: this.string("")
    };
  }
}

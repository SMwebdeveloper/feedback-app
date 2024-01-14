import { Model } from "pinia-orm";

export class Users extends Model {
  static entity = "users";

  static fields(): any {
    return {
      id: this.string(""),
      name: this.string(""),
      email: this.string(""),
      img: this.string(""),
      bio: this.string(""),
      userId: this.string(""),
      saveFeedbacks: this.attr([]),
      followers: this.attr([])
    };
  }
}

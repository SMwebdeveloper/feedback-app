import { Model } from "pinia-orm";

export class Comments extends Model {
  static entity = "comments";

  static fields(): any {
    return {
      id: this.string(""),
      feedbackId: this.string(""),
      comment: this.string(""),
      userId: this.string(""),
      author: this.attr({}),
    };
  }
}

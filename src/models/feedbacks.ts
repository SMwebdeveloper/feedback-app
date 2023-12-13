import { Model } from "pinia-orm";

export class Feedbacks extends Model {
  static entity = "feedbacks";

  static fields(): any {
    return {
      id: this.string(""),
        title: this.string(""),
      img: this.string(""),
      desc: this.string(""),
      likes: this.string(""),
      userId: this.string(""),
      author: this.attr({}),
    };
  }
}

export class Comment {
  // Initializing number type attributes with zero and strings with empty string

  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.body = '';
    this.postId = 0;
  }
}

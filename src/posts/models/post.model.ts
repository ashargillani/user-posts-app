export class Post {
  // Initializing number type attributes with zero and strings with empty string
  constructor() {
    this.id = 0;
    this.title = '';
    this.body = '';
    this.userId = 0;
  }

  id: number;
  title: string;
  body: string;
  userId: number;
}

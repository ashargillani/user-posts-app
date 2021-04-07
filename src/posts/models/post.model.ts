export class Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  [key: string]: number | string | object

  // Initializing number type attributes with zero and strings with empty string
  constructor() {
    this.id = 0;
    this.title = '';
    this.body = '';
    this.userId = 0;
  }
}

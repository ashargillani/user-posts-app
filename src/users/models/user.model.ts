export class User {

  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    suite: string,
    street: string,
    city: string,
  };

  // Initializing number type attributes with zero and strings with empty string
  constructor() {
    this.id = 0;
    this.name = '';
    this.username = '';
    this.email = '';
    this.address = {
      suite: '',
      street: '',
      city: ''
    };
  }

  clear(): void {
    this.id = 0;
    this.name = '';
    this.username = '';
    this.email = '';
    this.address = {
      suite: '',
      street: '',
      city: ''
    };
  }
}

// Class for wizard-forms
export class Personal {
  name: string;
  username: string;
  email: string;

  constructor() {
    this.name = '';
    this.username = '';
    this.email = '';
  }
}

// Class for wizard-forms
export class Address {
  suite: string;
  street: string;
  city: string;

  constructor() {
    this.suite = '';
    this.street = '';
    this.city = '';
  }
}

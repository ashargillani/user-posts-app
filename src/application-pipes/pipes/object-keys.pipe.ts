import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {
  userKeysToDisplay = [
    'id', 'name', 'username', 'email', 'address',
    'userid', 'title', 'body'
  ];

  transform(value: any, ...args: unknown[]): string[] {
    const keys = [];

    // tslint:disable-next-line:forin
    for (const key in value) {
      if (this.userKeysToDisplay.indexOf(key.toLowerCase()) !== -1) {
        keys.push(key);
      }
    }

    return keys;
  }

}

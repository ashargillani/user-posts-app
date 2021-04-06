import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../../users/models/user.model';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {
  userKeysToDisplay = [
    'id', 'name', 'username', 'email', 'address'
  ];

  transform(value: User, ...args: unknown[]): string[] {
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

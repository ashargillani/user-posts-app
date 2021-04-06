import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  // tslint:disable-next-line:variable-name
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'System',
      type: 'header'
    },
    {
      title: 'Dashboard',
      url : '/home',
      icon: 'fa fa-tachometer-alt',
      active: false,
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
    },
    {
      title: 'Users',
      icon: 'fas fa-user',
      active: false,
      badge: {
        text: '!',
        class: 'badge-danger'
      },
      url: '/users'
    },
    {
      title: 'Account',
      type: 'header'
    },
    {
      title: 'My Account',
      icon: 'fa fa-user',
      active: false,
      type: 'simple'
    },
    {
      title: 'Logout',
      icon: 'fa fa-sign-out-alt',
      active: false,
      type: 'simple',
      url: '/logout'
    }
  ];

  constructor() { }

  toggle(): void {
    this.toggled = ! this.toggled;
  }

  getSidebarState(): boolean {
    return this.toggled;
  }

  setSidebarState(state: boolean): void {
    this.toggled = state;
  }

  getMenuList(): object[] {
    return this.menus;
  }

  get hasBackgroundImage(): boolean {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}

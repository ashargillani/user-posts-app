import {Injectable} from '@angular/core';

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
      url: '/',
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
        text: '3',
        class: 'badge-danger'
      },
      url: '/users'
    },
    {
      title: 'Posts',
      icon: 'fa fa-sticky-note',
      active: false,
      url: '/posts'
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

  constructor() {
  }

  /**
   * Toggles Sidebar
   */
  toggle(): void {
    this.toggled = !this.toggled;
  }

  /**
   * Returns whether toggled true|false
   */
  getSidebarState(): boolean {
    return this.toggled;
  }

  /**
   * Sets toggle to true|false
   */
  setSidebarState(state: boolean): void {
    this.toggled = state;
  }

  /**
   * Returns Navigation Menu List
   */
  getMenuList(): object[] {
    return this.menus;
  }

  get hasBackgroundImage(): boolean {
    return this._hasBackgroundImage;
  }
}

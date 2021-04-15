/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'welcome',
    icon: '/img/icon/apps.svg',
    label: 'navBar.welcome',
    to: '/welcome'
  },
  {
    id: 'friends',
    icon: '/img/icon/friends-icon.png',
    label: 'navBar.friends',
    to: '/friends'
  }
  ,{
    id: 'map',
    icon: '/img/icon/apps.svg',
    label: 'navBar.map',
    to: '/map'
  },
  {
    id: 'locations',
    icon: '/img/icon/apps.svg',
    label: 'navBar.locations',
    to: '/locations'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];

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
    id: 'myfriends',
    icon: '/img/icon/apps.svg',
    label: 'navBar.myfriends',
    to: '/myfriends'
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

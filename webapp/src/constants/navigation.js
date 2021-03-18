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
    id: 'friendMap',
    icon: '/img/icon/apps.svg',
    label: 'navBar.friendMap',
    to: '/friendMap'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];

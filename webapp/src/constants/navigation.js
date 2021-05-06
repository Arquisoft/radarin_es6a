
/**
 * Object mapping of known possible inboxes for the user
 */
 export const NavigationItems = [
  {
    id: 'welcome',
    icon: '/img/icon/welcome.png',
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
    icon: '/img/icon/map.png',
    label: 'navBar.map',
    to: '/map'
  },
  {
    id: 'locations',
    icon: '/img/icon/locations.png',
    label: 'navBar.locations',
    to: '/locations'
  },
  {
    id: 'chat',
    icon: '/img/icon/chat.png',
    label: 'navBar.chat',
    to: '/chat'
  },
  {
    id: 'users',
    icon: '/img/icon/users.png',
    label: 'navBar.usuarios',
    to: '/users'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];

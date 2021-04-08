var notifications = [];

export function addNotification(number, friends) {
    notifications.push({
        number: number,
        friends: friends,
        date: new Date()
    });
}

export function getNotifications() {
    return notifications;
}
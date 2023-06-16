import {notification} from 'antd';

export const CommonNotification = (message, description, type, placement = 'topRight') => {
    notification[type]({
        message: message,
        description: description,
        placement: placement
    });
};
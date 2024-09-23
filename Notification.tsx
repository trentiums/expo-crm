import React, { ReactNode, useEffect } from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { isAndroid } from '@constants/platform';
import View from '@atoms/View/View';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

if (isAndroid) {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}

async function requestUserPermission() {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus === 'granted';
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const handleNotificationClick = async (response) => {
  console.log('notification click', response);
};

const notificationClickSubscription =
  Notifications.addNotificationResponseReceivedListener(
    handleNotificationClick,
  );

const handlePushNotification = async (remoteMessage) => {
  const notification: Notifications.NotificationContentInput = {
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    sound: true,
    data: remoteMessage.data,
  };
  console.log('push notification', remoteMessage.notification);
  await Notifications.scheduleNotificationAsync({
    content: notification,
    trigger: null,
  });
};

const NotificationContainer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const init = async () => {
    if (await requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => console.log('token: ', token));
    }
  };

  useEffect(() => {
    init();
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });
    messaging().setBackgroundMessageHandler(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
        const notification = {
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          data: remoteMessage.data,
        };

        await Notifications.scheduleNotificationAsync({
          content: notification,
          trigger: null,
        });
      },
    );
    const unsubscribe = messaging().onMessage(handlePushNotification);
    return () => {
      unsubscribe();
      notificationClickSubscription.remove();
    };
  }, []);

  return <View style={{ flex: 1 }}>{children}</View>;
};

export default NotificationContainer;

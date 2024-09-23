import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDVDQnYYuktELq6GsnOB-OWvKrrRvdH4kk',
  authDomain: 'crm-app-efa90.firebaseapp.com',
  projectId: 'crm-app-efa90',
  storageBucket: 'crm-app-efa90.appspot.com',
  messagingSenderId: '75624281491',
  appId: '1:75624281491:web:edf98debe0e223da3e2466',
  measurementId: 'G-D4WH4LM9GW',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { app, messaging, getToken };

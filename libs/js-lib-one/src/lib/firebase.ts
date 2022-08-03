import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

export function getApp(firebaseConfig: any) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return {
    db: db,
  };
}

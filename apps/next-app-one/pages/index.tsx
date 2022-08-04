import { D3Component } from '@tvb/react-lib-one';
import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { getApp } from '@tvb/js-lib-one';
import { environment } from '../environment';
import styles from './index.module.scss';
import { nanoid } from 'nanoid';
import { v4 as uuid } from 'uuid';
const { db } = getApp(environment.firebase);

export function Index() {
  const [nId, setNId] = useState(nanoid(10));
  const [uId, setUId] = useState(uuid());
  const [docs, setDocs] = useState<any[]>([]);
  getDocs(collection(db, 'items')).then((items) => {
    setDocs(items.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
  return (
    <>
      <D3Component />
      <div className={styles.page}>nanoId: {nId}</div>
      <div className={styles.page}>UUID: {uId}</div>
      <pre>{JSON.stringify(docs, null, 2)}</pre>
    </>
  );
}

export default Index;

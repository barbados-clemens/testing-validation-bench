// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { getApp } from '@tvb/js-lib-one';
import { collection, getDocs } from 'firebase/firestore';
import { environment } from '../environments/environment';
const { db } = getApp(environment.firebase);
export function App() {
  return <DbInfo />;
}

function DbInfo() {
  const [id, setId] = useState(nanoid(10));
  const [docs, setDocs] = useState<any[]>([]);
  getDocs(collection(db, 'items')).then((items) => {
    setDocs(items.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
  return (
    <>
      <pre>{JSON.stringify(docs, null, 2)}</pre>
      <div>{id}</div>
    </>
  );
}
export default App;

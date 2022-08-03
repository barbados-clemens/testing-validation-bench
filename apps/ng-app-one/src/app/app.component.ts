import { Component } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { nanoid } from 'nanoid';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'tvb-root',
  template: `
    <div>nanoId : {{ nId }}</div>
    <div>uuid : {{ uId }}</div>
    <pre>{{ item$ | async | json }}</pre>
    <tvb-d3></tvb-d3>
  `,
  styles: [``],
})
export class AppComponent {
  item$: Observable<any[]>;
  nId: string;
  uId: string;

  constructor(firestore: Firestore) {
    this.nId = nanoid(10);
    this.uId = uuid();
    const c = collection(firestore, 'items');
    this.item$ = collectionData(c);
  }
}

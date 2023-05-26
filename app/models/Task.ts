// TypeScript syntax, using `@realm/babel-plugin`
// (https://github.com/realm/realm-js/blob/main/packages/babel-plugin/).
//
// If you are not using TypeScript and `@realm/babel-plugin`, you instead need
// to defining a schema on the class - see `Task.js` in the Realm example app
// for an example of this.

import {Realm} from '@realm/react';
// To use a class as a Realm object type in Typescript with the `@realm/babel-plugin` plugin,
// simply define the properties on the class with the correct type and the plugin will convert
// it to a Realm schema automatically.
export class Task extends Realm.Object<Task> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  description!: string;
  isComplete: boolean = false;
  createdAt: Date = new Date();
  userId!: string;

  static primaryKey = '_id';

  constructor(realm: Realm, description: string, userId?: string) {
    super(realm, {description, userId: userId || '_SYNC_ENABLED_'});
  }
}

export class Customer extends Realm.Object<Customer> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  customerId: number;
  name: string;
  age: string;
  contact: number;
  address: string;
  userImage : string;
  orders!:  Realm.List<Order>;
  createdAt: Date = new Date();
  static primaryKey = '_id';
  constructor(realm: Realm, name: string,age:string,contact:number,address:string, userImage:string) {
    const customerId = realm.objects('Customer').length + 1;
    super(realm, {customerId,name,age,contact,address,userImage});
  }
}

export class Order extends Realm.Object<Order> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name: string;
  createdAt: Date = new Date();
  estimatedDate : Date;
  sayyas!: Realm.List<Sayya>;
  kurtas!: Realm.List<Kurta>;
  pyjamas!: Realm.List<Pyjama>;
  note: Realm.List<Note>;
  isComplete?: boolean = false;
  customer!: {type: 'linkingObjects', objectType: 'Customer', property: 'orders'}
  static primaryKey = '_id';
  constructor(realm: Realm, name: string, estimatedDate: Date) {
    super(realm, {name, estimatedDate});
  }
}

export class Sayya extends Realm.Object<Sayya> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  type: string;
  length: string;
  static primaryKey = '_id';
  cost: number;
  item: {type: 'linkingObjects', objectType: 'Order', property: 'sayyas'}
  constructor(realm: Realm, type: string, length: string, cost:number){
    super(realm, {type,length,cost})
  }
}

export class Kurta extends Realm.Object<Kurta> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  type: string;
  length : string;
  shoulders: string;
  sleeve: string;
  chest: string;
  waist: string;
  hip: string;
  collar: string;
  cost: number;
  static primaryKey = '_id';
  item: {type: 'linkingObjects', objectType: 'Order', property: 'kurtas'}
  constructor(realm: Realm, type: string, length: string, shoulders: string, sleeve: string, chest: string, waist: string, hip: string, collar: string,cost: number){
    super(realm, {type,length,shoulders,sleeve,chest,waist,hip,collar,cost})
  }
}

export class Pyjama extends Realm.Object<Pyjama> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  type: string;
  length: string;
  waist: string;
  bottom: string;
  cost: number;
  static primaryKey = '_id';
  item: {type: 'linkingObjects', objectType: 'Order', property: 'pyjamas'}
  constructor(realm: Realm, type: string, length: string, waist: string, bottom: string,cost: number){
    super(realm, {type,length,waist,bottom,cost})
  }
}

export class Note extends Realm.Object<Note> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  value: string;
  static primaryKey = '_id';
  item: {type: 'linkingObjects', objectType: 'Order', property: 'note'}
  constructor(realm: Realm, value: string){
    super(realm, {value})
  }
}

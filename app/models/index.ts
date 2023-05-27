import {createRealmContext} from '@realm/react';
import {Customer, Note, Kurta, Order, Pyjama, Sayya, Task} from './Task';

export const TaskRealmContext = createRealmContext({
  schema: [Task,Customer,Note,Order,Sayya,Kurta,Pyjama],
  schemaVersion:2,
});

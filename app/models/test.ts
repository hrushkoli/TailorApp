import {Realm} from "@realm/react";

export const CUSTOMER_SCHEMA = "Customer";
export const USER_SCHEMA = "User";
export const ORDER_SCHEMA = "Order";
export const MEASUREMENT_SCHEMA = "Measurement";
export const LENGTH_SCHEMA = "Length";

export const LengthSchema = {
	name: LENGTH_SCHEMA,
	primaryKey:'id',
	properties:{
		id:'int',
		description:'string',
		length:{type:'float'}
	}
}

export const MeasurementSchema = {
	name: MEASUREMENT_SCHEMA,
	primaryKey:'id',
	properties:{
		id:'int',
		date:'date',
		clothMaterial:'string',
		garmentType:'string',
		price:'float',
		length:{type:'list',objectType:LENGTH_SCHEMA}
	}
}

export const OrderSchema = {
	name: ORDER_SCHEMA,
	primaryKey:'id',
	properties:{
		id:'int',
		date:'date',
		price:'float',
		measurements: {type:'list',objectType:MEASUREMENT_SCHEMA},
		isOrderReady: 'bool'
	}
}

export const CustomerSchema = {
	name: CUSTOMER_SCHEMA,
	primaryKey: 'id',
	properties:{
		id:'int',
		name: {type: 'string',indexed:true},
		contact: {type:'string'},
		address: {type:'string'},
		orders: {type:'list',objectType:ORDER_SCHEMA}
	}
}

export const UserSchema = {
	name: USER_SCHEMA,
	primaryKey: 'id',
	properties: {
		id:'int',
		username: {type:'string',indexed:true},
		password: 'string',
	}
}

//functions 

export const insertNewCustomer = newCustomer => new Promise((resolve,reject)=>{
	Realm.open(databaseOptions).then(realm => {
		realm.write(()=>{
			realm.create(CUSTOMER_SCHEMA,newCustomer)
			resolve (newCustomer);
		})
	}).catch((error)=>reject(error))
})

const printHello = () =>{
  console.log("Hello")
}

function printHello2 () {
  console.log("Hello")
}

function functionWithParameters2 (para){
  console.log(para)
}

var functionWithParameters = para=>{
  console.log(para)
}
var functionWithParameters = (para,para2)=>{
  console.log(para)
}

export const updateCustomerOrder = customer => new Promise((resolve,reject)=>{
	Realm.open(databaseOptions).then(realm=>{
		realm.write(()=>{
			let updatingCustomer = realm.objectForPrimaryKey(CUSTOMER_SCHEMA,customer.id);
			updatingCustomer.orders = customer.orders
			resolve()
		})
	}).catch((error)=>reject(error))
}) 

export const deleteCustomerOrder = customer => new Promise((resolve,reject)=>{
	Realm.open(databaseOptions).then(realm=>{
		realm.write(()=>{
			let deletingCustomer = realm.objectForPrimaryKey(CUSTOMER_SCHEMA,customer.id);
			realm.delete(deletingCustomer)
			resolve()
		})
	}).catch((error)=>reject(error))
}) 

export const getCustomers = () => new Promise((resolve,reject)=>{
	Realm.open(databaseOptions).then(realm=>{
		realm.write(()=>{
			let allCustomers = realm.objects(CUSTOMER_SCHEMA)
			resolve(allCustomers)
		})
	}).catch((error)=>reject(error))
}) 

export default new Realm(databaseOptions)

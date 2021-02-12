import {firebaseApp} from './firebase'
import * as firebase from "firebase";
import 'firebase/firestore'

const db  = firebase.firestore(firebaseApp)

export const getCollection = async(collection) => {
    const result = {statusResponse:false, data:null, error:null}
    try {
        const data = await db.collection(collection).get()
        const arrayData = data.docs.map(doc =>  ({id: doc.id, ...doc.data()}))
        result.statusResponse =true;
        result.data = arrayData;        
    } catch (error) {
        result.error=error
    }
    return result
}

export const addDocument  = async(collection, data) =>{
    const result = {statusResponse:false, data:null, error:null}
    try {
        const response = await db.collection(collection).add(data)
        result.data ={id: response.id}
        result.statusResponse = true;
        
    } catch (error) {
        result.error=error
    }
    return result
}


export const getDocument = async (collection, id)=>{
    const result = {statusResponse:false, data:null, error:null}
    try {
        // de esta manera obtenemos el documento
        const response = await db.collection(collection).doc(id).get()
        //la data ba hacer igual a id  y la data la sacamos de ...response.data()
        result.data ={id:response.id, ...response.data()}
        //si funciona la mostramos
        result.statusResponse = true        
    } catch (error) {
        result.error=error
    }
    return result
}

//aqui ya le pasamos el data.
export const uppdateDocument = async (collection, id, data) => {
    const result = {statusResponse:false, error:null}
    try {
        // de esta manera obtenemos el documento
        await db.collection(collection).doc(id).update(data);   
        result.statusResponse = true;    
    } catch (error) {
        result.error=error
    }
    return result
}

export const deleteDocument = async (collection, id) => {
    const result = {statusResponse:false, error:null}
    try {
        await db.collection(collection).doc(id).delete()
        result.statusResponse =true;
          
    } catch (error) {
        result.error=error
    }
    return result
}

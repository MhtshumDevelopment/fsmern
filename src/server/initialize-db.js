import { connectDB }  from './connect-db';
import { defaultState } from './defaultState';

async function initializeDB(){
  let db = await connectDB();
  let user = await db.collection('users').findOne({id:'u1'});
  if(!user){
    for ( let collectionName in defaultState){
      let collection = db.collection(collectionName);
      await collection.insertMany(defaultState[collectionName]);  
    }  
  }  
}

initializeDB();

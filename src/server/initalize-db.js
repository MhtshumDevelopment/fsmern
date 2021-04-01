import { connectDB }  from './connect-db';
//  nameofcollection : dstasks
const url = 'mongodb://11.11.11.12:27017/dstasks';
// represent db connection avoid to reconnect and same db object can be used to communicate with mongodb
let db = null;

export async function connectDB(){
  if (db) return db;
  let client = await MongoClient.connect(url,{useNewUrlParser: true,  useUnifiedTopology: true});
  db = client.db();
  console.info('Got db', db);
  return db;
}

//connectDB();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { connectDB } from './connect-db';
import { authenticationRoute } from './authenticate';
import { hashString } from './hashUtility';
// importing whole file without importing any constants fn or anything
import './initialize-db';

const app = express();
const port = process.env.PORT || 7070;

app.listen(port,console.log('listening on ',port));

/*
app.get('/',(req,res)=>{
  res.send('asSalam o alaikm');
});


bodyParser lets us use post but more powerfule though harder to use
- app.use everything inside is the plugin(adding feature to app in isolated manner)
*/
app.use(
  cors(),
  bodyParser.urlencoded({extended:true}),  
  bodyParser.json()
);

authenticationRoute(app);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname,'../../dist')))
  app.get('/*',(req,res=>{
    res.send(path.resolve('index.html'));
  }));
}

export const addNewTask = async task => {
  let db = await connectDB();
  let collection = db.collection('tasks');
  await collection.insertOne(task);  
};

export const verifyUser = async (username, password) => {
  let db = await connectDB();
  let user = await db.collection('users').findOne({name: username, password : hashString(password)});
  return user !== null ;  
};

export const updateTask = async task => {
  let { id, name, group, isComplete} = task;
  let db = await connectDB();
  let collection = db.collection('tasks');
  
  if(group){
    await collection.updateOne({id}, {$set:{group}});    
  }  
  
  if(name){
    await collection.updateOne({id}, {$set:{name}});    
  }
  
  if(isComplete !== undefined){
    await collection.updateOne({id}, {$set:{isComplete}});    
  }    
};

/*currently till date we don't have front UI to test so we are using spec which is a way to do that */
app.post('/task/new', async (req,res)=>{
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});

app.post('/task/update', async (req,res)=>{
  let task = req.body.task;
  await updateTask(task);
  res.status(200).send();
});

/*
app.post('/authenticate', async (req,res)=>{
  let userInfo = req.body.userInfo;
  let isVerified = await verifyUser(userInfo.username,userInfo.password);
  res.status(200).send(isVerified);
});
*/
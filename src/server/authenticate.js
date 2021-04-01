import { connectDB } from './connect-db';
import { hashString } from './hashUtility';
import { v4 as uuid } from 'uuid';

const authenticationTokens = [];

export const authenticationRoute = async (app) => {
  app.post('/authenticate', async (req,res)=>{
    let { username , password } = req.body;
    let user = await verifyUser(username);
    
    if(!user) {
      return res.status(500).send('User not found!');
    }
    
    let hashPassword = hashString(password);
    
    if(user.passwordHash !== hashPassword) {      
      return res.status(500).send('User credentials not valid!');
    }    
    
    let token = uuid();
    authenticationTokens.push({
      token,
      userID : user.id
    });
    let state = await getUserState(user);    
    res.send({token, state});
  });
};

const verifyUser = async (username) => {
  let db = await connectDB();
  let user = await db.collection('users').findOne({name: username});
  return user;  
};

const getUserState = async ( user ) => {
  let db = await connectDB();
  let tasks = await db.collection('tasks').find({ owner : user.id }).toArray();
  let groups = await db.collection('groups').find({ owner : user.id }).toArray();  
  return { 
           tasks,
           groups,
           session: {
             authenticated : 'AUTHENTICATED',
             id: user.id
           }
         };
};

import {
  take, put , select
} from 'redux-saga/effects';
import * as mutations from './mutations';
import { v4 as uuid} from 'uuid';
import axios from 'axios';
import { history } from './history';

const url = process.env.NODE_ENV === 'production' ? '' : "http://11.11.11.5:7070";
//const url = "http://localhost:7070";

export function* taskCreationSaga(){
  while (true) {
    //take will catch the dipatch b4 handling over to redux via put 
    const {groupID,owner} = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = owner;
    const taskID = uuid();
    //put send out(handling to redux)  action we have to the store. 
    yield put(mutations.createTask(taskID,groupID,ownerID))
    console.log('task id is ', taskID);
    const { res } = yield axios.post(url + '/task/new' ,{ 
        task:{
        id: taskID,
        owner: ownerID,
        group: groupID,
        isComplete : false,
        name : 'My saga new task2'
      }
    });   
 //   console.info('got new task', res);
  }
}

export function* taskModificaitonSaga(){
  while(true){
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE
    ]);
    axios.post( url + '/task/update',{
       task:{
        id: task.taskID,
        group: task.groupID,
        isComplete : task.isComplete,
        name : task.name
      }
    });
  }
}

export function* createAuthenticationSaga(){
  while(true){
    const {username,password} = yield take(
      mutations.REQUEST_AUTHENTICATE_USER);
      
    try{
      const { data } =  yield axios.post(url +'/authenticate',{
        username,
        password
      });
      
      if(!data) {
        throw new Error("Invalid username and password");
      }
     
      console.log('authenticated',data);     
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
     
    }catch(e){
      console.log("can't authenticate ",e.message);
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}
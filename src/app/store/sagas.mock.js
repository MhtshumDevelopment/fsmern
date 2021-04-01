import {
  take, put , select
} from 'redux-saga/effects';
import * as mutations from './mutations';
import { v4 as uuid} from 'uuid';

export function* taskCreationSaga(){
  while (true) {
    const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = 'U1';
    const taskID = uuid();
    //put send out action we have to the store. 
    yield put(mutations.createTask(taskID,groupID,ownerID))
    
    console.log('task id ', taskID)
    console.log('Got group id ', groupID);
  }
}
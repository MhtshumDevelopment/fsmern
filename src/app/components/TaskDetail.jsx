import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

export const TaskDetail = ({
  id,
  task,
  groups,
  comments,
  isComplete,
  setTaskName,  
  setTaskGroup,
  setTaskCompletion  
  }) => (
    <div key={id}>      
      <div>
        <input onChange={setTaskName} placeholder='Name...' value={task.name} />
      </div>  
      <div>
        <input placeholder='Enter comments...' value={comments} />
      </div>  
      <div>
        <button onClick={()=> setTaskCompletion(id,!isComplete)}> { isComplete ? 'Open' : 'Complete'}</button>
      </div>  
      <div>
        <select onChange={setTaskGroup} value={task.group}>
          { groups.map(g=>
             <option key={g.id} value={g.id}>{g.name}</option>
            )
           }
        </select>        
      </div>     
      <div>
        <Link to='/dashboard'>
          <button>Done</button>
        </Link>
      </div>
    </div>
  );

const mapStateToProps  = (state, ownProps) => {
  let groups = state.groups;
  let id = ownProps.match.params.id;
  let task = state.tasks.find(t=> t.id === id);  
  let isComplete =  task.isComplete;
  return {
    id,
    task,
    isComplete,
    groups    
  }  
}

const mapDispatchToProps  = (dispatch, ownProps) => {
  let id = ownProps.match.params.id;
  return {
    setTaskCompletion(id,isComplete){
      dispatch(mutations.setTaskComplete(id,isComplete));
    }, 
    setTaskGroup(e){
      dispatch(mutations.setTaskGroup(id,e.target.value));
    },
    setTaskName(e){
      dispatch(mutations.setTaskName(id,e.target.value));
    },
  }  
}
export const  ConnectedTaskDetail = connect(mapStateToProps,mapDispatchToProps)(TaskDetail);
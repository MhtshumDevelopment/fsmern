import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';
import { Link } from 'react-router-dom';

export const TaskList = ({tasks, name , id, owner, createNewTask}) => {
  return (
    <div key={id}>            
        { tasks.map (t =>           
          <Link key={t.id} to={`/task/${t.id}`}>
            <div>
            {t.name}
            </div>    
          </Link>          
          )
        }
      <button onClick={()=>createNewTask(id,owner)}>Add New</button>        
    </div>
  );
};

function mapStateToProps ( state, ownProps){
  let groupID = ownProps.id;  
  return {
    name: ownProps.name,
    id: groupID,        
    owner: state.session.id,
    tasks:state.tasks.filter(t=> t.group === groupID)  
   };
}

const mapsDispatchToProps = (dispatch,ownProps) => {
  return {
    createNewTask(id, owner){
      console.log(`from mapsDispatchToProps ${id}`);
      dispatch(requestTaskCreation(id, owner));
    }
  }  
};

export const  ConnectedTaskList = connect(mapStateToProps,mapsDispatchToProps)(TaskList);
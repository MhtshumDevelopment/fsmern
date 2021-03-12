import React from 'react';
import { connect } from 'react-redux';

export const TaskList = ({tasks}) => {
  return (
    <div>      
      {tasks.map(t => <div key={t.id}>{t.name}</div>)}
    </div>
  );
};

function mapStateToProps ( state, ownProps){
  let groupId = ownProps.id;
  return {
    name: ownProps.name,
    id: ownProps.id,    
    tasks:state.tasks.filter(t=> t.group === groupId)  
  };
}

export const  ConnectedTaskList = connect(mapStateToProps)(TaskList);
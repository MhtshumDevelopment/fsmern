import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList';

export const Dashboard = ({groups}) => {
  return (
  <div>
      <h2>Groups are : {groups.length}</h2>
      { groups.map(g => 
          <div key={g.id}>
            <h3>{g.name}</h3>
            <ConnectedTaskList key={g.id}  id={g.id} name={g.name} />
          </div>)}
    </div>
  );
};

function mapStateToProps ( {groups}){
  return { groups };
}

export const  ConnectedDashboard = connect(mapStateToProps)(Dashboard);
import { addNewTask, updateTask } from './server';
import { showCollection } from './test-db';


(async function callUpdate(){
  addNewTask({
    name : 'My task',
    id : 7777
  });

  showCollection('tasks',{ id : 7777});
  updateTask({
    name : 'task to update',
    id : 7777
  });
  
  updateTask({
    group : 'g1',
    id : 7777
  });
  
  updateTask({
    isComplete : true,
    id : 7777
  });
  showCollection('tasks',{ id : 7777});
})();

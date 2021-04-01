import { hashString } from './hashUtility';
/* remember session obj. can'nt, so when using first time for new db as it would be inserted bulk wise and that method expecting array not a single obj. then delete this one */
export const defaultState = {
  session:{
    authenticated : false  
  },
  users:[{
    id:"u1",
    name:"dev",
    passwordHash: hashString("Tuples")
  },
  {
    id:"u2",
    name:"ali",
    passwordHash: hashString("KaramAllahWajoh")
  },
  {
    id:"u3",
    name:"usman",
    passwordHash: hashString("Ghani")
  }],
  groups:[{
    id:"g1",
    name:"to do",
    owner:"u1"
  },
  {
    id:"g2",
    name:"doing",
    owner:"u2"
  },
  {
    id:"g3",
    name:"review",
    owner:"u3"
  },
  {
    id:"g4",
    name:"done",
    owner:"u1"
  }],
  tasks:[{
    id:"t1",
    name:"do tasks",
    group:"g1",
    owner:"u1",
    isComplete:false
  },
  {
    id:"t2",
    name:"chcking with devs",
    group:"g3",
    owner:"u1",
    isComplete:false
  },
  {
    id:"t3",
    name:"prepare meeting",
    group:"g4",
    owner:"u1",
    isComplete:true
  },
  {
    id:"t4",
    name:"generate code structures",
    group:"g1",
    owner:"u3",
    isComplete:false
  },
  {
    id:"t5",
    name:"review logic",
    group:"g3",
    owner:"u2",
    isComplete:true
  },
  {
    id:"t6",
    name:"Refactor code",
    group:"g2",
    owner:"u3",
    isComplete:false
  }],
  comments:[{
    id:"c1",
    task:"t1",
    owner:"u1",
    content:"Great Work!!"
  },
  {
    id:"c2",
    task:"t2",
    owner:"u2",
    content:"More ppl should help"
  },
  {
    id:"c3",
    task:"t5",
    owner:"u3",
    content:"too bad no communication"
  },
  {
    id:"c4",
    task:"t2",
    owner:"u3",
    content:"Good job"
  },
  {
    id:"c5",
    task:"t3",
    owner:"u2",
    content:"plz update"
  }]
};
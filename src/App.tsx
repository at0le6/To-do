import React,{useState,useRef} from 'react';

type FormElement=React.FormEvent<HTMLFormElement>
interface ITask {
  name: string;
  done: boolean;
}

function App():JSX.Element {
  const [Task, setTask] = useState<ITask[]>([])
  const [newTask,setNewTask]=useState<string>('')
  const taskInput=useRef<HTMLInputElement>(null)

  const handleSubmit=(e:FormElement)=>{
    e.preventDefault()
    addTaks(newTask)
    setNewTask('')
  }

  const addTaks=(name:string)=>{
    const newTasks:ITask[]=[...Task,{name,done:false}]
    setTask(newTasks) 
    taskInput.current?.focus()
  }

  const toggleDoneTask=(i:number):void=>{
    const newTasks:ITask[]=[...Task];
    newTasks[i].done= !newTasks[i].done;
    setTask(newTasks)
  }

  const removeTask=(i:number):void=>{
    const newTasks:ITask[]=[...Task]
    newTasks.splice(i,1)
    setTask(newTasks)
  }

  return (
    <div className='container p-4'>
      <div className="row">
        <div className="col-sm-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <input 
                type="text"
                value={newTask}
                onChange={e=>setNewTask(e.target.value)}
                autoFocus
                ref={taskInput}
                className='form-control'/> 
                <button className='btn btn-success mt-2' style={{width:"100%"}}>Save</button> 
            </form>
          </div>
        </div>
          {
          Task.map((t:ITask,i:number)=>{
            return <div className="card card-body mt-2" key={i}>
              <h2 style={{textDecoration: t.done?'line-through':''}}>{t.name}</h2>
              <div>
                <button className='btn btn-secondary' onClick={()=>toggleDoneTask(i)}>{t.done?'✅':'❌'}</button>
                <button className='btn btn-danger' onClick={()=>removeTask(i)}>🗑</button>
              </div>
            </div>
          })
        }
        </div>
      </div>
    </div>
  );
}

export default App;

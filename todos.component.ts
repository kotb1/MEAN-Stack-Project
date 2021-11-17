import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from 'src/app/models/Todo';
import { TaskService } from 'src/app/task.service';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  new_task:Todo=new Todo;
  inputTodo:string="";
  tasks:any[]=[];
  update_task:Todo=new Todo;
  removed_task:Todo=new Todo;
  user_id:string="";
  constructor(private taskservice:TaskService,private rout: ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.rout.params.subscribe((params: Params)=>{
      this.user_id = params[`userid`]
      console.log(this.user_id)
    })
    setTimeout(() => {
      for(let i =0;i<this.tasks.length;i++)
      {
        this.todos.push({
          content:this.tasks[i].title,
          completed:this.tasks[i].completed,
          _id:this.tasks[i]._id
        })
      }  
    }, 100);
    this.taskservice.getTasks(this.user_id).subscribe((tasks: any)=>{
      //console.log("el hamdulellah")
      this.tasks=tasks;
      //console.log(this.tasks[0])
      //console.log(this.tasks[0].title)
    })
  }
  toggleDone(id:number)
  {
    this.todos.map((v,i)=>
    {
      if(i==id)
      {
        v.completed=!v.completed;
        this.update_task = this.tasks[i];
        console.log(this.update_task._id);
        this.taskservice.complete(this.update_task,this.user_id).subscribe(()=>{
          console.log("tmm yaba")
        })
      }
      return v;
    })


  }
  deleteTodo(id:number)
  {
    this.todos = this.todos.filter((v,i) => i !==id);
    this.removed_task = this.tasks[id];
    this.taskservice.deleteTask(this.removed_task,this.user_id).subscribe((response: any)=>{
      //console.log(response);
    });
  }
  addTodo()
  {
    /*this.new_task.content = this.inputTodo;
    this.new_task.completed = false;*/
    this.todos.push({
      content:this.inputTodo,
      completed:false,
      _id:""
    })
    this.taskservice.createList(this.inputTodo,this.user_id).subscribe((response: any)=>{
      console.log(response);
    });
    this.inputTodo = "";
    //this.ngOnInit();
  }
  log_out()
  {
    //this.route.navigate(['http:/localhost:4200/login'])
    this.route.navigateByUrl(`/login`)
  }
}
//*ngFor="let todo of todos; let i = index;" <div class="id">{{ i }}</div>
    //; let i = index;"class="task {{(task.completed ?'done':'')}}"
    //<div class="content"(click)="toggleDone(i)">{{task.title}}</div>
    //<button class="delete"(click)="deleteTodo(i)">Remove</button>
    /*for(let i=0;i<3;i++)
    {
      this.todos=
    [{ content:this.tasks[i].title,completed: false}]
    }*/
    
    /*this.todos=
    [
      {
        content:'First todo',
        completed: true
      },
      {
        content:'Second todo',
        completed: false
      }
    ]*/
    /*this.taskservice.getTasks().subscribe((list: any)=>{
      console.log("el hamdulellah")
    })*/
    //this.tasks=this.taskservice.getTasks().subscribe();
    //this.inputTodo2=JSON. stringify(this.tasks[2]?.title);
import { Injectable } from '@angular/core';
import { Todo } from './models/Todo';
import { WebRequestService } from './web-request.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) {}
  createList(title: string,userid:string) {
    // We want to send a web request to create a list
    return this.webReqService.post(`tasks/${userid}`, { title });
  }
  getTasks(userid:string){
    return this.webReqService.get(`tasks/${userid}`);
  }
  deleteTask(task:Todo,userid:string){
    //console.log(id);
    return this.webReqService.delete(`tasks/${userid}/${task._id}`);
  }
  complete(task:Todo,userid:string)
  {
    return this.webReqService.patch(`tasks/${userid}/${task._id}`,{
      completed : !task.completed
    })
  }
  
}


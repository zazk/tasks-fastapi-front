import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskElementComponent } from '../task-element/task-element.component';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskElementComponent,
    ReactiveFormsModule], 
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  @Input() tasks: Task[] = []
  taskService = inject(TaskService);
  userService = inject(UserService);
  tasks$: Observable<Array<Task>> = new Observable();
  users$: Observable<Array<User>> = new Observable();
  
  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    user_id: new FormControl(0)
  });

  //Using the constructor instead of the ng lifecycle
  constructor() {
    this.getAllTasks();
    this.getAllUsers();
  }
  
  getAllTasks(){
    this.tasks$ = this.taskService.getAll()
  }

  getAllUsers(){
    this.users$ = this.userService.getAll()
  }

  submitTask(){
    console.log("SUBIMIT",this.taskForm.value )
    const task = new Task(this.taskForm.value);
    console.log("FORM", task)
    this.taskService.create(task).subscribe()
  }

}

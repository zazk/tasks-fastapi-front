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
    id: new FormControl(),
    title: new FormControl(''),
    description: new FormControl(''),
    user_id: new FormControl(0)
  });

  //Using the constructor instead of the ng lifecycle
  constructor() {
    this.getAllTasks();
    this.getAllUsers();
  }
  
  get taskFormIdValue () {
    return this.taskForm.get('id')?.getRawValue()
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
    if (this.taskFormIdValue) {
      this.taskService.update(task.id, task).subscribe((r) => this.getAllTasks())
    } else {
      this.taskService.create(task).subscribe((r) => this.getAllTasks())
    }

    this.taskForm.reset()
    this.taskForm.patchValue({ user_id : 0 })
  }

  handleUpdateTaskStatus(task: Task) {
    this.taskService.update(task.id, { id: task.id, title: task.title, description: task.description, user_id: task.user_id, status: false }).subscribe((r) => this.getAllTasks())
  }

  handleDeleteTask(taskId: number) {
    this.taskService.delete(taskId).subscribe((r) => this.getAllTasks())
  }

  handleEditTask(task: Task) {
    window.scroll(0, 0)
    this.taskForm.patchValue({
      id: task.id,
      title: task.title,
      description: task.description,
      user_id: task.user_id
    })
  }
}

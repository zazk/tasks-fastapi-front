import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-task-element',
  standalone: true,
  imports: [],
  templateUrl: './task-element.component.html',
  styleUrl: './task-element.component.scss'
})
export class TaskElementComponent {
  @Input() task: Task = new Task();
  @Input() users: User[] | null = [] ;
}

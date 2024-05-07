import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-task-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-element.component.html',
  styleUrl: './task-element.component.scss'
})
export class TaskElementComponent {
  @Input() task: Task = new Task();
  @Input() users: User[] | null = [] ;
  @Output() onEditTask = new EventEmitter<Task>();
  @Output() onUpdateStatus = new EventEmitter<Task>();
  @Output() onDeleteTask = new EventEmitter<number>();

  get userName(): string|undefined {
    return this.users?.find(u => u.id === this.task.user_id)?.fullname
  }
}

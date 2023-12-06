import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

export interface TaskItem {
  id: number;
  name:string;
  taskDescription: string;
  taskPriority: string;
}
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  imports: [CommonModule,FormsModule,ReactiveFormsModule
  ],
  standalone: true,
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  public ListForm: FormGroup;
  public taskList: TaskItem[] = [];
  public taskPriorityList: string[] = ['high', 'low', 'medium '];
  public editData: TaskItem | null = null;
  newlyAddedTasks: TaskItem[] = [];

  constructor(private FormBuilder: FormBuilder) {
    this.ListForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.FormBuilder.group({
      id: [''],
      name:[''],
      taskDescription: ['', [Validators.required]],
      taskPriority: [null, [Validators.required]]
    });
  }

  saveTask(): void {
    if (!this.ListForm.controls['id'].value) {
      this.ListForm.controls['id'].setValue(this.taskList.length + 1);
      this.ListForm.controls['name'].setValue(this.ListForm.get('name')!.value);
      this.ListForm.controls['taskDescription'].setValue(this.ListForm.get('taskDescription')!.value);

      const newTask= this.ListForm.value;
      this.taskList.push(newTask);
      this.newlyAddedTasks.push(newTask);
      console.log(this.taskList);
    } else {
      const taskIndex: number = this.taskList.findIndex(item => item.id === this.editData?.id);
      if (taskIndex !== -1) {
        this.taskList[taskIndex].id = this.ListForm.value.id;
        this.taskList[taskIndex].taskDescription = this.ListForm.value.taskDescription;
        this.taskList[taskIndex].taskPriority = this.ListForm.value.taskPriority;
        this.taskList[taskIndex].name = this.ListForm.value.name;

        this.editData = null;
      }
    }
    this.ListForm.reset();
  }
  editTask(editTaskData: TaskItem): void {
    this.editData = editTaskData;
    this.ListForm.setValue({
      id: editTaskData.id,
      name: editTaskData.name || '',
      taskDescription: editTaskData.taskDescription || '',
      taskPriority: editTaskData.taskPriority || null,
    });
  }

  deleteTask(deleteTaskId: number): void {
    const taskIndex = this.taskList.findIndex(item => item.id === deleteTaskId);

    if (taskIndex !== -1) {
      this.taskList.splice(taskIndex, 1);
    }
  }

}

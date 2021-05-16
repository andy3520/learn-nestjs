import { v1 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { title } from 'process';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  async getAllTask(): Promise<Task[]> {
    return this.tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  async getTaskById(id: string): Promise<Task> {
    return this.tasks.find((task) => task.id === id);
  }

  async deleteTask(id: string): Promise<Task> {
    const deleteTask = await this.getTaskById(id);

    if (deleteTask) {
      this.tasks = this.tasks.filter(({ id }) => id !== deleteTask.id);
    }

    return deleteTask;
  }
}

// import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils'
 import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
 import * as uuid from 'uuid'
import { APIGatewayProxyEvent } from 'aws-lambda';
import { getUserId } from '../lambda/utils';
import { TodoItem } from '../models/TodoItem';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import { TodoUpdate } from '../models/TodoUpdate';
// import * as createError from 'http-errors'



// // TODO: Implement businessLogic

export function todoBuilder(
  todoRequest:CreateTodoRequest, 
  event:APIGatewayProxyEvent): TodoItem
  {
    const todoID = uuid.v4()
    const todo = {
      todoId: todoID,
      userId: getUserId(event),
      createdAt: new Date().toISOString(),
      done: false,
      attachmentUrl: '',
      ...todoRequest
    }
    return todo as TodoItem;
}

export function updateTodoBuilder (updateTodoData: UpdateTodoRequest, todoId: string): TodoUpdate | false {
  if ((updateTodoData.name.length <= 0) || (todoId.length <= 0)) {
    return false
  } else {
    console.log(todoId)
    console.log(updateTodoData)
  }
}
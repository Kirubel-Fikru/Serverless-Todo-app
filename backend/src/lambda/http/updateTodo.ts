import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

//import { updateTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
//import { getUserId } from '../utils'
import { getTodoById, updateTodo } from '../../helpers/todosAcess'
import { updateTodoBuilder } from '../../helpers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    const todo = updateTodoBuilder(updatedTodo, todoId)
    if (!todo) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          item: null
        })
      }
    } else {
      console.log(updatedTodo)
    }
    
    const oldTodo = await getTodoById(todoId)

    await updateTodo(oldTodo, todo)

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: todo
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )

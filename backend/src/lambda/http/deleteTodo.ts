import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

//import { deleteTodo } from '../../businessLogic/todos'
//import { getUserId } from '../utils'
import { deleteTodo, getTodoById } from '../../helpers/todosAcess'



export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId

    const todo = await getTodoById(todoId)
    await deleteTodo(todo)
    return {
      statusCode: 200,
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

import {Picker} from 'meteor/meteorhacks:picker'
import AWS from 'aws-sdk'
AWS.config.region = 'us-east-1'

const lambda = new AWS.Lambda()

Picker.route('/graphql', async function(params, request, response) {
  if (request.method !== 'POST') return
  const event = {
    method: 'POST',
    httpMethod: 'POST',
    headers: request.headers,
    path: request.originalUrl,
    requestContext: {
      identity: {
        userAgent: request.headers['user-agent'],
        sourceIp: request.connection.remoteAddress
      }
    },
    body: JSON.stringify(request.body)
  }
  try {
    const call = await lambda
      .invoke({
        FunctionName: 'serverless-graphql-development-graphqltest',
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify(event, null, 2)
      })
      .promise()
    const serverlessResponse = JSON.parse(call.Payload)
    console.log(serverlessResponse.body)
    response.writeHead(serverlessResponse.statusCode, serverlessResponse.headers)
    response.end(serverlessResponse.body)
  } catch (error) {
    console.log('Error:', error)
  }
  response.end('Hello World')
})

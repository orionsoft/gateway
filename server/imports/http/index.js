import {Picker} from 'meteor/meteorhacks:picker'
import bodyParser from 'body-parser'
import cors from 'cors'
import './graphql'
import './clientVersion'

Picker.middleware(cors())
Picker.middleware(
  bodyParser.json({
    verify(request, response, buffer) {
      request.rawBody = buffer
    }
  })
)

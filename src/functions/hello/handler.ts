import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { prettifyResponse } from '@libs/response-helper'

import schema from './schema'

async function getHello(event) {
    const { queryStringParameters: req } = event
    const { body: unformatted_body, statusCode } = formatJSONResponse({
        message: `Hello ${
            req.name || 'anonymous'
        }, welcome to the exciting Serverless world!`,
        req,
    })
    return { body: prettifyResponse(unformatted_body), statusCode }
}
const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event,
) => {
    switch (event.httpMethod) {
        case 'GET':
            return getHello(event)

        default:
            return formatJSONResponse({
                message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
                event,
            })
    }
}

export const main = middyfy(hello)

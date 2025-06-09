import { request, expect, test } from "@playwright/test";
import { logger, post, prettyPrint } from "../../utils/apiHelper";
import { GROCERY } from "../../config/config";
import { GROCERY_URL } from "../../global-constants";


    test('POST / Get the authentication token', async ({ request}) => {
        let userRegister = {
            "clientName": "khanhleduy",
            "clientEmail": "khanhduide@gmail.com"
        }
        let response = await request.post( ` ${ GROCERY_URL}${GROCERY.register}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: 
                JSON.stringify(userRegister)
            }
        )
        let responseBody = await response.json();
        console.log('Response:' + responseBody)

        logger.log('Status of request')
        expect(response.status()).toBe(201)

    })

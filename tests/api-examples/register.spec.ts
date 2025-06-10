import {test, expect, request} from '@playwright/test'
import { GROCERY_URL, USER } from '../../global-constants'
import { GROCERY } from '../../config/config'
import { TextContext } from '../../utils/textContext'
import { prettyPrint } from '../../utils/apiHelper'

test('Post - Register account', async ( {request}) => {
    let responseRegister = await request.post( ` ${ GROCERY_URL}${GROCERY.register}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: 
            JSON.stringify(USER)
        }
    )

    let responseRegisterBody = await responseRegister.json();
    let accessToken = responseRegisterBody.accessToken
    TextContext.token = accessToken

    prettyPrint("AccessToken: " , accessToken)

})
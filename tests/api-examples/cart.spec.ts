import { test, expect, request} from '@playwright/test'
import { get, logger, post, prettyPrint } from '../../utils/apiHelper'
import { GROCERY_URL } from '../../global-constants'
import { GROCERY } from '../../config/config'
import { TextContext } from '../../utils/textContext'

test('Post / Create a new item', async ({ request}) => {
    let response = await request.post(`${ GROCERY_URL + GROCERY.carts}`)
    const responseBody = await response.json()

    prettyPrint('ResponseBody: ',responseBody)
    let cartId = responseBody.cartId 
    TextContext.cartId = cartId
    prettyPrint('CartId: ', TextContext.cartId)

    // expect 
    expect(response.status()).toBe(201)
    
})
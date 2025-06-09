import {test, expect, request, Response} from '@playwright/test'
import { GROCERY_URL } from '../../global-constants'
import { GROCERY } from '../../config/config'
import { get, prettyPrint, logger } from '../../utils/apiHelper'
import { TextContext } from '../../utils/textContext'

test(' Get / product of grocery', async ({request}) => {
    logger.log('Running API.......')

    let listProduct = await get(request, `${GROCERY_URL + GROCERY.product} `)
    let user = await get( request, `${GROCERY_URL + GROCERY.productById + '1225'} `)
    
})

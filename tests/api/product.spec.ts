import {test, expect, request} from '@playwright/test'
import { get } from '../../utils/apiHelper'
import { GROCERY_URL } from '../../global-constants'

test('Get / get the status', async ({request}) => {
    let response = await get(request, GROCERY_URL);
    
    expect(response.message).toContain('Simple Grocery Store API.')
})
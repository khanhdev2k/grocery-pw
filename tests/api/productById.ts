import {request} from '@playwright/test'
import { GROCERY_URL } from '../../global-constants'
import { GROCERY } from '../../config/config'

export class ProductByID {
    async getProductById(request: any, productId: any) {
        const response = await request.get( `${GROCERY_URL}${GROCERY.productById}${productId}` , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return response
    }
}
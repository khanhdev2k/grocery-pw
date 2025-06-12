import { GROCERY } from "../../config/config";
import { GROCERY_URL } from "../../global-constants";

export class ReplaceItem {
    async replace(request: any, cartId: any, itemId: any, data: any) {
        let response = await request.put( `${GROCERY_URL}${GROCERY.carts}/${cartId}/items/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: JSON.stringify(data)
        })
        return response;
    }

    async modify(request: any, cartId: string, itemId: string, data: any) {
        let response = await request.post( `${GROCERY_URL}${GROCERY.carts}/${cartId}/items/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: JSON.stringify(data)
        })
        return response;
    }
}
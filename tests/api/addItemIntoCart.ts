import { GROCERY } from "../../config/config";
import { GROCERY_URL } from "../../global-constants";

export class AddItemsIntoCart {
    async addItem( request: any, cartId: any, data: any) {
        let response = await request.post( `${GROCERY_URL}${GROCERY.carts}/${cartId}/items`, 
            {
                headers: 
                    {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                data: JSON.stringify(data)
            }
        )
        return response;
    }

    async getCart(request: any, cartId: any) {
        let response = await request.get( `${GROCERY_URL}${GROCERY.carts}/${cartId}/items`, 
            {
                headers: 
                    {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
            }
        )
        return response;
    }
}
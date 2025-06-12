import { GROCERY } from "../../config/config";
import { GROCERY_URL } from "../../global-constants";

export class CreateNewCart {
    async create(request: any) {
        let response = await request.post( `${GROCERY_URL}${GROCERY.carts}`, {
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return response;
    }
}
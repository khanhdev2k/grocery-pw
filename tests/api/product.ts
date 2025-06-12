import { request } from "@playwright/test";
import { GROCERY_URL } from "../../global-constants";
import { GROCERY } from "../../config/config";

export class ProductList {
    async getProductList(request: any) {
        const response = await request.get( `${GROCERY_URL}${GROCERY.product}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return response;
    }
}
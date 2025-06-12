import { request } from "@playwright/test";
import { GROCERY_URL, USER } from "../../global-constants";
import { GROCERY } from "../../config/config";

export class RegisterAccount {
  async register(request: any, data: any) {
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
    return responseRegister
  }
}
import { test, expect, request } from '@playwright/test'
import { RegisterAccount } from '../api/auth'
import { bypassLogic, logger, prettyPrint } from '../../utils/apiHelper';
import { USER } from '../../global-constants';
import { TextContext } from '../../utils/textContext';
import { ProductList } from '../api/product';
import { ProductByID } from '../api/productById';
import { CreateNewCart } from '../api/createNewCart';
import { AddItemsIntoCart } from '../api/addItemIntoCart';

test("Flow user buy one item in the grocery", async ({ request }) => {
    let accessToken: string;
    let listProductItem: any;
  
    await test.step("TC_001 - User registers successfully...", async () => {
        const registerNewUser = new RegisterAccount();
      
        logger.log("Start register new user in The Grocery store");
        const response = await registerNewUser.register(request, USER);
        const responseBody = await response.json();
      
        const status = response.status();
        // bypassLogic(status, 409, '"User already exists — skipping token assignment"')
        if (status === 409) {
            logger.log("User already exists — skipping token assignment");
            return; // This only exits the current step, doesn't "skip" formally
          }
      
        accessToken = responseBody.accessToken;
        TextContext.token = accessToken;

        expect(status).toBe(201);
        prettyPrint("Access Token", accessToken);
      });
  
    await test.step("Get all products", async () => {
      const productList = new ProductList();
  
      logger.log("Get the list of items in the Grocery store");
      const response = await productList.getProductList(request);
      listProductItem = await response.json();
  
      expect(response.status()).toBe(200);
    });
  
    await test.step("Get product details by ID", async () => {
      const productById = new ProductByID();
  
      logger.log("Get info about a specific product by ID");
      const productId = listProductItem[1].id;
      const response = await productById.getProductById(request, productId);
      const responseBody = await response.json();
  
      expect(response.status()).toBe(200);

      TextContext.prodId = productId;
      prettyPrint("Product ID", TextContext.prodId);
    });

    await test.step("Create the new cart without accessToken", async ( ) => {
        const createCart = new CreateNewCart();

        logger.log('Create new cart');
        let response = await createCart.create( request );
        let responseBody = await response.json();

        expect(response.status()).toBe(201)
        expect(responseBody.created).toBe(true)
        
        TextContext.cartId = responseBody.cartId
        prettyPrint('ResponseBody create new Cart', responseBody)
        prettyPrint('CartId: ', TextContext.cartId)
    })

    await test.step("Add item into cart", async () => {
        let addItemToCart = new AddItemsIntoCart();
        let item = {
            "productId": `${TextContext.prodId}`,
            "quantify": 4
        }

        logger.log('Add the item and quantify into the cart')
        let response = await addItemToCart.addItem( request, TextContext.cartId, item)
        let responseBody = await response.json();

        expect(response.status()).toBe(201)
    })

});
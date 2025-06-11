import { test, expect, request } from '@playwright/test'
import { RegisterAccount } from '../api/auth'
import { logger, prettyPrint } from '../../utils/apiHelper';
import { USER } from '../../global-constants';
import { TextContext } from '../../utils/textContext';
import { ProductList } from '../api/product';
import { ProductByID } from '../api/productById';

test("Flow user buy one item in the grocery", async ({ request }) => {
    let accessToken: string;
    let listProductItem: any;
  
    // await test.step("TC_001 - User registers successfully and gets access token", async () => {
    //   const registerNewUser = new RegisterAccount();
  
    //   logger.log("Start register new user in The Grocery store");
    //   const response = await registerNewUser.register(request, USER);
    //   const responseBody = await response.json();
    //   accessToken = responseBody.accessToken;
  
    //   // Save token for reuse in this test
    //   TextContext.token = accessToken;
  
    //   expect(response.status()).toBe(201);
    //   prettyPrint("Access Token", accessToken);
    // });
  
    await test.step("TC_002 - Get all products", async () => {
      const productList = new ProductList();
  
      logger.log("Get the list of items in the Grocery store");
      const response = await productList.getProductList(request);
      listProductItem = await response.json();
  
      expect(response.status()).toBe(200);
    });
  
    await test.step("TC_003 - Get product details by ID", async () => {
      const productById = new ProductByID();
  
      logger.log("Get info about a specific product by ID");
      const productId = listProductItem[1].id;
      const response = await productById.getProductById(request, productId);
      const responseBody = await response.json();
  
      expect(response.status()).toBe(200);
      prettyPrint("Product ID", productId);
    });
  });
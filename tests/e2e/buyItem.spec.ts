import { test, expect, request } from '@playwright/test'
import { RegisterAccount } from '../api/auth'
import { USER } from '../../global-constants';
import { TextContext } from '../../utils/textContext';
import { ProductList } from '../api/product';
import { ProductByID } from '../api/productById';
import { CreateNewCart } from '../api/createNewCart';
import { AddItemsIntoCart } from '../api/addItemIntoCart';
import { ReplaceItem } from '../api/cartItems';
import { logger, prettyPrint } from '../../utils/logger';

test("User buys one item in The Grocery Store", async ({ request }) => {

    await test.step("Register new user", async () => {
      const register = new RegisterAccount();
      const response = await register.register(request, USER);
  
      if (response.status() === 409) {
        logger.log("User already exists — skipping token assignment");
        return;
      } 
  
      const responseBody = await response.json();
      TextContext.token = responseBody.accessToken;
  
      expect(response.status()).toBe(201);
      prettyPrint("Access Token", TextContext.token);
    });
  

    await test.step("Get all products", async () => {
      const productList = new ProductList();
      const response = await productList.getProductList(request);
      TextContext.productList = await response.json();
  
      expect(response.status()).toBe(200);
    });
  

    await test.step("Select product by ID", async () => {
      const productById = new ProductByID();
      const productId = TextContext.productList[1].id;
  
      const response = await productById.getProductById(request, productId);
      expect(response.status()).toBe(200);
  
      TextContext.prodId = productId;
      prettyPrint("Product ID", productId);
    });
  

    await test.step("Create new cart", async () => {
      const createCart = new CreateNewCart();
      const response = await createCart.create(request);
      const responseBody = await response.json();
  
      expect(response.status()).toBe(201);
      expect(responseBody.created).toBe(true);
  
      TextContext.cartId = responseBody.cartId;
      prettyPrint("Cart ID", TextContext.cartId);
    });
  
    // Step 5: Add item to cart
    await test.step("Add item to cart", async () => {
      const addItem = new AddItemsIntoCart();
      const item = {
        productId: TextContext.prodId,
        quantify: 4
      };
  
      const response = await addItem.addItem(request, TextContext.cartId, item);
      expect(response.status()).toBe(201);
  
      const cartResponse = await addItem.getCart(request, TextContext.cartId);
      const cartBody = await cartResponse.json();
  
      TextContext.itemId = cartBody.id;
    });
  
    await test.step("Update item quantity in cart", async () => {
      const replaceItem = new ReplaceItem();
      const replaceData = {
        productId: TextContext.prodId,
        quantify: "10"
      };
  
      const response = await replaceItem.replace(request, TextContext.cartId, TextContext.itemId, replaceData);
      expect(response.status()).toBe(204);
  
      const responseBody = await response.json();
      prettyPrint("Updated Cart Item", responseBody);
    });
  });
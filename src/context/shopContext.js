import { useState, useEffect, createContext } from 'react'
import Client from 'shopify-buy'

export const ShopContext = createContext()

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

const ShopProvider = ({ children }) => {
  const [product, setProduct] = useState({})
  const [products, setProducts] = useState([])
  const [checkout, setCheckout] = useState({})
  const [shop, setShop] = useState({})
  const [cartCount, setCartCount] = useState(0)

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const createCheckout = async () => {
    // Create an empty checkout
    const checkoutResp = await client.checkout.create()
    console.log('checkout: ', checkoutResp)

    localStorage.setItem('checkoutId', checkoutResp.id)
    setCheckout(checkoutResp)
  }

  const fetchCheckout = async (checkoutId) => {
    const checkout = await client.checkout.fetch(checkoutId)
    setCheckout(checkout)
  }

  // fetch all products in the shop
  const fetchAllProducts = async () => {
    const products = await client.product.fetchAll()
    setProducts(products)
  }

  const createShop = async () => {
    const shopResp = await client.shop.fetchInfo()
    setShop(shopResp)
  }
  
  useEffect(() => {
    const checkoutId = localStorage.getItem('checkoutId')
    if (checkoutId) {
      fetchCheckout(checkoutId)
    } else {
      createCheckout()
    }

    createShop()
		fetchAllProducts()
  }, [])

  const addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10)
      }
    ];

    const checkoutResp = await client.checkout.addLineItems(checkout.id, lineItemsToAdd)
    setCheckout(checkoutResp)
  }

  // Updates quantity of line items in cart and in checkout state
  const updateQuantityInCart = async (lineItemId, quantity, checkoutId) => {
    const lineItemsToUpdate = [
      { id: lineItemId, quantity: parseInt(quantity, 10) },
    ]

    const checkoutResp = await client.checkout.updateLineItems(
      checkoutId,
      lineItemsToUpdate
    )

    setCheckout(checkoutResp)
	}

  const removeLineItem = async (lineItemIdsToRemove) => {
    const checkoutResp = await client.checkout.removeLineItems(checkout.id, lineItemIdsToRemove)
    setCheckout(checkoutResp)
  }

  // handle is the name of product compatable with link
  const fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle)
    setProduct(product)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  const setCount = (count) => {
    setCartCount(count)
  }
  
  return (
    <ShopContext.Provider value={{
      product,
      products,
      checkout,
      isCartOpen,
      isMenuOpen,
      cartCount,
      shop,

      addVariant: addItemToCheckout,
      fetchProductByHandle: fetchProductWithHandle,
      updateQuantity: updateQuantityInCart,
      removeLineItem,
      closeCart,
      openCart,
      closeMenu,
      openMenu,
      setCount,
    }}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopProvider

// https://www.npmjs.com/package/shopify-buy#initializing-the-client

// package: shopify-buy
// It's based on Shopify's Storefront API 
// and provides the ability to retrieve products and collections 
// from your shop, add products to a cart, and checkout.


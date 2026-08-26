import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'elenx_cart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedPlanIndex, currency) => {
    const plan = product.pricing[selectedPlanIndex];
    const price = currency === 'INR' ? plan.inr : plan.usd;
    const symbol = currency === 'INR' ? '₹' : '$';

    // Check if same product with same plan already exists
    const existingIndex = cartItems.findIndex(
      item => item.productId === product.id && item.planId === plan.id
    );

    if (existingIndex >= 0) {
      // Already in cart, don't add duplicate
      console.log('[CartContext] Item already in cart:', product.name, plan.label);
      return false; // indicates duplicate
    }

    const cartItem = {
      productId: product.id,
      name: product.name,
      slug: product.slug,
      isPremium: product.isPremium,
      planId: plan.id,
      planLabel: plan.label,
      price,
      priceUsd: plan.usd,
      priceInr: plan.inr,
      currency,
      symbol,
      addedAt: new Date().toISOString(),
    };

    setCartItems(prev => [...prev, cartItem]);
    console.log('[CartContext] Added to cart:', cartItem);
    return true; // indicates success
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.length;

  const getCartTotal = (currency = 'INR') => {
    return cartItems.reduce((total, item) => {
      return total + (currency === 'INR' ? item.priceInr : item.priceUsd);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

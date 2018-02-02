<template>
  <div>
    <template v-for="cartItem in productsInCart">
      <product
        :product="cartItem.product" 
        :key="cartItem.product.id"
        :addToCart="addToCart"
        :removeFromCart="removeFromCart"
        :quantityInCart="quantityInCart(cartItem.product)"
      />
    </template>
  </div>
</template>

<script>
import Product from './Product';

export default {
  name: 'cart',
  components: {
    product: Product,
  },
  props: {
    productsInCart: Array,
    addToCart: Function,
    removeFromCart: Function,
    quantityInCart: Function,
  },
};
</script>

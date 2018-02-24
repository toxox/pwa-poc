<template>
  <div v-if="isCartEmpty">
    <p class="text-xs-center empty-cart">Nothing to see here yet</p>
  </div>
  <div v-else>
    <template v-for="cartItem in productsInCart">
      <product
        :product="cartItem.product" 
        :key="cartItem.product.id"
        :addToCart="addToCart"
        :removeFromCart="removeFromCart"
        :quantityInCart="quantityInCart(cartItem.product)"
        cartView
      />
    </template>
    <div class="text-xs-left total">Total: ${{total}}</div>
    <v-btn color="info" style="width: 100%" dark large>Place Order!</v-btn>
  </div>
</template>

<script>
import Product from './Product';

export default {
  name: 'cart',
  components: {
    product: Product,
  },
  computed: {
    isCartEmpty() {
      if (!this.productsInCart) return true;
      return this.productsInCart.length === 0;
    },
  },
  props: {
    productsInCart: Array,
    addToCart: Function,
    removeFromCart: Function,
    quantityInCart: Function,
    total: Number,
  },
};
</script>

<style scoped>
  .empty-cart {
    color: #686868;
    margin-top: 100px;
  }
  .total {
    margin: 10px 0 5px 10px;
  }
</style>


<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      clipped
      app
      right
      v-model="isCartVisible"
    >
      <cart 
        :productsInCart="cart" 
        :addToCart="addToCart"
        :removeFromCart="removeFromCart"
        :quantityInCart="quantityInCart" 
      />
    </v-navigation-drawer>

    <v-toolbar
      color="amber darken-3"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <span class="hidden-xs-only">Cool Food</span>
      </v-toolbar-title>
      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn @click.stop="isCartVisible = !isCartVisible" icon>
          <v-badge overlay left>
            <span slot="badge">{{calculateTotalProducts(cart)}}</span>
          <v-icon >shopping_cart</v-icon>
          </v-badge>
        </v-btn>
        
      </div>
    </v-toolbar>
    <v-content>
      <v-container v-if="isLoading" fill-height justify-center>
        <v-progress-circular :indeterminate="true" color="amber darken-3" />
      </v-container>
      <v-container v-else fluid grid-list-md>
        <v-layout row wrap>
          <product
            v-for="product in products"
            :product="product" 
            :key="product.id"
            :addToCart="addToCart"
            :removeFromCart="removeFromCart"
            :quantityInCart="quantityInCart(product)"
          />
        </v-layout>

        <p v-for="cartItem in cart" :key="cartItem.product.id">
          {{cartItem.product.name}} -- {{cartItem.quantity}}
        </p>
        <p>Price: {{calculatePrice(cart)}}</p>
        <v-fab-transition>
           <v-btn fab dark color="blue" class="order-float" v-show="!isCartVisible" >
             <v-icon dark>done</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import getAllProducts from './services/products';
import Product from './components/Product';
import Cart from './components/Cart';

export default {
  components: {
    product: Product,
    cart: Cart,
  },
  data: () => ({
    products: [],
    isLoading: false,
    cart: [],
    isCartVisible: false,
  }),
  mounted() {
    this.isLoading = true;
    getAllProducts().then(({ data }) => {
      this.isLoading = false;
      this.products = data;
    });
  },
  methods: {
    findProductIndex(product) {
      return this.cart.findIndex(cartItem => cartItem.product.id === product.id);
    },
    addToCart(product) {
      const cartIndex = this.findProductIndex(product);
      if (cartIndex === -1) {
        this.cart.push({
          product,
          quantity: 1,
        });
        return;
      }
      this.cart[cartIndex].quantity += 1;
    },
    removeFromCart(product) {
      const cartIndex = this.findProductIndex(product);
      if (cartIndex === -1) return;

      if (this.cart[cartIndex].quantity === 1) {
        this.cart.splice(cartIndex, 1);
        return;
      }

      this.cart[cartIndex].quantity -= 1;
    },
    quantityInCart(product) {
      const cartIndex = this.findProductIndex(product);
      return cartIndex === -1 ? 0 : this.cart[cartIndex].quantity;
    },
    calculatePrice(cart) {
      return cart.reduce(
        (total, cartItem) => total + (cartItem.product.price * cartItem.quantity),
        0);
    },
    calculateTotalProducts(cart) {
      return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    },
  },
};
</script>

<style scoped>
  .order-float {
    position: fixed;
    right: 10px;
    bottom: 35px;
  }
</style>


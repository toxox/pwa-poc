<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      clipped
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group :key="i" v-else-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile :key="i" v-else>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="amber darken-3"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">Cool Food</span>
      </v-toolbar-title>
      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon>
          <v-icon>notifications</v-icon>
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
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import getAllProducts from './services/products';
import Product from './components/Product';

export default {
  components: {
    product: Product,
  },
  data: () => ({
    drawer: false,
    products: [],
    isLoading: false,
    items: [
      { icon: 'contacts', text: 'Contacts' },
      { icon: 'history', text: 'Frequently contacted' },
      { icon: 'content_copy', text: 'Duplicates' },
    ],
    cart: [],
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
        this.cart.splice(cartIndex);
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
  },
};
</script>

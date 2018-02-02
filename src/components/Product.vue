<template>
  <v-flex xs12 sm6 md3 lg3>
    <v-card>
      <v-card-media :src="product.image" height="150px" />
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{product.name}}</h3>
          <h4 class="subheading">${{product.price}}</h4>
        </div>
      </v-card-title>
      <v-card-actions class="zeroInCart" v-if="quantityInCart === 0">
        <div v-if="quantityInCart === 0">
          <v-btn @click="addToCart(product)" color="orange">Add to Cart</v-btn>
        </div>
      </v-card-actions>

      <v-card-actions class="atLeastOneInCart" v-else>
        <div v-if="quantityInCart === 0">
          <v-btn @click="addToCart(product)" color="orange">Add to Cart</v-btn>
        </div>
        <template v-else>
          <v-btn @click="removeFromCart(product)" color="orange">-</v-btn>
          <div class="quantity">{{quantityInCart}}</div>
          <v-btn @click="addToCart(product)" color="orange">+</v-btn>
        </template>
      </v-card-actions>
    </v-card>
</v-flex>
</template>

<script>
export default {
  name: 'product',
  props: {
    product: Object,
    addToCart: Function,
    removeFromCart: Function,
    quantityInCart: Number,
  },
};
</script>

<style scoped>
  .zeroInCart {
    display: flex;
    justify-content: center;
  }
  
  .atLeastOneInCart {
    display: flex;
    justify-content: space-between;
  }

  .quantity {
    font-weight: bold;
  }
</style>


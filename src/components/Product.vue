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
      <v-card-actions>
        <v-btn color="orange">Add to Cart</v-btn>
      </v-card-actions>
    </v-card>
</v-flex>
</template>

<script>
export default {
  name: 'product',
  props: {
    product: Object,
  },
};
</script>

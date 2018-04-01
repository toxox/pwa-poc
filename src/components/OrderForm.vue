<template>
  <v-card>
    <v-card-title
      class="grey lighten-4 py-4 title"
    >
      Place order
    </v-card-title>
    <v-container grid-list-sm class="pa-4">
      <v-form ref="form" row wrap lazy-validation>
        <v-flex xs12 align-center justify-space-between>
          <v-layout align-center>
            <v-avatar size="40px" class="mr-3">
              <img
                src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                alt=""
              >
            </v-avatar>
            <v-text-field
              placeholder="Name"
              v-model="name"
              :rules="[v => !!v || 'Name is required']"
              required
            />
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            prepend-icon="business"
            placeholder="Address"
            v-model="address"
            :rules="[v => !!v || 'Address is required']"
            required
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field
            prepend-icon="mail"
            placeholder="Email"
            v-model="email"
            :rules="emailRules"
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field
            type="tel"
            prepend-icon="phone"
            placeholder="(000) 000 - 0000"
            mask="phone"
            v-model="phone"
            :rules="phoneRules"
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field
            prepend-icon="notes"
            placeholder="Notes"
            :counter="100"
            v-model="notes"
            :rules="[v => v.length < 100 || 'Notes are too long']"
          />
        </v-flex>
      </v-form>
    </v-container>
    <v-card-actions>
      <h4 class="total">${{total}}</h4>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="hideForm">Cancel</v-btn>
      <v-btn @click="placeOrder" flat>Order</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import placeOrder from '../services/orders';

export default {
  name: 'orderForm',
  props: {
    total: Number,
    hideForm: Function,
    clearCart: Function,
  },
  data() {
    return {
      name: '',
      address: '',
      email: '',
      emailRules: [
        v => (!v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) || 'E-mail must be valid',
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'Phone number is required',
        v => /\d{10}/.test(v) || 'Phone number is invalid',
      ],
      notes: '',
    };
  },
  methods: {
    placeOrder() {
      if (this.$refs.form.validate()) {
        const { name, address, email, phone, notes } = this;
        placeOrder({ name, address, email, phone, notes })
          .then(() => {
            this.$refs.form.reset();
            this.clearForm();
            this.clearCart();
            this.hideForm();
          });
      }
    },
    clearForm() {
      this.name = '';
      this.address = '';
      this.email = '';
      this.phone = '';
      this.notes = '';
    },
  },
};
</script>

<style scoped>
  .total {
    margin-left: 20px;
  }
</style>


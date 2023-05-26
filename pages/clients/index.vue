<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="clients"
        :search="search"
        item-key="id"
        item-value="id"
        @dblclick:row="dbl_click_go_history"
      >
        <template v-slot:item.services="{ item }">
          {{ services.filter(s => s.client_id == item.id).length }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn @click="viewServices(item.id)" color="primary" class="mx-2" small>
            HISTORY
          </v-btn>
          <v-btn @click="viewProfile(item.id)" color="primary" class="mx-2" small>
            Profile
          </v-btn>
        </template>
      </v-data-table> 
      <div class="d-flex flex-row-reverse mt-10 me-15">
        <v-btn
            large
            to="/clients/new"
        >
            <v-icon class="me-2">mdi-account-plus</v-icon>
            NEW
        </v-btn>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';

  export default {
    name: 'ClientsPage',
    data() {
      return {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Surname', value: 'surname' },
          { text: 'Age', value: 'age' },
          { text: 'Services', value: 'services' },
          { text: 'Phone', value: 'phone' },
          { text: 'Actions', value: 'actions' },
        ],
        search: '',
      };
    },
    computed: {
      ...mapState(['clients', 'services' ]),
    },
    methods: {
      viewServices(id) {
        // Redirect to the client's profile page
        this.$router.push(`/services/${id}`);
      },
      viewProfile(id) {
        // Redirect to the client's profile page
        this.$router.push(`/clients/${id}`);
      },
      dbl_click_go_history(event, row){
        console.log('event', event)
        console.log('row.item', row.item)
        console.log('row.item.id', row.item.id)
        this.$router.push(`/clients/${row.item.id}`);
      }
    },
  };
  </script>
  
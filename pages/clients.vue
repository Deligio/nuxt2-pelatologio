<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="clients"
        :search="search"
        item-key="id"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn @click="viewProfile(item.id)" color="primary" small>
            View Profile
          </v-btn>
        </template>
      </v-data-table> 
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
          { text: 'Actions', value: 'actions' },
        ],
        search: '',
      };
    },
    computed: {
      ...mapState(['clients']),
    },
    methods: {
      viewProfile(id) {
        // Redirect to the client's profile page
        this.$router.push(`/profile/${id}`);
      },
    },
  };
  </script>
  
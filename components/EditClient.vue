<template>
    <div>
      <v-card>
        <v-card-title v-if="client.id">Client Profile</v-card-title>
        <v-card-title v-else>New Client</v-card-title>
        <v-card-text>
          <v-text-field v-model="client.name" label="Name"></v-text-field>
          <v-text-field v-model="client.surname" label="Surname"></v-text-field>
          <v-text-field v-model="client.age" label="Age"></v-text-field>
          <v-text-field v-model="client.phone" label="Phone"></v-text-field>
          <v-text-field v-model="client.address" label="Address"></v-text-field>
          <v-text-field v-model="client.number" label="Street Number"></v-text-field>
          <v-text-field v-model="client.postcode" label="Postcode"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="updateClient" color="primary">{{ (client.id) ? 'Update' : 'Create'}}</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    name: 'edit-client-cmp',
    props: ['client'],
    methods: {
      updateClient() {
        // Perform the update logic here
        console.log('Updated client:', this.client);
        if(!!this.client.id){
            this.$store.commit('updateClient', this.client);
        } else {
            this.$store.commit('addClient', this.client);
        }
        this.$router.push(`/clients`);
      },
    },
  };
  </script>
  
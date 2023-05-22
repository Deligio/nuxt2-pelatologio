<template>
  <div>
    <v-card>
      <v-card-title>Client Profile</v-card-title>
      <v-card-text>
        <v-text-field v-model="client.name" label="Name"></v-text-field>
        <v-text-field v-model="client.surname" label="Surname"></v-text-field>
        <v-text-field v-model="client.age" label="Age"></v-text-field>
        <v-text-field v-model="client.services" label="Services"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="updateClient" color="primary">Update</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        client: {},
    };
  },
  created() {
    const clientId = this.$route.params.id;
    this.client = Object.assign({}, this.$store.state.clients.find((client) => client.id === parseInt(clientId)));
  },
  methods: {
    updateClient() {
      // Perform the update logic here
      console.log('Updated client:', this.client);
      this.$store.commit('updateClient', this.client);
      this.$router.push(`/clients`);
    },
  },
};
</script>

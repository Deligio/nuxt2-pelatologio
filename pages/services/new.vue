<template>
    <div>
      <v-card>
        <v-card-title>Create New Service</v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedClient"
            :items="clients"
            item-text="name"
            item-value="id"
            label="Select Client"
          ></v-select>
          <v-text-field v-model="title" label="Title"></v-text-field>
          <v-text-field v-model="cost" type="number" step="0.01" label="Cost (EUR)"></v-text-field>
          <v-textarea v-model="comments" label="Comments"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="saveService" color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
  
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
      >
        {{ snackbar.message }}
      </v-snackbar>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  
  export default {
    name: 'new-service-page',
    computed: {
      ...mapState({
        clients: state => state.clients,
      }),
    },
    data() {
      return {
        selectedClient: null,
        title: '',
        cost: null,
        comments: '',
        created_at: '',
        snackbar: {
          show: false,
          color: 'warning',
          timeout: 3000,
          message: '',
        },
      };
    },
    methods: {
        ...mapMutations(['addService']),
        saveService() {
        // Validate and save the service data
        if (!this.selectedClient || !this.title || !this.cost) {
            this.showSnackbar('Please fill in all fields.', 'warning');
            return;
        }

        const newService = {
            client_id: this.selectedClient,
            title: this.title,
            cost: this.cost,
            comments: this.comments,
        };

        // Perform the save logic here
        this.addService(newService);

        // Reset form fields
        this.selectedClient = null;
        this.title = '';
        this.cost = null;
        this.comments = '';

        this.showSnackbar('Service saved successfully.', 'success');
        },
        showSnackbar(message, color) {
            this.snackbar.message = message;
            this.snackbar.color = color;
            this.snackbar.show = true;
        },
    },
    created() {
      const now = new Date();
      this.created_at = now.toISOString();
      if (this.$route.query) {
        console.log('new service copy $route', this.$route);
        const query = this.$route.query
        console.log('new service query', query);
        this.selectedClient = parseInt(query.client_id)
        this.title = query.title
        this.cost = query.cost
        this.comments = query.comments
      }
    },
  };
  </script>
  
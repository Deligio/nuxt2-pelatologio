<template>
    <div>
      <v-card>
          <v-card-title v-if="is_edit">Edit Service</v-card-title>
          <v-card-title v-else>Create New Service</v-card-title>
        <v-card-text>
            <v-row>
                <v-col sm="12" md="8">
                    <v-select
                      v-model="edited_service.client_id"
                      :items="clients"
                      item-text="name"
                      item-value="id"
                      label="Select Client"
                    ></v-select>
                    <v-text-field v-model="edited_service.title" label="Title"></v-text-field>
                    <v-text-field v-model="edited_service.cost" type="number" step="0.01" label="Cost (EUR)"></v-text-field>
                    <v-textarea v-model="edited_service.comments" label="Comments"></v-textarea>
                </v-col>
                <v-col sm="12" md="4">
                    <v-date-picker
                      v-model="edited_service.created_at"
                      ></v-date-picker>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn large @click="saveService" color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  import { bus } from '@/assets/js/bus'
  
  export default {
    name: 'service-cmp',
    computed: {
      ...mapState({
        clients: state => state.clients,
      }),
      is_edit () {
        return this.service.id && !!this.service.id
      }
    },
    props: ['service'],
    data() {
      return {
        edited_service: {},
        snackbar: {
          show: false,
          color: 'warning',
          timeout: 3000,
          message: '',
        },
      };
    },
    methods: {
        ...mapMutations(['addService', 'updateService']),
        saveService() {
          // Validate and save the service data
          if (!this.service.client_id || !this.service.title || !this.service.cost) {
              const snackbar = { message: 'Please fill in all fields.', color: 'warning darken-2'};
              bus.$emit('open_snackbar', snackbar)
              return;
          }

          const newService = {
              client_id: this.service.client_id,
              title: this.service.title,
              cost: this.service.cost,
              comments: this.service.comments,
              created_at: this.iso8601_to_date(this.service.created_at),
          };

          // Perform the save logic here
          if(this.is_edit){
              this.updateService(newService);
          } else {
              this.addService(newService);
          }

          // Reset form fields
          this.service.client_id = null;
          this.service.title = '';
          this.service.cost = null;
          this.service.comments = '';
          const snackbar = { message: 'Service saved successfully.', color: 'success darken-3'};
          bus.$emit('open_snackbar', snackbar)
          this.$router.push({path: '/clients/history/' + newService.client_id, query: null})
        },
        date_to_iso8601(date) {
            const dt = new Date(date);
            return dt.toISOString().split('T')[0];
        },
        iso8601_to_date(formattedDate) {
            const date = new Date(formattedDate);
            return date;
        },
    },
    created() {
        this.edited_service = Object.assign(
                                    {...this.service}, 
                                    {created_at: this.date_to_iso8601(this.service.created_at)}
                                )
    }
  };
  </script>
  
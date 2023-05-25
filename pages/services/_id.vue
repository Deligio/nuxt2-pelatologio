<template>
  <div>
    services
    <v-data-table
      :headers="headers"
      :items="services.filter(s => s.client_id == client_id)"
      :search="search"
      item-key="id"
    >
      <template v-slot:item.services="{ item }">
        {{ services.filter(s => s.client_id == item.id).length }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="viewServices(item.id)" text class="mx-2" small>
          <v-icon color="primary">mdi-file-multiple</v-icon>
        </v-btn>
        <v-btn @click="viewServices(item.id)" text class="mx-2" small>
          <v-icon color="red">mdi-delete</v-icon>
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
      client_id: this.$route.params.id,
      headers: [
        { text: 'Title', value: 'title'},
        { text: 'Cost', value: 'cost'},
        { text: 'Comments', value: 'comments'},
        { text: 'Actions', value: 'actions'},
      ],
      search: '',
    };
  },
  computed: {
    ...mapState(['clients', 'services' ]),
  },
  methods: {},
  created() {
    this.client = this.$route.params.id;
  },
};
</script>

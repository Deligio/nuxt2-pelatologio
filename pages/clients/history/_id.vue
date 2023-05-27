<template>
  <div>
    services
    <v-data-table
      :headers="headers"
      :items="services.filter(s => s.client_id == client_id)"
      :search="search"
      item-key="id"
      :items-per-page="-1"
    >
      <template v-slot:item.services="{ item }">
        {{ services.filter(s => s.client_id == item.id).length }}
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ get_date(item.created_at) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="copy_service_to_new(item)" text class="mx-1" small>
          <v-icon color="primary">mdi-file-multiple</v-icon>
        </v-btn>
        <v-btn @click="open_delete_dialog(item)" text class="mx-1" small>
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table> 
    <v-dialog
      v-model="delete_dialog.show"
      width="auto"
    >
      <v-card>
        <v-card-text class="title py-5">Are you sure for delete {{ delete_dialog.item.title }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex flex-row justify-space-around py-5">
          <v-btn 
            @click="delete_service" 
            class="mx-2 red--text text--darken-1"
          >delete</v-btn>
          <v-btn 
            @click="delete_dialog.show = false" 
            class="mx-2 warning--text text--darken-2"
          >cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        { text: 'Created', value: 'created_at', sort: -1},
        { text: 'Actions', value: 'actions'},
      ],
      search: '',
      delete_dialog: {
        show: false,
        item: {},
      },
      dialog_title: '',
      dialog_id: -1,
    };
  },
  computed: {
    ...mapState(['clients', 'services' ]),
  },
  methods: {
    get_date(date) {
      const new_date = new Date(date)
      return new_date.toLocaleDateString('en-GB')
    },
    copy_service_to_new (item) {
      const encoded_item = encodeURIComponent(JSON.stringify(item))
      console.log('encoded', encoded_item);
      console.log('route', this.$route);
      // this.$router.push({path: '/services/new'})
      this.$router.push({path: '/services/new', query: item})
      // this.$route.push(`/service/new`, {data: encoded_item})
    },
    open_delete_dialog (item) {
      console.log('item', item);
      this.delete_dialog.item = Object.assign({}, item),
      this.delete_dialog.show = true;
    },
    delete_service() {
      this.$store.commit('deleteService', this.delete_dialog.item.id);
      this.delete_dialog.show = false;
    },
  },
  created() {
    this.client = this.$route.params.id;
  },
};
</script>

<template>
  <div>
      <EditClient :client="client"/>
  </div>
</template>

<script>
import EditClient from "@/components/EditClient.vue";

export default {
  name: 'client-profile',
  components: { EditClient },
  data() {
    return {
        client: {},
    };
  },
  created() {
    const clientId = this.$route.params.id;
    this.client = Object.assign({}, this.$store.state.clients.find((client) => client.id === parseInt(clientId)));
  },
};
</script>

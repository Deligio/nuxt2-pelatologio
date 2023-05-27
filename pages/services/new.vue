<template>
  <div>
    <EditService :service="service" />
  </div>
</template>

<script>
import EditService from '@/components/EditService.vue';

export default {
  name: 'new-service-page',
  components: { EditService },
  data() {
    return {
      service: {},
    };
  },
  created() {
      const now = new Date();
      this.service.created_at = now;//.toISOString();
      if (this.$route.query) {
        console.log('new service copy $route', this.$route);
        const query = this.$route.query
        console.log('new service query', query);
        this.service.client_id = parseInt(query.client_id)
        this.service.title = query.title
        this.service.cost = query.cost
        this.service.comments = query.comments
      }
    },
};
</script>

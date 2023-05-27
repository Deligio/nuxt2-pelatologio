<template>
    <div>
      <EditService :service="service" />
    </div>
  </template>
  
  <script>
  import EditService from '@/components/EditService.vue';
  
  export default {
    name: 'edit-service-page',
    components: { EditService },
    data() {
      return {
        service: {},
      };
    },
    created() {
        const service_id = this.$route.params.id;
        const service = this.$store.state.services.find((service) => service.id === parseInt(service_id));
        Object.assign(this.service, service);
    },
  };
  </script>
  
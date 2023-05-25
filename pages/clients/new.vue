<template>
    <div>
        <EditClient :client="client"/>
    </div>
</template>

<script>
import EditClient from "@/components/EditClient.vue";
export default {
    name: 'new-client',
    components: { EditClient },
    data() {
        return {
        client: {
            id: 0,
            name: '',
            surname: '',
            age: '',
            phone: '',
            address: '',
            number: '',
            postcode: '',
        },
    };
    },
}
</script>

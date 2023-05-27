export const state = () => ({
  clients: [],
  services: [],
});

export const mutations = {
  setClients(state, clients) {
    state.clients = clients;
  },
  addClient(state, client) {
    let max_id = Math.max(...state.clients.map(c => c.id));
    const newClient = Object.assign({id: ++max_id}, client)
    state.clients.push(newClient);
  },
  updateClient(state, updatedClient) {
    const index = state.clients.findIndex(client => client.id === updatedClient.id);
    if (index !== -1) {
      state.clients.splice(index, 1, updatedClient);
    }
  },
  setServices(state, services) {
    state.services = services;
  },
  addService(state, service) {
    let max_id = Math.max(...state.services.map(s => s.id));
    const newService = Object.assign({id: ++max_id}, service)
    state.services.push(newService);
  },
  updateService(state, updatedService) {
    const index = state.services.findIndex(service => service.id === updatedService.id);
    if (index !== -1) {
      state.services.splice(index, 1, updatedService);
    }
  },
  deleteService(state, service_id) {
    const index = state.services.findIndex(service => service.id === service_id);
    if (index !== -1) {
      state.services.splice(index, 1);
    }
  },
};

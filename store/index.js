export const state = () => ({
  clients: [],
  services: [],
});

export const mutations = {
  initClients(state) {
    const json_data = require('~/static/clients.json');
    state.clients = json_data;
  },
  setClients(state, clients) {
    state.clients = clients;
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
    state.services.push(service);
  },
  updateService(state, updatedService) {
    const index = state.services.findIndex(service => service.id === updatedService.id);
    if (index !== -1) {
      state.services.splice(index, 1, updatedService);
    }
  },
};

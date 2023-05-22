export const state = () => ({
  clients: [],
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
};

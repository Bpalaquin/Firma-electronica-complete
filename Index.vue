<template>
  <div class="q-pa-md d-flex flex-column align-center justify-start">
    <q-btn label="Crear Usuario" @click="openFormModal" color="primary" />
    <List 
      :usuarios="usuarios" 
      :columns="columns" 
      
      class="q-mt-md"
    />
    <FormModal 
      v-model="isFormModalOpen" 
      :selected-user="selectedUser"
      @save-user="handleSaveUser" 
      @close="closeFormModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import List from './components/List.vue';
import FormModal from './components/Form.vue';


const usuarios = ref([]);
const isFormModalOpen = ref(false);
const selectedUser = ref(null);

const columns = computed(() => [
  { label: 'ID', field: 'id', align: 'center' },
  { label: 'Nombre', field: 'nombre', align: 'center' },
  { label: 'Apellido', field: 'apellido', align: 'center' },
  { label: 'Correo electrónico', field: 'correoElectronico', align: 'center' },
  { label: 'Usuario de Red', field: 'usuarioRed', align: 'center' },
  { label: 'Fecha creación', field: 'fechaCreacion', align: 'center' },
]);

function openFormModal() {
  selectedUser.value = null;
  isFormModalOpen.value = true;
}

function closeFormModal() {
  isFormModalOpen.value = false;
  selectedUser.value = null;
}

function handleSaveUser(user) {
  const index = usuarios.value.findIndex(u => u.id === user.id);
  if (index !== -1) {
    usuarios.value[index] = user;
  } else {
    usuarios.value.push(user);
  }
  closeFormModal();
}
</script>

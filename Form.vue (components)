<template>
  <q-dialog v-model="isOpenLocal">
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h4 text-center q-mb-md">Formulario registro</div>
        <q-form @submit.prevent="handleSubmit">
          <q-input
            v-model="formData.username"
            label="Usuario de red"
            outlined
            rules="[val => !!val || 'Campo requerido']"
            class="q-mb-md"
          />
          <q-input
            v-model="formData.name"
            label="Nombres"
            outlined
            rules="[val => !!val || 'Campo requerido']"
            class="q-mb-md"
          />
          <q-input
            v-model="formData.last_name"
            label="Apellidos"
            outlined
            rules="[val => !!val || 'Campo requerido']"
            class="q-mb-md"
          />
          <q-input
            v-model="formData.email"
            label="Correo Electrónico"
            outlined
            :rules="[val => !!val || 'Campo requerido', validateEmail]"
            class="q-mb-md"
          />
          <q-select
            filled
            v-model="selectedClients"
            :options="clients"
            option-value="id"
            option-label="name"
            label="Selecciona un cliente"
            class="q-mb-md"
          />
          <div class="row justify-end q-gutter-sm">
            <q-btn
              label="Guardar cambios"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { fetchClients , registerUserService } from './form/services';

const props = defineProps({
  isFormModalOpen: Boolean,
  userData: Object,
});

const emit = defineEmits(['update:isFormModalOpen', 'save-user']);

const isOpenLocal = ref(props.isFormModalOpen);
onMounted(() => {
  emit('update:isFormModalOpen', isOpenLocal.value);
});

const formData = ref({
  username: '',
  name: '',
  last_name: '',
  email: '',
  password: '',
  role_id: '',
  is_da: true,
  nit: '',
  domain: '',

});

const selectedClients = ref(null);
const clients = ref([]);

//var clientes = await fetchClients();


onMounted(async () => {
  clients.value = await fetchClients();
});

onMounted(() => {
  if (selectedClients.value !== null && clients.value.some(clients => clients === selectedClients.value)) {
    formData.value.clients = selectedClients.value;
  }
});

async function handleSubmit() {
  formData.value.clients = uuidv4();
  formData.value.role_id = uuidv4();

  const response = await registerUserService(formData.value);

  if(response && response.success) {
    closeModal();
    console.log(response);
    resetFormData();
    emit('save-user', formData.value);
  } else {
    console.error('Error al registrar el usuario', response);
  }
}

function resetFormData() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = '';
  });
}


function closeModal() {
  isOpenLocal.value = false;
}

function validateEmail(value) {
  const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailPattern.test(value) || 'Por favor ingrese un correo electrónico válido';
}
</script>

<style scoped>
.form-card {
  width: 80%;
  max-width: 500px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-h4 {
  color: #333;
}

</style>

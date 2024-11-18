<template>
  <div>
    <h1>{{ $t('addNewVehicle') }}</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="brand">{{ $t('brand') }}</label>
        <pv-input-text v-model="vehicle.brand" aria-label="Brand" required />
      </div>

      <div>
        <label for="model">{{ $t('model') }}</label>
        <pv-input-text v-model="vehicle.model" aria-label="Model" required />
      </div>

      <div>
        <label for="year">{{ $t('year') }}</label>
        <pv-input-number v-model="vehicle.year" :min="1900" :max="new Date().getFullYear()" aria-label="Year" required />
      </div>

      <div>
        <label for="hourlyRate">{{ $t('hourlyRate') }}</label>
        <pv-input-number v-model="vehicle.rate" mode="currency" currency="PEN" aria-label="Hourly Rate" required />
      </div>

      <div>
        <label for="description">{{ $t('description') }}</label>
        <pv-textarea v-model="vehicle.description" aria-label="Description" required />
      </div>

      <div>
        <label for="location">{{ $t('location') }}</label>
        <pv-textarea v-model="vehicle.location" aria-label="location" required />
      </div>

      <div>
        <label for="images">{{ $t('images') }}</label>
        <input type="file" name="images" multiple @change="onFileChange" />
        <div v-if="imagePreviews.length">
          <h3>{{ $t('imagesPreview') }}</h3>
          <div v-for="(img, index) in imagePreviews" :key="index">
            <img :src="img" alt="Image Preview" width="100" />
          </div>
        </div>
      </div>
    </form>

    <pv-toast />
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';
import { useRouter } from 'vue-router';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
  triggerSubmit: Boolean,
});

watch(() => props.triggerSubmit, (newValue) => {
  if (newValue) {
    submitForm();
  }
});

const vehicle = ref({
  contract: 'accepted',
  brand: '',
  model: '',
  year: null,
  rate: null,
  description: '',
  location: '',
  photos: [],
  ownerId: localStorage.getItem('userId') // Asignamos el ownerId del usuario actual
});

const imagePreviews = ref([]);
const toast = useToast();
const router = useRouter();
const tenantService = new TenantApiServices();

const onFileChange = (event) => {
  const files = event.target.files;
  vehicle.value.photos = []; // Reset photos
  imagePreviews.value = []; // Reset preview images

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    vehicle.value.photos.push(file); // Guardamos el archivo, no solo el nombre

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value.push(e.target.result); // Generamos vista previa de la imagen
    };
    reader.readAsDataURL(file);
  }
};

const submitForm = async () => {
  try {
    // Crear FormData para enviar los datos y archivos
    const formData = new FormData();
    formData.append('brand', vehicle.value.brand);
    formData.append('model', vehicle.value.model);
    formData.append('year', vehicle.value.year);
    formData.append('rate', vehicle.value.rate);
    formData.append('description', vehicle.value.description);
    formData.append('location', vehicle.value.location);
    formData.append('ownerId', vehicle.value.ownerId); // Agregar el ownerId

    // Agregar las imágenes al FormData
    vehicle.value.photos.forEach(photo => {
      formData.append('photos[]', photo);  // 'photos[]' es el nombre del campo para múltiples archivos
    });

    // Enviar el formulario con el FormData
    const response = await tenantService.createVehicle(formData);
    const newVehicleId = response.data.id;

    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Vehículo creado correctamente' });
    router.push({ name: 'VehicleList' });
  } catch (error) {
    console.error('Error al crear el vehículo:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el vehículo' });
  }
};
</script>

<style scoped>
</style>
<template>
  <div class="register-container">
    <div class="right-half">
      <img src="https://i.postimg.cc/QdQGYmFp/image.png" alt="Imagen" class="register-image">
    </div>
    <div class="register">
      <div class="logo">
        <h2>Register on SpeedyRent</h2>
      </div>
      <form class="register-form">

        <label for="photo">Upload Photo</label>
        <input type="file" id="photo" @change="handlePhotoUserUpload" required />

        <label for="text">First and last names</label>
        <input type="text" id="text" v-model="name" placeholder="Enter your first and last names" required>

        <label for="number">Number phone</label>
        <input type="text" id="number" v-model="phone" @blur="validatePhone" placeholder="Enter your phone number" required />
        <span v-if="error" style="color: red;">{{ error }}</span>

        <label for="email">Email Address</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your email address" required>

        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password" required>

        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="Confirm Password" required>
        <span v-if="password && confirmPassword && password !== confirmPassword" style="color: red;">Las contraseñas no coinciden.</span>

        <label for="personal-doc">Personal Document (DNI)</label>
        <input type="number" id="dni" v-model="dni" @blur="validateDni" placeholder="Enter your dni" required />
        <span v-if="error" style="color: red;">{{ error }}</span>

        <input type="file" id="personal-doc" @change="handleDniUpload" required />

        <label for="license-doc">Driver's License</label>
        <input type="file" id="license-doc" @change="handleLicenseUpload" required />

        <pv-button
          @click="handleRegister"
          class="register-button"
          as="router-link"
          to="/"
          :disabled="!isFormValid"
        >Register</pv-button>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref , computed } from 'vue';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services';
import { UserEntity } from '@/contexts/rentals/models/user-entity.js'

const name = ref('');
const phone = ref('');
const photoUser = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const dni = ref(0);
const dniImage = ref('');
const driverLicense = ref('');

const error = ref('');
const tenantApiServices = new TenantApiServices();

const isFormValid = computed(() => {
  return (
    name.value &&
    phone.value.toString().length === 9 &&
    photoUser.value &&
    email.value &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value &&
    dni.value.toString().length === 8 &&
    dniImage.value &&
    driverLicense.value
  );
});

const handlePhotoUserUpload = (event) => {
  photoUser.value = event.target.files[0];
};

const handleDniUpload = (event) => {
  dniImage.value = event.target.files[0];
};

const handleLicenseUpload = (event) => {
  driverLicense.value = event.target.files[0];
};

function removeEmptyFields(obj) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === '' || obj[key] === null || (Array.isArray(obj[key]) && obj[key].length === 0)) {
      delete obj[key];
    }
  });
  return obj;
}

const userDetails = ref(null);

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  let newUser = new UserEntity(
    '',
    name.value,
    phone.value,
    photoUser.value ? photoUser.value.name : '',
    email.value,
    password.value,
    dni.value,
    dniImage.value ? dniImage.value.name : '',
    driverLicense.value ? driverLicense.value.name : ''
  );
  newUser = removeEmptyFields(newUser);
  //nuevo
  console.log("se creo exitosamente");


  try {
    const response = await tenantApiServices.registerUser(newUser);
    //nuevo
    console.log("PRUEBA 1");
    console.log("DATA",response.data);
    if (response.data && response.data.id) {
      const userId = response.data.id;
      console.log("User created with ID:", userId);

    } else {
      console.error("Error: No user ID returned in response.");
    }

  } catch (error) {
    alert('Registration failed: ' + error.message);
  }
};

const validatePhone = () => {
  if (phone.value.toString().length !== 9) {
    error.value = 'The phone number must be exactly 9 digits.';
  } else {
    error.value = '';
  }
};

const validateDni = () => {
  if (dni.value.toString().length !== 8) {
    error.value = 'The DNI must be exactly 8 digits.';
  } else {
    error.value = '';
  }
};

</script>

<style scoped>
.register-container {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.right-half {
  flex: 1;
  display: flex;
  background-color: #cf0d2a;
  height: 100vh;
  width: 100vw;
}

.register-image {
  width: 100%;
  height: auto;
}

.register {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  text-align: center;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.register-form label {
  margin-top: 10px;
  font-weight: bold;
}

.register-form input {
  margin-top: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.register-button {
  margin-top: 20px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>
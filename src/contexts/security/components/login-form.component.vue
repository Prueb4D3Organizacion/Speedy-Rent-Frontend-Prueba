<template>
  <div class="Conteiner">
    <div class="login-box">
      <div class="logo">
        <img src="https://i.postimg.cc/50wNP4RM/image.png" alt="Logo">
        <h2>Welcome to SpeedyRent</h2>
      </div>
      <form class="login-form" >
        <label for="email">Email Address</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your email" required>

        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password" required>

        <div class="form-links">
          <router-link to="" class="link">Forgot your password?</router-link>
          <router-link to="/register" class="link">Create new account</router-link>
        </div>
        <!--SE MODIFICO TYPE SUBMIT-->
        <pv-button type="button" class="login-button" @click="handleLogin">Login</pv-button>
      </form>
      <p v-if="visible" class="error-message">{{ errorMessage }}</p>
    </div>
    <div class="ImagenAuto">
      <img src="https://i.postimg.cc/QdQGYmFp/image.png" alt="Imagen" class="login-image">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js'
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const visible = ref(false);
const tenantApiServices = new TenantApiServices();
const router = useRouter();

const handleLogin = async () => {
  try {
    const credentials = {
      email: email.value,
      password: password.value
    };
    const response = await tenantApiServices.loginUser(credentials);
    console.log("que es esto?", response.data);
    console.log("Y es esto?", response.data.user.id);
    localStorage.setItem('userId', response.data.user.id);

    const tokenResponse  = await tenantApiServices.generateToken(credentials);
    console.log("Token generado:", tokenResponse.data.token);

    // Guardamos el token en el localStorage
    localStorage.setItem('authToken', tokenResponse.data.token);

    router.push('/home');
  } catch (error) {
    console.error('Login failed', error);
    visible.value = true;
  }
};

</script>


<style scoped>

.Conteiner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 10px;
  position: absolute;
  top:0;
  left: 0;
}

.login-box {
  align-items: center;
  justify-content: center;
  max-width: 400px;
  min-height: 300px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.logo {
  text-align: center;
  margin-bottom: 2rem;
}

.ImagenAuto {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-form label {
  margin-top: 10px;
}

.login-form input {
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-links {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.form-links .link:hover {
  background-color: transparent;
}

.login-button {
  margin-top: 20px;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
@media (max-width: 768px) {
  .Conteiner {
    flex-direction: column;
  }

  .login-image {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
  }

  .login-box {
    width: 100%;
    max-width: 90%;
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .login-box {
    padding: 10px;
  }

  .login-button {
    padding: 8px;
  }
}


</style>
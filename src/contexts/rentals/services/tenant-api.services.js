//import axios from "axios";
import http from'@/contexts/shared/services/http-common.js'

//const API_URL = 'http://localhost:3000/';

export class TenantApiServices {
  //NUEVO
  async registerUser(user) {
    return await http.post(`/Auth/register`, user);
  }
  //NUEVO
  async loginUser(credentials) {
    return await http.post(`/Auth/login`, credentials);
  }

  //nuevo para el token
  async generateToken(credentials) {
    return await http.post(`/Auth/generate-token`, credentials);
  }

  async getAllUsers() {
    return await http.get(`/User`);
  }
  async updateUser(userId, userData) {
    return await http.put(`/User/${userId}`, userData);
  }
  async getUserById(userId) {
    return await http.get(`/User/${userId}`);
  }
  async getAllTenants() {
    return await http.get(`/tenants`);
  }
  async createOwner(ownerData) {
    return await http.post(`/owners`, ownerData);
  }
  async createTenant(tenantData) {
    return await http.post(`/tenants`, tenantData);
  }
  async updateTenantRequest(tenantId, requestData) {
    return await http.put(`/tenants/${tenantId}`, requestData);
  }
  async updateTenantDates(requestId, updatedData) {
    return await http.patch(`/requests/${requestId}`, updatedData);
  }
  async getAllRequests() {
    return await http.get(`/requests`);
  }
  async getRequestById(requestId) {
    return await http.get(`/requests/${requestId}`);
  }
  async createRequest(requestData) {
    return await http.post(`/requests`, requestData);
  }
  async getAllOwners() {
    return await http.get(`/owners`);
  }
  async updateOwnerVehicles(ownerId, vehicleData) {
    return await http.put(`/owners/${ownerId}`, vehicleData);
  }
  async getAllVehicles() {
    return await http.get(`/vehicles`);
  }
  async getVehicleById(vehicleId) {
    return await http.get(`/vehicles/${vehicleId}`);
  }
  async deleteVehicle(vehicleId) {
    return await http.delete(`/vehicles/${vehicleId}`);
  }
  async updateVehicleById(vehicleId, vehicleData) {
    return await http.put(`/vehicles/${vehicleId}`, vehicleData);
  }
  async createVehicle(vehicleData) {
    return await http.post(`/vehicle/add`, vehicleData);
  }
}

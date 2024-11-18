export class UserEntity {
  constructor(
    id = '',
    name = '',
    phone = '',
    photoUser = '', //CAMBIO photoUser
    email = '',
    password = '',
    dni = 0,
    dniImage = '', //cambio
    driverLicense = '' //cambio
  ) {
    this.id = id !== null ? id : '';
    this.dni = dni;
    this.dniImage = dniImage;
    this.name = name;
    this.phone = phone;
    this.photoUser = photoUser;
    this.email = email;
    this.password = password;
    this.driverLicense = driverLicense
  }
}

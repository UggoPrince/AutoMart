/* eslint-disable linebreak-style */
import Users from '../models/Users';
import usersData from '../database/users';

class UsersService {
  constructor() {
    this.users = usersData;
  }

  getAllUsers() {
    return this.users.map((data) => {
      const user = new Users();
      user.id = data.id;
      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.email = data.email;
      user.password = data.password;
      user.address = data.address;
      user.is_admin = data.is_admin;
      user.phone_number = data.phone_number;
      return user;
    });
  }

  getUserById(id) {
    const currentUser = this.getAllUsers()[id];
    return {
      token: '45erkjherht45495783',
      id: currentUser.id,
      fisrtname: currentUser.fisrtname,
      lastname: currentUser.lastname,
      email: currentUser.email,
      password: currentUser.password,
      address: currentUser.address,
      is_admin: currentUser.is_admin,
      phone_number: currentUser.phone_number,
    };
  }

  add(fisrtname, lastname, email, password, address, phoneNumber) {
    const allUsers = this.users.length;
    const id = allUsers + 1;
    const user = {
      id,
      fisrtname,
      lastname,
      email,
      password,
      address,
      is_admin: false,
      phone_number: phoneNumber,
    };
    this.users.push(user);
    const index = id - 1;
    return this.getUserById(index);
  }

  emailExist(email) {
    for (let i = 0; i < this.users.length; i += 1) {
      if (this.users[i].email === email) return true;
    }
    return false;
  }
}

export default new UsersService();

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
    const users = this.getAllUsers();
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === id) {
        return {
          exist: true,
          data: {
            token: '45erkjherht45495783',
            id: users[i].id,
            fisrtname: users[i].fisrtname,
            lastname: users[i].lastname,
            email: users[i].email,
            password: users[i].password,
            address: users[i].address,
            is_admin: users[i].is_admin,
            phone_number: users[i].phone_number,
          },
        };
      }
    }
    return { exist: false, error: 'no such user with this id.' };
  }

  signin(email, password) {
    const valid = true;
    for (let i = 0; i < this.users.length; i += 1) {
      if (this.users[i].email === email && this.users[i].password === password) {
        return {
          valid,
          user: this.getUserById(this.users[i].id),
        };
      }
    }
    return { valid: false, error: 'Invalid password.' };
  }

  signup(fisrtname, lastname, email, password, address, phoneNumber) {
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
    return this.getUserById(id);
  }

  emailExist(email) {
    for (let i = 0; i < this.users.length; i += 1) {
      if (this.users[i].email === email) return true;
    }
    return false;
  }
}

export default new UsersService();

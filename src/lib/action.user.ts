"use server";
import axios from "axios";
import {API} from "./API";
export const register = async (
  username: string,
  name: string,
  email: string,
  password: string
) => {
  try {
    if (!username || !name || !email || !password) return;

    const res = await axios.post(`${API}/api/users/register`, {
      username: username,
      name: name,
      email: email,
      password,
    });
    
    return res;
  } catch (err) {
    console.log(err);
  }
};





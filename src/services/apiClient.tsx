import axios from 'axios';
import { User } from '../entitites/User';

const url = "http://192.168.100.92:8000/";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post<{ access: string; refresh: string }>(`${url}login/`, {
      email,
      password,
    });

    const {access, refresh} = response.data;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    return access;
  } catch (error) {
        console.error(error);
  }
}

export const registerUser = async (email: string, password: string, confirm_password: string) => {
  try{
    const response = await axios.post(`${url}register/`, {
      email,
      password,
      confirm_password,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const getUserProfile = async () => {
  try {
    const response = await axios.get<User>(`${url}user/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${url}logout/`,
      {
        refresh: localStorage.getItem("refreshToken"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    console.log(response);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return response;
  } catch (error) {
    console.error(error);
  }
};

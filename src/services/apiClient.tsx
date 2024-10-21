import axios from 'axios';

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
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
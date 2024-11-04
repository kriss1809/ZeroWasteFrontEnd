import axios from 'axios';
import { User } from '../entitites/User';

const url = "http://192.168.100.92:8000/";
// const url = "http://192.168.100.186:8000/";
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post<{ access: string; refresh: string }>(`${url}login/`, {
      email,
      password,
    });

    const {access, refresh} = response.data;
    sessionStorage.setItem("accessToken", access);
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
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );

    console.log(response);
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.clear();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const UserdeleteAccount = async (password: string) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${url}delete-account/`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      data: {
        password,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const GetProductList = async () => {
  try {
    const response = await axios.get<{ share_code: string; products: any[] }>(`${url}user-product-list/`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    const { share_code, products } = response.data;
    sessionStorage.setItem("share_code", share_code);
    sessionStorage.setItem("products", JSON.stringify(products));
    return products;
  } catch (error) {
    console.error(error);
  }
}

export const DeleteProduct = async (product_id: number) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${url}user-product-list/`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      data: {
        id: product_id,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const AddProduct = async (name: string, best_before: string, opened: string, consumption_days: string) => {
  try {
    const response = await axios.post(
      `${url}user-product-list/`,
      {
        name,
        best_before,
        consumption_days: consumption_days ? consumption_days : null,
        opened: opened ? opened : null,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const UpdateProduct = async (id: number, name: string, best_before: string, opened: string, consumption_days: string) => {
  try {
    const response = await axios.put(
      `${url}user-product-list/`,
      {
        id,
        name,
        best_before,
        consumption_days: consumption_days ? consumption_days : null,
        opened: opened ? opened : null,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const JoinProductList = async (share_code: string) => {
  try {
    const response = await axios.post(
      `${url}change-list/`,
      {
        share_code,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}


export const GetCollaborators = async () => {
  try {
    const response = await axios.get<{ email: string }[]>(`${url}collaborators/`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    sessionStorage.setItem("collaborators", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
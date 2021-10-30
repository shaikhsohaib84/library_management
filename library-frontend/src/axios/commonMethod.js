import {GET, POST, DELETE, PUT} from './axiosFunction'

export const adminLogin =  async (payload) => {
    try{
        const res = await POST(`library-admin/login/`, payload);
        return res
    } catch(error){
        return error?.response
    }
}

export const getAllAdminBookAPI = async () => {
    try{
        const res = await GET(`library-admin/list-all-book/`);
        return res
    } catch(error){
        return error?.response
    }
}

export const addNewBookAPI = async (payload) => {
    try{
        const res = await POST(`library-admin/add-book/`, payload);
        return res
    }catch(error){
        return error?.response
    }
}

export const deleteBookAPI = async (bookId) => {
    try{
        const res = await DELETE(`library-admin/delete-book/${bookId}`);
        return res
    }catch(error){
        return error?.response
    }
}

export const editBookAPI = async (bookId, formObject) => {
  try {
    console.log("formObject", formObject);
    const res = await PUT(`library-admin/update-book/${bookId}`, {data: formObject});
    return res;
  } catch (error) {
    return error?.response;
  }
};

export const logoutAPI = async (adminId) => {
    try {
      const res = await GET(`library-admin/logout/${adminId}`);
      return res;
    } catch (error) {
      return error?.response;
    }   
}

export const signUpAPI = async (payload) => {
  try {
    const res = await POST(`library-admin/signup/`, payload);
    return res;
  } catch (error) {
    return error?.response;
  }
};
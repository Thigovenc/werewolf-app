import axios from 'axios';

const URL_BASE = 'https://werewolf-api-q3lm.onrender.com'

export const registerUser = async(data:{username: string, password:string, email: string}) => {
    try {
        const response = await axios.post(`${URL_BASE}/api/create-user/`, data);
        return response.data;
      } catch (error) {
        console.error('Erro no cadastro:', error);
        throw error;
      }
}

export const loginUser = async(data:{username: string, password:string})   => {
    try {
        const response = await axios.post(`${URL_BASE}/api/login/`, data);
        return response.data;
      } catch (error) {
        console.error('Erro ao efetuar login: ', error);
        throw error;
      }
}
/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
    try {
        const res = await axios({
            url: '/api/v1/users/login',
            method: 'POST',
            data: {
                email,
                password
            }
        });    

        if (res.data.status === 'success') {
            showAlert('success', 'Logged in succesfully');
            setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        });

        if (res.data.status === 'success') location.assign('/');
    } catch (err) {
        showAlert('error', 'Error logging out! Try again.')    
    }
}


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

export const checkPasswords = (passwordInput, passwordConfirmInput) => {
    if (passwordInput.value != passwordConfirmInput.value) {
        passwordConfirmInput.setCustomValidity('Password must be matching')
    } else {
        passwordConfirmInput.setCustomValidity('')
    }
}

export const signup = async (name, email, password, passwordConfirm) => {
    try {
        const res = await axios({
            url: '/api/v1/users/signup',
            method: 'POST',
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Created account succesfully');
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


/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox'
import { login, logout } from './login';
import { updateSettings } from './updateSettings'

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password'); 

if (mapBox) {
    const locations = JSON.parse(document.getElementById('map').dataset.locations);

    displayMap(locations);
}

if (loginForm) {
    loginForm.addEventListener('submit', async e => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        await login(email, password);
    });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (userForm) {
    userForm.addEventListener('submit', async e => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        await updateSettings({ name, email }, 'data');
    });
}

if (userPasswordForm) {
    userPasswordForm.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn--save-password').innerHTML = 'Updating...'

        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

        document.querySelector('.btn--save-password').innerHTML = 'Save password'
        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
    });
}

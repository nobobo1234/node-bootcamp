/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox'
import { login, logout, checkPasswords, signup } from './auth';
import { updateSettings } from './updateSettings'
import { bookTour } from './stripe';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password'); 
const filePicker = document.getElementById('photo');
const bookBtn = document.getElementById('book-tour')
const signupForm = document.querySelector('.form--signup');

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
        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);

        await updateSettings(form, 'data');
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

if (filePicker) {
    filePicker.addEventListener('change', () => {
        const newPicker = document.getElementById('photo');
        if (newPicker.files && newPicker.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                document.querySelector('.form__user-photo').src = e.target.result;
            }

            reader.readAsDataURL(newPicker.files[0]);
        }
    });
}

if (bookBtn) {
    bookBtn.addEventListener('click', e => {
        e.target.innerHTML = 'Processing...'
        const tourID = e.target.dataset.tourId;

        bookTour(tourID);
    })
}

if (signupForm) {
    const passwordConfirm = document.getElementById('password-confirm');

    passwordConfirm.addEventListener('input', e => {
        const password = document.getElementById('password');
        const newPasswordConfirm = document.getElementById('password-confirm');

        checkPasswords(password, newPasswordConfirm);
    });

    signupForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const newPasswordConfirm = document.getElementById('password-confirm').value;

        signup(name, email, password, newPasswordConfirm); 
    })
}


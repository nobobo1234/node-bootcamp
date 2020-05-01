import axios from 'axios';
import { showAlert } from './alerts';

// type can be 'password' or 'data'
export const updateSettings = async (data, type) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: type === 'data' ? '/api/v1/users/me' : '/api/v1/users/updatePassword',
            data
        });

        if (res.data.status === 'success') {
            showAlert('success', `Successfully updated your ${type === 'data' ? 'user data' : 'password'}`);
            if (type === 'data') {
                setTimeout(() => {
                    location.reload(true);
                }, 1500);
            }
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

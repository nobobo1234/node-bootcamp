/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_iXx3iURpuWSVUNLgzoPKFmOu005SUpsZlk');


export const bookTour = async tourID => {
    try {
        const session = await axios(`/api/v1/bookings/checkout-session/${tourID}`);

        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        showAlert('error', err)
    }
};

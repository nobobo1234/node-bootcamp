/* eslint-disable */
const login = async (email, password) => {
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
            const formMessage = document.querySelector('.form__message');
            formMessage.style.display = 'block';
            formMessage.innerHTML = 'Logged in successfully';
            setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        const formMessage = document.querySelector('.form__message'); 
        formMessage.style.display = 'block';
        formMessage.innerHTML = err.response.data.message;

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 2000);
    }
}

window.onload = () => {
    document.querySelector('.form__message').style.display = 'none';
    document.querySelector('.form').addEventListener('submit', e => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    })
}

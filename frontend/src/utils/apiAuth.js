export const BASE_URL = 'https://auth.nomoreparties.co';

function getResponseData(res) {
    if (res.ok) {
        return res.json()

    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res}`);
}


export function register(data) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: data.password,
            email: data.email
        })
    })
        .then(res => {
            return getResponseData(res);
        })
}


// отправляем запрос на роут аутентификации
export function authorize(data) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: data.password,
            email: data.email
        })
    })
        .then(res => {
            return getResponseData(res);
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            } else {
                return;
            }
        })
};

// отправляем запрос на роут аутентификации
export function checkToken(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => {
            return getResponseData(res);
        })
        .then(data => data)
};
export const BASE_URL = 'https://api.mesto.prokofyev.nomoredomains.icu';

function getResponseData(res) {
    if (res.ok) {
        return res.json()

    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res}`);
}


export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
        .then(res => {
            return getResponseData(res);
        })
}


// отправляем запрос на роут аутентификации
export function authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
        .then(res => {
            return getResponseData(res);
        })
};

export function getContent() {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': "application/json",
        }
    })
        .then(res => {
            return getResponseData(res);
        })
};

export function logoff() {
    return fetch(`${BASE_URL}/logoff`, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => {
            return getResponseData(res);
        })
};
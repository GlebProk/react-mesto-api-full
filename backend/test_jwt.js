const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzRkNDY1MzBmNWVlYzRhYjEzOWM3YTAiLCJlbWFpbCI6IjEyM0B5YW5kZXgucnUiLCJuYW1lIjoi0KLQtdGB0YLQuNC6IiwiYWJvdXQiOiLQk9CR0KMg0JzQniDQnNCe0JzQmNCQ0KYiLCJhdmF0YXIiOiJodHRwczovL3Vwcm9zdGltLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAyMS8wMi9pbWFnZTE1OC01Mi5qcGciLCJpYXQiOjE2NjYxMDg2MjQsImV4cCI6MTY2NjcxMzQyNH0.kwF8d9xY0O7fc6gmNZhsbjHkW7_2sq_7dL69eD2fYGE'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'secret-key'; // вставьте сюда секретный ключ для разработки из кода
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}

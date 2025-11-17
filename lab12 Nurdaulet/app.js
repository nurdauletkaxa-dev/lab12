// app.js

// Функция для генерации фейкового JWT токена
function generateFakeJWT() {
    const payload = {
        userId: 1, // Простой идентификатор пользователя
        email: 'user@example.com', // Пример email
        role: 'user' // Роль
    };
    const header = { alg: 'HS256', typ: 'JWT' };

    // Преобразуем в строку и кодируем в base64 (симуляция реального JWT)
    const base64Header = btoa(JSON.stringify(header));
    const base64Payload = btoa(JSON.stringify(payload));
    const fakeToken = `${base64Header}.${base64Payload}.fakeSignature`;

    return fakeToken;
}

// Функция для проверки токена
function checkLoginStatus() {
    const token = localStorage.getItem('jwt');
    if (token) {
        // Если токен существует, показываем приветствие
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('token').innerText = token; // Отображаем токен на странице
    } else {
        // Если токен отсутствует, показываем форму входа
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('welcome').style.display = 'none';
    }
}

// Функция для обработки входа
function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Проверка введённых данных (например, простой эмулятор)
    if (email && password) {
        const token = generateFakeJWT();
        localStorage.setItem('jwt', token); // Сохраняем токен в localStorage
        checkLoginStatus(); // Обновляем состояние интерфейса
    } else {
        alert('Пожалуйста, заполните все поля');
    }
}

// Функция для обработки выхода
function logout() {
    localStorage.removeItem('jwt'); // Удаляем токен из localStorage
    checkLoginStatus(); // Обновляем состояние интерфейса
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus(); // Проверка при загрузке страницы

    // Обработчики событий
    document.getElementById('login-form').addEventListener('submit', login);
    document.getElementById('logout').addEventListener('click', logout);
});

// /assets/js/apikeys.js
// Stores API keys for Firebase and Google Maps
// WARNING: Do not expose this file in production. Use a backend or .env file for security.

const apiKeys = {
    firebase: {
        apiKey: "AIzaSyD9yjnkHH3CI0FfbHj8s6zVrloWSFrE654",
        authDomain: "binxzero-7d76f.firebaseapp.com",
        databaseURL: "https://binxzero-7d76f-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "binxzero-7d76f",
        storageBucket: "binxzero-7d76f.firebasestorage.app",
        messagingSenderId: "870557518976",
        appId: "1:870557518976:web:75e9df319f6500d9a0aa65",
        measurementId: "G-6V9C837NQ5"
    },
    GOOGLE_MAPS_API_KEY: 'AIzaSyDPYwNwl874DkjLno5l6jEkPOYDbnJSIvU'
};

window.apiKeys = apiKeys;

// For production, move to a backend endpoint, e.g.:
// fetch('/api/config').then(res => res.json()).then(config => window.apiKeys = config);
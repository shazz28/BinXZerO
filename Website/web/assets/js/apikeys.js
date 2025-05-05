// /assets/js/apikeys.js
// Stores API keys for Firebase and Google Maps
// WARNING: Do not expose this file in production. Use a backend or .env file for security.

const apiKeys = {
    firebase: {
        apiKey: "Your api key",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    },
    GOOGLE_MAPS_API_KEY: ''
};

window.apiKeys = apiKeys;

// For production, move to a backend endpoint, e.g.:
// fetch('/api/config').then(res => res.json()).then(config => window.apiKeys = config);

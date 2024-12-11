import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, updatePassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAB0i8j5df0nRFAgXHp2ld95JEyPOCPDiI",
    authDomain: "healthme-13ddc.firebaseapp.com",
    projectId: "healthme-13ddc",
    storageBucket: "healthme-13ddc.firebasestorage.app",
    messagingSenderId: "4958888237",
    appId: "1:4958888237:web:a15c11850484e5eaeab3a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Function to handle Change Password
function handleChangePassword(event) {
    event.preventDefault();

    const newPassword = document.getElementById('password').value;
    const confirmPassword = document.getElementById('repassword').value;
    const errorMessage = document.getElementById('error-message');

    if (newPassword === "" || confirmPassword === "") {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'All fields are required!';
    } else if (newPassword !== confirmPassword) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Passwords do not match!';
    } else {
        const user = auth.currentUser;

        if (user) {
            updatePassword(user, newPassword)
                .then(() => {
                    console.log('Password updated successfully.');
                    alert('Password updated successfully.');
                    // Redirect to login page after password update
                    window.location.href = "../Login/index.html"; // Modify this URL as needed
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMsg = error.message;
                    console.error(`Error Code: ${errorCode}, Error Message: ${errorMsg}`);
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = `Error: ${errorMsg}`;
                });
        } else {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'No user is signed in. Please log in first.';
        }
    }
}

// Attach event listener to the Change Password form
const changePassForm = document.getElementById("changePassForm");
if (changePassForm) {
    changePassForm.addEventListener("submit", handleChangePassword);
}

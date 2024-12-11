import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

// Function to handle form validation and login
function validateSignupForm(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Check if all fields are filled
    if (email === "" || password === "") {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'All fields are required!';
    } else {
        errorMessage.style.display = 'none';

        // Sign in the user with Firebase
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed in:", user);

                console.log("Redirecting to Home/index.html...");
                window.location.href = "../Home/index.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMsg = error.message;
                console.error(`Error Code: ${errorCode}, Error Message: ${errorMsg}`);
                errorMessage.style.display = 'block';
                errorMessage.textContent = `Error: ${errorMsg}`;
            });
    }
}

// Function to handle Forgot Password
function handleForgotPassword(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('error-message');

    if (email === "") {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Please enter your email to reset your password.';
    } else {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Password reset email sent.');
                alert('Password reset email sent. Check your inbox.');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMsg = error.message;
                console.error(`Error Code: ${errorCode}, Error Message: ${errorMsg}`);
                errorMessage.style.display = 'block';
                errorMessage.textContent = `Error: ${errorMsg}`;
            });
    }
}

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

// Attach event listeners to the forms
const loginForm = document.getElementById("signupForm");
if (loginForm) {
    loginForm.addEventListener("submit", validateSignupForm);
}

const forgotPassForm = document.getElementById("forgotPassForm");
if (forgotPassForm) {
    forgotPassForm.addEventListener("submit", handleForgotPassword);
}

const changePassForm = document.getElementById("changePassForm");
if (changePassForm) {
    changePassForm.addEventListener("submit", handleChangePassword);
}

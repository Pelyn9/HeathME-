import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

function validateSignupForm(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;
    const errorMessage = document.getElementById('error-message');

    console.log(`Email: ${email}, Password: ${password}, Repassword: ${repassword}`);

    // Check if all fields are filled
    if (email === "" || password === "" || repassword === "") {
        errorMessage.style.display = 'block'; // Show error message for missing fields
        errorMessage.textContent = 'All fields are required!';
    } else if (password !== repassword) {
        errorMessage.style.display = 'block'; // Show error message if passwords don't match
        errorMessage.textContent = 'Passwords do not match!';
    } else {
        errorMessage.style.display = 'none'; // Hide error message

        // Create a new user with Firebase Authentication
        createUserWithEmailAndPassword(auth, email, password, repassword)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User created:", user); // Log the user object for debugging

                alert("Account created successfully!");

                // Using window.location.replace to redirect after successful signup
                window.location.href = '../Login/index.html'; // Ensure your redirect is on an authorized domain
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`Error Code: ${errorCode}, Error Message: ${errorMessage}`);
                alert(`Error: ${errorMessage}`); // Display Firebase error message
            });
    }
}

// Attach the validation function to the form submit event
document.getElementById("signupForm").addEventListener("submit", (event) => {
    console.log('Signup form submitted');
    validateSignupForm(event);
});

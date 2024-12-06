// Handle Edit and Save
const editButton = document.getElementById('edit-button');
const saveButton = document.getElementById('save-button');
const profileForm = document.getElementById('profile-form');
const nameInput = document.getElementById('name');
const gmailInput = document.getElementById('gmail');
const contactNumberInput = document.getElementById('contact-number');
const addressInput = document.getElementById('address');

// Enable editing
editButton.addEventListener('click', () => {
    nameInput.readOnly = false;
    gmailInput.readOnly = false;
    contactNumberInput.readOnly = false;
    addressInput.readOnly = false;

    saveButton.style.display = 'inline-block'; // Show Save button
    editButton.style.display = 'none'; // Hide Edit button
});

// Save changes
saveButton.addEventListener('click', () => {
    nameInput.readOnly = true;
    gmailInput.readOnly = true;
    contactNumberInput.readOnly = true;
    addressInput.readOnly = true;

    saveButton.style.display = 'none'; // Hide Save button
    editButton.style.display = 'inline-block'; // Show Edit button

    alert('Your profile has been updated!');
});

// Handle profile picture upload
const profilePictureUpload = document.getElementById('profile-picture-upload');
const profilePicture = document.getElementById('profile-picture');

profilePictureUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePicture.src = e.target.result; // Set uploaded image as profile picture
        };
        reader.readAsDataURL(file);
    }
});

// Handle logout
const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', () => {
    alert('You have logged out.');
    // Add your logout logic here (redirect, remove session, etc.)
});

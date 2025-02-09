document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM loaded');
    const submitSingin = document.getElementById("signin-btn");
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{11,}$/;
    const passwordError = document.getElementById('password-error');
    const emailError = document.getElementById('email-error');
    const email = document.getElementById('email');
    const namePattern = /^[A-Za-z\s]{1,}$/;
    const nameError = document.getElementById('name-error');
    const name = document.getElementById('name');
    const password = document.getElementById("password");

    if (submitSingin) {
        submitSingin.addEventListener("click", (event) => {
            console.log('submitting form');
            emailError.textContent = '';
            passwordError.textContent = '';
            nameError.textContent = '';
            
            v_1 = validateName(name.value);
            v_2 = validateEmail(email.value);
            v_3 = validatePassword(password.value);
            if (!v_1 || !v_2 || !v_3) {
                event.preventDefault();
            } else {
                registerForm.submit();
            }
        });
    }

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            emailError.textContent = 'Invalid email address.';
            return false;
        }
        emailError.textContent = '';
        return true;
    }

    function validatePassword(password) {
        if(!passwordPattern.test(password)){
            if (password.length <= 10) {
                passwordError.textContent = 'Password must be longer than 10 characters.';
                return false;
            } else if (!/[A-Z]/.test(password)) {
                passwordError.textContent = 'Password must contain at least one uppercase letter.';
                return false;
            } else if (!/\d/.test(password)) {
                passwordError.textContent = 'Password must contain at least one digit.';
                return false;
            }
        } else {
            passwordError.textContent = '';
        }
        return true;
    }

    function validateName(name) {
        if (!namePattern.test(name)) {
            nameError.textContent = 'Name must be longer than 1 character and only allow letters and space.';
            return false;
        }
        nameError.textContent = '';
        return true;
    }
});
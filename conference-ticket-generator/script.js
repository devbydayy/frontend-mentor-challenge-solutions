document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ticket-form');
    const formSection = document.getElementById('form-section');
    const ticketSection = document.getElementById('ticket-section');

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const githubInput = document.getElementById('github');
    const avatarInput = document.getElementById('avatar');
    const dropZone = document.getElementById('drop-zone');
    const dropZonePrompt = dropZone.querySelector('.drop-zone-prompt');
    const avatarPreviewContainer = dropZone.querySelector('.avatar-preview-container');
    const avatarPreview = document.getElementById('avatar-preview');
    const removeImageBtn = document.getElementById('remove-image');
    const changeImageBtn = document.getElementById('change-image');

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

    const showError = (input, message) => {
        const formControl = input.closest('.form-control');
        const errorElement = formControl.querySelector('.error-message');
        formControl.classList.add('error');
        errorElement.textContent = message;
        input.setAttribute('aria-invalid', 'true');
        errorElement.style.display = 'block';
    };

    const hideError = (input) => {
        const formControl = input.closest('.form-control');
        const errorElement = formControl.querySelector('.error-message');
        formControl.classList.remove('error');
        errorElement.textContent = '';
        input.setAttribute('aria-invalid', 'false');
        errorElement.style.display = 'none';
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    
    const validateField = (input) => {
        let isValid = true;
        if (input.value.trim() === '') {
            showError(input, 'This field is required');
            isValid = false;
        } else {
            hideError(input);
        }
        return isValid;
    };
    
    const validateEmailField = (input) => {
         if (input.value.trim() === '') {
            showError(input, 'This field is required');
            return false;
        } else if (!validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        } else {
            hideError(input);
            return true;
        }
    };
    
    const validateAvatar = (file) => {
        const avatarFormControl = avatarInput.closest('.form-control');
        const errorElement = avatarFormControl.querySelector('.error-message');
        if (!file) {
            showError(avatarInput, 'Please upload an avatar.');
             return false;
        }
        
        if (file.size > MAX_FILE_SIZE) {
            showError(avatarInput, `File is too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
            return false;
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            showError(avatarInput, 'Invalid file type. Please upload a JPG or PNG.');
            return false;
        }

        hideError(avatarInput);
        return true;
    };

    dropZone.addEventListener('click', () => avatarInput.click());
    changeImageBtn.addEventListener('click', () => avatarInput.click());

    removeImageBtn.addEventListener('click', () => {
        avatarInput.value = ''; 
        avatarPreview.src = '#';
        avatarPreviewContainer.style.display = 'none';
        dropZonePrompt.style.display = 'flex';
        hideError(avatarInput);
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    dropZone.addEventListener('drop', handleDrop, false);
    avatarInput.addEventListener('change', handleFileSelect, false);

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;
        handleFiles(files);
    }
    
    function handleFileSelect(e) {
        handleFiles(e.target.files);
    }
    
    function handleFiles(files) {
        const file = files[0];
        if (validateAvatar(file)) {
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarPreview.src = e.target.result;
                dropZonePrompt.style.display = 'none';
                avatarPreviewContainer.style.display = 'flex';
            };
            reader.readAsDataURL(file);
        } else {
             avatarInput.value = '';
        }
    }


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateField(fullNameInput);
        const isEmailValid = validateEmailField(emailInput);
        const isGithubValid = validateField(githubInput);
        const isAvatarValid = validateAvatar(avatarInput.files[0]);

        if (isNameValid && isEmailValid && isGithubValid && isAvatarValid) {
            generateTicket();
        }
    });

    fullNameInput.addEventListener('input', () => validateField(fullNameInput));
    emailInput.addEventListener('input', () => validateEmailField(emailInput));
    githubInput.addEventListener('input', () => validateField(githubInput));


    function generateTicket() {
        const name = fullNameInput.value;
        const email = emailInput.value;
        const github = githubInput.value;
        const avatarFile = avatarInput.files[0];

        document.getElementById('ticket-name-congrats').textContent = name;
        document.getElementById('ticket-email-confirm').textContent = email;
        document.getElementById('ticket-name').textContent = name;
        
        const githubSpan = document.createElement('span');
        githubSpan.textContent = github.startsWith('@') ? github : `@${github}`;
        
        const githubP = document.getElementById('ticket-github');
        githubP.innerHTML = `<img src="./images/icon-github.svg" alt="GitHub Icon"> `;
        githubP.appendChild(githubSpan);
        
        const ticketId = Math.floor(10000 + Math.random() * 90000);
        document.getElementById('ticket-id').textContent = ticketId;

        if (avatarFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('ticket-avatar').src = e.target.result;
            }
            reader.readAsDataURL(avatarFile);
        }

        formSection.style.display = 'none';
        ticketSection.style.display = 'block';
        window.scrollTo(0, 0);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.form-step');
    const stepNumbers = document.querySelectorAll('.step-number');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const confirmBtn = document.querySelector('.confirm-btn');
    const billingSwitch = document.getElementById('billing-cycle');
    const planCards = document.querySelectorAll('.plan-card');
    const addonCards = document.querySelectorAll('.addon-card');
    const changePlanBtn = document.querySelector('.change-plan-btn');

    let currentStep = 0;
    const formData = {
        name: '',
        email: '',
        phone: '',
        plan: null,
        billing: 'monthly',
        addons: []
    };

    const prices = {
        plans: {
            arcade: { monthly: 9, yearly: 90 },
            advanced: { monthly: 12, yearly: 120 },
            pro: { monthly: 15, yearly: 150 }
        },
        addons: {
            'online-service': { monthly: 1, yearly: 10 },
            'larger-storage': { monthly: 2, yearly: 20 },
            'customizable-profile': { monthly: 2, yearly: 20 }
        }
    };

    function updateStep() {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });

        const sidebarSteps = document.querySelectorAll('.sidebar .step');
        sidebarSteps.forEach((sidebarStep, index) => {
            sidebarStep.classList.toggle('active', index === currentStep);
        });


        if (currentStep === 0) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'inline-block';
            confirmBtn.style.display = 'none';
        } else if (currentStep > 0 && currentStep < steps.length - 2) { 
            prevBtn.style.display = 'inline-block';
            nextBtn.style.display = 'inline-block';
            confirmBtn.style.display = 'none';
        } else if (currentStep === steps.length - 2) { 
            prevBtn.style.display = 'inline-block';
            nextBtn.style.display = 'none';
            confirmBtn.style.display = 'inline-block';
        } else if (currentStep === steps.length - 1) { 
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            confirmBtn.style.display = 'none';
        }

        const buttonContainer = document.querySelector('.button-container');
        if (currentStep === steps.length - 1) {
            buttonContainer.style.display = 'none'; 
        } else {
            buttonContainer.style.display = 'flex';
        }
    }

    function validateStep1() {
        let isValid = true;
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');

        // Reset errors
        [nameField, emailField, phoneField].forEach(field => {
            field.classList.remove('error');
            field.parentElement.querySelector('.error-message').style.display = 'none';
        });

        if (!nameField.value.trim()) {
            isValid = false;
            nameField.classList.add('error');
            nameField.parentElement.querySelector('.error-message').style.display = 'block';
        }

        if (!emailField.value.trim()) {
            isValid = false;
            emailField.classList.add('error');
            const errorMsg = emailField.parentElement.querySelector('.error-message');
            errorMsg.textContent = 'This field is required';
            errorMsg.style.display = 'block';
        } else if (!/\S+@\S+\.\S+/.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('error');
            const errorMsg = emailField.parentElement.querySelector('.error-message');
            errorMsg.textContent = 'Valid email required';
            errorMsg.style.display = 'block';
        }

        if (!phoneField.value.trim()) {
            isValid = false;
            phoneField.classList.add('error');
            phoneField.parentElement.querySelector('.error-message').style.display = 'block';
        }

        if (isValid) {
            formData.name = nameField.value.trim();
            formData.email = emailField.value.trim();
            formData.phone = phoneField.value.trim();
        }
        return isValid;
    }

    function validateStep2() {
        if (!formData.plan) {
            alert('Please select a plan.');
            return false;
        }
        return true;
    }

    function updateBillingCycle() {
        const isYearly = billingSwitch.checked;
        formData.billing = isYearly ? 'yearly' : 'monthly';

        document.querySelector('.monthly-label').classList.toggle('active', !isYearly);
        document.querySelector('.yearly-label').classList.toggle('active', isYearly);

        document.querySelectorAll('.price-monthly').forEach(p => p.style.display = isYearly ? 'none' : 'block');
        document.querySelectorAll('.price-yearly').forEach(p => p.style.display = isYearly ? 'block' : 'none');
        document.querySelectorAll('.yearly-bonus').forEach(p => p.style.display = isYearly ? 'block' : 'none');

        document.querySelectorAll('.addon-price-monthly').forEach(p => p.style.display = isYearly ? 'none' : 'block');
        document.querySelectorAll('.addon-price-yearly').forEach(p => p.style.display = isYearly ? 'block' : 'none');
    }

    function updateSummary() {
        if (!formData.plan) return;

        const planName = formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1);
        const billingCycle = formData.billing === 'monthly' ? 'Monthly' : 'Yearly';
        const planPrice = prices.plans[formData.plan][formData.billing];

        document.querySelector('.summary-plan-name').textContent = `${planName} (${billingCycle})`;
        document.querySelector('.summary-plan-price').textContent = `$${planPrice}/${formData.billing === 'monthly' ? 'mo' : 'yr'}`;

        const summaryAddons = document.querySelector('.summary-addons');
        summaryAddons.innerHTML = '';
        let total = planPrice;

        formData.addons = [];
        document.querySelectorAll('input[name="addon"]:checked').forEach(checkbox => {
            formData.addons.push(checkbox.value);
        });

        formData.addons.forEach(addon => {
            const addonName = addon.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const addonPrice = prices.addons[addon][formData.billing];
            total += addonPrice;

            const addonItem = document.createElement('div');
            addonItem.classList.add('summary-addon-item');
            addonItem.innerHTML = `
                <p>${addonName}</p>
                <p class="addon-price">+$${addonPrice}/${formData.billing === 'monthly' ? 'mo' : 'yr'}</p>
            `;
            summaryAddons.appendChild(addonItem);
        });

        document.querySelector('.total-price').textContent = `+$${total}/${formData.billing === 'monthly' ? 'mo' : 'yr'}`;
        document.querySelector('.summary-total p:first-child').textContent = `Total (per ${formData.billing === 'monthly' ? 'month' : 'year'})`;
    }

    nextBtn.addEventListener('click', () => {
        let isValid = false;
        if (currentStep === 0) {
            isValid = validateStep1();
        } else if (currentStep === 1) {
            isValid = validateStep2();
        } else {
            isValid = true; 
        }

        if (isValid) {
            if (currentStep < steps.length - 2) { 
                currentStep++;
                if (currentStep === steps.length - 2) { 
                    updateSummary();
                }
                updateStep();
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateStep();
        }
    });

    confirmBtn.addEventListener('click', () => {
        if (currentStep === steps.length - 2) { 
            currentStep = steps.length - 1;
            updateStep();
        }
    });

    billingSwitch.addEventListener('change', () => {
        updateBillingCycle();
        updateSummary();
    });

    planCards.forEach(card => {
        card.addEventListener('click', () => {
            planCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            formData.plan = card.dataset.plan;
        });
    });

    addonCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const checkbox = card.querySelector('input[type="checkbox"]');
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
            }
            card.classList.toggle('selected', checkbox.checked);
        });
    });

    changePlanBtn.addEventListener('click', () => {
        currentStep = 1;
        updateStep();
    });


    updateStep();
    updateBillingCycle();

    
    console.log('Initial currentStep:', currentStep);
    steps.forEach((step, i) => {
        console.log(`Step ${i + 1} has active class:`, step.classList.contains('active'));
    });
});




document.addEventListener('DOMContentLoaded', () => {

  const container = document.querySelector('.button-container');
  const buttons = container.querySelectorAll('button');

  function updateContainerAlignment() {
    const visibleButtons = [...buttons].filter(btn => btn.offsetParent !== null);
    if (visibleButtons.length === 1) {
      container.classList.add('single-button');
    } else {
      container.classList.remove('single-button');
    }
  }

  function updateStep() {
    updateContainerAlignment();
  }

  updateStep();
});

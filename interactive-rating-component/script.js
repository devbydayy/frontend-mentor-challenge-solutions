
        document.addEventListener('DOMContentLoaded', () => {
            const ratingButtons = document.querySelectorAll('.rating-btn');
            const submitBtn = document.getElementById('submitBtn');
            const ratingCard = document.getElementById('ratingCard');
            const thankYouCard = document.getElementById('thankYouCard');
            const ratingResult = document.getElementById('ratingResult');
            let selectedRating = null;

            ratingButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    ratingButtons.forEach(btn => {
                        btn.classList.remove('selected');
                    });
                    event.target.classList.add('selected');
                    selectedRating = event.target.value;
                });
            });

            submitBtn.addEventListener('click', () => {
                if (selectedRating) {
                    ratingResult.textContent = `You selected ${selectedRating} out of 5`;
                    ratingCard.classList.add('hide-rating');
                    thankYouCard.classList.add('show-thank-you');
                } else {
                    console.log('Please select a rating before submitting.');
                }
            });
        });

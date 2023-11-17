// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const feedbackListContainer = document.getElementById('feedbackListContainer');
    const feedbackList = document.getElementById('feedbackList');

    // Function to fetch and display patient feedbacks
    function fetchAndDisplayFeedbacks() {
        fetch('/doctor-view-feedbacks')
            .then(response => response.json())
            .then(data => {
                // Clear existing feedbacks before appending new ones
                feedbackList.innerHTML = '';

                data.forEach(feedback => {
                    const feedbackItem = document.createElement('div');
                    feedbackItem.textContent = JSON.stringify(feedback);
                    feedbackList.appendChild(feedbackItem);
                });

                // Show the feedback list container
                feedbackListContainer.style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
    }

    // Add click event listener to the "View Patient Feedbacks" button
    document.getElementById('viewFeedbacksBtn').addEventListener('click', fetchAndDisplayFeedbacks);
});

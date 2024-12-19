const plusButtons = document.querySelectorAll('.score-plus');
const minusButtons = document.querySelectorAll('.score-minus');
const editToggle = document.querySelector('.editcommentAyxan');
const editButton = document.querySelector('.each-comment-edit-button'); 
const commentContent = document.querySelector('.commentJulia');
const julianinCommenti = document.querySelector('.comment-replyingTo').innerHTML;

const ayxanText = document.querySelector('.ayxaninTexti')

// Add click event listener to toggle visibility
editButton.addEventListener('click', () => {
    // Check the current display value and toggle it
    if (editToggle.style.display === '' || editToggle.style.display === 'none') {
        editToggle.style.display = 'block'; // Show the element
    } else {
        editToggle.style.display = 'none'; // Hide the element
    }

    if (commentContent.style.display === '' || editToggle.style.display === 'block') {
        commentContent.style.display = 'none'; // Show the element
    } else {
        commentContent.style.display = 'block'; // Hide the element
    }
    ayxanText.innerHTML = julianinCommenti + " I couldn't agree more with this. Everything moves so fast and it always seems like everyone  knows the newest library/framework. But the fundamentals are what stay constant.";
    




});




// Handle upvoting
plusButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const scoreElement = button.parentElement.querySelector('.score-content');
        const currentScore = parseInt(scoreElement.textContent, 10);
        scoreElement.textContent = currentScore + 1;
    });
});

// Handle downvoting
minusButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const scoreElement = button.parentElement.querySelector('.score-content');
        const currentScore = parseInt(scoreElement.textContent, 10);
        if (currentScore > 0) {
            scoreElement.textContent = currentScore - 1;
        }
    });
});

// Reply functionality
const replyButtons = document.querySelectorAll('.each-comment-reply-button');
replyButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        // Find the comment element
        const comment = button.closest('.each-comment');

        // Create a reply box
        const replyBox = document.createElement('div');
        replyBox.classList.add('comment-form');
        replyBox.innerHTML = `
            <div class="comment-form-wrapper">
                <div class="comment-form-user-img">
                    <img src="assets/images/avatars/image-juliusomo.png" alt="">
                </div>
               <div class="comment-form-input">
                    <textarea placeholder="Add a reply..." class="reply-input"></textarea>
                </div>
                <div class="comment-form-submit">
                    <button class="comment-form-submit-button reply-submit-button" type="button">Reply</button>
                </div>
            </div>
        `;
 
        // Append the reply box to the comment
        comment.appendChild(replyBox);

        // Add functionality to the reply button inside the reply box
        replyBox.querySelector('.reply-submit-button').addEventListener('click', () => {
            const replyText = replyBox.querySelector('.reply-input').value.trim();
            if (replyText) {
                const newReply = document.createElement('div');
                newReply.classList.add('each-comment');
                newReply.innerHTML = `
                    <div class="each-comment-wrapper">
                        <div class="each-comment-aside">
                            <div class="score">
                                <div class="score-wrapper">
                                    <div class="score-plus">
                                        <img class="score-plus-img" src="assets/images/icon-plus.svg" alt="">
                                    </div>
                                    <div class="score-content">0</div>
                                    <div class="score-minus">
                                        <img class="score-minus-img" src="assets/images/icon-minus.svg" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="each-comment-main">
                            <div class="each-comment-header">
                                <img class="each-comment-user-img" src="assets/images/avatars/image-juliusomo.png" alt="">
                                <p class="each-comment-user-name">juliusomo</p>
                                <span class="user-badge">you</span>
                                <p class="each-comment-date">just now</p>
                            </div>
                            <div class="each-comment-content">
                                <p>${replyText}</p>
                            </div>
                        </div>
                    </div>
                `;
                comment.appendChild(newReply);
                replyBox.remove(); // Remove the reply box after replying
            }
        });
    });
});

// Delete functionality
const deleteButtons = document.querySelectorAll('.each-comment-delete-button');
const deleteModalOverlay = document.getElementById('deleteModalOverlay');
const cancelDeleteButton = document.getElementById('cancelDelete');
const confirmDeleteButton = document.getElementById('confirmDelete');

// Store the comment to be deleted
let commentToDelete = null;

// Show delete confirmation modal
deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Find the parent comment wrapper
        commentToDelete = button.closest('.each-comment');
        deleteModalOverlay.style.display = 'flex'; // Show modal
    });
});

// Cancel delete
cancelDeleteButton.addEventListener('click', () => {
    commentToDelete = null; // Reset the target
    deleteModalOverlay.style.display = 'none'; // Hide modal
});

// Confirm delete
confirmDeleteButton.addEventListener('click', () => {
    if (commentToDelete) {
        commentToDelete.remove(); // Remove the comment from the DOM
    }
    commentToDelete = null; // Reset the target
    deleteModalOverlay.style.display = 'none'; // Hide modal
});

// Add new comment functionality
document.addEventListener("DOMContentLoaded", function () {
    const commentForm = document.querySelector(".comment-form");
    const commentInput = document.querySelector("#comment-input");
    const commentsContainer = document.querySelector(".comments");

    // Add comment submit functionality
    document.querySelector(".comment-form-submit-button").addEventListener("click", function (e) {
        e.preventDefault(); // Prevent page refresh
        const newComment = commentInput.value.trim();

        if (newComment) {
            // Build HTML for the new comment
            const commentHTML = `
                <div class="each-comment">
                    <div class="each-comment-wrapper">
                        <div class="each-comment-aside">
                            <div class="score">
                                <div class="score-wrapper">
                                    <div class="score-plus">
                                        <img src="assets/images/icon-plus.svg" alt="Plus">
                                    </div>
                                    <div class="score-content">0</div>
                                    <div class="score-minus">
                                        <img src="assets/images/icon-minus.svg" alt="Minus">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="each-comment-main">
                            <div class="each-comment-header">
                                <img class="each-comment-user-img" src="assets/images/avatars/image-juliusomo.png" alt="User">
                                <p class="each-comment-user-name">juliusomo</p>
                                <span class="user-badge">you</span>
                                <p class="each-comment-date">just now</p>
                                <div class="each-comment-actions">
                                    <a class="each-comment-delete-button" href="#">
                                        <img src="assets/images/icon-delete.svg" alt="">
                                        <span class="each-comment-delete-button-text">Delete</span>
                                    </a>
                                    <a class="each-comment-reply-button" href="#">
                                        <img src="assets/images/icon-reply.svg" alt="">
                                        <span class="each-comment-reply-button-text">Reply</span>
                                    </a>
                                </div>
                            </div>
                            <div class="each-comment-content">
                                <p>${newComment}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Add the new comment to the page
            commentsContainer.insertAdjacentHTML("beforeend", commentHTML);
            commentInput.value = ""; // Clear the input
        }
    });
});


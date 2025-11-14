// Get references to the HTML elements we need to interact with
const userCardDiv = document.getElementById('user-card');
const fetchBtn = document.getElementById('fetch-btn');

/**
 * Fetches a new user from the randomuser.me API
 * and displays their information on the card.
 */
function fetchUser() {
    
    // Show a loading message while fetching
    userCardDiv.innerHTML = '<p>Loading user...</p>';

    // Use the fetch API to get data from the URL
    fetch('https://randomuser.me/api/')
        .then(response => response.json()) // Convert the response to JSON
        .then(data => {
            // The user data is in the 'results' array
            const user = data.results[0];
            
            // Extract the data we want
            const name = `${user.name.first} ${user.name.last}`;
            const email = user.email;
            const phone = user.phone;
            const imageUrl = user.picture.large;
            const country = user.location.country;

            // Create new HTML to display the user data
            const userHtml = `
                <img src="${imageUrl}" alt="Profile picture of ${name}">
                <h2>${name}</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Country:</strong> ${country}</p>
            `;
            
            // Update the user card's content
            userCardDiv.innerHTML = userHtml;
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error fetching user:', error);
            userCardDiv.innerHTML = '<p>Sorry, could not fetch a user. Please try again.</p>';
        });
}

// 1. Add an event listener to the button.
//    This will call the fetchUser function every time the button is clicked.
fetchBtn.addEventListener('click', fetchUser);

// 2. Call the function once when the page first loads
//    so the user sees a profile immediately.
document.addEventListener('DOMContentLoaded', fetchUser);
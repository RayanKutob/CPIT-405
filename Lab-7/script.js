const ACCESS_KEY = 'civyh64T5MQ3h8Yh-5D6njWC6ehGN7-mkIIXma5Rj1E';
const searchInput = document.getElementById('searchInput');
const btnXhr = document.getElementById('btnXhr');
const btnFetchPromises = document.getElementById('btnFetchPromises');
const btnFetchAsync = document.getElementById('btnFetchAsync');
const imageGrid = document.getElementById('imageGrid');

btnXhr.addEventListener('click', searchWithXHR);
btnFetchPromises.addEventListener('click', searchWithFetchPromises);
btnFetchAsync.addEventListener('click', searchWithAsyncAwait);

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchWithAsyncAwait();
    }
});


function getQuery() {
    return searchInput.value;
}

function displayImages(photos) {
    imageGrid.innerHTML = '';

    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.urls.small; 
        img.alt = photo.alt_description;

        imageGrid.appendChild(img);
    });
}

//  Method 1: XMLHTTPRequest (XHR)
function searchWithXHR() {
    const query = getQuery();
    if (!query) return; 

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12`;
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    
    xhr.setRequestHeader('Authorization', `Client-ID ${ACCESS_KEY}`);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayImages(data.results);
        } else {
            console.error('XHR Request Failed:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('XHR Network Error');
    };

    xhr.send();
}

//  Method 2: Fetch with Promises (.then)
function searchWithFetchPromises() {
    const query = getQuery();
    if (!query) return;

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12`;

    fetch(url, {
        headers: {
            'Authorization': `Client-ID ${ACCESS_KEY}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        displayImages(data.results);
    })
    .catch(error => {
        console.error('Fetch Promises Error:', error);
    });
}

//  Method 3: Fetch with Async/Await
async function searchWithAsyncAwait() {
    const query = getQuery();
    if (!query) return;

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Client-ID ${ACCESS_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        displayImages(data.results);

    } catch (error) {
        console.error('Async/Await Error:', error);
    }
}
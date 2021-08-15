const form = document.getElementById('add-bookmark-form');
const bookmarksSection = document.getElementById('bookmarks-section');
const wName = document.getElementById('w_name');
const wUrl = document.getElementById('w_url');
const note = document.getElementById('note');
let bookmarks = [];

// Fetch Bookmarks from local storage
fetchBookmarks = () => {
        if (localStorage.getItem('bookmarks')) {
            bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        } else {
            bookmarks = [{
                wName: 'Google',
                wUrl: 'https://google.com',
                note: ''
            }];
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
        buildBookmarks();
    }
    // Delete a bookmark
deleteBookmark = (url) => {
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.wUrl == url) {
            bookmarks.splice(i, 1);
        }
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// Build bookmarks DOM
buildBookmarks = () => {
    //Remove all previous bookmarks
    bookmarksSection.textContent = '';
    bookmarks.forEach((bookmark) => {
        const { wName, wUrl, note } = bookmark;
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('bookmark');
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const cardLink = document.createElement('a');
        cardLink.setAttribute('href', wUrl);
        cardLink.setAttribute('target', '_blank');
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = wName;
        cardLink.append(cardTitle);
        const cardSubtitle = document.createElement('h6');
        cardSubtitle.classList.add('card-subtitle');
        cardSubtitle.classList.add('mb-2');
        cardSubtitle.classList.add('text-muted');
        cardSubtitle.innerText = wUrl;
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerText = note;
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('close-icon');
        closeIcon.classList.add('fa');
        closeIcon.classList.add('fa-times');
        closeIcon.setAttribute('onClick', `deleteBookmark('${wUrl}')`);
        cardBody.append(cardLink, cardSubtitle, cardText);
        card.append(closeIcon, cardBody);
        bookmarksSection.append(card);
    });
}

form.addEventListener('submit', function(event) {
    let isValid = form.checkValidity();
    form.classList.add('was-validated');
    if (isValid === false) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        const wNameValue = wName.value;
        const wUrlValue = wUrl.value;
        const noteValue = note.value;
        const bookmark = {
            wName: wNameValue,
            wUrl: wUrlValue,
            note: noteValue,
        };
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}, false);

fetchBookmarks();
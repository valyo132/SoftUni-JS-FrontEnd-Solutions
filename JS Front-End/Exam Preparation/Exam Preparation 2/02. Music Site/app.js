window.addEventListener('load', solve);

function solve() {
    const [genreInput, nameInput, authorInput, dateInput] = document.querySelectorAll('input');

    const allHitsContainer = document.getElementsByClassName('all-hits-container')[0];
    const savedContainer = document.getElementsByClassName('saved-container')[0];
    const totalLikesForm = document.querySelectorAll('#total-likes .likes p')[0];

    const addBtn = document.getElementById('add-btn');

    let totalLikes = 0;

    addBtn.addEventListener('click', function(event){
        event.preventDefault();

        if (genreInput.value.length !== 0 && nameInput.value.length !== 0 && authorInput.value.length !== 0 && dateInput.value.length !== 0){
            const div = craeteElement('div', 'none', 'hits-info');

            const img = document.createElement('img');
            img.src = './static/img/img.png';
            div.appendChild(img);

            div.appendChild(craeteElement('h2', `Genre: ${genreInput.value}`, 'none'));
            div.appendChild(craeteElement('h2', `Name: ${nameInput.value}`, 'none'));
            div.appendChild(craeteElement('h2', `Author: ${authorInput.value}`, 'none'));
            div.appendChild(craeteElement('h3', `Date: ${dateInput.value}`, 'none'));

            const saveBtn = craeteElement('button', `Save song`, 'save-btn')
            div.appendChild(saveBtn);
            saveBtn.addEventListener('click', saveSong);
            const likeSongBtn = craeteElement('button', `Like song`, 'like-btn')
            div.appendChild(likeSongBtn);
            likeSongBtn.addEventListener('click', likeSong);
            const deleteBtn = craeteElement('button', `Delete`, 'delete-btn')
            div.appendChild(deleteBtn);
            deleteBtn.addEventListener('click', deleteSong);

            allHitsContainer.appendChild(div);
        }

        genreInput.value = '';
        nameInput.value = '';
        authorInput.value = '';
        dateInput.value = '';
    });

    function deleteSong(event){
        const songDiv = event.currentTarget.parentNode;
        songDiv.remove();
    }

    function saveSong(event){
        const songDiv = event.currentTarget.parentNode;

        const saveBtn = songDiv.querySelector('.save-btn');
        saveBtn.remove();
        const likeBtn = songDiv.querySelector('.like-btn');
        likeBtn.remove();

        savedContainer.appendChild(songDiv);
    }

    function likeSong(event){
        totalLikesForm.innerHTML = `Total Likes: ${++totalLikes}`;
        event.target.disabled = true;
    }

    function craeteElement(type, content, classOf){
        let item = document.createElement(type);

        if (content != 'none'){
            item.textContent = content;
        }

        if (classOf != 'none'){
            item.classList.add(classOf);
        }

        return item;
    }
}
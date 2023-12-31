function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/blog/';

    const btnLoadPosts = document.getElementById('btnLoadPosts');
    const btnViewPost = document.getElementById('btnViewPost');

    const postsSelect = document.getElementById('posts');
    const postComments = document.getElementById('post-comments');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');

    let allPosts = {};
    let allComments = {};

    btnLoadPosts.addEventListener('click', async ()=>{
        postsSelect.innerHTML = '';

        const response = await fetch(baseUrl + 'posts');
        allPosts = await response.json();

        for (const [postKey, postObj] of Object.entries(allPosts)) {
            let option = document.createElement('option');
            option.value = postKey;
            option.textContent = postObj.title;

            postsSelect.appendChild(option);
        }
    });

    btnViewPost.addEventListener('click', async ()=>{
        postComments.innerHTML = '';

        const response = await fetch(baseUrl + 'comments');
        allComments = await response.json();

        let currentPost = allPosts[postsSelect.value];

        for (const [commentId, commentObj] of Object.entries(allComments)) {
            if (commentObj.postId == currentPost.id){
                let li = document.createElement('li');
                li.textContent = commentObj.text;

                postComments.appendChild(li);
            }
        }

        postTitle.textContent = currentPost.title;
        postBody.textContent = currentPost.body;
    });
}

attachEvents();
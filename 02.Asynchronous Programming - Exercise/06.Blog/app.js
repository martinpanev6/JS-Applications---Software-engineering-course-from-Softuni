function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener("click", loadPosts);
    document.getElementById("btnViewPost").addEventListener("click", viewPost);
    const selectRef = document.getElementById("posts");
    const postTitleRef = document.getElementById("post-title");
    const postBodyRef = document.getElementById("post-body");
    const postCommnetsRef = document.getElementById("post-comments")

    const endpoints = {
        allPost: "http://localhost:3030/jsonstore/blog/posts",
        allCommnets: "http://localhost:3030/jsonstore/blog/comments"
    };

    async function loadPosts(ev){
        const response = await fetch(endpoints.allPost);
        const data = await response.json();
        selectRef.innerHTML = "";
        Object.values(data).forEach(post => {
            selectRef.appendChild(createOption(post));
        });
    }

    function createOption(data){
        const op = document.createElement("option");
        op.value = data.id;
        op.textContent = data.title;
        return op;
    }

    async function viewPost(ev){
        const currentPostId = selectRef.selectedOptions[0].value;

        const responseWithSinglePost = await fetch(endpoints.allPost);
        const dataSinglePost = await responseWithSinglePost.json();
        const currentPost = Object.values(dataSinglePost).find(x => x.id === currentPostId);

        const responseComment = await fetch(endpoints.allCommnets);
        const dataCommnets = await responseComment.json();

        const filteredComments = Object.values(dataCommnets).filter(x => x.postId == currentPostId);
        postTitleRef.textContent = currentPost.title;
        postBodyRef.textContent = currentPost.body;
        
        postCommnetsRef.innerHTML = "";
        filteredComments.forEach(c => {
            const li = document.createElement("li");
            li.id = c.id;
            li.textContent = c.text;
            postCommnetsRef.appendChild(li);
        })
    }
}

attachEvents();
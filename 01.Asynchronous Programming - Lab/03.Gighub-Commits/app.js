const list = document.getElementById("commits");

function loadCommits() {
    const username = document.getElementById("username").value;
    const repo = document.getElementById("repo").value;

    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    fetch(url)
        .then(onHeaders)
        .then(displayCommits)
        .catch(onError);

}

function onHeaders(responce){
    if(!responce.ok){
        throw 'Error';
    }

    return responce.json()
}

function displayCommits(data){
    list.replaceChildren(...data.map(createList));
}

function onError(error){
    list.innerHTML = `<li>Error: 404 Not Found</li>`
}

function createList({commit: {author: {name}, message}}){
    const item = document.createElement("li");
    item.textContent = `${name}: ${message}`;

    return item;
}
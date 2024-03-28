import { html, render } from "../node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
document.querySelector("form").addEventListener("submit", addItem);
const root = document.getElementById("menu");

onLoad();
async function onLoad(){
    const ressponse = await fetch(url);
    const data = await ressponse.json();
    const option = Object.values(data).map(x => optionTemp(x));
    update(option);
}

function optionTemp(data){
    return html`<option values=${data._id} >${data.text}</option>`;
}

function update(data){
    render(data, root);
}

function addItem(e) {
    e.preventDefault();
    const inputRef = document.getElementById("itemText");
    const text = inputRef.value;
    inputRef.value = "";
    addItemInDb({text});
}

async function addItemInDb(data){
    const ressponse = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    onLoad();
}
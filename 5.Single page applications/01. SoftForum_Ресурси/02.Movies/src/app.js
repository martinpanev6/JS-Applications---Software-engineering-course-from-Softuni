import { showRegisterView } from "./register.js";
import { showHome } from "./home.js"
import { getUserData } from "./userHelper.js";
import { showLogin } from "./login.js";
import { showLogout } from "./logout.js";

document.querySelectorAll("section").forEach(section => section.style.display = "none");
document.querySelector("nav").addEventListener("click", onNavigate);

const userNav = document.querySelectorAll("li.user");
const guestNav = document.querySelectorAll("li.guest");
const userMSG = document.getElementById("welcome-msg");



const routes = {
    "/": showHome,
    "/register": showRegisterView,
    "/home": showHome,
    "/login": showLogin,
    "/logout": showLogout
};

export function onNavigate(e){

    if(e.target.tagName !== "A" || !e.target.href){
        return;
    }

    e.preventDefault();
    const url = new URL(e.target.href);
    const path = url.pathname;
    routes[path]();
}

export function updateNav(){
    const userData = getUserData();
    if(userData){
        userNav.forEach(x => {
            x.style.display = "block";
        });
        guestNav.forEach(x => {
            x.style.display = "none";
        });
        userMSG.textContent = `Welcome, ${userData.email}`;
    }else{
        userNav.forEach(x => {
            x.style.display = "none";
        });
        guestNav.forEach(x => {
            x.style.display = "block";
        });
        userMSG.textContent = "";
    }
}

updateNav();
showHome();
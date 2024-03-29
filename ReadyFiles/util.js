export function getUserData(){
    return JSON.parse(localStorage.getItem('user'));
}

export function saveUserData(data){
    localStorage.setItem('user', JSON.stringify(data));
}

export function clearUserData(){
    localStorage.removeItem('user');
}

export function getUserId(){
    return getUserData()?._id;
}

export function getUserToken(){
    return getUserData()?.accessToken;
}

export function createSubmitHandler(callback){
    return function (event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const entries =  [...formData.entries()].map(([k, v]) => [k, v.trim()]);

        callback(Object.fromEntries(entries));
    }
}
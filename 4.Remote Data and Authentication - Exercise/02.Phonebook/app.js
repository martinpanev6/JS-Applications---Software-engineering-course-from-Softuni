function attachEvents() {
    const url = "http://localhost:3030/jsonstore/phonebook";
    const ulRef = document.getElementById("phonebook");

    document.getElementById("btnLoad").addEventListener("click", onLoadRecords);
    document.getElementById("btnCreate").addEventListener("click", onCreateRec);

    async function onCreateRec(e){
        let personRef = document.getElementById("person");
        let phoneRef = document.getElementById("phone");

        let person = personRef.value;
        let phone = phoneRef.value;

        if(!person || !phone){
            return;
        }

        let data = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({person, phone})
        };

        await fetch(url, data);

        personRef.value = "";
        phoneRef.value = "";

        onLoadRecords();
    }

    async function onLoadRecords(e){
        let res = await fetch(url);
        let data = await res.json();
        ulRef.innerHTML = "";
        Object.values(data).forEach(rec =>{
            createAndAppendLi(rec);
        });
    }

    function createAndAppendLi(rec){
        let li = document.createElement("li");
        li.textContent = `${rec.person}: ${rec.phone}`;

        let btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.dataset.id = rec._id;
        btn.addEventListener("click", onDelete);
        li.appendChild(btn);

        ulRef.appendChild(li);
    }

    async function onDelete(e){
        let id = e.target.dataset.id;
        await fetch(url + "/" + id, {
            method: "DELETE",
        });
        onLoadRecords();
    }
}

attachEvents();
let employees = [];
let selectedGender = "";

const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");
const noData = document.getElementById("noData");

// SAVE
document.getElementById("saveBtn").onclick = () => {

    const first = document.getElementById("firstName").value;
    const last = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;

    if (!selectedGender) {
        alert("Select gender");
        return;
    }

    const emp = {
        id: Math.floor(Math.random()*10000),
        name: first + " " + last,
        role: "Employee",
        email
    };

    employees.push(emp);
    render();
};

// RENDER
function render(filter="") {

    tableBody.innerHTML = "";

    let filtered = employees.filter(e =>
        e.name.toLowerCase().includes(filter.toLowerCase())
    );

    if(filtered.length === 0){
        noData.style.display = "block";
    } else {
        noData.style.display = "none";
    }

    filtered.forEach((e,i)=>{
        tableBody.innerHTML += `
        <tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.role}</td>
            <td>${e.email}</td>
            <td>
                <button onclick="del(${i})">Delete</button>
            </td>
        </tr>`;
    });
}

// DELETE
function del(i){
    employees.splice(i,1);
    render();
}

// SEARCH
search.oninput = e => render(e.target.value);

// GENDER
document.querySelectorAll(".gender-card").forEach(card=>{
    card.onclick = ()=>{
        selectedGender = card.getAttribute("data");

        document.querySelectorAll(".gender-card").forEach(c=>c.classList.remove("active"));
        card.classList.add("active");
    }
});

// SECTION COMPLETE
document.querySelectorAll(".highlighting-section").forEach(section=>{
    const inputs = section.querySelectorAll("input");

    inputs.forEach(input=>{
        input.addEventListener("input", ()=>{
            let filled = true;
            inputs.forEach(i=>{
                if(i.value==="") filled=false;
            });
            section.classList.toggle("completed", filled);
        });
    });
});
let data=[],editIndex=null,backup={},gender=null;

const form=document.getElementById("form");
const table=document.getElementById("table");
const saveBtn=document.getElementById("saveBtn");

// enable submit
form.addEventListener("input",()=>{
saveBtn.disabled=!form.checkValidity()||!gender;
});

// gender
document.querySelectorAll(".gender-card").forEach(c=>{
c.onclick=()=>{
gender=c.getAttribute("data");
document.querySelectorAll(".gender-card").forEach(x=>x.classList.remove("active"));
c.classList.add("active");

formBox.classList.remove("male","female");
formBox.classList.add(gender.toLowerCase());
};
});

// photo preview
photo.onchange=()=>{
let file=photo.files[0];
if(file){
let r=new FileReader();
r.onload=e=>{
preview.src=e.target.result;
preview.style.display="block";
};
r.readAsDataURL(file);
}
};

// submit
form.onsubmit=e=>{
e.preventDefault();

if(data.some(d=>d.phone===phone.value)){
show("Phone exists");return;
}

let emp={
fname:fname.value,
lname:lname.value,
phone:phone.value,
role:role.value,
photo:preview.src,
gender,
show:false
};

data.push(emp);
backup={...emp};

render();
form.reset();preview.style.display="none";gender=null;
show("Submitted");
};

// render
function render(filter=""){
table.innerHTML="";
data.filter(e=>e.fname.toLowerCase().includes(filter.toLowerCase()))
.forEach((e,i)=>{
table.innerHTML+=`
<tr>
<td><img src="${e.photo}"> ${e.fname} ${e.lname}</td>
<td>${e.role}</td>
<td>${e.phone}</td>
<td>
<button onclick="toggle(${i})">Details</button>
<button onclick="edit(${i})">Edit</button>
<button onclick="del(${i})">Delete</button>
</td>
</tr>
${e.show?`<tr><td colspan="4">${e.gender}</td></tr>`:""}
`;
});
}

// search
search.oninput=e=>render(e.target.value);

// toggle
function toggle(i){data[i].show=!data[i].show;render()}

// edit
function edit(i){
editIndex=i;modal.style.display="block";
editF.value=data[i].fname;
editL.value=data[i].lname;
editPhone.value=data[i].phone;
backup={...data[i]};
}

// update
function update(){
data[editIndex].fname=editF.value;
data[editIndex].lname=editL.value;
data[editIndex].phone=editPhone.value;
modal.style.display="none";render();show("Updated");
}

// undo
function undoForm(){
Object.keys(backup).forEach(k=>{
if(document.getElementById(k))document.getElementById(k).value=backup[k];
});
}
function undoEdit(){Object.assign(data[editIndex],backup);render()}

// delete
function del(i){
if(confirm("Delete?")){data.splice(i,1);render();show("Deleted")}
}

function closeModal(){modal.style.display="none"}

// toast
function show(m){
toast.innerText=m;toast.style.display="block";
setTimeout(()=>toast.style.display="none",2000);
}

// pincode api
pincode.onblur=async()=>{
if(pincode.value.length===6){
let r=await fetch(`https://api.postalpincode.in/pincode/${pincode.value}`);
let d=await r.json();
if(d[0].Status==="Success"){
state.value=d[0].PostOffice[0].State;
city.value=d[0].PostOffice[0].District;
show("Auto-filled");
}
}
};
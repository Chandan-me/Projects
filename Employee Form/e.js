let employees = [];
let editIndex = null;
const STORAGE_KEY = 'employees';
const ADMIN_PASSWORD = 'admin123';
let selectedGender = '';
let selectedEditGender = '';

// Elements
const form = document.getElementById('form');
const tableBody = document.getElementById('tableBody');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');
const updateBtn = document.getElementById('updateBtn');
const cancelBtn = document.getElementById('cancelBtn');
const search = document.getElementById('search');
const toast = document.getElementById('toast');

// File input elements
const photoInput = document.getElementById('photo');
const filePreview = document.getElementById('filePreview');
const fileNameEl = document.getElementById('fileName');
const removeFile = document.getElementById('removeFile');

// Form inputs
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const roleInput = document.getElementById('role');
const emailInput = document.getElementById('email');
const fatherNameInput = document.getElementById('fatherName');
const motherNameInput = document.getElementById('motherName');
const streetInput = document.getElementById('street');
const street2Input = document.getElementById('street2');
const areaInput = document.getElementById('area');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');
const postalInput = document.getElementById('postal');
const phoneInput = document.getElementById('phone');
const whatsappPhoneInput = document.getElementById('whatsappPhone');
const contactEmailInput = document.getElementById('contactEmail');
const birthdayInput = document.getElementById('birthday');
const aadhaarInput = document.getElementById('AadhaarNumber');
const panInput = document.getElementById('PanNumber');
const spouseNameInput = document.getElementById('spouseName');
const genderCards = document.querySelectorAll('#genderGroup .gender-card');
const maritalCards = document.querySelectorAll('.marital-card');

// Modal inputs
const editFirstName = document.getElementById('editFirstName');
const editLastName = document.getElementById('editLastName');
const editRole = document.getElementById('editRole');
const editEmail = document.getElementById('editEmail');
const editFatherName = document.getElementById('editFatherName');
const editMotherName = document.getElementById('editMotherName');
const editStreet = document.getElementById('editStreet');
const editStreet2 = document.getElementById('editStreet2');
const editArea = document.getElementById('editArea');
const editCity = document.getElementById('editCity');
const editState = document.getElementById('editState');
const editPostal = document.getElementById('editPostal');
const editPhone = document.getElementById('editPhone');
const editWhatsappPhone = document.getElementById('editWhatsappPhone');
const editAadhaarNumber = document.getElementById('editAadhaarNumber');
const editPanNumber = document.getElementById('editPanNumber');
const editSpouseName = document.getElementById('editSpouseName');
const editDob = document.getElementById('editDob');
const editAge = document.getElementById('editAge');
const editGenderCards = document.querySelectorAll('#editGenderGroup .gender-card');
const editMaritalCards = document.querySelectorAll('#editMaritalGroup .marital-card');

// Modal photo elements
const editPhotoInput = document.getElementById('editPhoto');
const editFilePreview = document.getElementById('editFilePreview');
const editFileNameEl = document.getElementById('editFileName');
const editRemoveFile = document.getElementById('editRemoveFile');

// DOB and Age elements
const dob = document.getElementById('dob');
const ageInput = document.getElementById('age');
let selectedMarital = '';
let selectedEditMarital = '';

// Helper: toast
function showToast(msg){
    if(!toast) return;
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(()=> toast.style.display = 'none', 2200);
}

function loadEmployees(){
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : [];
        employees = Array.isArray(parsed) ? parsed.map(normalizeEmployee) : [];
    } catch (_) {
        employees = [];
    }
}

function saveEmployees(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

function normalizeDateValue(value){
    if(!value) return '';
    if(/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

    const parsed = new Date(value);
    if(Number.isNaN(parsed.getTime())) return '';

    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function generateEmployeeId(){
    let id;
    do {
        id = Math.floor(10000 + Math.random() * 90000).toString();
    } while (employees.some(emp => emp.id === id));
    return id;
}

function normalizeEmployee(emp){
    const firstName = (emp.firstName || '').trim();
    const lastName = (emp.lastName || '').trim();
    let id = emp.id;

    // Backward compatibility: old records may only have "name"
    if((!firstName || !lastName) && emp.name){
        const parts = String(emp.name).trim().split(/\s+/);
        if(!firstName) emp.firstName = parts[0] || '';
        if(!lastName) emp.lastName = parts.slice(1).join(' ');
    }

    if(!id || !/^\d{5}$/.test(String(id))){
        id = generateEmployeeId();
    }

    return {
        id: String(id),
        firstName: (emp.firstName || '').trim(),
        lastName: (emp.lastName || '').trim(),
        role: (emp.role || '').trim(),
        email: (emp.email || '').trim(),
        fatherName: (emp.fatherName || '').trim(),
        motherName: (emp.motherName || '').trim(),
        street: (emp.street || '').trim(),
        street2: (emp.street2 || '').trim(),
        area: (emp.area || '').trim(),
        city: (emp.city || '').trim(),
        state: (emp.state || '').trim(),
        postal: (emp.postal || '').trim(),
        phone: (emp.phone || '').trim(),
        whatsappPhone: (emp.whatsappPhone || '').trim(),
        aadhaarNumber: (emp.aadhaarNumber || '').trim(),
        panNumber: (emp.panNumber || '').trim(),
        spouseName: (emp.spouseName || '').trim(),
        dob: normalizeDateValue(emp.dob),
        age: (emp.age || '').trim(),
        photoName: (emp.photoName || '').trim(),
        photoData: (emp.photoData || ''),
        gender: (emp.gender || '').trim(),
        maritalStatus: (emp.maritalStatus || '').trim()
    };
}

// Add employee
form.addEventListener('submit', e => {
    e.preventDefault();

    if(!selectedGender){
        showToast('Please select Male or Female');
        return;
    }

    if (employees.some(emp => emp.phone === phoneInput.value.trim() && editIndex === null)) {
    showToast("Phone number already exists!");
    return;
}

    const emp = {
        id: generateEmployeeId(),
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        role: roleInput.value.trim(),
        email: emailInput.value.trim(),
        fatherName: fatherNameInput.value.trim(),
        motherName: motherNameInput.value.trim(),
        street: streetInput.value.trim(),
        street2: street2Input.value.trim(),
        area: areaInput.value.trim(),
        city: cityInput.value.trim(),
        state: stateInput.value.trim(),
        postal: postalInput.value.trim(),
        phone: phoneInput.value.trim(),
        whatsappPhone: whatsappPhoneInput.value.trim(),
        aadhaarNumber: aadhaarInput.value.trim(),
        panNumber: panInput.value.trim(),
        spouseName: spouseNameInput.value.trim(),
        dob: normalizeDateValue(dob.value),
        age: ageInput.value.trim(),
        gender: selectedGender,
        maritalStatus: selectedMarital,
        photoName: currentFormPhotoName,
        photoData: currentFormPhotoData
    };

    employees.push(emp);
    saveEmployees();
    render();
    form.reset();
    // hide preview and reset photo
    if(filePreview){ filePreview.style.display = 'none'; const td = document.querySelector('.file-drop-text'); if(td) td.style.display='block'; const img = filePreview.querySelector('img.file-thumb'); if(img) img.remove(); }
    currentFormPhotoData = '';
    currentFormPhotoName = '';
    selectedGender = '';
    syncGenderSelection(genderCards, '');
    initFloatingLabels();
    showToast('Employee Added ✅');
});

// Render table
function render(filter = ''){
    tableBody.innerHTML = '';
    employees
        .filter(emp => {
            const searchText = `${emp.id} ${emp.firstName} ${emp.lastName}`.toLowerCase();
            return searchText.includes(filter.toLowerCase());
        })
        .forEach((emp, i) => {
            const name = `${emp.firstName} ${emp.lastName}`.trim();
            tableBody.innerHTML += `\
            <tr>\
                <td>${escapeHtml(emp.id || '')}</td>\
                <td>${escapeHtml(name)}</td>\
                <td>${escapeHtml(emp.role || '')}</td>\
                <td>${escapeHtml(emp.email || emp.contactEmail || '')}</td>\
                <td>\
                    <button class="edit" onclick="edit(${i})">Edit</button>\
                    <button class="delete" onclick="removeEmp(${i})">Delete</button>\
                </td>\
            </tr>`;
        });
}

// Escape simple HTML to avoid injection when rendering
function escapeHtml(str){
    if(!str) return '';
    return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[s]);
}

// Edit flow: open modal and populate
function edit(i){
    editIndex = i;
    const emp = employees[i];
    if(!emp) return;

    editFirstName.value = emp.firstName || '';
    editLastName.value = emp.lastName || '';
    editRole.value = emp.role || '';
    editEmail.value = emp.email || '';
    editFatherName.value = emp.fatherName || '';
    editMotherName.value = emp.motherName || '';
    editStreet.value = emp.street || '';
    editStreet2.value = emp.street2 || '';
    editArea.value = emp.area || '';
    editCity.value = emp.city || '';
    editState.value = emp.state || '';
    editPostal.value = emp.postal || '';
    editPhone.value = emp.phone || '';
    editWhatsappPhone.value = emp.whatsappPhone || '';
    editAadhaarNumber.value = emp.aadhaarNumber || '';
    editPanNumber.value = emp.panNumber || '';
    editSpouseName.value = emp.spouseName || '';
    editDob.value = normalizeDateValue(emp.dob);
    editAge.value = emp.age || '';
    selectedEditGender = emp.gender || '';
    selectedEditMarital = emp.maritalStatus || '';

    // Load existing photo if present
    if(editPhotoInput) editPhotoInput.value = '';
    if(editFilePreview){
        editFilePreview.style.display = 'none';
        const editDropText = editFilePreview.parentElement.querySelector('.file-drop-text');
        if(editDropText) editDropText.style.display = 'block';
        const thumbImg = editFilePreview.querySelector('img.file-thumb');
        if(thumbImg) thumbImg.remove();
    }

    if(emp.photoData && editFilePreview){
        if(editFileNameEl) editFileNameEl.textContent = emp.photoName || 'photo.jpg';
        editFilePreview.style.display = 'flex';
        const editDropText = editFilePreview.parentElement.querySelector('.file-drop-text');
        if(editDropText) editDropText.style.display = 'none';
        let img = editFilePreview.querySelector('img.file-thumb');
        if(!img){
            img = document.createElement('img');
            img.className = 'file-thumb';
            editFilePreview.insertBefore(img, editFilePreview.firstChild);
        }
        img.src = emp.photoData;
    }

    syncGenderSelection(editGenderCards, selectedEditGender);
    syncMaritalSelection(editMaritalCards, selectedEditMarital);

    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    initFloatingLabels();
}

// expose edit/remove functions on window so inline onclick works
window.edit = edit;

// Update
updateBtn.addEventListener('click', ()=>{
    if(editIndex === null) return;
    const emp = employees[editIndex];
    emp.firstName = editFirstName.value.trim();
    emp.lastName = editLastName.value.trim();
    emp.role = editRole.value.trim();
    emp.email = editEmail.value.trim();
    emp.fatherName = editFatherName.value.trim();
    emp.motherName = editMotherName.value.trim();
    emp.street = editStreet.value.trim();
    emp.street2 = editStreet2.value.trim();
    emp.area = editArea.value.trim();
    emp.city = editCity.value.trim();
    emp.state = editState.value.trim();
    emp.postal = editPostal.value.trim();
    emp.phone = editPhone.value.trim();
    emp.whatsappPhone = editWhatsappPhone.value.trim();
    emp.aadhaarNumber = editAadhaarNumber.value.trim();
    emp.panNumber = editPanNumber.value.trim();
    emp.spouseName = editSpouseName.value.trim();
    emp.dob = normalizeDateValue(editDob.value);
    emp.age = editAge.value.trim();
    emp.gender = selectedEditGender;
    emp.maritalStatus = selectedEditMarital;
    // photoData is already set by the photo upload handler, just preserve it

    saveEmployees();
    render();
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    showToast('Updated ✏️');
});

// Cancel modal
if(cancelBtn) cancelBtn.addEventListener('click', ()=>{ modal.style.display = 'none'; document.body.classList.remove('modal-open'); });

// Delete
function removeEmp(i){
    const emp = employees[i];
    if(!emp) return;

    const name = `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Unknown';
    const confirmed = confirm(`Do you want to delete employee ${name} (ID: ${emp.id})?`);
    if(!confirmed) return;

    const password = prompt('Enter administrator password to confirm deletion:');
    if(password === null) return;

    if(password !== ADMIN_PASSWORD){
        showToast('Invalid admin password');
        return;
    }

    employees.splice(i,1);
    saveEmployees();
    render();
    showToast(`Deleted ${name} (${emp.id}) ❌`);
}
window.removeEmp = removeEmp;

// Close modal
closeBtn.onclick = () => { modal.style.display = 'none'; document.body.classList.remove('modal-open'); };

// Search
if(search) search.oninput = e => render(e.target.value);

// Sort by name
function sortByName(){
    employees.sort((a,b)=> (a.firstName+' '+a.lastName).localeCompare(b.firstName+' '+b.lastName));
    saveEmployees();
    render();
}
window.sortByName = sortByName;

// Floating label handlers: add .focused on focus, .filled when value present
function initFloatingLabels(){
    document.querySelectorAll('.input-group input, .input-group textarea').forEach(input => {
        const parent = input.closest('.input-group');
        if(!parent) return;

        const update = () => {
            if(input.value && input.value.toString().trim() !== '') parent.classList.add('filled');
            else parent.classList.remove('filled');
        };

        input.removeEventListener('focus', () => parent.classList.add('focused'));
        input.removeEventListener('blur',  () => parent.classList.remove('focused'));

        input.addEventListener('focus', () => parent.classList.add('focused'));
        input.addEventListener('blur',  () => parent.classList.remove('focused'));
        input.addEventListener('input', update);

        // init state
        update();
    });
}

function syncGenderSelection(cards, selectedValue){
    cards.forEach(card => {
        const value = card.getAttribute('data-gender') || card.getAttribute('data') || '';
        card.classList.remove('male', 'female');
        if(value === 'Male') card.classList.add('male');
        if(value === 'Female') card.classList.add('female');
        card.classList.toggle('active', value === selectedValue);
    });
}

function bindGenderCards(cards, setSelectedValue){
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const value = card.getAttribute('data-gender') || card.getAttribute('data') || '';
            setSelectedValue(value);
            syncGenderSelection(cards, value);
        });
    });
}

// Global to track form photo
let currentFormPhotoData = '';
let currentFormPhotoName = '';

bindGenderCards(genderCards, value => {
    selectedGender = value;
});

bindGenderCards(editGenderCards, value => {
    selectedEditGender = value;
});

function syncMaritalSelection(cards, selectedValue){
    cards.forEach(card => {
        const value = card.getAttribute('data-marital') || '';
        card.classList.toggle('active', value === selectedValue);
    });
}

function bindMaritalCards(cards, setSelectedValue){
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const value = card.getAttribute('data-marital') || '';
            setSelectedValue(value);
            syncMaritalSelection(cards, value);
        });
    });
}

bindMaritalCards(maritalCards, value => {
    selectedMarital = value;
});

bindMaritalCards(editMaritalCards, value => {
    selectedEditMarital = value;
});

// File upload preview and validation (JPEG/PNG only)
if(photoInput){
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(!file){
            return;
        }

        const allowed = ['image/png','image/jpeg'];
        if(!allowed.includes(file.type)){
            showToast('Only JPEG and PNG files are allowed');
            photoInput.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Data = event.target.result;
            currentFormPhotoData = base64Data;
            currentFormPhotoName = file.name;
            
            fileNameEl.textContent = file.name;
            filePreview.style.display = 'flex';
            const td = document.querySelector('.file-drop-text');
            if(td) td.style.display = 'none';

            let img = filePreview.querySelector('img.file-thumb');
            if(!img){
                img = document.createElement('img');
                img.className = 'file-thumb';
                filePreview.insertBefore(img, filePreview.firstChild);
            }
            img.src = base64Data;
        };
        reader.readAsDataURL(file);
    });

    if(removeFile){
        removeFile.addEventListener('click', (ev) => {
            ev.preventDefault();
            currentFormPhotoData = '';
            currentFormPhotoName = '';
            photoInput.value = '';
            filePreview.style.display = 'none';
            const td = document.querySelector('.file-drop-text');
            if(td) td.style.display = 'block';
            const img = filePreview.querySelector('img.file-thumb');
            if(img) img.remove();
        });
    }
}

// Edit photo upload handler
if(editPhotoInput){
    editPhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(!file) return;

        const allowed = ['image/png','image/jpeg'];
        if(!allowed.includes(file.type)){
            showToast('Only JPEG and PNG files are allowed');
            editPhotoInput.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Data = event.target.result;
            if(editIndex !== null && editIndex >= 0 && employees[editIndex]){
                employees[editIndex].photoData = base64Data;
                employees[editIndex].photoName = file.name;
            }
            if(editFileNameEl) editFileNameEl.textContent = file.name;
            if(editFilePreview) editFilePreview.style.display = 'flex';
            const editDropText = editFilePreview ? editFilePreview.parentElement.querySelector('.file-drop-text') : null;
            if(editDropText) editDropText.style.display = 'none';
            let img = editFilePreview ? editFilePreview.querySelector('img.file-thumb') : null;
            if(!img && editFilePreview){
                img = document.createElement('img');
                img.className = 'file-thumb';
                editFilePreview.insertBefore(img, editFilePreview.firstChild);
            }
            if(img) img.src = base64Data;
        };
        reader.readAsDataURL(file);
    });

    if(editRemoveFile){
        editRemoveFile.addEventListener('click', (ev) => {
            ev.preventDefault();
            if(editIndex !== null && editIndex >= 0 && employees[editIndex]){
                employees[editIndex].photoData = '';
                employees[editIndex].photoName = '';
            }
            if(editPhotoInput) editPhotoInput.value = '';
            if(editFilePreview) editFilePreview.style.display = 'none';
            const editDropText = editFilePreview ? editFilePreview.parentElement.querySelector('.file-drop-text') : null;
            if(editDropText) editDropText.style.display = 'block';
            const img = editFilePreview ? editFilePreview.querySelector('img.file-thumb') : null;
            if(img) img.remove();
        });
    }
}

// Init
loadEmployees();
render();
initFloatingLabels();

dob.onchange = function() {
    let birthDate = new Date(this.value);
    let today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    let m = today.getMonth() - birthDate.getMonth();

    // adjust if birthday not reached this year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    ageInput.value = age;
};

let maritalStatus = null;

document.querySelectorAll(".marital-card").forEach(card => {
    card.onclick = () => {
        maritalStatus = card.dataset.value || card.innerText.trim();

        document.querySelectorAll(".marital-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
    };
});

// Phone number input: allow only digits and limit to 8 characters
const phone = document.getElementById("phone");

phone.addEventListener("input", function () {
    // remove non-numbers
    this.value = this.value.replace(/\D/g, '');

    // limit to 8 digits
    if (this.value.length > 8) {
        this.value = this.value.slice(0, 10);
    }
});

// WhatsApp number input: allow only digits and limit to 10 characters
const whatsappPhone = document.getElementById("whatsappPhone");

whatsappPhone.addEventListener("input", function () {
    // remove non-numbers
    this.value = this.value.replace(/\D/g, '');

    // limit to 10 digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});

const section = document.querySelector(".highlighting-section");

document.querySelectorAll(".highlighting-section").forEach(section => {

    const inputs = section.querySelectorAll("input");

    function checkFilled() {
        let allFilled = true;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                allFilled = false;
            }
        });

        if (allFilled) {
            section.classList.add("completed");
        } else {
            section.classList.remove("completed");
        }
    }

    inputs.forEach(input => {
        input.addEventListener("input", checkFilled);
    });

});

const inputs = section.querySelectorAll("input");

function checkFilled() {
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        section.classList.add("completed");
    } else {
        section.classList.remove("completed");
    }
}

// listen to input typing
inputs.forEach(input => {
    input.addEventListener("input", checkFilled);
});

const canvas = document.getElementById("fluid-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 3
    });
}

function animate() {
    ctx.fillStyle = "rgb(8, 77, 104)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "cyan";

    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 200);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let currentStep = 0;
const steps = document.querySelectorAll(".step");

function showStep(i) {
    steps.forEach(s => s.classList.remove("active"));
    steps[i].classList.add("active");
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}


/* IMAGE PREVIEW */
const photo = document.getElementById("photo");
const preview = document.getElementById("preview");

photo.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById("resetBtn").onclick = () => {
    document.querySelector("form").reset();
};
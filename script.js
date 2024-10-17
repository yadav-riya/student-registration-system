// Select the form and table body
const form = document.getElementById('registrationForm');
const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

// Load student records from local storage on page load
window.onload = function() {
    loadStudents();
};

// Function to load students from local storage
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    studentTable.innerHTML = ''; // Clear existing table rows
    students.forEach((student, index) => {
        addRowToTable(student, index);
    });
}

// Function to add a new row to the table
function addRowToTable(student, index) {
    const row = studentTable.insertRow();
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button class="edit" onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        </td>
    `;
}

// Event listener for the form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const studentName = document.getElementById('studentName').value.trim();
    const studentID = document.getElementById('studentID').value.trim();
    const emailID = document.getElementById('emailID').value.trim();
    const contactNo = document.getElementById('contactNo').value.trim();

    // Validate input fields
    if (!validateInputs(studentName, studentID, emailID, contactNo)) {
        return; // Stop if validation fails
    }

    const students = JSON.parse(localStorage.getItem('students')) || [];
    
    // Check for duplicate Student ID
    if (students.some(student => student.id === studentID)) {
        alert('Student ID already exists.');
        return;
    }

    const newStudent = {
        name: studentName,
        id: studentID,
        email: emailID,
        contact: contactNo
    };

    // Add new student to local storage
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    // Reset form and reload student records
    form.reset();
    loadStudents();
});

// Validate input fields
function validateInputs(name, id, email, contact) {
    const nameRegex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
    const idRegex = /^\d+$/; // Allows only numbers
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    const contactRegex = /^\d{10}$/; // Allows only 10-digit numbers

    if (!nameRegex.test(name)) {
        alert('Student Name must contain only letters.');
        return false;
    }
    if (!idRegex.test(id)) {
        alert('Student ID must contain only numbers.');
        return false;
    }
    if (!emailRegex.test(email)) {
        alert('Please enter a valid Email ID.');
        return false;
    }
    if (!contactRegex.test(contact)) {
        alert('Contact No. must be a 10-digit number.');
        return false;
    }
    return true;
}

// Edit student record
function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    // Populate the form with the student's details
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('emailID').value = student.email;
    document.getElementById('contactNo').value = student.contact;

    // Remove the student from storage and table
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}

// Delete student record
function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1); // Remove the student at the specified index
    localStorage.setItem('students', JSON.stringify(students)); // Update local storage
    loadStudents(); // Reload students
}

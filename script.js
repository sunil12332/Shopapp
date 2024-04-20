// Load customers from local storage
let customers = JSON.parse(localStorage.getItem('customers')) || [];

// Render customers list
function renderCustomers() {
    const customersList = document.getElementById('customers');
    customersList.innerHTML = `
        <tr class="table-header">
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Purchases</th>
            <th class="px-4 py-2">Total Count</th>
        </tr>
    `;
    customers.forEach((customer, index) => {
        const tr = document.createElement('tr');
        tr.classList.add('table-row');
        tr.innerHTML = `
            <td class="border px-4 py-2">${customer.name}</td>
            <td class="border px-4 py-2">${customer.purchases}</td>
            <td class="border px-4 py-2">${customer.amount}</td>
        `;
        tr.addEventListener('click', () => showDetails(index));
        customersList.appendChild(tr);
    });
}

// Show customer details
function showDetails(index) {
    const customer = customers[index];
    const detailsSection = document.getElementById('details');
    detailsSection.innerHTML = `
        <table class="table-auto w-full">
            <tr>
                <td class="px-4 py-2"><strong>Name:</strong></td>
                <td class="px-4 py-2">${customer.name}</td>
            </tr>
            <tr>
                <td class="px-4 py-2"><strong>Purchases:</strong></td>
                <td class="px-4 py-2">${customer.purchases}</td>
            </tr>
            <tr>
                <td class="px-4 py-2"><strong>Amount:</strong></td>
                <td class="px-4 py-2">${customer.amount}</td>
            </tr>
            <tr>
                <td colspan="2" class="px-4 py-2 text-right">
                    <button onclick="editCustomer(${index})" class="btn-edit px-4 py-2 rounded-md mr-2">Edit</button>
                    <button onclick="deleteCustomer(${index})" class="btn-delete px-4 py-2 rounded-md">Delete</button>
                </td>
            </tr>
        </table>`;
}

// Add new customer
function addCustomer() {
    const name = prompt('Enter customer name:');
    const purchases = parseInt(prompt('Enter number of purchases:'));
    const amount = parseFloat(prompt('Enter total amount:'));
    if (name && !isNaN(purchases) && !isNaN(amount)) {
        customers.push({ name, purchases, amount });
        localStorage.setItem('customers', JSON.stringify(customers));
        renderCustomers();
    } else {
        alert('Invalid input! Please try again.');
    }
}

// Edit customer details
function editCustomer(index) {
    const customer = customers[index];
    const name = prompt('Enter new name:', customer.name);
    const purchases = parseInt(prompt('Enter new number of purchases:', customer.purchases));
    const amount = parseFloat(prompt('Enter new total amount:', customer.amount));
    if (name && !isNaN(purchases) && !isNaN(amount)) {
        customers[index] = { name, purchases, amount };
        localStorage.setItem('customers', JSON.stringify(customers));
        renderCustomers();
        showDetails(index);
    } else {
        alert('Invalid input! Please try again.');
    }
}

// Delete customer
function deleteCustomer(index) {
    const confirmDelete = confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
        customers.splice(index, 1);
        localStorage.setItem('customers', JSON.stringify(customers));
        renderCustomers();
        const detailsSection = document.getElementById('details');
        detailsSection.innerHTML = ''; // Clear details section after deletion
    }
}

// Initial render
renderCustomers();

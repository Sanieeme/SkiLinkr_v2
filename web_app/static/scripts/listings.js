document.addEventListener('DOMContentLoaded', function () {
    const listingsContainer = document.getElementById('expert-listings');
    const editForm = document.getElementById('edit-form');
    const saveChangesButton = document.getElementById('save-changes-button');
    const backButton = document.getElementById('back-button'); // Added back button
    const deleteButton = document.getElementById('delete-button'); // Added delete button
    let services = JSON.parse(localStorage.getItem('services')) || [];
    let currentEditIndex = null;

    function displayListings() {
        listingsContainer.innerHTML = '';
        services.forEach((service, index) => {
            const serviceElement = document.createElement('div');
            serviceElement.classList.add('service-card');
            serviceElement.innerHTML = `
                <h3>${service.title} (${service.category})</h3>
                <p><strong>Hourly Rate:</strong> R${service.hourly_rate}</p>
                <p><strong>Availability:</strong> ${service.availability}</p>
                <p><strong>Warranty:</strong> ${service.warranty}</p>
                <p>${service.description}</p>
                <div class="card-buttons"> 
                    <button onclick="editService(${index})">Edit</button>
                    <button onclick="deleteListing(${index})">Delete</button>
                </div>
            `;
            listingsContainer.appendChild(serviceElement);
        });
    }

    window.editService = function(index) {
        currentEditIndex = index;
        const service = services[index];
        document.getElementById('edit-category').value = service.category;
        document.getElementById('edit-title').value = service.title;
        document.getElementById('edit-hourly_rate').value = service.hourly_rate;
        document.getElementById('edit-availability').value = service.availability;
        document.getElementById('edit-warranty').value = service.warranty;
        document.getElementById('edit-description').value = service.description;
        editForm.style.display = 'block';
    }

    saveChangesButton.addEventListener('click', function() {
        const updatedService = {
            category: document.getElementById('edit-category').value,
            title: document.getElementById('edit-title').value,
            hourly_rate: document.getElementById('edit-hourly_rate').value,
            availability: document.getElementById('edit-availability').value,
            warranty: document.getElementById('edit-warranty').value,
            description: document.getElementById('edit-description').value,
        };
        services[currentEditIndex] = updatedService;
        localStorage.setItem('services', JSON.stringify(services));
        displayListings();
        editForm.style.display = 'none';
    });

    // Initially hide the edit form
    editForm.style.display = 'none';

    displayListings();
});

function hideEditForm() {
    const editForm = document.getElementById('edit-form');
    const originalService = services[currentEditIndex];
    const updatedService = {
        category: document.getElementById('edit-category').value,
        title: document.getElementById('edit-title').value,
        hourly_rate: document.getElementById('edit-hourly_rate').value,
        availability: document.getElementById('edit-availability').value,
        warranty: document.getElementById('edit-warranty').value,
        description: document.getElementById('edit-description').value,
    };

    // Check if any changes were made
    const changesMade = JSON.stringify(originalService) !== JSON.stringify(updatedService);

    if (!changesMade) {
        editForm.style.display = 'none';
    } else {
        // Optionally, you can display a confirmation dialog before hiding the form
        const confirmHide = confirm('Are you sure you want to hide the form without saving changes?');
        if (confirmHide) {
            editForm.style.display = 'none';
        }
    }
}


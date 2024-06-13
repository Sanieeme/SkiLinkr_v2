document.addEventListener('DOMContentLoaded', function() {
    updateBudgetDisplay();
    document.getElementById('budget').addEventListener('input', fetchAvailableWorkers);
    document.getElementById('start-time').addEventListener('input', fetchAvailableWorkers);
    document.getElementById('end-time').addEventListener('input', fetchAvailableWorkers);
});

function updateBudgetDisplay() {
    const budget = document.getElementById('budget').value;
    document.getElementById('budget-display').textContent = `R${budget}`;
}

function fetchAvailableWorkers() {
    const budget = document.getElementById('budget').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    // Simulated API call to fetch workers based on budget and time range
    const workers = [
        { name: 'John Doe', skill: 'Web Development', rate: 500, availability: { start: '09:00', end: '17:00' }, profileLink: '5.html' },
        { name: 'Jane Smith', skill: 'Graphic Design', rate: 300, availability: { start: '10:00', end: '18:00' }, profileLink: '5.html' },
        { name: 'Sam Johnson', skill: 'Content Writing', rate: 200, availability: { start: '08:00', end: '16:00' }, profileLink: '5.html' },
        { name: 'Chris Lee', skill: 'Digital Marketing', rate: 400, availability: { start: '09:30', end: '17:30' }, profileLink: '5.html' },
    ];

    const availableWorkers = workers.filter(worker => worker.rate <= budget && isAvailable(worker.availability, startTime, endTime));

    const workersContainer = document.getElementById('workers-available');
    workersContainer.innerHTML = '<h3>Available Workers:</h3>';
    if (availableWorkers.length > 0) {
        availableWorkers.forEach(worker => {
            const workerBox = document.createElement('div');
            workerBox.className = 'worker-box';
            workerBox.innerHTML = `
                <a href="${worker.profileLink}">
                    <h4>${worker.name}</h4>
                    <p>Skill: ${worker.skill}</p>
                    <p>Rate: R${worker.rate}/hour</p>
                    <p>Availability: ${worker.availability.start} - ${worker.availability.end}</p>
                </a>
            `;
            workersContainer.appendChild(workerBox);
        });
    } else {
        workersContainer.innerHTML += '<p>No workers available for the selected budget and time range.</p>';
    }
}

function isAvailable(availability, startTime, endTime) {
    return (startTime >= availability.start && startTime < availability.end) ||
           (endTime > availability.start && endTime <= availability.end) ||
           (startTime <= availability.start && endTime >= availability.end);
}


document.addEventListener('DOMContentLoaded', () => {
  // Mock workers data
  const workers = [
    { name: 'Worker 1', rate: 150, availableFrom: '08:00', availableTo: '16:00', datesAvailable: ['2024-06-05', '2024-06-06'] },
    { name: 'Worker 2', rate: 200, availableFrom: '10:00', availableTo: '18:00', datesAvailable: ['2024-06-05'] },
    { name: 'Worker 3', rate: 300, availableFrom: '09:00', availableTo: '17:00', datesAvailable: ['2024-06-06'] },
    { name: 'Worker 4', rate: 400, availableFrom: '12:00', availableTo: '20:00', datesAvailable: ['2024-06-07'] },
  ];

  // Display the available workers based on budget, time range, and date
  function displayWorkers() {
    const budget = document.getElementById('budget').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const deadline = document.getElementById('deadline').value;

    if (!startTime || !endTime || !deadline || !budget) return;

    const filteredWorkers = workers.filter(worker => {
      const workerStartTime = new Date(`1970-01-01T${worker.availableFrom}`);
      const workerEndTime = new Date(`1970-01-01T${worker.availableTo}`);
      const filterStartTime = new Date(`1970-01-01T${startTime}`);
      const filterEndTime = new Date(`1970-01-01T${endTime}`);

      return worker.rate <= budget &&
             worker.datesAvailable.includes(deadline) &&
             workerStartTime <= filterStartTime &&
             workerEndTime >= filterEndTime;
    });

    const workersContainer = document.getElementById('workers-available');
    workersContainer.innerHTML = '<h3>Available Workers:</h3>';
    if (filteredWorkers.length === 0) {
      workersContainer.innerHTML += '<p>No workers available for the selected criteria.</p>';
    } else {
      filteredWorkers.forEach(worker => {
        const workerElement = document.createElement('div');
        workerElement.textContent = `${worker.name} - R${worker.rate} per hour, Available from ${worker.availableFrom} to ${worker.availableTo} on ${deadline}`;
        workersContainer.appendChild(workerElement);
      });
    }
  }

  // Update budget display
  function updateBudgetDisplay() {
    const budget = document.getElementById('budget').value;
    document.getElementById('budget-display').textContent = `R${budget}`;
  }

  // Clear the form fields
  function clearFields(event) {
    event.preventDefault();
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('budget').value = 100;
    updateBudgetDisplay();
    document.getElementById('deadline').value = '';
    document.getElementById('start-time').value = '';
    document.getElementById('end-time').value = '';
    document.getElementById('workers-available').innerHTML = '<h3>Available Workers:</h3>';
  }

  // Add event listeners
  document.getElementById('budget').addEventListener('input', displayWorkers);
  document.getElementById('start-time').addEventListener('change', displayWorkers);
  document.getElementById('end-time').addEventListener('change', displayWorkers);
  document.getElementById('deadline').addEventListener('change', displayWorkers);
});


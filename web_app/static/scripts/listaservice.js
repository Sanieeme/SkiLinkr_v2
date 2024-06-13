document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('request-form');
    const servicesList = document.getElementById('services-list');
    const services = [];
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(form);
  
      const service = {
        category: formData.get('category'),
        title: formData.get('title'),
        hourly_rate: formData.get('hourly_rate'),
        availability: formData.get('availability'),
        warranty: formData.get('warranty'),
        description: formData.get('description')
      };
  
      services.push(service);
      displayServices();
      form.reset();
    });
  
    function displayServices() {
      servicesList.innerHTML = '';
      services.forEach((service, index) => {
        const serviceElement = document.createElement('div');
        serviceElement.classList.add('service');
        serviceElement.innerHTML = `
          <h3>${service.title} (${service.category})</h3>
          <p><strong>Hourly Rate:</strong> $${service.hourly_rate}</p>
          <p><strong>Availability:</strong> ${service.availability}</p>
          <p><strong>Warranty:</strong> ${service.warranty}</p>
          <p>${service.description}</p>
        `;
        servicesList.appendChild(serviceElement);
      });
    }
  });
  

function submitForm() {
    const form = document.getElementById('request-form');
    const formData = new FormData(form);
  
    const service = {
      category: formData.get('category'),
      title: formData.get('title'),
      hourly_rate: formData.get('hourly_rate'),
      availability: formData.get('availability'),
      warranty: formData.get('warranty'),
      description: formData.get('description')
    };
  
    let services = JSON.parse(localStorage.getItem('services')) || [];
    services.push(service);
    localStorage.setItem('services', JSON.stringify(services));
  
    window.location.href = 'listings.html';
  }
  

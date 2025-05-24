document.addEventListener('DOMContentLoaded', function() {
  // Variables para almacenar las selecciones
  let selectedDecoration = null;
  let selectedServices = [];
  
  // Elementos del DOM
  const decorationCards = document.querySelectorAll('.decoration-card');
  const serviceCards = document.querySelectorAll('.service-card');
  const summaryItems = document.querySelector('.summary-items');
  const summaryTotal = document.querySelector('.summary-total span:last-child');
  const btnContinue = document.querySelector('.btn-continue');
  
  // Manejo de selección de decoración
  decorationCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remover selección previa
      decorationCards.forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.btn-select').textContent = 'Seleccionar';
        c.querySelector('.btn-select').classList.remove('selected');
      });
      
      // Marcar como seleccionado
      this.classList.add('selected');
      const btn = this.querySelector('.btn-select');
      btn.textContent = 'Seleccionado';
      btn.classList.add('selected');
      
      // Guardar la decoración seleccionada
      const priceText = this.querySelector('.price-tag').textContent;
      const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
      
      selectedDecoration = {
        name: this.querySelector('h3').textContent,
        price: price
      };
      
      updateSummary();
    });
  });
  
  // Manejo de servicios adicionales
  serviceCards.forEach(card => {
    const btn = card.querySelector('.btn-add');
    
    btn.addEventListener('click', function() {
      const serviceName = card.querySelector('h3').textContent;
      const priceText = card.querySelector('.service-price')?.textContent || '500000'; // Precio por defecto si no existe
      const servicePrice = parseFloat(priceText.replace(/[^\d.]/g, ''));
      
      if (btn.classList.contains('added')) {
        // Remover servicio
        btn.classList.remove('added');
        btn.innerHTML = 'Añadir <i class="fas fa-plus"></i>';
        
        selectedServices = selectedServices.filter(s => s.name !== serviceName);
      } else {
        // Añadir servicio
        btn.classList.add('added');
        btn.innerHTML = 'Añadido <i class="fas fa-check"></i>';
        
        selectedServices.push({
          name: serviceName,
          price: servicePrice
        });
      }
      
      updateSummary();
    });
  });
  
  // Actualizar el resumen combinado
  function updateSummary() {
    let html = '';
    let total = 0;
    
    // Agregar decoración al resumen
    if (selectedDecoration) {
      html += `
        <div class="summary-section">
          <h4>Decoración seleccionada</h4>
          <div class="summary-item">
            <span>${selectedDecoration.name}</span>
            <span>$${selectedDecoration.price.toLocaleString()}</span>
          </div>
        </div>
      `;
      total += selectedDecoration.price;
    } else {
      html += `
        <div class="summary-section">
          <h4>Decoración</h4>
          <p class="no-selection">No has seleccionado decoración</p>
        </div>
      `;
    }
    
    // Agregar servicios al resumen
    if (selectedServices.length > 0) {
      html += `
        <div class="summary-section">
          <h4>Servicios adicionales</h4>
          <div class="services-list">
      `;
      
      selectedServices.forEach(service => {
        html += `
          <div class="summary-item">
            <span>${service.name}</span>
            <span>$${service.price.toLocaleString()}</span>
          </div>
        `;
        total += service.price;
      });
      
      html += `</div></div>`;
    } else {
      html += `
        <div class="summary-section">
          <h4>Servicios</h4>
          <p class="no-selection">No has seleccionado servicios</p>
        </div>
      `;
    }
    
    summaryItems.innerHTML = html;
    summaryTotal.textContent = `$${total.toLocaleString()}`;
  }
  
  // Continuar con el pago
  btnContinue.addEventListener('click', function() {
    if (!selectedDecoration) {
      alert('Por favor selecciona una decoración antes de continuar.');
      return;
    }
    
    // Aquí puedes agregar la lógica para proceder al pago
    const total = (selectedDecoration?.price || 0) + 
                 selectedServices.reduce((sum, service) => sum + service.price, 0);
    
    alert(`Resumen del evento:\n\nDecoración: ${selectedDecoration.name} - $${selectedDecoration.price.toLocaleString()}\nServicios: ${selectedServices.length}\n\nTotal: $${total.toLocaleString()}\n\nProcederás al pago.`);
  });
  
  // Inicializar el resumen
  updateSummary();
});
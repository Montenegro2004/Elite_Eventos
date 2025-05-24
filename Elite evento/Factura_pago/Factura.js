document.addEventListener('DOMContentLoaded', function() {
  const reservaForm = document.getElementById('reservaForm');
  
  if (reservaForm) {
    reservaForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Aquí iría la lógica para enviar los datos a la base de datos
      const formData = {
        nombreCliente: document.getElementById('nombreCliente').value,
        fechaEvento: document.getElementById('fechaEvento').value,
        tipoEvento: document.getElementById('tipoEvento').value,
        totalInvitados: document.getElementById('totalInvitados').value,
        ubicacion: document.getElementById('ubicacion').value,
        observaciones: document.getElementById('observaciones').value
      };
      
      console.log('Datos a enviar a la BD:', formData);
      // Ejemplo: fetch('/api/reservas', { method: 'POST', body: JSON.stringify(formData) })
      
      alert('Reserva enviada correctamente. Nos pondremos en contacto contigo pronto.');
      reservaForm.reset();
    });
  }
});
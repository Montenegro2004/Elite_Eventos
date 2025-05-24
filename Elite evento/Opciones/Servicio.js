document.addEventListener('DOMContentLoaded', function () {
  let currentDate = new Date();
  let selectedDate = null;

  const calendarDays = document.getElementById('calendar-days');
  const currentMonthYear = document.getElementById('current-month-year');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');

  function renderCalendar() {
    calendarDays.innerHTML = '';
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    currentMonthYear.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = document.createElement('div');
      day.className = 'day disabled';
      day.textContent = prevMonthLastDay - i;
      calendarDays.appendChild(day);
    }

    const today = new Date();
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = document.createElement('div');
      day.className = 'day';
      day.textContent = i;

      if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        day.classList.add('today');
      }

      day.addEventListener('click', () => {
        document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
        day.classList.add('selected');
        selectedDate = new Date(year, month, i);
      });

      calendarDays.appendChild(day);
    }

    const totalCells = calendarDays.children.length;
    const remaining = 42 - totalCells;
    for (let i = 1; i <= remaining; i++) {
      const day = document.createElement('div');
      day.className = 'day disabled';
      day.textContent = i;
      calendarDays.appendChild(day);
    }
  }

  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();

  function updateProgress() {
    const steps = Array.from(document.querySelectorAll('.step'));
    const activeStep = document.querySelector('.step.active');
    const newIndex = steps.indexOf(activeStep);
    const progress = ((newIndex + 1) / steps.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
  }

  document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', function () {
      const current = this.closest('.planning-section');
      const next = current.nextElementSibling;
      if (next) {
        current.style.display = 'none';
        next.style.display = 'block';
        const active = document.querySelector('.step.active');
        if (active.nextElementSibling) {
          active.classList.remove('active');
          active.nextElementSibling.classList.add('active');
          updateProgress();
        }
      }
    });
  });

  document.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', function () {
      const current = this.closest('.planning-section');
      const prev = current.previousElementSibling;
      if (prev) {
        current.style.display = 'none';
        prev.style.display = 'block';
        const active = document.querySelector('.step.active');
        if (active.previousElementSibling) {
          active.classList.remove('active');
          active.previousElementSibling.classList.add('active');
          updateProgress();
        }
      }
    });
  });

  document.querySelectorAll('.hacienda-card').forEach(card => {
    card.addEventListener('click', function () {
      document.querySelectorAll('.hacienda-card').forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.select-overlay').style.opacity = '0';
      });
      this.classList.add('selected');
      this.querySelector('.select-overlay').style.opacity = '1';
      document.getElementById('hacienda').value = this.getAttribute('data-value');
    });
  });

  document.querySelectorAll('.decoration-card').forEach(card => {
    card.addEventListener('click', function () {
      document.querySelectorAll('.decoration-card').forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.select-overlay').style.opacity = '0';
      });
      this.classList.add('selected');
      this.querySelector('.select-overlay').style.opacity = '1';
    });
  });

  const decorationCards = document.querySelectorAll('.decoration-card');
  const decorationModal = document.getElementById('decorationModal');
  const modalDecorationContent = document.getElementById('modalDecorationContent');

  const decorationData = {
    vintage: {
      title: 'Decoración Vintage',
      price: '$700',
      items: ['Muebles antiguos', 'Iluminación cálida', 'Detalles florales']
    },
    tropical: {
      title: 'Decoración Tropical',
      price: '$800',
      items: ['Palmeras y hojas verdes', 'Colores vivos', 'Ambiente playero']
    },
    classic: {
      title: 'Decoración Clásica',
      price: '$1000',
      items: ['Candelabros', 'Flores blancas', 'Elegancia tradicional']
    },
    modern: {
      title: 'Decoración Moderna',
      price: '$900',
      items: ['Diseño minimalista', 'Colores neutros', 'Iluminación LED']
    }
  };

  decorationCards.forEach(card => {
    card.addEventListener('click', function () {
      const style = this.getAttribute('data-style');
      const data = decorationData[style];
      let content = `<h2>${data.title}</h2><p class="modal-price">${data.price}</p><ul>`;
      data.items.forEach(item => { content += `<li>${item}</li>`; });
      content += '</ul>';
      modalDecorationContent.innerHTML = content;
      decorationModal.style.display = 'block';
    });
  });

  const serviceCards = document.querySelectorAll('.service-card');
  const serviceModal = document.getElementById('serviceModal');
  const modalServiceContent = document.getElementById('modalServiceContent');

  const serviceData = {
    fotografia: {
      title: 'Servicio de Fotografía',
      price: '$1000',
      description: 'Capturamos los mejores momentos de tu evento con un equipo profesional.'
    },
    musica: {
      title: 'Música en Vivo / DJ',
      price: '$1500',
      description: 'Elige entre un DJ profesional o música en vivo para ambientar tu celebración.'
    },
    banquete: {
      title: 'Servicio de Banquete',
      price: '$2000',
      description: 'Menú gourmet personalizado para todos los gustos y necesidades.'
    },
    transporte: {
      title: 'Transporte para Invitados',
      price: '$1200',
      description: 'Buses ejecutivos para traslado cómodo y seguro de tus invitados.'
    }
  };

  serviceCards.forEach(card => {
    card.addEventListener('click', function () {
      const service = this.getAttribute('data-service');
      const data = serviceData[service];
      modalServiceContent.innerHTML = `<h2>${data.title}</h2><p class="modal-price">${data.price}</p><div class="modal-description">${data.description}</div>`;
      serviceModal.style.display = 'block';
    });
  });

  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
});

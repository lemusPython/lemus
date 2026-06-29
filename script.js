// SCRIPT ORIGINAL DE TU MENÚ ACORDEÓN
document.querySelectorAll('.menu-acordeon').forEach(enlace => {
  enlace.addEventListener('click', function () {
    const idColapso = this.getAttribute('data-target-collapse');
    const contenedorTarget = document.querySelector(idColapso);

    if (contenedorTarget) {
      const instanciaBootstrap = new bootstrap.Collapse(contenedorTarget, { toggle: false });
      instanciaBootstrap.show();
    }
  });
});

// SCRIPT: CONTROL DE VALIDACIÓN DEL FORMULARIO
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('donationForm');
  const radios = document.querySelectorAll('.donation-radio');
  const customCheck = document.getElementById('customAmountCheck');
  const customWrapper = document.getElementById('customAmountWrapper');
  const customInput = document.getElementById('customAmount');
  const btnReset = document.getElementById('btnReset');

  // Lógica de interacción mutua (Botones Fijos vs Otra Cantidad)
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        customCheck.checked = false;
        customWrapper.classList.add('d-none');
        customInput.value = '';
        customInput.classList.remove('is-invalid');
      }
    });
  });

  customCheck.addEventListener('change', () => {
    if (customCheck.checked) {
      radios.forEach(r => r.checked = false);
      customWrapper.classList.remove('d-none');
      customInput.focus();
    } else {
      customWrapper.classList.add('d-none');
      customInput.value = '';
    }
  });

  // Al enviar el formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validar Nombre
    const nombre = document.getElementById('nombre');
    const errorNombre = document.getElementById('error-nombre');
    if (nombre.value.trim() === '') {
      nombre.classList.add('is-invalid');
      errorNombre.classList.remove('d-none');
      isValid = false;
    } else {
      nombre.classList.remove('is-invalid');
      errorNombre.classList.add('d-none');
    }

    // Validar Apellidos
    const apellidos = document.getElementById('apellidos');
    const errorApellidos = document.getElementById('error-apellidos');
    if (apellidos.value.trim() === '') {
      apellidos.classList.add('is-invalid');
      errorApellidos.classList.remove('d-none');
      isValid = false;
    } else {
      apellidos.classList.remove('is-invalid');
      errorApellidos.classList.add('d-none');
    }

    // Validar Email
    const email = document.getElementById('email');
    const errorEmail = document.getElementById('error-email');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value.trim())) {
      email.classList.add('is-invalid');
      errorEmail.classList.remove('d-none');
      isValid = false;
    } else {
      email.classList.remove('is-invalid');
      errorEmail.classList.add('d-none');
    }

    // Validar Monto
    const errorDonation = document.getElementById('error-donation');
    let finalAmount = null;

    if (customCheck.checked) {
      const val = parseFloat(customInput.value);
      if (isNaN(val) || val <= 0) {
        customInput.classList.add('is-invalid');
        isValid = false;
      } else {
        customInput.classList.remove('is-invalid');
        finalAmount = val;
      }
    } else {
      const checkedRadio = document.querySelector('.donation-radio:checked');
      if (checkedRadio) {
        finalAmount = checkedRadio.value;
      } else {
        isValid = false;
      }
    }

    if (!finalAmount) {
      errorDonation.classList.remove('d-none');
    } else {
      errorDonation.classList.add('d-none');
    }

    // Si pasa todas las validaciones
    if (isValid) {
      // Definimos tu enlace base de PayPal.Me (reemplaza 'TuUsuarioDePayPal' por el tuyo real)
      const enlacePayPalBase = "https://paypal.me/TuUsuarioDePayPal";
      
      // Creamos la dirección completa añadiendo los euros que ha elegido
      const urlFinal = `${enlacePayPalBase}/${finalAmount}`;

      // Redirigimos al usuario para que finalice el pago de forma segura
      window.location.href = urlFinal;
    }
  });

  // Acción del botón Limpiar
  btnReset.addEventListener('click', () => {
    clearForm();
  });

  function clearForm() {
    form.reset();
    customWrapper.classList.add('d-none');
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));
    document.getElementById('error-nombre').classList.add('d-none');
    document.getElementById('error-apellidos').classList.add('d-none');
    document.getElementById('error-email').classList.add('d-none');
    document.getElementById('error-donation').classList.add('d-none');
  }
});

// SCRIPT: BOTÓN FLECHA SUBIR (SCROLL TOP)
document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  // Función para verificar la posición del scroll y mostrar/ocultar la flecha
  function toggleScrollButton() {
    // Si el scroll vertical es mayor a 300px se muestra la flecha
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  }

  // Escuchar evento scroll
  window.addEventListener('scroll', toggleScrollButton);

  // Verificar estado inicial (por si la página ya tiene scroll al cargar)
  toggleScrollButton();

  // Comportamiento de clic: desplazamiento suave hacia arriba
  scrollBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Evita el salto abrupto con #
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// SCRIPT: CERRAR MENÚ HAMBURGUESA AL HACER CLIC EN UN ENLACE
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.querySelector('.navbar-collapse');
      if (collapse && collapse.classList.contains('show')) {
        document.querySelector('.navbar-toggler').click();
      }
    });
  });
});
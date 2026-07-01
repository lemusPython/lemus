// Añadir un botón flotante para cambiar preferencias después de aceptar
const floatingBtn = document.createElement('button');
floatingBtn.innerHTML = `
  <img src="https://media.istockphoto.com/id/466087002/es/foto/panda-rojo-del-%C3%A1rbol.jpg?b=1&s=612x612&w=0&k=20&c=eK8G9zPMv_E6_SJbS5zhhp5dsPL6KTj6guCo-1EN9g4="
       style="
         width: 100%;
         height: 100%;
         border-radius: 100%;
         object-fit: cover;
       ">
`;
floatingBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #dc3545;
    color: white;
    border: none;
    cursor: pointer;
    z-index: 1000;
    display: none;
    font-size: 24px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transition: transform 0.2s ease;
    
`;

floatingBtn.onmouseenter = () => {
    floatingBtn.style.transform = 'scale(1.1)';
};
floatingBtn.onmouseleave = () => {
    floatingBtn.style.transform = 'scale(1)';
};

floatingBtn.onclick = () => {
    if (window.cookieManager) {
        window.cookieManager.showModal();
    }
};
document.body.appendChild(floatingBtn);

// Mostrar el botón flotante después de aceptar cookies
function showFloatingButton() {
    floatingBtn.style.display = 'flex';
}

// Observar cuando se aceptan cookies
document.addEventListener('DOMContentLoaded', () => {
    // Comprobar si ya hay consentimiento
    const consent = document.cookie.split('; ').find(row => row.startsWith('cookie_consent='));
    if (consent) {
        showFloatingButton();
    }
});


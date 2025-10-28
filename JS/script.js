











// HOME

const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');


menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navigation.classList.toggle('active');
})


// slider-navigation

const btns =document.querySelectorAll('.nav-btn');
const slides =document.querySelectorAll('.video-slide');
const contents =document.querySelectorAll('.content')

var sliderNav = function(manual){
  btns.forEach((btn) => {
    btn.classList.remove('active')
  })

   slides.forEach((slide) => {
    slide.classList.remove('active')
  })

  contents.forEach((content) => {
    content.classList.remove('active')
  })


  btns[manual].classList.add('active');
  slides[manual].classList.add('active');
  contents[manual].classList.add('active');
}

btns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    sliderNav(i);
  })


  
// ULTIMAS NOTICIAS

let noticiasCargadas = false;

document.getElementById("btn-noticias").addEventListener("click", () => {
  const seccionNoticias = document.getElementById("noticias");
  const btn = document.getElementById("btn-noticias");

  seccionNoticias.classList.toggle("oculto");

  if (seccionNoticias.classList.contains("oculto")) {
    btn.textContent = "Mostrar Noticias";
  } else {
    btn.textContent = "Ocultar Noticias";

    if (!noticiasCargadas) {
      fetch("noticias.json")
        .then(response => response.json())
        .then(data => {
          const contenedor = document.getElementById("contenedor-noticias");
          contenedor.innerHTML = "";

          data.forEach(noticia => {
            const div = document.createElement("div");
            div.classList.add("noticia");
            div.innerHTML = `
              <h3>${noticia.titulo}</h3>
              <p><em>${noticia.fecha}</em></p>
              <p>${noticia.contenido}</p>
            `;
            contenedor.appendChild(div);
          });

          noticiasCargadas = true;
        })
        .catch(error => {
          document.getElementById("contenedor-noticias").innerHTML =
            "<p>No se pudieron cargar las noticias.</p>";
          console.error("Error cargando noticias:", error);
        });
    }
  }
});




})







//GALERIA
document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary elements from the DOM
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('lightbox-modal');
    const modalImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-btn');
    // **NEW** Get the prev and next buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // **NUEVO** Esta variable realizará un seguimiento de la imagen mostrada actualmente
    let currentIndex = 0;

    // --- FUNCTIONS ---

    // Función actualizada para mostrar el modal con una imagen específica
    function showModal(index) {
        currentIndex = index; // Set the current index
        const imgSrc = galleryItems[currentIndex].src;
        modalImage.src = imgSrc;
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // **NUEVO** Función para mostrar la siguiente imagen
    function showNextImage() {
        // The % operator ensures the index loops back to 0
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showModal(currentIndex);
    }

    // **NUEVO** Función para mostrar la imagen anterior
    function showPrevImage() {
        // This formula handles looping backwards correctly
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showModal(currentIndex);
    }


    // --- EVENT LISTENERS ---

    // Agregue un evento de clic a cada imagen de la galería para ABRIR el moda
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showModal(index); // Pass the index of the clicked image
        });
    });

    // Agregue un evento de clic al botón 'X' para CERRAR el modal
    closeBtn.addEventListener('click', closeModal);

    // **NUEVO** Agregar eventos de clic para los botones anterior y siguiente
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Agregue un evento de clic al fondo para CERRAR el modal
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    //**ACTUALIZADA ** Navegación del teclado para flechas y tecla Escape
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') { // Check if modal is open
            if (event.key === 'ArrowRight') {
                showNextImage();
            } else if (event.key === 'ArrowLeft') {
                showPrevImage();
            } else if (event.key === 'Escape') {
                closeModal();
            }
        }
    });
});


// PRESUPUESTO

//PRESUPUESTO


document.addEventListener('DOMContentLoaded', function () {
    
    // Seleccionar todos los elementos del formulario que necesitamos
    const formulario = document.getElementById('formularioPresupuesto');
    const inputs = document.querySelectorAll('#formularioPresupuesto input, #formularioPresupuesto select');
    const presupuestoFinalInput = document.getElementById('presupuestoFinal');

    // Función para calcular el presupuesto total
    const calcularPresupuesto = () => {
        let total = 0;

        // 1. Obtener el valor del producto seleccionado
        const productoSelect = document.getElementById('producto');
        total += parseInt(productoSelect.value, 10);

        // 2. Obtener el valor de los extras seleccionados
        const extrasCheckboxes = document.querySelectorAll('.extra:checked');
        extrasCheckboxes.forEach(extra => {
            total += parseInt(extra.value, 10);
        });

        // 3. Aplicar recargo por plazo de entrega urgente
        const plazoInput = document.getElementById('plazo');
        const diasPlazo = parseInt(plazoInput.value, 10);
        if (diasPlazo > 0 && diasPlazo < 10) {
            const recargo = total * 0.10; // Recargo del 10%
            total += recargo;
        }

        // Formatear y mostrar el resultado final
        presupuestoFinalInput.value = `${total.toFixed(2)} €`;
    };

    // Función para validar un campo individualmente
    const validarCampo = (campo) => {
        const errorDiv = document.getElementById(`error-${campo.id}`);
        let mensajeError = '';

        if (!campo.checkValidity()) {
            if (campo.validity.valueMissing) {
                mensajeError = 'Este campo es obligatorio.';
            } else if (campo.type === 'email' && campo.validity.typeMismatch) {
                mensajeError = 'Por favor, introduce un correo electrónico válido.';
            } else if (campo.type === 'tel' && campo.validity.patternMismatch) {
                mensajeError = 'El teléfono debe tener 9 dígitos.';
            } else if (campo.type === 'number' && (campo.validity.rangeUnderflow || campo.validity.rangeOverflow)) {
                mensajeError = 'El valor está fuera del rango permitido.';
            }
        }
        
        errorDiv.textContent = mensajeError;
        return campo.checkValidity();
    };

    // Validar todos los campos del formulario
    const validarFormulario = () => {
        let esValido = true;
        document.querySelectorAll('#formularioPresupuesto [required]').forEach(campo => {
            if (!validarCampo(campo)) {
                esValido = false;
            }
        });
        return esValido;
    };
    
    // Añadir listeners a todos los inputs para calcular en tiempo real
    inputs.forEach(input => {
        input.addEventListener('input', calcularPresupuesto);
    });
    
    // Evento de envío del formulario
    formulario.addEventListener('submit', function (event) {
        // Prevenir el envío por defecto
        event.preventDefault();
        
        // Si el formulario no es válido, mostrar alerta y detener
        if (!validarFormulario()) {
            alert('Por favor, corrige los errores en el formulario antes de enviar.');
            return;
        }
        
        // Si todo está correcto, se puede proceder con el envío
        alert(`Formulario enviado correctamente con un presupuesto de ${presupuestoFinalInput.value}.`);
        // Aquí podrías añadir el código para enviar los datos a un servidor.
        formulario.reset(); // Limpiar el formulario después de enviar
        calcularPresupuesto(); // Resetear el presupuesto a 0
    });
    
    // Evento de reseteo del formulario
    formulario.addEventListener('reset', function() {
        // Limpiar todos los mensajes de error
        document.querySelectorAll('.error-mensaje').forEach(div => div.textContent = '');
        // Recalcular el presupuesto para que vuelva a 0
        setTimeout(calcularPresupuesto, 0);
    });

    // Calcular el presupuesto inicial al cargar la página
    calcularPresupuesto();
});










// CONTACTO

const map = L.map('map').setView([41.8752452, 12.5422597], 6); // Roma

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

let routeLayer;

async function geocoder(adresse) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adresse)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } else {
    throw new Error(`Adresse introuvable : ${adresse}`);
  }
}

async function calculerRoute() {
  const salidaAdresse = document.getElementById('salida').value;
  const llegadaAdresse = document.getElementById('llegada').value;

  try {
    const salidaCoord = await geocoder(salidaAdresse);
    const llegadaCoord = await geocoder(llegadaAdresse);

    // Eliminar la ruta antigua si existe
    if (routeLayer) {
      map.removeLayer(routeLayer);
    }

    // Agregar marcadores
    L.marker(salidaCoord).addTo(map).bindPopup("Salida").openPopup();
    L.marker(llegadaCoord).addTo(map).bindPopup("Llegada");

    // Construyendo la URL de OSRM
    const url = `https://router.project-osrm.org/route/v1/driving/${salidaCoord[1]},${salidaCoord[0]};${llegadaCoord[1]},${llegadaCoord[0]}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const json = await res.json();
    const route = json.routes[0].geometry;

    // Mostrar ruta
    routeLayer = L.geoJSON(route, {
      style: { color: 'red', weight: 5 }
    }).addTo(map);

    map.fitBounds(routeLayer.getBounds());

  } catch (e) {
    alert("Erreur : " + e.message);
  }
}




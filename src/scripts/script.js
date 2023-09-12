// Espera a que se cargue el DOM antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
	// Busca los elementos del DOM una vez que el DOM se ha cargado
	const ratingContainer = document.querySelector('.rating__container');
	const ratingSubmitButton = document.querySelector('.rating__submit-button');
	const main = document.querySelector('.main');

	// Función para alternar la clase 'active' en un elemento
	const toggleActive = (targetElement) => {
		targetElement.classList.toggle('active');
	};

	// Función para calcular la cantidad de elementos con la clase 'active'
	const checkRating = (ratingItems) => {
		let valueCount = 0;
		ratingItems.forEach((item) => {
			if (item.classList.contains('active')) {
				valueCount++;
			}
		});
		return valueCount;
	};
	// Función que permite conocer cuál de todos los elementos hijos contienen la clase "active"
	const calculateRating = (ratingItems) => {
		let value;
		ratingItems.forEach((item) => {
			if (item.classList.contains('active')) {
				value = item.textContent;
			}
		});
		return value;
	};

	// Escucha el evento de clic en el contenedor de calificación
	ratingContainer.addEventListener('click', (e) => {
		const targetElement = e.target;
		toggleActive(targetElement); // Llama a la función para alternar la clase 'active'
	});

	// Escucha el evento de clic en el botón de envío de calificación
	ratingSubmitButton.addEventListener('click', () => {
		const ratingItems = ratingContainer.querySelectorAll('.button');

		if (checkRating(ratingItems) === 1) {
			ThanksElements(calculateRating(ratingItems));
		} else {
			resetAndAnimateRatingElements();
		}
	});

	// Función que da feedback al usuario cuando esté esta votando
	function resetAndAnimateRatingElements() {
		let ratingElements = ratingContainer.querySelectorAll('*');
		ratingElements.forEach((element) => {
			element.classList.add('shake-element');
			element.classList.remove('active');
		});
		setTimeout(() => {
			ratingElements.forEach((element) => {
				element.classList.remove('shake-element');
			});
		}, 1000);

		// Crea un nuevo elemento HTML <div>
		const errorMessage = document.createElement('div');
		errorMessage.classList.add('errorMessage');
		// Asigna un texto específico como contenido del elemento <div>
		errorMessage.textContent = 'Please select only one rating';

		// Insertar el mensaje de error después del contenedor de calificación
		ratingContainer.insertAdjacentElement('afterend', errorMessage);

		// Remover el mensaje de error después de un segundo
		setTimeout(() => {
			errorMessage.remove();
		}, 2000);
	}
	// Función que permite mostrar el agradecimiento a usuario que ofreció en feedback
	function ThanksElements(rating) {
		main.classList.add('thanks');
		removeChildElements(main);
		main.innerHTML = `
      <img
				src="/src/assets/images/illustration-thank-you.svg"
				alt="thanks illustration"
				class="thanks__image" />
			<span class="thanks__rating">
				<p>You select ${rating} out of 5</p>
			</span>
			<h2 class="thanks__heading">Thank you!</h2>
			<p class="thanks__paragraph">
				We appreciate you taking the time to give a rating. If you ever need
				more support, don’t hesitate to get in touch!
			</p>
    `;
	}
	// Función que permite eleminar todos los elementos hjos del contenedor pasado como parametro
	const removeChildElements = (elementContainer) => {
		// Verificamos si el contenedor existe
		if (elementContainer) {
			while (elementContainer.firstChild) {
				elementContainer.removeChild(elementContainer.firstChild);
			}
		} else {
			console.error('El contenedor especificado no existe.');
		}
	};
});

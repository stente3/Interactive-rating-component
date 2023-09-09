// Espera a que se cargue el DOM antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
	// Busca los elementos del DOM una vez que el DOM se ha cargado
	const ratingContainer = document.querySelector('.rating__container');
	const ratingSubmitButton = document.querySelector('.rating__submit-button');

	// Función para alternar la clase 'active' en un elemento
	const toggleActive = (targetElement) => {
		targetElement.classList.toggle('active');
	};

	// Función para calcular la cantidad de elementos con la clase 'active'
	const calculateRating = (ratingItems) => {
		let valueCount = 0;

		ratingItems.forEach((item) => {
			if (item.classList.contains('active')) {
				valueCount++;
			}
		});

		return valueCount;
	};

	// Escucha el evento de clic en el contenedor de calificación
	ratingContainer.addEventListener('click', (e) => {
		const targetElement = e.target;
		toggleActive(targetElement); // Llama a la función para alternar la clase 'active'
	});

	// Escucha el evento de clic en el botón de envío de calificación
	ratingSubmitButton.addEventListener('click', () => {
		const ratingItems = ratingContainer.querySelectorAll('.button');
		const valueCount = calculateRating(ratingItems);

		if (valueCount === 1) {
			console.log("You're in");
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
		// Asigna un texto específico como contenido del elemento <div>
		errorMessage.textContent = 'Please select only one rating.';

		// Insertar el mensaje de error después del contenedor de calificación
		ratingContainer.insertAdjacentElement('afterend', errorMessage);

		// Remover el mensaje de error después de un segundo
		setTimeout(() => {
			errorMessage.remove();
		}, 2000);
	}
});

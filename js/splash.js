const imageUrl = 'https://api.genshin.dev/characters/eula/gacha-card';
const imageElement = document.createElement('img');

// Set the source of the image element to the image URL
imageElement.src = imageUrl;

// Wait for the image to load
imageElement.addEventListener('load', () => {
	// Get the width and height of the image
	const imageWidth = imageElement.naturalWidth;
	const imageHeight = imageElement.naturalHeight;

	// Calculate the maximum x and y coordinates for the top left corner of the square
	const maxX = imageWidth - 100;
	const maxY = imageHeight - 100;

	// Generate random x and y coordinates for the top left corner of the square
	const x = Math.floor(Math.random() * (maxX + 1));
	const y = Math.floor(Math.random() * (maxY + 1));

	// Create a canvas element
	const canvas = document.createElement('canvas');

	// Set the width and height of the canvas to 100px
	canvas.width = 100;
	canvas.height = 100;
	canvas.classList.add('gacha-image');

	// Get the 2D rendering context from the canvas
	const context = canvas.getContext('2d');

	// Draw the selected area of the image onto the canvas
	context.drawImage(imageElement, x, y, 100, 100, 0, 0, 100, 100);

	// Add the canvas to the page
	document.body.appendChild(canvas);
});

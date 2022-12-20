window.addEventListener('load', (event) => {
	setListeners();
});

function setListeners() {
	document.getElementsByClassName('menu-item-1')[0].addEventListener('click', (e) => {
		location.href = './character/characterGuess.html';
	});
}

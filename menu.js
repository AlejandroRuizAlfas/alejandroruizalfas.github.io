window.addEventListener('load', (event) => {
	setListeners();
});

function setListeners() {
	document.getElementsByClassName('menu-item-1')[0].addEventListener('click', (e) => {
		location.href = './character/characterGuess.html';
	});

	document.getElementsByClassName('menu-item-2')[0].addEventListener('click', (e) => {
		location.href = './ability/ability.html';
	});

	document.getElementById('checkbox1').addEventListener('change', (e) => {
		if (e.currentTarget.checked) {
		} else {
		}
	});
}

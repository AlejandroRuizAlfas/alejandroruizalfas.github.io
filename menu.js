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

	document.getElementsByClassName('menu-item-3')[0].addEventListener('click', (e) => {
		location.href = './cards/cards.html';
	});

	document.getElementsByClassName('menu-item-4')[0].addEventListener('click', (e) => {
		location.href = './music/index.html';
	});

	document.getElementById('checkbox1').addEventListener('change', (e) => {
		if (e.currentTarget.checked) {
		} else {
		}
	});
}

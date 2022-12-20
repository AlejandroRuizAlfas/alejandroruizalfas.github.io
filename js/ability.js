let characters = [];
let todayAbility = {};

const WEB = 'https://api.genshin.dev';

window.addEventListener('load', (event) => {
	loadData();
	setListeners();
});

function loadData() {
	getTable('characters')
		.then((characterList) => {
			characterList.forEach((e) => characters.push(e));
			setSelectOptions();
			loadTodayCharacter();
		})
		.catch((err) => console.log(err));
}
function setListeners() {
	document.getElementById('guess').addEventListener('click', (e) => {
		if (document.getElementById('charInput').value) {
			tryToGuess(document.getElementById('charInput').value);
		}
	});
}

function setSelectOptions() {
	characters.forEach((e) => {
		let datalist = document.getElementById('characterDatalist');
		let option = document.createElement('option');
		option.id = e;
		option.value = capitalize(e);
		datalist.appendChild(option);
	});
}

function tryToGuess(char) {
	if (char.toLowerCase() === todayAbility.name) {
		renderIncorrectCard(char.toLowerCase(), 'correct');
		const popupContainer = document.querySelector('.popup-container');
		setTimeout(() => {
			displayPopUp(char.toLowerCase());
			popupContainer.style.display = 'flex';
		}, 1000);
	} else {
		renderIncorrectCard(char.toLowerCase(), 'incorrect');
	}
	let opt = document.getElementById(char.toLowerCase());
	opt.parentElement.removeChild(opt);
	document.getElementById('charInput').value = '';
}

function loadTodayCharacter() {
	let image = '';

	try {
		let randomChar = Math.floor(Math.random() * characters.length);
		let ability = getRandomAbilityType();
		todayAbility = {
			name: characters[randomChar],
			ability: ability,
		};
		image = 'https://api.genshin.dev/characters/' + characters[randomChar] + '/' + ability;

		ifUrlExist(image, function (exists) {
			if (exists) {
				document.getElementById('ability-img').setAttribute('src', image);
			} else {
				loadTodayCharacter();
				return;
			}
		});
	} catch (err) {}
}

function capitalize(s) {
	return s && s[0].toUpperCase() + s.slice(1);
}
function getCharImage(name) {
	return `<img class="charIcon" src="${WEB + '/characters/' + name.toLowerCase() + '/icon-big'}"></img>`;
}

function getCharSplash(name) {
	return `<img class="charSplash" src="${WEB + '/characters/' + name.toLowerCase() + '/gacha-splash'}"></img>`;
}

function getRandomAbilityType() {
	let types = ['talent-na', 'talent-skill', 'talent-burst'];
	let random = Math.floor(Math.random() * types.length);
	return types[random];
}

function renderIncorrectCard(char, isCorrect) {
	let div = document.getElementById('incorrect-div');
	let incDiv = document.createElement('div');
	incDiv.classList.add('col-md-3');
	incDiv.classList.add(isCorrect);
	incDiv.innerHTML = `
	${getCharImage(char)}
	<p>${capitalize(char)}</p>
	`;
	div.appendChild(incDiv);
}

function displayPopUp(char) {
	document.getElementById('guess').classList.add('hidden');
	document.getElementsByClassName('popup-card')[0].innerHTML = `
	<div class="charSplash-container">
    ${getCharSplash(char)}
  </div>
  <div class="button-stack justify-content-center">
	<h2>Can you guess the ability?</h2>
    <button class="guess-ability">Normal-Attack</button>
    <button class="guess-ability">Skill</button>
    <button class="guess-ability">Burst</button>
  </div>
	`;
	renderButtons();
}

function renderButtons() {
	let buttons = Array.from(document.getElementsByClassName('guess-ability'));
	console.log();
	buttons.forEach((element) => {
		element.addEventListener('click', (e) => {
			if (getTalentType(e.currentTarget.innerHTML) === todayAbility.ability) {
				e.currentTarget.style = 'background-color: rgb(106, 230, 106)';
			} else {
				e.currentTarget.style = 'background-color: rgb(216, 86, 86)';
			}
		});
	});
}

function getTalentType(talent) {
	if (talent === 'Normal-Attack') {
		return 'talent-na';
	} else if (talent === 'Skill') {
		return 'talent-skill';
	} else if (talent === 'Burst') {
		return 'talent-burst';
	}
}

function ifUrlExist(url, callback) {
	let request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.setRequestHeader('Accept', '*/*');
	request.onprogress = function (event) {
		let status = event.target.status;
		let statusFirstNumber = status.toString()[0];
		switch (statusFirstNumber) {
			case '2':
				request.abort();
				return callback(true);
			default:
				request.abort();
				return callback(false);
		}
	};
	request.send('');
}

let characters = [];
let todayCharacter = {};

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
	getTable('characters/' + char.toLowerCase())
		.then((charInfo) => {
			renderCharInTable(charInfo, char);
		})
		.catch((err) => console.log(err));
}

function renderCharInTable(charInfo, char) {
	let isName = charInfo.name === todayCharacter.name;
	let isRarity = charInfo.rarity === todayCharacter.rarity;
	let isVision = charInfo.vision === todayCharacter.vision;
	let isWeapon = charInfo.weapon === todayCharacter.weapon;
	let isNation = charInfo.nation === todayCharacter.nation;

	let table = document.getElementById('tbody');
	let tr = document.createElement('tr');
	tr.innerHTML = `
    <td class="fade-in-image">${getCharImage(char)}</td>
    <td class="${isName} fade-in-image">${charInfo.name}</td>
    <td class="${isRarity} fade-in-image">${charInfo.rarity} stars</td>
    <td class="${isVision} fade-in-image">${charInfo.vision}</td>
    <td class="${isWeapon} fade-in-image">${charInfo.weapon}</td>
    <td class="${isNation} fade-in-image">${charInfo.nation}</td>`;
	table.appendChild(tr);

	let opt = document.getElementById(charInfo.name.toLowerCase());
	opt.parentElement.removeChild(opt);
	document.getElementById('charInput').value = '';
}

function loadTodayCharacter() {
	let random = Math.floor(Math.random() * characters.length);
	getTable('characters/' + characters[random])
		.then((info) => {
			todayCharacter = {
				name: info.name,
				rarity: info.rarity,
				vision: info.vision,
				weapon: info.weapon,
				nation: info.nation,
			};
		})
		.catch((err) => console.log(err));
}

function capitalize(s) {
	return s && s[0].toUpperCase() + s.slice(1);
}
function getCharImage(name) {
	return `<img class="charIcon" src="${WEB + '/characters/' + name.toLowerCase() + '/icon-big'}"></img>`;
}

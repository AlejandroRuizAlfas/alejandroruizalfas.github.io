const videoArray = ['KpXqyb9Q9NM', 'suG_NCwqX44', 'Tu2OhYCz0HY', 'RYT3mAaUBb0', 'BSsfjHCFosw', '2AXpIG7uyFE', 'yJyoTNCIMaE', 'NqpGHYQtUa4'];
var winners = [];

var currentBracket = -1;

const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');
const video1Title = document.getElementById('video1-title');
const video2Title = document.getElementById('video2-title');
const voteButton1 = document.getElementById('vote-button1');
const voteButton2 = document.getElementById('vote-button2');

var brackets = createPairs(videoArray);
nextBracket();

voteButton1.addEventListener('click', () => {
	winners.push(video1.src.split('/').pop());
	nextBracket();
});

voteButton2.addEventListener('click', () => {
	winners.push(video2.src.split('/').pop());
	nextBracket();
});

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function createPairs(array) {
	const shuffledArray = [...array];
	shuffleArray(shuffledArray);

	const pairs = [];
	for (let i = 0; i < shuffledArray.length; i += 2) {
		const pair = [shuffledArray[i], shuffledArray[i + 1]];
		pairs.push(pair);
	}

	return pairs;
}

async function nextBracket() {
	currentBracket++;
	try {
		video1.src = `https://www.youtube.com/embed/${brackets[currentBracket][0]}`;
		video2.src = `https://www.youtube.com/embed/${brackets[currentBracket][1]}`;
		video1Title.textContent = await getYoutubeDataByID(brackets[currentBracket][0]);
		video2Title.textContent = await getYoutubeDataByID(brackets[currentBracket][1]);
	} catch (e) {
		console.log('Next Bracket');
		brackets = [];
		brackets = createPairs(winners);
		winners = [];
		currentBracket = 0;
		console.log(brackets);
		if (!brackets[0][1]) {
			getYoutubeDataByID(brackets[0]);
			let winnerSong = await getYoutubeDataByID(brackets[0]);
			alert('The winner song is ' + winnerSong);
			return;
		} else {
			video1.src = `https://www.youtube.com/embed/${brackets[currentBracket][0]}`;
			video2.src = `https://www.youtube.com/embed/${brackets[currentBracket][1]}`;
			video1Title.textContent = await getYoutubeDataByID(brackets[currentBracket][0]);
			video2Title.textContent = await getYoutubeDataByID(brackets[currentBracket][1]);
		}
	}
}

async function getYoutubeDataByID(videoId) {
	const apiKey = 'AIzaSyDaBY-o1il31o57zmvM6RpPG21g1Upj7HE';
	const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
	return fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			if (data.items && data.items.length > 0) {
				return data.items[0].snippet.title;
			} else {
				throw new Error('Video not found or API error');
			}
		});
}

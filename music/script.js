const videoArray = ['KpXqyb9Q9NM', 'suG_NCwqX44', 'Tu2OhYCz0HY', 'RYT3mAaUBb0', 'BSsfjHCFosw', '2AXpIG7uyFE', 'yJyoTNCIMaE', 'NqpGHYQtUa4'];
var winners = [];
const videoIds = [];
var brackets = [];

var currentBracket = -1;

const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');
const video1Title = document.getElementById('video1-title');
const video2Title = document.getElementById('video2-title');
const voteButton1 = document.getElementById('vote-button1');
const voteButton2 = document.getElementById('vote-button2');

var playlist = prompt('Enter the Youtube playlist URL:');
if (playlist !== null) {
	fetchVideoIds();
} else {
	alert('No URL found.');
}

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
		if (i + 1 < shuffledArray.length) {
			pairs.push([shuffledArray[i], shuffledArray[i + 1]]);
		}
	}
	pairs.forEach((pair, index) => {
		console.log(`Pareja ${index + 1}: ${pair[0]} - ${pair[1]}`);
	});

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
		currentBracket = 0;
		console.log(brackets);
		if (brackets.length == 0) {
			getYoutubeDataByID(winners[0]);
			let winnerSong = await getYoutubeDataByID(winners[0]);
			alert('The winner song is ' + winnerSong);
			return;
		} else {
			winners = [];
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

// Función para hacer la solicitud a la API
async function fetchVideoIds() {
	// const playlistUrl = 'https://www.youtube.com/playlist?list=PL3oW2tjiIxvRhSL86eNLn4f6T0odfBLrP';
	const playlistId = playlist.split('list=')[1];

	const apiKey = 'AIzaSyDaBY-o1il31o57zmvM6RpPG21g1Upj7HE';
	const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		data.items.forEach((item) => {
			const videoId = item.snippet.resourceId.videoId;
			videoIds.push(videoId);
		});
		if (data.nextPageToken) {
			apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&pageToken=${data.nextPageToken}&key=${apiKey}`;
			await fetchVideoIds();
		}
	} catch (error) {
		console.error('Error al obtener los IDs de los videos:', error);
	}
}

fetchVideoIds().then(() => {
	console.log(videoIds);
	brackets = createPairs(videoIds);
	nextBracket();

	voteButton1.addEventListener('click', () => {
		winners.push(video1.src.split('/').pop());
		nextBracket();
	});

	voteButton2.addEventListener('click', () => {
		winners.push(video2.src.split('/').pop());
		nextBracket();
	});
});

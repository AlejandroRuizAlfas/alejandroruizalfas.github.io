let characters = [];

const WEB = "https://api.genshin.dev";

window.addEventListener("load", (event) => {
    loadData();
    setListeners();
});

function loadData() {
    getTable("characters")
        .then((characterList) => {
            characterList.forEach((e) => characters.push(e));
            prepareGame();
        })
        .catch((err) => console.log(err));
}
function setListeners() {}

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}
function getCharImage(name) {
    if (name === "traveler-anemo" || name === "traveler-dendro" || name === "traveler-geo") {
        return `<img class="charIcon" src="${WEB + "/characters/" + name.toLowerCase() + "/icon-big-lumine"}"></img>`;
    }
    return `<img class="charIcon" src="${WEB + "/characters/" + name.toLowerCase() + "/icon-big"}"></img>`;
}

function prepareGame() {
    const numbers = generarNumeros();
    const cards = [
        { id: 1, value: characters[numbers[0]] },
        { id: 2, value: characters[numbers[0]] },
        { id: 3, value: characters[numbers[1]] },
        { id: 4, value: characters[numbers[1]] },
        { id: 5, value: characters[numbers[2]] },
        { id: 6, value: characters[numbers[2]] },
        { id: 7, value: characters[numbers[3]] },
        { id: 8, value: characters[numbers[3]] },
        { id: 9, value: characters[numbers[4]] },
        { id: 10, value: characters[numbers[4]] },
        { id: 11, value: characters[numbers[5]] },
        { id: 12, value: characters[numbers[5]] },
        { id: 13, value: characters[numbers[6]] },
        { id: 14, value: characters[numbers[6]] },
        { id: 15, value: characters[numbers[7]] },
        { id: 16, value: characters[numbers[7]] },
        { id: 17, value: characters[numbers[8]] },
        { id: 18, value: characters[numbers[8]] },
        { id: 19, value: characters[numbers[9]] },
        { id: 20, value: characters[numbers[9]] },
        { id: 21, value: characters[numbers[10]] },
        { id: 22, value: characters[numbers[10]] },
        { id: 23, value: characters[numbers[11]] },
        { id: 24, value: characters[numbers[11]] },
        { id: 25, value: characters[numbers[12]] },
        { id: 26, value: characters[numbers[12]] },
        { id: 27, value: characters[numbers[13]] },
        { id: 28, value: characters[numbers[13]] },
        { id: 29, value: characters[numbers[14]] },
        { id: 30, value: characters[numbers[14]] },
    ];

    let firstCard = null;
    let secondCard = null;
    let numTurns = 0;

    const resetCards = () => {
        firstCard = null;
        secondCard = null;
    };

    const handleCardClick = (event) => {
        const clickedCard = event.currentTarget;
        if (firstCard && secondCard) {
            return;
        }
        clickedCard.classList.add("visible");
        clickedCard.innerHTML = getCharImage(clickedCard.dataset.value);
        if (!firstCard) {
            firstCard = clickedCard;
        } else {
            secondCard = clickedCard;
            numTurns++;
            if (firstCard.getAttribute("data-value") === secondCard.getAttribute("data-value")) {
                // Cards match, so remove them from the game
                firstCard.removeEventListener("click", handleCardClick);
                secondCard.removeEventListener("click", handleCardClick);
                resetCards();
            } else {
                // Cards do not match, so hide them after a short delay
                setTimeout(() => {
                    firstCard.classList.remove("visible");
                    secondCard.classList.remove("visible");
                    firstCard.innerHTML = "";
                    secondCard.innerHTML = "";
                    resetCards();
                }, 1000);
            }
        }
    };

    const init = () => {
        // Shuffle the cards
        const shuffledCards = cards.sort(() => Math.random() - 0.5);
        const gameContainer = document.getElementById("game-container");
        shuffledCards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.setAttribute("data-value", card.value);
            cardElement.addEventListener("click", handleCardClick);
            gameContainer.appendChild(cardElement);
        });
    };

    function generarNumeros() {
        var numeros = [];

        while (numeros.length < 25) {
            var numeroAleatorio = Math.floor(Math.random() * 51);

            if (numeros.indexOf(numeroAleatorio) === -1) {
                numeros.push(numeroAleatorio);
            }
        }
        return numeros;
    }

    init();
}

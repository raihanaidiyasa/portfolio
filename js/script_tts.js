let score = 0;
const words = {
    // Jawaban Mendatar
    across: [
        { start: "0,0", positions: ["0,0", "0,1", "0,2", "0,3", "0,4", "0,5", "0,6", "0,7", "0,8"], answer: "INDONESIA", number: 1 },
        { start: "2,0", positions: ["2,0", "2,1", "2,2", "2,3", "2,4"], answer: "ANDAL", number: 2 },
        { start: "5,4", positions: ["5,4", "5,5", "5,6", "5,7", "5,8"], answer: "LAPAR", number: 3 },
        { start: "7,0", positions: ["7,0", "7,1", "7,2", "7,3", "7,4", "7,5", "7,6"], answer: "LONGGAR", number: 4 },
        { start: "8,6", positions: ["8,6", "8,7", "8,8", "8,9"], answer: "ADIL", number: 5 },
    ],
    // Jawaban Menurun
    down: [
        { start: "0,0", positions: ["0,0", "1,0", "2,0", "3,0"], answer: "IKAN", number: 1 },
        { start: "0,2", positions: ["0,2", "1,2", "2,2", "3,2", "4,2"], answer: "DODOL", number: 2 },
        { start: "0,6", positions: ["0,6", "1,6", "2,6", "3,6", "4,6", "5,6", "6,6", "7,6", "8,6"], answer: "SINGAPURA", number: 4 },
        { start: "5,4", positions: ["5,4", "6,4", "7,4", "8,4"], answer: "LIGA", number: 3 },
        { start: "5,8", positions: ["5,8", "6,8", "7,8", "8,8", "9,8"], answer: "RACIK", number: 5 }
    ]
};

const blackCells = [
    "0,9",
    "1,1", "1,3", "1,4", "1,5", "1,7", "1,8", "1,9",
    "2,5", "2,7", "2,8", "2,9",
    "3,1", "3,3", "3,4", "3,5", "3,7", "3,8", "3,9",
    "4,0", "4,1", "4,3", "4,4", "4,5", "4,7", "4,8", "4,9",
    "5,0", "5,1", "5,2", "5,3", "5,9",
    "6,0", "6,1", "6,2", "6,3", "6,5", "6,7", "6,9",
    "7,7", "7,9",
    "8,0", "8,1", "8,2", "8,3", "8,5",
    "9,0", "9,1", "9,2", "9,3", "9,4", "9,5", "9,6", "9,7", "9,9"
];

function renderGrid() {
    const crossword = document.getElementById("crossword");
    crossword.innerHTML = "";

    const startingPositions = {};
    [...words.across, ...words.down].forEach(word => {
        startingPositions[word.start] = word.number;
    });

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            const position = `${i},${j}`;

            if (blackCells.includes(position)) {
                cell.classList.add("cell", "black");
            } else {
                cell.classList.add("cell");

                const input = document.createElement("input");
                input.classList.add("cell-input");
                input.maxLength = 1;
                input.dataset.position = position;
                cell.appendChild(input);

                if (startingPositions[position]) {
                    const numberSpan = document.createElement("span");
                    numberSpan.classList.add("cell-number");
                    numberSpan.textContent = startingPositions[position];
                    cell.appendChild(numberSpan);
                }
            }

            crossword.appendChild(cell);
        }
    }
}

function checkAnswers() {
    score = 0;
    const correctPositions = new Set();

    function validateWord(word) {
        let isCorrect = true;
        word.positions.forEach((position, index) => {
            const input = document.querySelector(`input[data-position='${position}']`);
            if (input.value.toUpperCase() !== word.answer[index]) {
                isCorrect = false;
            }
        });

        if (isCorrect) {
            word.positions.forEach(position => correctPositions.add(position));
            score += 10;
        }
    }

    words.across.forEach(validateWord);
    words.down.forEach(validateWord);

    document.querySelectorAll(".cell-input").forEach(input => {
        const position = input.dataset.position;
        if (correctPositions.has(position)) {
            input.style.backgroundColor = "#d4edda";
        } else {
            input.style.backgroundColor = "#f8d7da";
        }
    });

    document.getElementById("score").textContent = `Skor: ${score}`;
}

renderGrid();

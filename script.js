let values = [];
let totalEnabled = false;
let limitsEnabled = false;

const numberInput = document.getElementById("numberInput");
const numberList = document.getElementById("numberList");
const resultBox = document.getElementById("result");
const sortSelect = document.getElementById("sortSelect");

function insertNumber() {
    let text = numberInput.value;
    let value = Number(text);

    if (text.trim() === "") {
        alert("Please enter a number.");
        return;
    }

    if (!Number.isFinite(value) || value <= 0) {
        alert("Please insert a positive number.");
        return;
    }

    values.push(value);
    renderNumbers();

    numberInput.value = "";
    numberInput.focus();
}

function renderNumbers() {
    numberList.innerHTML = "";

    for (let i = 0; i < values.length; i++) {
        let item = document.createElement("div");
        item.className = "number-row";

        let number = document.createElement("span");
        number.className = "number";
        number.textContent = values[i];

        let category = document.createElement("span");
        category.className = "type";
        category.textContent =
            values[i] % 2 === 0 ? "EVEN" : "ODD";

        let remove = document.createElement("button");
        remove.className = "action-btn";
        remove.textContent = "Remove";

        remove.addEventListener("click", function () {
            values.splice(i, 1);
            renderNumbers();
            renderResults();
        });

        let edit = document.createElement("button");
        edit.className = "action-btn";
        edit.textContent = "Edit";

        edit.addEventListener("click", function () {
            updateNumber(i);
        });

        item.appendChild(number);
        item.appendChild(category);
        item.appendChild(remove);
        item.appendChild(edit);

        numberList.appendChild(item);
    }
}

function updateNumber(index) {
    let answer = prompt(
        "Enter the new positive number:",
        values[index]
    );

    if (answer === null) {
        return;
    }

    if (answer.trim() === "") {
        alert("Please enter a valid positive number.");
        return;
    }

    let newValue = Number(answer);

    if (!Number.isFinite(newValue) || newValue <= 0) {
        alert("Please enter a valid positive number.");
        return;
    }

    values[index] = newValue;

    renderNumbers();
    renderResults();
}

function clearEntry() {
    numberInput.value = "";
    numberInput.focus();
}

function clearItems() {
    values = [];
    totalEnabled = false;
    limitsEnabled = false;

    numberList.innerHTML = "";
    resultBox.innerHTML = "";
    sortSelect.value = "";
}

function getTotal() {
    if (values.length === 0) {
        alert("There are no inserted numbers.");
        return;
    }

    totalEnabled = true;
    renderResults();
}

function getHighestLowest() {
    if (values.length === 0) {
        alert("There are no inserted numbers.");
        return;
    }

    limitsEnabled = true;
    renderResults();
}

function renderResults() {
    resultBox.innerHTML = "";

    if (totalEnabled && values.length > 0) {
        let sum = 0;

        values.forEach(function (number) {
            sum += number;
        });

        let totalLine = document.createElement("div");
        let label = document.createElement("strong");

        label.textContent = "Total: ";
        totalLine.appendChild(label);
        totalLine.appendChild(document.createTextNode(sum));

        resultBox.appendChild(totalLine);
    }

    if (limitsEnabled && values.length > 0) {
        let highest = values[0];
        let lowest = values[0];

        for (let i = 1; i < values.length; i++) {
            if (values[i] > highest) {
                highest = values[i];
            }

            if (values[i] < lowest) {
                lowest = values[i];
            }
        }

        let highLine = document.createElement("div");
        let highLabel = document.createElement("strong");
        highLabel.textContent = "Highest Number: ";

        highLine.appendChild(highLabel);
        highLine.appendChild(document.createTextNode(highest));

        let lowLine = document.createElement("div");
        let lowLabel = document.createElement("strong");
        lowLabel.textContent = "Lowest Number: ";

        lowLine.appendChild(lowLabel);
        lowLine.appendChild(document.createTextNode(lowest));

        resultBox.appendChild(highLine);
        resultBox.appendChild(lowLine);
    }
}

function sortNumbers() {
    let direction = sortSelect.value;

    if (direction === "") {
        return;
    }

    if (values.length === 0) {
        alert("There are no inserted numbers.");
        sortSelect.value = "";
        return;
    }

    if (direction === "ascending") {
        values.sort((x, y) => x - y);
    } else {
        values.sort((x, y) => y - x);
    }

    renderNumbers();
    renderResults();
}

document.getElementById("insertButton")
    .addEventListener("click", insertNumber);

document.getElementById("clearEntryButton")
    .addEventListener("click", clearEntry);

document.getElementById("clearItemsButton")
    .addEventListener("click", clearItems);

document.getElementById("totalButton")
    .addEventListener("click", getTotal);

document.getElementById("highestLowestButton")
    .addEventListener("click", getHighestLowest);

sortSelect.addEventListener("change", sortNumbers);

numberInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});
let sBtn = document.querySelector("#sBtn");
let numCards = 0;
let level1;
let level2;
let level3;
let lev;

onStartLoad = () => {
    sBtn.onclick = () => {
        let age = parseInt(document.querySelector("#age").value);
        let playerName = document.querySelector("#name").value;
        let reference;
        if (age <= 5) {
            reference = document.createElement("div");
            reference.innerHTML = `שלום ${playerName} לפי הגיל שלך מומלך לך לבחור ברמה הקלה`;
            lev = parseInt(1);
        }
        else if (age <= 8) {
            reference = document.createElement("div");
            reference.innerHTML = `שלום ${playerName} לפי הגיל שלך מומלך לך לבחור ברמה הבינונית`;
            lev = parseInt(2);

        }
        else {
            reference = document.createElement("div");
            reference.innerHTML = `שלום ${playerName} לפי הגיל שלך מומלך לך לבחור ברמה הקשה`;
            lev = parseInt(3);

        }
        document.body.append(reference);

        showLevelButtons();
    }

    showLevelButtons = () => {
        document.querySelector("#userDetails").classList.add("not-clickable");

        level1 = document.querySelector("#level1");
        level2 = document.querySelector("#level2");
        level3 = document.querySelector("#level3");

        level1.classList.remove("disabled");
        level2.classList.remove("disabled");
        level3.classList.remove("disabled");

        if (lev == 1)
            level1.classList.add("border");
        else if (lev == 2)
            level2.classList.add("border");
        else
            level3.classList.add("border");

        const storeNumCardsInLocalStorage = (num) => {
            localStorage.setItem("numOfCards", JSON.stringify(num));
        }

        level1.onclick = () => {
            storeNumCardsInLocalStorage(5);
            window.location.href = "./index.html"
        }
        level2.onclick = () => {
            storeNumCardsInLocalStorage(10);
            window.location.href = "./index.html"
        }
        level3.onclick = () => {
            storeNumCardsInLocalStorage(15);
            window.location.href = "./index.html"
        }
    }

    
}

onIndexLoad = () => {
    const getNumCardsFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem("numOfCards"));
    }

    numCards = getNumCardsFromLocalStorage();
    let cards = [
        {
            name_card: "linear1",
            id: 1,
        },
        {
            name_card: "linear2",
            id: 2,
        },
        {
            name_card: "linear3",
            id: 3,
        },
        {
            name_card: "linear4",
            id: 4,
        },
        {
            name_card: "linear5",
            id: 5,
        },
        {
            name_card: "linear6",
            id: 6,
        },
        {
            name_card: "linear7",
            id: 7,
        },
        {
            name_card: "linear8",
            id: 8,
        },
        {
            name_card: "linear9",
            id: 9,
        },
        {
            name_card: "linear10",
            id: 10,
        },
        {
            name_card: "linear11",
            id: 11,
        },
        {
            name_card: "linear12",
            id: 12,
        },
        {
            name_card: "linear13",
            id: 13,
        },
        {
            name_card: "linear14",
            id: 14,
        },
        {
            name_card: "linear15",
            id: 15,
        },
    ]
    let doubleCards = [];

    // functions
    // בניית מערך המכיל את כמות הכרטיסים הנדרשת
    function copy() {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < numCards; j++) {
                doubleCards.push(cards[j]);
            }
        }
    }
    
    // ערבוב מערך הכרטיסים
    shuffleCards = () => {
        let arrIndex = doubleCards.length, randomIndex;

        while (arrIndex != 0) {
            randomIndex = Math.floor(Math.random() * arrIndex);
            arrIndex--;
            [doubleCards[arrIndex], doubleCards[randomIndex]] = [
                doubleCards[randomIndex], doubleCards[arrIndex]];
        }
    }
    // הדפסת הכרטיסים על המסך-הפוכים
    printCards = () => {
        copy();
        shuffleCards();
        for (card of doubleCards) {
            let element = document.createElement("div");
            element.classList.add("inBox");
            element.classList.add("upside");
            element.setAttribute('card-name', card.name_card);
            document.querySelector(".box").append(element);
        }
    }

    printCards();
    let card1 = null, card2 = null, count = 0;
    let upsides = document.querySelectorAll(".upside");
    let choice;
    // מה קורה בעת לחיצה על כרטיס

    upsides.forEach(upside => {
        upside.addEventListener("click", function() {
            choice = upside;
            choice.classList.add(choice.getAttribute("card-name"));
            choice.classList.remove("upside");
            if (!card1){
                card1 = choice;
                card1.style.pointerEvents = 'none';
            }
            else {
                card2 = choice;
                document.querySelector("#cover").classList.remove("disabled");
                setTimeout(() => {
                    if (card1.getAttribute("card-name") === card2.getAttribute("card-name")) {
                        card1.classList.add("empty");
                        card2.classList.add("empty");
                        count++;
                        if (count === numCards){
                            alert("נצחת!!!");
                        }
                        else
                            alert("כל הכבוד")
                        card1.classList.remove("upside");
                        card2.classList.remove("upside");
                    }
                    else {
                        card1.classList.remove(card1.getAttribute("card-name"));
                        card2.classList.remove(card2.getAttribute("card-name"));
                        card1.classList.add("upside");
                        card2.classList.add("upside");
                    }
                    card1.style.pointerEvents = 'auto';
                    card1 = card2 = null;
                    document.querySelector("#cover").classList.add("disabled");
                }, 1000)        
            }
        });
    });
    
}
/*  Settings  */

const CooldownHackingPage = 30;
const gameapi = "https://gamertocoder.garena.co.th/api/minigames";
const assetsapi = "https://gamertocoder.garena.co.th/api/assets";
const words = ["Granting access to server [blockmango.garena.com]", "Access Granted!"];
let i = 0;
let offset = 0;
let forwards = true;
let skip_count = 0;

/*  Settings  */

function start() {
    loadGame();
    loadCharacters();
    document.title = "Hacking...";
    const length = words.length;
    const interval = setInterval(() => {
        if (forwards) {
            if (offset >= words[i].length) {
                skip_count++;
                if (skip_count === 20) {
                    forwards = false;
                    skip_count = 0;
                }
            }
        } else if (offset === 0) {
            forwards = true;
            i++;
            offset = 0;
            if (i >= length) {
                i = 0;
                forwards = false;
                offset = 0;
                document.title = "Gamer To Coder";
                document.getElementById("hacking").style.display = "none";
                document.getElementById("main").style.display = "block";
                document.getElementById("nav-base").style.display = "block";
                document.getElementById("gamelist").style.display = "inline-block";
                document.getElementById("creditslist").style.display = "inline-block";
                document.getElementById("title").style.display = "block";
                document.getElementById("characterslist").style.display = "inline-block";
                document.getElementById("bg").style.display = "block";
                document.getElementById("hack").style.display = "none";
                document.getElementById("footer").style.display = "block";
                clearInterval(interval);
            }
        }
        if (skip_count === 0) {
            if (forwards) {
                offset++;
            } else {
                offset--;
            }
        }
        document.getElementById("hacking-text").innerHTML = words[i].substring(0, offset);
    }, CooldownHackingPage);
}

function loadGame() {
    fetch(gameapi).then((response) => {
        if (response.status !== 200) {
            return response.status;
        }
        return response.json();
    }).then((data) => {
        if (typeof data === "number") {
            alert(data);
        } else {
            for (let i = 0; i < data.length; i++) {
                const currentData = data[i];
                const newListItem = document.createElement("li");
                newListItem.classList.add("card");
                const genre_array = currentData['genre'];
                let genre_string = genre_array[0];
                if (genre_array.length > 1) {
                    for (let j = 1; j < genre_array.length; j++) {
                        genre_string = genre_string + ", " + genre_array[j];
                    }
                }
                const html =
                    '<div class="name"> ชื่อ: ' + currentData.name + '</div>'
                    + '<img src="' + currentData.icon + '" alt="icon"/>'
                    + '<div class="genre">ประเภท: ' + genre_string + '</div>'
                    + '<div class="detail">' + currentData.description + '</div>'
                newListItem.innerHTML = html.trim();
                document.getElementById("gamelist").appendChild(newListItem);
            }
        }
    });
}

function loadCharacters() {
    fetch(assetsapi).then((response) => {
        if (response.status !== 200) {
            return response.status;
        }
        return response.json();
    }).then((data) => {
        if (typeof data === "number") {
            alert(data);
        } else {
            for (let i = 0; i < data["characters"].length; i++) {
                const currentData = data["characters"][i];
                const newListItem = document.createElement("li");
                newListItem.classList.add("cardimg");
                const html = '<img src="' + currentData + '" alt="icon"/>';
                newListItem.innerHTML = html.trim();
                document.getElementById("characterslist").appendChild(newListItem);
            }
        }
    });
}


// actually this code is very shit and super unoptimized
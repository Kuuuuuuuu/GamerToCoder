function start() {
    const words = ["Granting access to server [blockmango.garena.com]", "Access Granted!"];
    const length = words.length;
    let i = 0;
    let offset = 0;
    let forwards = true;
    let skip_count = 0;
    document.title = "Hacking...";
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
                document.getElementById("body").style.background = "url('../images/blockmangowallpaper.png') no-repeat center center fixed";
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
    }, 40);
}

function loadGame() {
    fetch("https://gamertocoder.garena.co.th/api/minigames").then((response) => {
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
                const genre_array = currentData.genre;
                let genre_string = genre_array[0];
                if (genre_array.length > 1) {
                    for (let j = 1; j < genre_array.length; j++) {
                        genre_string = genre_string + ", " + genre_array[j];
                    }
                }
                const html =
                    `<a href=${currentData.icon}>` +
                    '<div class="name" onclick="changeName(' + currentData.name + ')"> ชื่อ: ' + currentData.name + '</div>'
                    + '<img src="' + currentData.icon + '" alt="icon"/>'
                    + '<div class="genre">ประเภท: ' + genre_string + '</div>'
                    + '<div class="detail">' + currentData.description + '</div>'
                    + '</a>';
                newListItem.innerHTML = html.trim();
                document.getElementById("gamelist").appendChild(newListItem);
            }
        }
    });
}
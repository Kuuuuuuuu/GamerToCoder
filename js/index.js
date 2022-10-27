function start() {
    const words = ["Granting access to server [blockmango.garena.com]", "Access Granted!"];
    const length = words.length;
    let i = 0;
    let offset = 0;
    let forwards = true;
    let skip_count = 0;
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
                document.getElementById("hacking").style.display = "none";
                document.getElementById("body").style.backgroundColor = "black";
                document.getElementById("main").style.display = "flex";
                document.getElementById("main").style.animation = "none";
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
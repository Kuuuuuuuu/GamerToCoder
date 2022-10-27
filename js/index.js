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
                clearInterval(interval);
                document.getElementById("hacking").style.display = "none";
                document.getElementById("main").style.backgroundColor = "black";
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
    }, 50);
}
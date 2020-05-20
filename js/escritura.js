$(document).ready(function() {

    var i = 0;
    var txt = 'Un lugar nuevo te espera';
    var speed = 100;
    if (i < txt.length) {
        document.getElementById("frase").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }

    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("frase").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }


});
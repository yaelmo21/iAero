$(document).ready(function() {
    var url = $(this).attr('title');
    new WOW().init();

    switch (url) {
        case 'iAero':
            home();
            mensajeInicio();
            break;
        case 'iAero | vuelos':
            getVuelos()
            break;
        case 'iAero | Asientos':
            getAsientos();
            break;

    }







});

let getVuelos = () => {

    let data = $.cookie('json');
    new Vue({
        el: '#vuelos',
        created: function() {
            this.recuperarPost();
        },
        data: {
            vuelos: []
        },
        methods: {
            recuperarPost: function() {
                this.$http.post('providers/soap-connection.php', { metodo: 0, json: $.cookie('json') }).then(function(respuesta) {
                    this.vuelos = respuesta.data;
                });
            }
        }
    });
}
let getAsientos = () => {


    new Vue({
        el: '#asientos',
        created: function() {
            this.recuperarPost();
        },
        data: {
            asientos: []
        },
        methods: {
            recuperarPost: function() {
                this.$http.post('providers/soap-connection.php', { metodo: 1, id: getUrlParameter('id') }).then(function(respuesta) {
                    this.asientos = respuesta.data;
                });
            }
        }
    });
}

let mensajeInicio = () => {
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
}


let selectAsiento = (id) => {
    console.log(id);

    $('#modalBuyForm').modal('show');
    let idAsiento = document.getElementById("idAsiento");
    idAsiento.innerHTML = id;

}
let home = () => {
    $('#datepicker').datepicker({
        language: "es",
        todayBtn: "linked",
        format: "dd/mm/yyyy",
        multidate: false,
        todayHighlight: true,
        // startDate: new Date(),
    });
}

let vuelos = () => {
    let fecha = $("#datepicker").val();
    let origin = $("#origin").val();
    let destino = $("#destino").val();


    if (fecha == null || origin === 'Origen' || destino == 'Destino') {
        $('#centralModalDanger').modal('show');
    } else {
        let json = JSON.stringify({ fecha: fecha, origin: origin, destino: destino });
        $.cookie('json', `${json}`, { expires: 1, path: '/' });
        location.href = "vuelos.html";

    }

}



function recuperarFecha(fechamysql) {
    const fecha_final = fechamysql;
    const [year, month, day] = [...fecha_final.split('-')];
    const monthIndex = month - 1;

    var fecha = new Date(year, monthIndex, day);
    var diasSemana = new Array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado');
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var fechaString = diasSemana[fecha.getDay()] + " " + fecha.getDate() + " de " + meses[fecha.getMonth()] + " de " + fecha.getFullYear();

    return fechaString;
}

let getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
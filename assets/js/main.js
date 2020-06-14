$(document).ready(function() {
    var url = $(this).attr('title');
    new WOW().init();

    switch (url) {
        case 'iAero':
            home();
            mensajeInicio();
            verificar();
            break;
        case 'iAero | vuelos':
            getVuelos();
            verificar();
            break;
        case 'iAero | Asientos':
            getAsientos();
            verificar();
            break;
        case 'iAero | Compras':
            verificar();
            recuperaCompras();
            break;
        case 'iAero | Cuenta':
            verificar();
            recuperaCuenta();
            break;


    }







});

var asientoSelect = {};

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


let selectAsiento = (asiento) => {

    axios.post(URL_SERVICE + '/verificar', null, {
            headers: {
                'Authorization': window.localStorage.getItem('token'),
            }
        })
        .then((response) => {
            asientoSelect = {
                id: asiento.id,
                codigo: asiento.codigo,
                status: asiento.status
            };
            var usuario = response.data;

            $('#nombreFormBuy').val(usuario.nombre);
            $('#emailFormBuy').val(usuario.email);
            $('#codigoAsiento').prepend(asiento.codigo);

            $('#modalBuyForm').modal('show');

        })
        .catch((error) => {
            window.localStorage.removeItem('token');
            $('#modalIniciarSesion').modal('show');
            selectAsiento(id);
        });



}
let home = () => {
    $('#alertaVuelos').hide();
    $('#datepicker').datepicker({
        language: "es",
        todayBtn: "linked",
        format: "dd/mm/yyyy",
        multidate: false,
        todayHighlight: true,
        startDate: new Date(),

    });
    $('#datepicker').datepicker("setDate", new Date());



}

let vuelos = () => {
    let fecha = $("#datepicker").val();
    let origin = $("#origin").val();
    let destino = $("#destino").val();


    if (fecha == null || origin === 'Origen' || destino == 'Destino') {
        $('#centralModalDanger').modal('show');
    } else if (origin === destino) {
        $('#alertaVuelos').html('').prepend('El origen y destino no pueden ser la misma ciudad');
        $('#alertaVuelos').show(200);
    } else {
        let json = JSON.stringify({ fecha: fecha, origin: origin, destino: destino });
        $.cookie('json', `${json}`, { expires: 1, path: '/', sameSite: 'lax' });
        location.href = "vuelos.html";

    }

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

function verificar() {
    axios.post(URL_SERVICE + '/verificar', null, {
            headers: {
                'Authorization': window.localStorage.getItem('token'),
            }
        })
        .then((response) => {
            $('#createAccount').hide();
            $('#logIn').hide();
            var nombre = response.data.nombre.split(' ');
            var google = response.data.google;
            $.cookie('google', google, { path: '/', sameSite: 'lax' });
            $('#usuarioBtn').prepend(nombre[0]);
            $('#nombreMenu').prepend(nombre[0]);


        })
        .catch((error) => {
            $('#accountBtn').hide();
            window.localStorage.removeItem('token');
        });
}

function recuperaCompras() {

    var token = window.localStorage.getItem('token');

    if (token) {
        $('#notToken').hide();
        var token = window.localStorage.getItem('token')
        new Vue({
            el: '#buys',
            created: function() {
                this.recuperarPost();
            },
            data: {
                compras: []
            },
            methods: {
                recuperarPost: function() {
                    this.$http.get(URL_SERVICE + '/compras', {
                        headers: {
                            'Authorization': token,
                        }
                    }).then(function(respuesta) {
                        this.compras = respuesta.data;

                    }).catch((error) => {
                        console.log(error.body.err);
                    });
                }
            }
        });
    } else {

        $('#modalIniciarSesion').modal('show');
    }
}

function recuperaCuenta() {

    var token = window.localStorage.getItem('token');

    if (token) {
        $('#notToken').hide();
        var token = window.localStorage.getItem('token')
        new Vue({
            el: '#user',
            created: function() {
                this.recuperarPost();
            },
            data: {
                user: []
            },
            methods: {
                recuperarPost: function() {
                    this.$http.get(URL_SERVICE + '/usuario', {
                        headers: {
                            'Authorization': token,
                        }
                    }).then(function(respuesta) {
                        this.user = respuesta.data.user;

                    }).catch((error) => {
                        console.log(error.body.err);
                    });
                }
            }
        });
    } else {

        $('#modalIniciarSesion').modal('show');
    }
}
$(document).ready(function() {
    new WOW().init();
});

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

$.noConflict();
new Vue({
    el: '#main1',
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
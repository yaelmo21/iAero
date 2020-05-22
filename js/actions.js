function vuelos() {
    $.noConflict();
    let fecha = $("#datepicker").val();
    let origin = $("#origin option:selected").text();
    let destino = $("#destino option:selected").text();

    if (fecha == null || origin === 'Origen' || destino == 'Destino') {
        $('#centralModalDanger').modal('show');
    } else {
        let json = JSON.stringify({ fecha: fecha, origin: origin, destino: destino });
        $.cookie('json', `${json}`, { expires: 1, path: '/' });
        location.href = "vuelos.html";

    }

}
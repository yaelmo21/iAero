function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
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

function compararFechas(fechaViaje) {
    var tempDay = new Date();
    var dd = tempDay.getDate();
    var mm = tempDay.getMonth() + 1;
    var yyyy = tempDay.getFullYear();
    var hoy = `${yyyy}-${mm}-${dd}`;
    return (Date.parse(hoy) == Date.parse(fechaViaje)) ? 'activo' : 'realizado';



}
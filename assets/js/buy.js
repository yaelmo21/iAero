$('#spinnerbuy').hide();
$('#spinnerbuyCancel').hide();

var compraSelect;
// $('#centralModalSuccessBuy').modal('show');

function setCompraSelect(id) {
    compraSelect = id;
}

function buyTicket() {
    $('#spinnerbuy').show();
    var compra = {
        nombre: $('#nombreFormBuy').val(),
        email: $('#emailFormBuy').val(),
        phone: $('#phoneFormBuy').val(),
        idAsiento: asientoSelect.id,
        numeroVuelo: getUrlParameter('id'),
        codigoAsiento: asientoSelect.codigo,
    }

    console.log(compra);

    axios.post(URL_SERVICE + '/compra', compra, {
        headers: {
            'Authorization': window.localStorage.getItem('token'),
        }
    }).then((response) => {
        var data = response.data;
        $('#modalBuyForm').modal('hide');
        $('#origenSuccess').prepend((data.origen === "CDM-MX") ? 'Ciudad de México, México' : 'New York, Estados Unidos');
        $('#destinoSuccess').prepend((data.destino === "NYC-EU") ? 'New York, Estados Unidos' : 'Ciudad de México, México');
        $('#nombreSuccess').prepend(data.nombre);
        $('#emailSuccess').prepend(data.email);
        $('#fechaSuccess').prepend(recuperarFecha(convert(data.fecha)));
        $('#codigoAsientoSuccess').prepend(data.codigoAsiento);
        $('#horaSalidaSuccess').prepend(data.hora);
        $('#spinnerbuy').hide();
        $('#centralModalSuccessBuy').modal('show');

        console.log(response.data);

    }).catch((error) => {
        console.log(error);
        if (error.response.status) {
            if (error.response.status == 401) {
                $('#spinnerbuy').hide();
                $('#modalIniciarSesion').modal('show');
                buyTicket();
            } else {
                $('#spinnerbuy').hide();
                console.error(error.response.data.error.code, error.response.data.error.message);
            }
        }
    });
}

function cancelCompra() {
    $('#spinnerbuyCancel').show();
    axios.put(URL_SERVICE + `/compra/${compraSelect}`, null, {
            headers: {
                'Authorization': window.localStorage.getItem('token'),
            }
        })
        .then((response) => {
            $('#spinnerbuyCancel').hide();
            $('#centralModalDanger').modal('hide');
            $('#centralModalSuccessBuyCancel').modal('show');



        })
        .catch((error) => {
            window.localStorage.removeItem('token');
            $('#modalIniciarSesion').modal('show');
            selectAsiento(id);
        });
}
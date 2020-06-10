//Referencias 

var erroresTxt = $('#mensajeError');
var nombre = $('#name-register');
var email = $('#email-register');
var pass = $('#pass-register');
var passConfirm = $('#pass-confirm-register');
var alertaForm = $('#alertaForm');
var spinnerLoading = $('#spinnerLoading');
var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

spinnerLoading.hide();
alertaForm.hide();
$('#registrarButton').click(function() {

    if (nombre.val().length == 0) {
        (alertaForm.is(':hidden')) ? alertaForm.show(200): null;

        erroresTxt.html('').prepend('El nombre es vacío, por favor ingrese esta información');
    } else if (email.val().length == 0) {
        (alertaForm.is(':hidden')) ? alertaForm.show(200): null;
        erroresTxt.html('').prepend('Por favor ingrese un correo electrónico');
    } else if (!caract.test(email.val())) {
        (alertaForm.is(':hidden')) ? alertaForm.show(200): null;
        erroresTxt.html('').prepend('El correo Email no es valido');
    } else if (pass.val().length == 0 || passConfirm.val().length == 0) {
        (alertaForm.is(':hidden')) ? alertaForm.show(200): null;
        erroresTxt.html('').prepend('La contraseña ingresada y la contraseña de confirmación no pueden ser vacías');
    } else if (pass.val() !== passConfirm.val()) {
        (alertaForm.is(':hidden')) ? alertaForm.show(200): null;
        erroresTxt.html('').prepend('La contraseña ingresada y la contraseña de confirmación no son iguales');
    } else {
        erroresTxt.html('');
        (alertaForm.is(':hidden')) ? spinnerLoading.show(200): alertaForm.hide(200);

        spinnerLoading.show(200);

        var usuario = {
            nombre: nombre.val(),
            email: email.val(),
            password: pass.val(),
        }

        axios.post(URL_SERVICE + '/usuario', usuario)
            .then((response) => {
                spinnerLoading.hide(200);
                var data = response.data;
                $('#usuarioRegistrado').prepend(data.usuario.nombre);
                $('#modalRegisterForm').modal('hide');
                $('#centralModalSuccess').modal('show');

            })
            .catch((error) => {

                spinnerLoading.hide(200);
                if (error.response.status == 400) {
                    var data = error.response.data;
                    console.log('Código de error', data.error.code);
                    (alertaForm.is(':hidden')) ? alertaForm.show(200): null;
                    erroresTxt.html('').prepend(data.error.message);
                } else {
                    (alertaForm.is(':hidden')) ? alertaForm.show(200): null;
                    erroresTxt.html('').prepend('Error de conexión con el servidor');
                }
            });

    }


});

function getQueryString(data = {}) {
    return Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}
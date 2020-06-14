//Referencias 
var iniciarSesionBtn = $('#iniciarSesionBtn');
var emailLogin = $('#emailLogin');
var passLogin = $('#passLogin');
var alertaLogin = $('#alertaLogin');
var mensajeErrorLogin = $('#mensajeErrorLogin');
var spinnerLoadingLogin = $('#spinnerLoadingLogin');
var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

spinnerLoadingLogin.hide();
alertaLogin.hide();
$('#iniciarSesionBtn').click(function() {

    if (!caract.test(emailLogin.val())) {
        (alertaLogin.is(':hidden')) ? alertaLogin.show(200): null;
        mensajeErrorLogin.html('').prepend('El Email no es valido');
    } else if (emailLogin.val().length == 0) {
        (alertaLogin.is(':hidden')) ? alertaLogin.show(200): null;
        mensajeErrorLogin.html('').prepend('El Email no puede ser vacío');
    } else if (passLogin.val().length == 0) {
        (alertaLogin.is(':hidden')) ? alertaLogin.show(200): null;
        mensajeErrorLogin.html('').prepend('La contraseña no puede ser vacía');
    } else {
        spinnerLoadingLogin.show(200);
        var usuario = {
            email: emailLogin.val(),
            password: passLogin.val(),
        }
        axios.post(URL_SERVICE + '/login', usuario)
            .then((response) => {
                spinnerLoadingLogin.hide(200);
                $('#modalIniciarSesion').modal('hide');
                var data = response.data;
                window.localStorage.setItem('token', data.token);
                $('#createAccount').hide();
                $('#logIn').hide();
                $('#accountBtn').show();
                recuperaCompras();
                verificar();

            })
            .catch((error) => {
                spinnerLoadingLogin.hide(200);
                console.log(error);
                (alertaLogin.is(':hidden')) ? alertaLogin.show(200): null;
                mensajeErrorLogin.html('').prepend(error.response.data.err.message);
            });
    }




});



function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    spinnerLoadingLogin.show(200);
    axios.post(URL_SERVICE + '/google', { idtoken: id_token }).then((response) => {
        spinnerLoadingLogin.hide(200);
        $('#modalIniciarSesion').modal('hide');
        var data = response.data;
        verificar();



        window.localStorage.setItem('token', data.token);
        $('#createAccount').hide();
        $('#logIn').hide();
        $('#accountBtn').show();

    }).catch((error) => {
        (alertaLogin.is(':hidden')) ? alertaLogin.show(200): null;
        mensajeErrorLogin.html('').prepend('Ocurrio un error al inicar sesión');
    })


}
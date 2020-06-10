function cerrarSesion() {
    var google = $.cookie('google');
    if (google == 'true') {
        signOut();
    }
    window.localStorage.removeItem('token');
    $('#fullHeightModalLeft').modal('hide');
    $('#createAccount').show();
    $('#logIn').show();
    $('#accountBtn').hide();
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
}
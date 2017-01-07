$(document).ready(function() {

    $("#logout").click(function() {

        /**
         * requesting a session destroy
         * to the server
         */
        $.get('logout', function(data) {

            window.location.replace("/");
            sessionStorage.clear(); //clear session storage 
            localStorage.clear(); // clear local storage 
        });
    });
});

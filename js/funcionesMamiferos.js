$(function() {
    var funcionesMamiferos = {};
    (function(app) {
        app.init = function() {
            compartirFunciones(app);
            app.cargarDataTable("Mamifero");
            app.oyentes("Mamifero");
        };
        app.init();
    })(funcionesMamiferos);
});
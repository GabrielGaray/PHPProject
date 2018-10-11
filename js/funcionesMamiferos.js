$(function() {
    var funcionesMamiferos = {};
    (function(app) {
        app.init = function() {
            compartirFunciones(app);
            app.cargarDataTable("Mamiferos");
            app.oyentes("Mamiferos");
        };
        app.init();
    })(funcionesMamiferos);
});
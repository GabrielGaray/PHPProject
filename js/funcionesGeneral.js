function compartirFuncion(app) {
    app.cargarDataTable = function(tipo) {
        var url = "controlador/ruteador/Ruteador.php?accion=listar&Formulario=";
        if (tipo == "Mamiferos") {
            $("#tabla" + tipo).DataTable({
                "language": {
                    "url": "js/DataTables/Spanish.json"
                },
                "autoWidth": false,
                "ajax": {
                    "url": url,
                    "dataSrc": ""
                },
                "columns": [
                    { "data": "nombreCientifico" },
                    { "data": "nombreComun" },
                    { "data": "clasificacion" },
                    { "data": "raza" },
                    { "data": "sexo" },
                    {
                        "data": "Acciones",
                        "orderable": false,
                        "searchable": false,
                        "render": function(data, type, row, meta) {
                            var a = '<a class="pull-right eliminar" data-id_animal="' + row.id_animal + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>';
                            return a;
                        }
                    }
                ]
            });
        }
    };
    app.oyentes = function(tipo) {
        $("#agregar" + tipo).on('click', function(event) {
            app.modalAgregar();
        });

        $("cuerpoTabla").on('click', function(event) {
            app.eliminarAnimal(tipo, $(this).attr("data-id_animal")); //duda o verificr id
        });

        $("#guardar").on("click", function(event) {
            if ($("#id").val() == 0) {
                app.guardarAnimal(tipo);
            } else {
                alert('No se puede guardar porque ya existe'); //iria modificar
            }
        });

        $("#form" + tipo).bootstrapValidator({
            excluded: []
        });

    };
    app.modalAgregar = function(tipo) {
        app.limpiarModal(tipo);
        $("#tituloModal").html("Nuevo" + tipo);
        $("#modal" + tipo).modal({ show: true });
        //ver diferencia con modificar


    };
    app.eliminarAnimal = function(tipo, id) {
        if (confirm("Estas Seguro de Eliminar el siguiente Animal")) {
            var url = "controlador/ruteador/Ruteador.php?accion=eliminar$Formulario" + tipo;
            var datosEnviar = { id: id };
            $.ajax({
                url: url,
                method: "POST",
                data: datosEnviar,
                success: function(datosRecibidos) {
                    alert('El registro se elimino exitosamente');
                    app.actualizarDataTable();
                },
                error: function(datosRecibidos) {
                    alert('Hubo un error al eliminar el registro');
                }
            });

        }
    }
    app.limpiarModal = function() {
        $("#nombreCientifico").val(0);
        $("#nombreComun").val('');
        $("#clasificacion").val('');
        $("#raza").val('');
        $("#sexo").val('');
    };
    app.actualizarDataTable = function(tipo) {
        var tabla = $("tabla" + tipo).DataTable();
        tabla.ajax.reload();
    }
    app.guardarAnimal = function(tipo) {
        var url = "controlador/ruteador/Ruteador.php?accion=agregar&Formulario" + tipo;
        var datosEnviar = $("#form" + tipo).serialize();
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: datosEnviar,
            success: function(datosRecibidos) {
                $("#modal" + tipo).modal('hide');
                app.limpiarModal(tipo);
                app.actualizarDataTable(tipo);
            },
            error: function(datosRecibidos) {
                alert("Hubo un error al guardar los datos del registro")
                alert(datosRecibidos);
            }
        })
    }

}
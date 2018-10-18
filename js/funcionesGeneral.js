function compartirFunciones(app) {
    app.cargarDataTable = function(tipo) {
        var url = "controlador/ruteador/Ruteador.php?accion=listar&Formulario=" + tipo;
        if (tipo == "Mamifero") {
            $("#tabla" + tipo).DataTable({
                "language": {//configura idioma
                    "url": "js/DataTables/Spanish.json"
                },
                "autoWidth": false,
                "ajax": {//configura los parametros para la llamada ajax
                    "url": url,
                    "dataSrc": ""
                },
                "columns": [//configura la tabla
                    { "data": "nombreCientifico" },
                    { "data": "nombreComun" },
                    { "data": "clasificacion" },
                    { "data": "raza" },
                    { "data": "sexo" },
                    { "data": "Acciones",
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
            console.log('clik')
            app.modalAgregar(tipo);
        });

        $("cuerpoTabla").on('click','.eliminar', function() {
            app.eliminarAnimal(tipo, $(this).attr("data-id_animal")); //attr
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
        app.limpiarModal();
        $("#tituloModal").html("Nuevo" + tipo);
        $("#modal" + tipo).modal({ show: true });
        console.log('despues de modalMamifero');
        //ver diferencia con modificar


    };
    app.eliminarAnimal = function(tipo, id) {
        console.log('eliminar');
        if (confirm("Estas Seguro de Eliminar el siguiente Animal")) {
            var url = "controlador/ruteador/Ruteador.php?accion=eliminar$Formulario" + tipo;
            var datosEnviar = { id: id };
            $.ajax({
                url: url,
                method: "POST",
                data: datosEnviar,
                success: function(datosRecibidos) { //datosRecibidos no se usa?
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
        $("#nombreCientifico").val('');
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
                app.limpiarModal();
                app.actualizarDataTable(tipo);
            },
            error: function(datosRecibidos) {
                alert("Hubo un error al guardar los datos del registro")
                alert(datosRecibidos);
            }
        })
    }

}
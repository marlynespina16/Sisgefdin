document.addEventListener("DOMContentLoaded", function () {
    $('#tbl').DataTable({
        language: {
            "url": "//cdn.datatables.net/plug-ins/1.10.11/i18n/Spanish.json"
        },
        "order": [
        [0, "desc"]
        ]
    });
    $(".confirmar").submit(function (e) {
        e.preventDefault();
        Swal.fire({
            title: 'Esta seguro de eliminar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.submit();
            }
        })
    })
    $("#nom_cliente").autocomplete({
        minLength: 3,
        source: function (request, response) {
            $.ajax({
                url: "ajax3.php",
                dataType: "json",
                data: {
                    q: request.term
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        select: function (event, ui) {
            $("#idcliente").val(ui.item.id);
            $("#nom_cliente").val(ui.item.label);
            $("#tel_cliente").val(ui.item.telefono);
            $("#dir_cliente").val(ui.item.direccion);
        }
    })
    $("#producto").autocomplete({
        minLength: 3,
        source: function (request, response) {
            $.ajax({
                url: "ajax3.php",
                dataType: "json",
                data: {
                    pro: request.term
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        select: function (event, ui) {
            $("#id").val(ui.item.id);
            $("#producto").val(ui.item.value);
            $("#precio").val(ui.item.precio);
            $("#cantidad").focus();
        }
    })
    
    $('#btn_generar').click(function (e) {
        e.preventDefault();
        var rows = $('#tblDetalle tr').length;
<<<<<<< HEAD
        
=======
        const idcita = getIdCita()
>>>>>>> 85bafbf6a2a03b97a7311823d2bfc8e65bfb0c98
        if (rows > 2) {
            var action = 'procesarVenta';
            var id = $('#idcliente').val();
            $.ajax({
                url: 'ajax3.php',
                async: true,
                data: {
                    procesarVenta: action,
<<<<<<< HEAD
                    id: id
=======
                    id: id,
                    idcita: idcita
>>>>>>> 85bafbf6a2a03b97a7311823d2bfc8e65bfb0c98
                },
                success: function (response) {
                    
                    const res = JSON.parse(response);
                    if (response != 'error') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Venta Generada',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        setTimeout(() => {
                            generarPDF(res.id_cliente, res.id_venta);
                            location.reload();
                        }, 300);
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Error al generar la venta',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                },
                error: function (error) {
                    
                }
            });
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'No hay producto para generar la venta',
                showConfirmButton: false,
                timer: 2000
            })
        }
    });
    if (document.getElementById("detalle_venta")) {
        listar();
    }
    if (document.getElementById("detalle_hematologia")) {
        listarHema();
    }
    if (document.getElementById("detalle_leuco")) {
        listarLeuco();
    }
})

function calcularPrecio(e) {
    e.preventDefault();
    const cant = $("#cantidad").val();
    const precio = $('#precio').val();
    const total = cant * precio;
    $('#sub_total').val(total);
    if (e.which == 13) {
        if (cant > 0 && cant != '') {
            const id = $('#id').val();
            registrarDetalle(e, id, cant, precio);
            $('#producto').focus();
        } else {
            $('#cantidad').focus();
            return false;
        }
    }
}

function calcularDescuento(e, id) {
    if (e.which == 13) {
        let descuento = 'descuento';
        $.ajax({
            url: "ajax3.php",
            type: 'GET',
            dataType: "json",
            data: {
                id: id,
                desc: e.target.value,
                descuento: descuento
            },
            success: function (response) {
                
                if (response.mensaje == 'descontado') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Descuento Aplicado',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    listar();
                } else {}
            }
        });
    }
}

function listar() {
    let html = '';
    let detalle = 'detalle';
    $.ajax({
        url: "ajax3.php",
        dataType: "json",
        data: {
            detalle: detalle
        },
        success: function (response) {
            response.forEach(row => {
                html += `<tr>
                    <td>${row['id']}</td>
                    <td>${row['descripcion']}</td>
                    <td>${row['cantidad']}</td>
                    <td width="100">
                        <input class="form-control" placeholder="Desc" type="number" onkeyup="calcularDescuento(event, ${row['id']})">
                    </td>
                    <td>${row['descuento']}</td>
                    <td>${row['precio_venta']}</td>
                    <td>${row['sub_total']}</td>
                    <td><button class="btn btn-danger" type="button" onclick="deleteDetalle(${row['id']})">
                        <i class="fas fa-trash-alt"></i></button></td>
                    </tr>`;
                });
                document.querySelector("#detalle_venta").innerHTML = html;
                calcular();
            }
        });
    }
    
<<<<<<< HEAD
=======
    /**
     * Funcion para obtener el id de una cita   
     */
>>>>>>> 85bafbf6a2a03b97a7311823d2bfc8e65bfb0c98
    function getIdCita(){
        // Crear una instancia de URLSearchParams con los parámetros de la URL actual
        const urlParams = new URLSearchParams(window.location.search);
        // Obtener el ID de la cita actual a travez de la url o un input hidden de
        //formulario_lab
        const citaActual = document.querySelector("#idcita").value ?
        document.querySelector("#idcita").value :
        urlParams.get('idcita');
        return citaActual;
    }
    function listarHema() {
        const citaActual = getIdCita()
        let html = '';
        $.ajax({
            url: "ajax3.php",
            dataType: "json",
            data: {
                detalleHema: 'detalleHema',
                idcita: citaActual
            },
            success: function (response) {
                
                response.forEach(row => {
                    html += `<tr>
                        <td>${row['id']}</td>
                        <td>${row['hemoglobina']}</td>
                        <td>${row['hematocritos']}</td>
                        <td>${row['cuentas_blancas']}</td>
                        <td>${row['plaquetas']}</td>
                        <td>${row['vsg']}</td>
                        <td><button class="btn btn-danger" type="button" onclick="deleteHema(${row['id']})">
                            <i class="fas fa-trash-alt"></i></button></td>
                        </tr>`;
                    });
                    document.querySelector("#detalle_hematologia").innerHTML = html;
                    
                }
            });
        }
        function listarLeuco() {
            const citaActual = getIdCita()
            let html = '';
            $.ajax({
                url: "ajax3.php",
                dataType: "json",
                data: {
                    detalleLeuco: 'detalleLeuco',
                    idcita: citaActual
                },
                success: function (response) {
                    
                    response.forEach(row => {
                        html += `<tr>
                            <td>${row['id']}</td>
                            <td>${row['seg']}</td>
                            <td>${row['linf']}</td>
                            <td>${row['eosin']}</td>
                            <td>${row['monoc']}</td>
                            <td>${row['basof']}</td>
                            <td>${row['otros']}</td>
                            <td>${row['total']}</td>
                            <td><button class="btn btn-danger" type="button" onclick="deleteLeu(${row['id']})">
                                <i class="fas fa-trash-alt"></i></button></td>
                            </tr>`;
                        });
                        document.querySelector("#detalle_leuco").innerHTML = html;
                        
                    }
                });
            }
            
            
            function registrarDetalle(e, id, cant, precio) {
                if (document.getElementById('producto').value != '') {
                    if (id != null) {
                        let action = 'regDetalle';
                        $.ajax({
                            url: "ajax3.php",
                            type: 'POST',
                            dataType: "json",
                            data: {
                                id: id,
                                cant: cant,
                                regDetalle: action,
                                precio: precio
                            },
                            success: function (response) {
                                
                                if (response == 'registrado') {
                                    $('#cantidad').val('');
                                    $('#precio').val('');
                                    $("#producto").val('');
                                    $("#sub_total").val('');
                                    $("#producto").focus();
                                    listar();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Producto Ingresado',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                } else if (response == 'actualizado') {
                                    $('#cantidad').val('');
                                    $('#precio').val('');
                                    $("#producto").val('');
                                    $("#producto").focus();
                                    listar();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Producto Actualizado',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                } else {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'error',
                                        title: 'Error al ingresar el producto',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                }
                            }
                        });
                    }
                }
            }
            
            function deleteDetalle(id) {
                let detalle = 'Eliminar'
                $.ajax({
                    url: "ajax3.php",
                    data: {
                        id: id,
                        delete_detalle: detalle
                    },
                    success: function (response) {
                        
                        if (response == 'restado') {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Producto Descontado',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            document.querySelector("#producto").value = '';
                            document.querySelector("#producto").focus();
                            listar();
                        } else if (response == 'ok') {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Producto Eliminado',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            document.querySelector("#producto").value = '';
                            document.querySelector("#producto").focus();
                            listar();
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Error al eliminar el producto',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    }
                });
            }
            function deleteHema(id) {
                $.ajax({
                    url: "ajax3.php",
                    data: {
                        id: id,
                        delete_hema: true
                    },
                    success: function (response) {
                        
                        if (response == 'ok') {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Resultados Eliminados',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            listarHema();
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Error al eliminar los Resultados',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    }
                });
            }
            function deleteLeu(id) {
                $.ajax({
                    url: "ajax3.php",
                    data: {
                        id: id,
                        delete_leu: true
                    },
                    success: function (response) {
                        
                        if (response == 'ok') {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Resultados Eliminados',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            listarLeuco();
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Error al eliminar los Resultados',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    }
                });
            }
            
            
            function calcular() {
                // obtenemos todas las filas del tbody
                var filas = document.querySelectorAll("#tblDetalle tbody tr");
                
                var total = 0;
                
                // recorremos cada una de las filas
                filas.forEach(function (e) {
                    
                    // obtenemos las columnas de cada fila
                    var columnas = e.querySelectorAll("td");
                    
                    // obtenemos los valores de la cantidad y importe
                    var importe = parseFloat(columnas[6].textContent);
                    
                    total += importe;
                });
                
                // mostramos la suma total
                var filas = document.querySelectorAll("#tblDetalle tfoot tr td");
                filas[1].textContent = total.toFixed(2);
            }
            
            function generarPDF(cliente, id_venta) {
                url = 'pdf/generar.php?cl=' + cliente + '&v=' + id_venta;
                window.open(url, '_blank');
            }
            if (document.getElementById("stockMinimo")) {
                const action = "sales";
                $.ajax({
                    url: 'chart.php',
                    type: 'POST',
                    data: {
                        action
                    },
                    async: true,
                    success: function (response) {
                        if (response != 0) {
                            var data = JSON.parse(response);
                            var nombre = [];
                            var cantidad = [];
                            for (var i = 0; i < data.length; i++) {
                                nombre.push(data[i]['descripcion']);
                                cantidad.push(data[i]['existencia']);
                            }
                            var ctx = document.getElementById("stockMinimo");
                            var myPieChart = new Chart(ctx, {
                                type: 'pie',
                                data: {
                                    labels: nombre,
                                    datasets: [{
                                        data: cantidad,
                                        backgroundColor: ['#024A86', '#E7D40A', '#581845', '#C82A54', '#EF280F', '#8C4966', '#FF689D', '#E36B2C', '#69C36D', '#23BAC4'],
                                    }],
                                },
                            });
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
            if (document.getElementById("ProductosVendidos")) {
                const action = "polarChart";
                $.ajax({
                    url: 'chart.php',
                    type: 'POST',
                    async: true,
                    data: {
                        action
                    },
                    success: function (response) {
                        if (response != 0) {
                            var data = JSON.parse(response);
                            var nombre = [];
                            var cantidad = [];
                            for (var i = 0; i < data.length; i++) {
                                nombre.push(data[i]['descripcion']);
                                cantidad.push(data[i]['cantidad']);
                            }
                            var ctx = document.getElementById("ProductosVendidos");
                            var myPieChart = new Chart(ctx, {
                                type: 'doughnut',
                                data: {
                                    labels: nombre,
                                    datasets: [{
                                        data: cantidad,
                                        backgroundColor: ['#C82A54', '#EF280F', '#23BAC4', '#8C4966', '#FF689D', '#E7D40A', '#E36B2C', '#69C36D', '#581845', '#024A86'],
                                    }],
                                },
                            });
                        }
                    },
                    error: function (error) {
                        console.log(error);
                        
                    }
                });
            }
            
            function btnCambiar(e) {
                e.preventDefault();
                const actual = document.getElementById('actual').value;
                const nueva = document.getElementById('nueva').value;
                if (actual == "" || nueva == "") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Los campos estan vacios',
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {
                    const cambio = 'pass';
                    $.ajax({
                        url: "ajax3.php",
                        type: 'POST',
                        data: {
                            actual: actual,
                            nueva: nueva,
                            cambio: cambio
                        },
                        success: function (response) {
                            if (response == 'ok') {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Contraseña modificado',
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                                document.querySelector('#frmPass').reset();
                                $("#nuevo_pass").modal("hide");
                            } else if (response == 'dif') {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'La contraseña actual incorrecta',
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                            } else {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Error al modificar la contraseña',
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                            }
                        }
                    });
                }
            }
            
            function editarCliente(id) {
                const action = "editarCliente";
                $.ajax({
                    url: 'ajax3.php',
                    type: 'GET',
                    async: true,
                    data: {
                        editarCliente: action,
                        id: id
                    },
                    success: function (response) {
                        const datos = JSON.parse(response);
                        $('#nombre').val(datos.nombre);
                        $('#telefono').val(datos.telefono);
                        $('#direccion').val(datos.direccion);
                        $('#id').val(datos.idcliente);
                        $('#btnAccion').val('Modificar');
                    },
                    error: function (error) {
                        console.log(error);
                        
                    }
                });
            }
            
            function editarUsuario(id) {
                const action = "editarUsuario";
                $.ajax({
                    url: 'ajax3.php',
                    type: 'GET',
                    async: true,
                    data: {
                        editarUsuario: action,
                        id: id
                    },
                    success: function (response) {
                        const datos = JSON.parse(response);
                        $('#nombre').val(datos.nombre);
                        $('#usuario').val(datos.usuario);
                        $('#correo').val(datos.correo);
                        $('#id').val(datos.idusuario);
                        $('#btnAccion').val('Modificar');
                    },
                    error: function (error) {
                        console.log(error);
                        
                    }
                });
            }
            
            function editarProducto(id) {
                const action = "editarProducto";
                $.ajax({
                    url: 'ajax3.php',
                    type: 'GET',
                    async: true,
                    data: {
                        editarProducto: action,
                        id: id
                    },
                    success: function (response) {
                        const datos = JSON.parse(response);
                        $('#codigo').val(datos.codigo);
                        $('#producto').val(datos.descripcion);
                        $('#precio').val(datos.precio);
                        $('#cantidad').val(datos.existencia);
                        $('#id').val(datos.codproducto);
                        $('#btnAccion').val('Modificar');
                    },
                    error: function (error) {
                        console.log(error);
                        
                    }
                });
            }
            
            function limpiar() {
                $('#formulario')[0].reset();
                $('#id').val('');
                $('#btnAccion').val('Registrar');
            }
            
            function crearLeuco(e){
                e.preventDefault();
                $.ajax({
                    url: "ajax3.php",
                    type: 'POST',
                    dataType: "json",
                    data: {
                        idcita:e.target.idcita.value,
                        seg:e.target.seg.value,
                        linf:e.target.linf.value,
                        eosin:e.target.eosin.value,
                        monoc:e.target.monoc.value,
                        basof:e.target.basof.value,
                        otros:e.target.otros.value,
                        total:e.target.total.value,
                        crearLeuco:true
                    },
                    success: function (response) {
                        if (response == 'registrado') {
                            $('#seg').val('');
                            $('#linf').val('');
                            $("#eosin").val('');
                            $("#monoc").val('');
                            $("#basof").val('');
                            $("#otros").val('');
                            $("#total").val('');
                            listarLeuco();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Resultados Ingresados',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        } else {
                            $('#seg').val('');
                            $('#linf').val('');
                            $('#eosin').val('')
                            $("#monoc").val('');
                            $("#basof").focus();
                            $("#otros").val('');
                            $("#total").val('');
                            listarLeuco();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: response,
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    }
                });
            }
            
            $('.amt').keyup(function() {
                var total = 0
                $(".amt").each(
                function(index, value) {
                    if ( $.isNumeric( $(this).val() ) ){
                        total = total + eval($(this).val());
                        //console.log(importe_total);
                    }
                }
                );
                $("#total").val(total);
            });
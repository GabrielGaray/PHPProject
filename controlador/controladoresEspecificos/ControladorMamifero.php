<?php
require_once 'ControladorGeneral.php';
require_once 'ControladorDomicilio.php';

class ControladorMamifero extends ControladorGeneral {
    function __construct($datos) {
        parent::__construct();
    }

    public function agregar($datos) {
        try {            
            $this->refControladorPersistencia->iniciarTransaccion();

            //Se agrega el mamifero
            $parametros = array("nombreCientifico" => $datos['nombreCientifico'], "nombreComun" => $datos['nombreComun'], "raza" => $datos['raza'], "sexo" => $datos['sexo']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_MAMIFERO, $parametros); //ingreso a funciones o parámetros estáticos
            $this->refControladorPersistencia->confirmarTransaccion();
            
            //Se devuelve el mamifero recien agregado
            return $this->buscarUltimoMamifero();
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();//estado previo
            echo "Failed: " . $e->getMessage();
        }
    }

    private function buscarUltimoMamifero() {
        try {
            $parametros = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ULTIMOMAMIFERO, $parametros);
            $fila = $resultado->fetch();
            return $fila;
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }



}
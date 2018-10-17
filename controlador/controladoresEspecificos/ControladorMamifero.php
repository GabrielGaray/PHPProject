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

    public function buscar($datos) {
        try {
            $parametros = array( "criterio" => $datos['criterio'],"valor" => $datos['buscar']);
            $query = str_replace("? = ?", $parametros['criterio']." = '".$parametros['valor']."'", DbSentencias::BUSCAR_MAMIFEROS);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia($query);
            $arrayMamiferos = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $arrayMamiferos;
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }

    public function listar($datos) {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_MAMIFEROS);
            $arrayMamiferos = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $arrayMamiferos;
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }

    public function eliminar($datos) {
        try {
            $this->refControladorPersistencia->iniciarTransaccion();
            
            $parametros = array("id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_MAMIFERO, $parametros);
            $idAnimal = (int)$parametros['id'];

            $this->refControladorPersistencia->confirmarTransaccion();
            return $idAnimal;// porque retorna idAnimal
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }


}
<?php

interface DbSentencias {

    //Mamiferos..........El ? es un parámetro sin nombre que puede ser completado por un programa que ejecuta la consulta para evitar SQL injection.
    const INSERTAR_MAMIFERO = "INSERT INTO `usobackend1`.`animal`(`nombreCientifico`,`nombreComun`,`clasificacion`,`raza`,`sexo`)VALUES (?,?,'Mamifero',?,?);";

    const ELIMINAR_MAMIFERO = "DELETE FROM `animal` WHERE id_animal = ? AND clasificacion = 'Mamifero'";

    const BUSCAR_MAMIFERO = "SELECT `animal`.* FROM `usobackend1`.`animal`
                             WHERE `animal`.`clasificacion` = 'Mamifero' AND `animal`.`id_animal` = ?;"
                             ;
    const BUSCAR_MAMIFEROS = "SELECT `animal`.* FROM `usobackend1`.`animal`
                            WHERE `animal`.`clasificacion` = 'Mamifero' AND ? = ?;";
    
    const LISTAR_MAMIFEROS = "SELECT `animal`.* FROM `usobackend1`.`animal` 
                            WHERE `animal`.`clasificacion` = 'Mamifero';";

    const BUSCAR_ULTIMOMAMIFERO = "SELECT `animal`.* FROM `usobackend1`.`animal` 
                                    WHERE `animal`.`clasificacion` = 'Mamifero' AND `animal`.`id_animal` = (SELECT MAX(id_animal) FROM `animal`);";

}
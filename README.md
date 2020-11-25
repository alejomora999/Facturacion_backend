# REST API utilizando Angular, Nodejs y Oracle 
En este repositorio se alamacena el codigo utilizado en la creacion del backend para el proyecto de facturacion Alejandro Morales


## Requerimientos
* Nodejs 10.x.x ó superior.   [Instalar Nodejs](https://github.com/nodesource/distributions/blob/master/README.md)
    ```console
    ~$ node --version
    ```
    

* Angular 6 ó superior [Instalar Angular](https://cli.angular.io/)
    ```console
    ~$ ng version
    ```
* Oracle 11g o superior, con el id docker de 3b2c4d1882c2 con el comando sudo docker run -p 1521:1521 -it dockerhelp/docker-oracle-ee-18c bash [Oracle 18c image Docker](https://soajp.blogspot.com/2019/03/instalar-oracle-database-18c-con-docker.html)
    ```sql
    select * from v$version where banner like 'Oracle%';
    ```
    * Librerias necesarias para poder conectar Oracle con Nodejs.[Instanclient](https://www.oracle.com/database/technologies/instant-client/downloads.html)


    


## Roadmap (Paso a paso)
    
* #### Paso 1: Creacion y configuracion del servidor Nodejs.
* #### Paso 2: Estructurar Carpetas del Servidor.
* #### Paso 3: Configuracion de la conexion con la Base de datos.
* #### Paso 4: Declaracion de las Librerias.
* #### Paso 5: Insertar en la Base de datos
* #### Paso 6: Obtener informacion de la Base de datos.
* #### Paso 7: Actualizar informacion de la Base de datos.
* #### Paso 8: Borrar informacion de la Base de datos
* #### Paso 9: Creacion de la funcion que retorna categoria y producto
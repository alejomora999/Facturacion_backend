#!/bin/bash
ruta="/home/correos/correos.txt"
cat $ruta|while read i 
do

        echo "Bienvenido, gracias por ser nuestro cliente " | mail -v -a /home/correos/promociones.txt -s "Correo Masivo de ofertas " $i

done

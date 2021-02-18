#!/bin/bash
sendemail -f origen@gmail.com -t destino1@gmail.com destino2@gmail.com -s smtp.gmail.com:587 -u \
"Asunto test" -m "Cuerpo del mensaje" -a adjunto.txt -v -xu origen -xp password -o tls=yes


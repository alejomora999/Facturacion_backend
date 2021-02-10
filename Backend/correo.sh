#!/bin/bash
sendemail -f jalejo999@gmail.com -t jalejo999@gmail.com amorales@voxoni.com -s smtp.gmail.com:587 -u \
"Asunto test" -m "Cuerpo del mensaje" -a adjunto.txt -v -xu jalejo999 -xp delospelos999 -o tls=yes


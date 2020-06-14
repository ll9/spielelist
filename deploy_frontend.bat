@ECHO OFF

ssh -i %USERPROFILE%\.ssh\id_rsa pi@raspberrypi cp -r /home/pi/deployments/spieleliste-frontend/dist /home/pi/deployments/spieleliste-frontend/$(date +'%%y%%m%%d_%%H%%M%%S')_dist


ssh -i %USERPROFILE%\.ssh\id_rsa pi@raspberrypi sudo systemctl stop spieleliste-fronted.service
ssh -i %USERPROFILE%\.ssh\id_rsa pi@raspberrypi sudo systemctl stop spieleliste-proxy.service


cd spielelist
CALL npm run build
scp -r dist pi@raspberrypi:/home/pi/deployments/spieleliste-frontend

ssh -i %USERPROFILE%\.ssh\id_rsa pi@raspberrypi sudo systemctl start spieleliste-fronted.service
ssh -i %USERPROFILE%\.ssh\id_rsa pi@raspberrypi sudo systemctl start spieleliste-proxy.service

ECHO "SUCCESS"
#!/bin/sh


echo 'test copy some file'

scp -i /Users/tomas.marik/.ssh/id_rsa -r ./src/resources/logo-bw.png tommarik15@34.159.198.249:/home/tommarik15/notado/frontend/



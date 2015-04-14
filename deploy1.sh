#!/bin/sh

npm install 
sudo npm install -g forever
forever start app.js

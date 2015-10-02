# PQube3 Reporting Web App

Collect data from your PQube via Modbus, and display it for the world!

# Install Instructions

(Meteor and NPM must be installed beforehand)

Clone this repository:
```
cd /some-path/
git clone git@github.com:techieyann/pqube3-app.git
```

Remove npm-container:
```
meteor remove npm-container
```

Run Meteor and shut it down once it has setup npm:
```
meteor
ctl-c
```

Set your PQube IP(s) and optional port (defaults to 502) as environment vars: 
```
export pqubeIP1='xxx.xxx.xxx.xxx:port'
export pqubeIP2='yyy.yyy.yyy.yyy:port'
```
(only the first is mandatory)

Run meteor with the settings file:
```
meteor --settings settings.json
```


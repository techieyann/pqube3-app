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

Set your PQube IP(s) as environment vars: 
```
export pqubeIP1=xxx.xxx.xxx.xxx
export pqubeIP2=yyy.yyy.yyy.yyy
```
(only the first is mandatory)

Assuming your PQube(s) is accessible at port 502, you can now run your very PQube reporting web app!

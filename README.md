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

Set your access code for user signup: 
```
export accessCode='example'
```

Run meteor with the settings file:
```
meteor --settings settings.json
```

Add PQube3s via the /manage page, you will have to be signed in to access it.
When signing up use the access code you specified above.


# meleetrack by Justin Carew

### About:
This web app allows the user to search for a competitor of Super Smash Bros. Melee and get a graphic that shows relevant statistics and information as well as a uniquely generated description of the user based on said stats and info. This description includes tournament activity, estimated skill level, whether or not they enter online or in-person tournaments, previous tags they have gone by, and more. This website uses the database provided by the creator of the smashdata.gg project, and the link to the database can be found in the "Database" section.

### How to use:
The website is currently deployed at https://www.meleetrack.onrender.com using Render. It can also be locally hosted by downloading this directory, building with ```npm install``` then starting with ```npm run dev```.

### Database:
https://github.com/smashdata/ThePlayerDatabase
All information regarding the database can be found at the link above. Thank you skydereign and kldawson!

### Issues:
When locally hosted, the search bar on the main page is fully functional with an autocomplete list of suggestions based on what you've typed in the input field, but when accessed through Render's deployed version (https://www.meleetrack.onrender.com), everything but the autocomplete list works. There are also issues with the dataset including duplicate entries for certain players which is further explained at smashdata.gg/about .
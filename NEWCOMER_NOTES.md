## First impressions

3h ? but fun ? let's see !
Really clear instructions :)


## Installation remarks

for the API and web-app project, when running this command: **npm i**
an error appears : **Error: Cannot find module 'nan'**
so it needs to update the package with the command: **npm update**

It needs also to copy and renamed *cli-tools/sample-locations.csv* to *api/data/locations.csv* in order to give data to the API. So maybe we can add a flag the command that generate sample-locations.csv in order to directly generated it inside the API project.

no need the word **run** in the command **npm run start** since **npm test, npm start, npm restart, and npm stop** are all aliases for npm run xxx.


## General remarks

### Cli-tools project
Why not generate a JSON file instead of CVS file for the database, so it's easier to use.


### API project

I really like :) : 
1. the use of "class" syntax
2. the use of event-driven design pattern
3. respect of HTTP standard codes
4. clean architecture

Maybe we should handle error for production by replacing error message by a generic one for safety reasons :
if(!process.env.IS_DEV_ENVIRONMENT) {
	err.message = "An error occured"
}

Maybe we should also add the stacktrace when we are in developement environment.

I don't know "compression" lib, let's check

If we do a api call too early after launching the server (during the initialisation time), we got a 500 error. Maybe we can activate the server listening only after all initialisations are done. For example, by using async/await function.

We should verify and validate the request data inside each route, as early as possible.

We should implement pagination in case the response json is too big.

The name of the endpoint is redundant, we could simplify it.


### Web-app project
API calls should be in the separate folder and file. Since the project is small, it doesn't matter now.

.env shoud be a created as copy of .env.dist 




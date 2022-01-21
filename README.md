# velsta-drones
Description
There is a major new technology that is destined to be a disruptive force in the field of
transportation: the drone. Just as the mobile phone allowed developing countries to leapfrog
older technologies for personal communication, the drone has the potential to leapfrog
traditional transportation infrastructure.
Useful drone functions include delivery of small items that are (urgently) needed in locations
with difficult access.
Task description
We have a fleet of 10 drones. A drone is capable of carrying devices, other than cameras, and
capable of delivering small loads. For our use case the load is medications. A Drone has:
 - serial number (100 characters max);
 - model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
 - weight limit (500gr max);
 - battery capacity (percentage);
 - state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).
Each Medication has:
 - name (allowed only letters, numbers, ‘- ‘, ‘_’);
 - weight;
 - code (allowed only upper-case letters, underscore and numbers);
 - image (picture of the medication case), not compulsory.
Develop a service via REST API that allows clients to communicate with the drones (i.e.,
dispatch controller). The specific communication with the drone is outside the scope of this
task.

The service should allow:

 - registering a drone;
 - loading a drone with medication items;
 - checking loaded medication items for a given drone;
 - checking available drones for loading;
 - check drone battery level for a given drone;
Feel free to make assumptions for the design approach.
Requirements

While implementing your solution please take care of the following requirements:

Functional requirements
 - Prevent the drone from being loaded with more weight that it can carry;
 - Prevent the drone from being in LOADING state if the battery level is below 25%;
 - Introduce a periodic task to check drones’ battery levels and create history/audit event
log for this.

# Tech stack
mongodb
nodejs/ express

# installation
 - Ensure nodejs is installed on your system or check out this blog to install:
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

 - clone this repository
 - set up environment
 - run npm install to install all app dependencies
 - run npm start / npm run dev to start server

 # setting up environment
 The restful API is secured with an api-key which should be passed in the request header on postman or any similar tool as x-api-key
 For this app the x-api-key value is seen in the env.example file.


# DB connection
MongoDB uri string is present in the env.example file. Replace <password> with 'velsta1234'


# Documentation
Find below a link to the published postman documentation for this API
https://documenter.getpostman.com/view/8640133/UVXomu9K

# routes
register drone - To register a new drone to the fleet
update drone - drone information can be updated
all drones - this fetches all the drones in the system. Note that this endpoint contains a query param called filter where drone can be filtered by state 'IDLE', 'LOADED'... If no query param is specified all drones are returned
Get single drone - A single drone can be gotten by id. Note that this endpoint suffices to get drone information including battery information.
Delete drone - This performs delete action on drone. Endpoint can be modified by passing a deletType param to the url to state hard or soft delete. Hard delete is a parmanent delete while soft delete only moves the data to recycle bin
- load drone - this endpoint handles the functionality of loading dron with medical items.
- get drone items - this endpoint retrieves all the medical items loaded in a particular drone.

# Battery audit functionality
This is a routine check that runs every 5 hours for the battery status of all the drone and dumps a log of this in the model. 








# Optumistics

We want to provide clinical professionals with the ability to easily access analysis of thier clinical protocol, giving them the ability to improve their efficiency. Optumistics will provide realtime and comprehensive analysis in order to reduce patient wait times and provider experiences. 

## Architecture

Currently we are employing a scalable centralized network for storing information. All devices, both the tracking devices and the web portal pulling information is utilizing a robust api that communicates to our MS SQL database. 

![network](http://i.imgur.com/p16rf1x.jpg) 
      

## Installation 
Follow these steps to run the developmental server and api on your own machine

### MAC OSX 

| Requirement  | Version |
|:-------------:| :-----:|
|  node.js | 6.11.0|
| npm | 3.10.10 |

1. Clone the codehub repository `git clone <link>`
2. Install the included dependencies `npm install`
3. Run the local server `npm run start`
4. The server should be running now at [localhost:3000](https://localhost:3000)

![terminal running the server](http://i.imgur.com/ituDiuu.png)


### RASPBERRY PI [to come]

1. Use NVM to install node v6 `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash`
2. Install node `nvm install 6`





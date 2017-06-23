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


### RASPBERRY PI and NFC

| Requirement  | Version |
|:-------------:| :-----:|
|  node.js | 6.11.0|
| npm | 3.10.10 |
| [Raspberry Pi 3 model B](https://www.amazon.com/Raspberry-Model-A1-2GHz-64-bit-quad-core/dp/B01CD5VC92/ref=sr_1_1?ie=UTF8&qid=1498152979&sr=8-1&keywords=raspberry+pi+3+model+3b) | |
| [Arduberry](https://www.amazon.com/Arduberry-for-the-Raspberry-Pi/dp/B00K1KYHGC/ref=sr_1_1?ie=UTF8&qid=1498153002&sr=8-1&keywords=arduberry)| |
| [Adafruit NFC Sheild](https://www.amazon.com/Adafruit-Controller-Shield-Arduino-Extras/dp/B00IQY2P82/ref=sr_1_1?ie=UTF8&qid=1498153042&sr=8-1&keywords=adafruit+nfc+shield)| |

1. Use NVM to install node v6
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```
2. Install node `nvm install 6`
3. Install raspbian (if older version than pixel see the update section below)
4. Install the Arduino IDE with the following commands
```
sudo apt-get update 
sudo apt-get upgrade 
sudo apt-get install arduino
```
5. Clone the [Arduberry](https://github.com/DexterInd/ArduBerry) and [Adafruit_NFC_Sheild]() repositiories to your desktop
```
cd Desktop
git clone https://github.com/DexterInd/ArduBerry.git
git clone https://github.com/adafruit/Adafruit_NFCShield_I2C.git
```
6. Run the installation script for Arduberry files and then reboot afterwards
```
cd Arduberry/script
sudo ./install.sh
sudo reboot
```
7. move the following files to continue the installation 
```
sudo mv /home/pi/Desktop/Arduberry/script/80-arduberry.rules /etc/udev/rules.d/
sudo mv /home/pi/Desktop/Arduberry/script/programmers.txt /usr/share/arduino/hardware/arduino/avr/programmers.txt
```
8. Go back to the cloned Arduberry repositiory into `Arduberry/script` and edit `serial_enable.py`. On line 3 edit `debug=0`, save and then run the file with 
```
sudo python serial_enable.py
```
9. Revisit desktop and rename the Adafruit repositiory and move to Arduino libarary files
```
cd /home/pi/Desktop
mv Adafruit_NFCShield_I2C NFCExample
mv NFCExample /usr/share/arduino/libraries
```
10. Open Arduino IDE (v1.6.0) and connect the hardware components together. Make sure the pin allignment is correct or run the risk of frying the components. 
- Tools->Port->/dev/ttyAMA0
- Tools->Board->Arduino UNO
- Tools->Programmer->Raspberry Pi GPIO
11. Open an example that reads NFC 
- File -> Examples -> NFCExample -> readMifare
12. Upload the sketch using programmer (Control+Shift+U)
13. Open a new terminal window and type the command 
```
sudo minicom -s 
```
14. Select "Serial Port Setup", and in the serial port settings 
- Serial Device : /dev/ttyAMA0
- Hardware Flow Control : No 
15. Press enter to exit the serial port setup, and save the following configuration as default. Then select exit to run mifare and start reading cards! 


### [OPTIONAL] Updating Raspbian 

Type the following commands into the terminal for the raspberry pi, and expect this to take about an hour to complete

```
sudo apt-get update 
sudo apt-get dist-upgrade 
sudo rpi-update 
```




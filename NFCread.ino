/**************************************************************************/
/*! 
    @file     readMifare.pde
    @author   Adafruit Industries
    @license  BSD (see license.txt)

    This example will wait for any ISO14443A card or tag, and
    depending on the size of the UID will attempt to read from it.
   
    If the card has a 4-byte UID it is probably a Mifare
    Classic card, and the following steps are taken:
   
    - Authenticate block 4 (the first block of Sector 1) using
      the default KEYA of 0XFF 0XFF 0XFF 0XFF 0XFF 0XFF
    - If authentication succeeds, we can then read any of the
      4 blocks in that sector (though only block 4 is read here)
   
    If the card has a 7-byte UID it is probably a Mifare
    Ultralight card, and the 4 byte pages can be read directly.
    Page 4 is read by default since this is the first 'general-
    purpose' page on the tags.


    This is an example sketch for the Adafruit PN532 NFC/RFID breakout boards
    This library works with the Adafruit NFC breakout 
      ----> https://www.adafruit.com/products/364
 
    Check out the links above for our tutorials and wiring diagrams 
    These chips use I2C to communicate

    Adafruit invests time and resources providing this open source code, 
    please support Adafruit and open-source hardware by purchasing 
    products from Adafruit!
*/
/**************************************************************************/
#include <Wire.h>
#include <Adafruit_NFCShield_I2C.h>

#define IRQ   (2)
#define RESET (3)  // Not connected by default on the NFC Shield

Adafruit_NFCShield_I2C nfc(IRQ, RESET);

void setup(void) {
  Serial.begin(115200);
  digitalWrite(13,LOW);  

  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (! versiondata) {
    Serial.print("Didn't find PN53x board");
    while (1); // halt
  }
  
  // configure board to read RFID tags
  nfc.SAMConfig();
}


void loop(void) {
  uint8_t success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;    // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
    
  digitalWrite(13,LOW);  
  // Wait for an ISO14443A type cards (Mifare, etc.).  When one is found
  // 'uid' will be populated with the UID, and uidLength will indicate
  // if the uid is 4 bytes (Mifare Classic) or 7 bytes (Mifare Ultralight)
  
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
  
  if (success) {
    // Display some basic information about the cardU
    nfc.PrintHex(uid, uidLength);
    delay(500);
  }
  else{ 
    
  }
  
}


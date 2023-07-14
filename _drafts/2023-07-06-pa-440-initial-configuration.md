PA 440 and PANOS-10.1.3 Initial Configurations

Palo Alto Firewalls has complex booting mechanism to ensure security of course and general stability.
Things can fall apart easly and sometimes boot process can get a long time. Like 5 minutes.

1. Palo Alto Factory Reset

* Do the console connection with cable.
	* Use DIGITUS connector. 
	* Install the driver if necessarry. 
	* Check the COM port from Device Manager
	* Connect with putty

Note: Different versions have different menus.

For 10.1.3
* Open the maintanence mode. Select "PANOS (maint-sysroot1)" from quickly showing menu.
* After you see "Welcome to the Maintenance Recovery Tool"
* Select "Continue"
* Select "Factory Reset" (We wont use scrubbing.)
* It will show "Factory Reset Status" and system is doing factory reset now.
* After it finished it says "Factory Reset Status: Success". Select Reboot.
* Let device to reboot.

For reference:
https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000CldXCAS


2. Initial Access
* After "Factory Reset" and "Reboot" it will show ZTP selection.
* Exit ZTP mode with "yes"
* Continue with standart mode with "y"
* PA-HDF login says wrong password. That is not the correct prompt. Still initializing.
* We wait about 1 minute and see "PA-440-login"
* Use "admin" "admin" password for enterance.
* Password renewal is needed. Write admin as old password and give new password.
* Prompt should be "admin@PA-440>".
* "show system info" shows it has ip address of "192.168.1.1" and netmask "255.255.255.0" thats the management port's ip address.
* We can do configurations from there. Check ref1.

3. Accessing To WebGUI
* We can now access the web interface by giving a computer from same subnet. 
* Give "192.168.1.100" with 255.255.255.0 to your computers ethernet port from Windows's Network Adapter Settings.
* Remove the other connections like Wireless. See if there is a ping.
* Connect an ethernet cable to MNG port.
* Connect web interface with the ip from chrome "https://192.168.1.1/"
* Write "admin" and password you see.
* Now we can see the web interface with popup message "Welcome to PAN-OS 10.1!"

4. Importing The Configuration Using WebGUI

* We have "myconfig.xml" configuration file.
* From WebGUI select "DEVICE", Setup, Operations.
* Select "Import named configuration snapshot".
* Click OK. Now it is saved. 
* Click "Load Named Configuration". No ticks selected. (It will do validation and wont regenerate rule UUID's. No Decription Key.)
* Commit.


5. Changing Management IP From CLI
* admin@fw# set deviceconfig system type static
* admin@fw# set deviceconfig system ip-address <ip address> netmask <netmask> default-gateway <default gateway> dns-setting servers primary <DNS ip address>
* commit
* exit
* admin@fw> show interface management


https://www.kareemccie.com/2019/03/how-to-perform-configuration.html


https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000Cm2HCAS


4. Breakdown Of A Sample Configuration



----------
Ref1:
* We change management ip address. https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClN7CAK
Ref2: 


---------
Symptom
Environment
Cause
Resolution
https://docs.paloaltonetworks.com/pan-os/10-2/pan-os-web-interface-help/device/device-setup-operations
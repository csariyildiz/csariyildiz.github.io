If you want to do remote operations on a physical server, there is nothing you want more than accessing it via remote control.
If its an HP server then its a iLO port. HP Integrated Lights-Out is an embedded for HP Servers and is connected via a dedicated port. 
Thus, you can access the web interface. 
Through this interface, you can perform operations such as having a backup access to the server and installing an operating system.
A corresponding counterpart of iLO is iBMC for Dell servers and is actually a BMC (A baseboard management controller).

Sometimes when you want to update old servers, you may have problems accessing their management port because of security issues.
Modern browsers do not support these insecure or outdated interfaces and will throw errors like "ERR_SSL_VERSION_OR_CIPHER_MISMATCH".
In such a case, you must first access the interface to make the relevant updates. But you can't do that because it's not up to date.





References

* https://www.gigabyte.com/Glossary/bmc
* https://supertekboy.com/2021/11/19/accessing-hpe-ilo-3-fails-with-err-ssl-version-or-cipher-mismatch/

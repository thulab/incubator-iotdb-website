# 6.1 Cli/shell tool
IoTDB provides CLI / shell tools for users to start client and server
programs. Here's how each CLI / shell tool works and its parameters,
where \$IOTDB\_HOME represents the path of the IoTDB installation
directory.

## 6.1.1 Cli/Shell Running Mode
After installation, there is a default user in IoTDB: root, and the
default password is root. Users can use this user name to try to run the
IoTDB client to test whether the server has started properly. The client
startup script is the start-client script under the \$IOTDB\_HOME/bin
folder. When starting the script, you need to specify the IP and PORT to
run. The following is an example where the server is started locally and
the user has not changed the running port number. The default port is
6667. If the user attempts to connect to the remote server or changes
the port number of the server running, use the server's IP and PORT at -
h and - p entries.

The Linux and MacOS system startup commands are as follows:
```
  Shell > \bin\start-client.sh -h 127.0.0.1 -p 6667 -u root -pw root
```
The Windows system startup commands are as follows:
```
  Shell > \bin\start-client.bat -h 127.0.0.1 -p 6667 -u root -pw root
```
After pressing Enter, the client can be started successfully. Successful
startup occurs after startup as shown in the figure6.1.

![](./fig/6.1.jpg)

figure 6.1 Client login success status

After successful connection, users can use Client to input SQL commands
to operate IoTDB Server.

Enter “quit” or “exit” to exit Client to end the session, and Client
outputs “quit normally” to indicate successful exit. As shown in the
figure6.2

![](./fig/6.2.jpg)

figure6.2 client exit success status

## 6.1.2 Cli/Shell operation parameters

|Parameter name|Parameter type|Whether the parameter is required| Explaination| Example |
|:---|:---|:---|:---|:---|
|-disableIS08601 |No parameters | No |If this parameter is set, IoTDB will print the timestamp in digital form|-disableIS08601|
|-h <`host`> |string with no quotation marks  required|Yes|The IP address of the IoTDB client connecting to the IoTDB server|-h 10.129.187.21|
|-help|No parameters|No|Print help information for IoTDB|-help|
|-p <`port`>|int|Yes|The port number of the IoTDB used to connect server. IoTDB runs on port 6667 by default|-p 6667|
|-pw <`password`>|string with no quotation marks  required|No|The password used for IoTDB to connect to the server. If no password is entered, IoTDB will prompt for the password on the Cli side|-pw root|
|-u <`username`>|string with no quotation marks  required|Yes|User name used for IoTDB to connect to the server|-u root|
|-maxPRC <`maxPrintRowCount`>|int|No|Set the maximum number of rows that IoTDB returns to the client command line|-maxPRC 10|

Following is a client command which connects the host with IP
10.129.187.21, port 6667, user name “root”, password “root”, and prints
the timestamp in digital form. The maximum number of lines displayed on
the IoTDB command line is 10.

The Linux and MacOS system startup commands are as follows:
```
  Shell >./bin/start-client.sh -h 10.129.187.21 -p 6667 -u root -pw root -disableIS08601 -maxPRC 10
```
The Windows system startup commands are as follows:
```
  Shell > \bin\start-client.bat -h 10.129.187.21 -p 6667 -u root -pw root -disableIS08601 -maxPRC 10
```

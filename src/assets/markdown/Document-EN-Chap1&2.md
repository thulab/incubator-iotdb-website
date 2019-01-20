# Chapter 1: Overview

## What is IoTDB

IoTDB(Internet of Things Database) is an integrated data management engine designed for timeseries data, which can provide users specific services for data collection, storage and analysis. Due to its light weight structure, high performance and usable features together with its intense integration with Hadoop and Spark ecology, IoTDB meets the requirements of massive dataset storage, high-speed data input and complex data analysis in the IoT industrial field.

## Architecture

Besides IoTDB engine, we also developed several components to provide better IoT service. All components are referred to below as the IoTDB suite, and IoTDB refers specifically to the IoTDB engine.

IoTDB suite can provide a series of functions in the real situation such as data collection, data writing, data storage, data query, data visualization and data analysis. Figure 1.1 shows the overall application architecture brought by all the components of the IoTDB suite. 

![](./fig/1.1.jpg)

As shown in Figure 1.1, users can use JDBC to import timeseries data collected by sensor on the device to local/remote IoTDB. These timeseries data may be system state data (such as server load and CPU memory, etc.), message queue data, timeseries data from applications, or other timeseries data in the database. Users can also write the data directly to the TsFile (local or on HDFS).

For the data written to IoTDB and local TsFile, users can use TsFileSync tool to synchronize the TsFile to the HDFS, thereby implementing data processing tasks such as abnormality detection and machine learning on the Hadoop or Spark data processing platform. The results of the analysis can be write back to TsFile in the same way.

Also, IoTDB and TsFile provide client tools to meet the various needs of users in writing and viewing data in SQL form, script form and graphical form.

## Scenario

## Scenario 1

A company uses surface mount technology (SMT) to produce chips: it is necessary to first print solder paste on the joints of the chip, then place the components on the solder paste, and then melt the solder paste by heating and cool it. Finally, the components are soldered to the chip. 

The above process uses an automated production line. In order to ensure the quality of the product, after printing the solder paste, the quality of the solder paste printing needs to be evaluated by optical equipment. The volume (v), height (h), area (a), horizontal offset (px), and vertical offset (py) of the solder paste on each joint are measured by a three-dimensional solder paste printing (SPI) device.

In order to improve the quality of the printing, it is necessary for the company to store the metrics of the solder joints on each chip for subsequent analysis based on these data.

At this point, the data can be stored using TsFile component, TsFileSync tool, and Hadoop/Spark integration component in the IoTDB suite.That is, each time a new chip is printed, a data is written on the SPI device using the SDK, which ultimately forms a TsFile. Through the TsFileSync tool, the generated TsFile will be synchronized to the data center according to certain rules (such as daily) and analyzed by data analysts tools.

![](./fig/1.2.png)

In this scenario, only TsFile and TsFileSync are required to be deployed on a PC, and a Hadoop/Spark cluster is required. The schematic diagram is shown in Figure 1.2. Figure 1.3 shows the architecture at this time.

![](./fig/1.3.jpg)

## Scenario 2

A company has several wind turbines which are installed hundreds of sensors on each generator to collect information such as the working status of the generator and the wind speed in the working environment.

In order to ensure the normal operation of the turbines and timely monitoring and analysis of the turbines, the company needs to collect these sensor data, perform partial calculation and analysis in the turbines working environment, and upload the original data collected to the data center.

![](./fig/1.4.png)

In this situation, IoTDB, TsFileSync tools, and Hadoop/Spark integration components in the IoTDB suite can be used. A PC needs to be deployed with IoTDB and TsFileSync tools installed to support reading and writing data, local computing and analysis, and uploading data to the data center. In addition, Hadoop/Spark clusters need to be deployed for data storage and analysis on the data center side. As shown in Figure 1.4. Figure 1.5 shows the architecture at this time.

![](./fig/1.5.jpg)

## Scenario 3

A factory has a variety of robotic equipment within the plant area. These robotic equipment have limited hardware and are difficult to carry complex applications. 

A variety of sensors are installed on each robotic device to monitor the robot's operating status, temperature, and other information. Due to the network environment of the factory, the robots inside the factory are all within the LAN of the factory and cannot connect to the external network. But there will be several servers in the factory that can connect directly to the external public network.

In order to ensure that the data of the robot can be monitored and analyzed in time, the company needs to collect the information of these robot sensors, send them to the server that can connect to the external network, and then upload the original data information to the data center for complex calculation and analysis.

![](./fig/1.6.jpg)

At this point, IoTDB, IoTDB-CLI tools, TsFileSync tools, and Hadoop/Spark integration components in the IoTDB suite can be used. IoTDB-CLI tool is installed on the robot and each of them is connected to the LAN of the factory. When sensors generate real-time data, the data will be uploaded to the server in the factory. The IoTDB server and TsFileSync is installed on the server connected to the external network. Once triggered, the data on the server will be upload to the data center. In addition, Hadoop/Spark clusters need to be deployed for data storage and analysis on the data center side. As shown in Figure 1.6. Figure 1.7 shows the architecture at this time.

![](./fig/1.7.jpg)

## Scenario 4

A car company installed sensors on its cars to collect monitoring information such as the driving status of the vehicle. These automotive devices have limited hardware configurations and are difficult to carry complex applications. Cars with sensors can be connected to each other or send data via narrow-band IoT.

In order to receive the IoT data collected by the car sensor in real time, the company needs to send the sensor data to the data center in real time through the narrowband IoT while the vehicle is running. Thus, they can perform complex calculations and analysis on the server in the data center.

At this point, IoTDB, IoTDB-CLI, and Hadoop/Spark integration components in the IoTDB suite can be used. IoTDB-CLI tool is installed on each car and use IoTDB-JDBC tool to send data directly back to the server in the data center.

In addition, Hadoop/Spark clusters need to be deployed for data storage and analysis on the data center side. As shown in Figure 1.8.

![](./fig/1.8.jpg)

## Features


* Flexible deployment. IoTDB provides users one-click installation tool on the cloud, once-decompressed-used terminal tool and the bridge tool between cloud platform and terminal tool (Data Synchronization Tool).
* Low cost on hardware. IoTDB can reach a high compression ratio of disk storage (For one billion data storage, hard drive cost less than $0.23)
* Efficient directory structure. IoTDB supports efficient oganization for complex timeseries data structure from intelligent networking devices, oganization for timeseries data from devices of the same type, fuzzy searching strategy for massive and complex directory of timeseries data.
* High-throughput read and write. IoTDB supports millions of low-power devices' strong connection data access, high-speed data read and write for intelligent networking devices and mixed devices mentioned above.
* Rich query semantics. IoTDB supports time alignment for timeseries data accross devices and sensors, computation in timeseries field (frequency domain transformation) and rich aggregation function support in time dimension.
* Easy to get start. IoTDB supports SQL-Like language, JDBC standard API and import/export tools which is easy to use.
* Intense integration with Open Source Ecosystem. IoTDB supports Hadoop, Spark, etc. analysis ecosystems and Grafana visualization tool.

## Benefits
## Release Notes

# Chapter2: Quick Start

This short guide will walk you through the basic process of using IoTDB. For a more-complete guide, please visit our website’s [Document Part](http://tsfile.org/document).

## Build

If you are not the first time that building IoTDB, remember deleting the following files:

```
rm -rf iotdb/data/
rm -rf iotdb/lib/
```

Then you can build IoTDB using Maven:

```
mvn clean package -Dmaven.test.skip=true
```

If successful, you will see the the following text in the terminal:

```
[INFO] BUILD SUCCESS
```
Otherwise, you may need to check the error statements and fix the problems.

After build, the IoTDB project will be at the subfolder named iotdb. The folder will include the following contents:


```
iotdb/     <-- root path
|
+- bin/       <-- script files
|
+- conf/      <-- configuration files
|
+- lib/       <-- project dependencies
|
+- LICENSE    <-- LICENSE
```

> NOTE: We also provide already built JARs and project at [http://tsfile.org/download](http://tsfile.org/download) instead of build the jar package yourself.

## Configure

Before starting to use IoTDB, you need to config the configuration files first. For your convenience, we have already set the default config in the files.

In total, we provide users three kinds of configurations module: environment config module (iotdb-env.bat, iotdb-env.sh), system config module (tsfile-format.properties, iotdb-engine.properties) and log config module (logback.xml). All of these kinds of configuration files are put in iotdb/config folder.

For more, you are advised to check Chapter 4 to give you the details.

## Start

### Start Server

After that we start the server. Running the startup script: 

```
# Unix/OS X
> $IOTDB_HOME/bin/start-server.sh

# Windows
> $IOTDB_HOME\bin\start-server.bat
```


### Start Client

Now let's trying to read and write some data from IoTDB using our Client. To start the client, you need to explicit the server's IP and PORT as well as the USER_NAME and PASSWORD. 

```
# Unix/OS X
> $IOTDB_HOME/bin/start-client.sh -h <IP> -p <PORT> -u <USER_NAME>

# Windows
> $IOTDB_HOME\bin\start-client.bat -h <IP> -p <PORT> -u <USER_NAME>
```

> NOTE: In the system, we set a default user in IoTDB named 'root'. The default password for 'root' is 'root'. You can use this default user if you are making the first try or you didn't create users by yourself.

The command line client is interactive so if everything is ready you should see the welcome logo and statements:

```
 _____       _________  ______   ______
|_   _|     |  _   _  ||_   _ `.|_   _ \
  | |   .--.|_/ | | \_|  | | `. \ | |_) |
  | | / .'`\ \  | |      | |  | | |  __'.
 _| |_| \__. | _| |_    _| |_.' /_| |__) |
|_____|'.__.' |_____|  |______.'|_______/  version x.x.x


IoTDB> login successfully
IoTDB>
```
### Have a try
Now, you can use IoTDB SQL to operate IoTDB, and when you’ve had enough fun, you can input 'quit' or 'exit' command to leave the client. 

But lets try something slightly more interesting:

``` 
IoTDB> SET STORAGE GROUP TO root.ln
execute successfully.
IoTDB> CREATE TIMESERIES root.ln.wf01.wt01.status WITH DATATYPE=BOOLEAN, ENCODING=PLAIN
execute successfully.
```
Till now, we have already create a table called root.vehicle and add a colomn called d0.s0 in the table. Let's take a look at what we have done by 'SHOW TIMESERIES' command.

``` 
IoTDB> SHOW TIMESERIES
===  Timeseries Tree  ===

root:{
    ln:{
        wf01:{
            wt01:{
                status:{
                     DataType: BOOLEAN,
                     Encoding: PLAIN,
                     args: {},
                     StorageGroup: root.ln
                }
            }
        }
    }
}
```

For a further try, create a timeseries again and use SHOW TIMESERIES to check result.

```
IoTDB> CREATE TIMESERIES root.ln.wf01.wt01.temperature WITH DATATYPE=FLOAT, ENCODING=RLE
IoTDB> SHOW TIMESERIES
===  Timeseries Tree  ===

root:{
    ln:{
        wf01:{
            wt01:{
                status:{
                     DataType: BOOLEAN,
                     Encoding: PLAIN,
                     args: {},
                     StorageGroup: root.ln
                },
                temperature:{
                     DataType: FLOAT,
                     Encoding: RLE,
                     args: {},
                     StorageGroup: root.ln
                }
            }
        }
    }
}
```
Now, for your conveniect, SHOW TIMESERIES clause also supports extention syntax, the pattern is (for further details, check Chapter x):

```
SHOW TIMESERIES <PATH>
```

Here is the example:

```
IoTDB> SHOW TIMESERIES root.ln.wf01.wt01
+------------------------------+--------------+--------+--------+
|                    Timeseries| Storage Group|DataType|Encoding|
+------------------------------+--------------+--------+--------+
|      root.ln.wf01.wt01.status|       root.ln| BOOLEAN|   PLAIN|
| root.ln.wf01.wt01.temperature|       root.ln|   FLOAT|     RLE|
+------------------------------+--------------+--------+--------+
Total timeseries number = 2
Execute successfully.
```
We can also use SHOW STORAGE GROUP to check created storage group:

```
IoTDB> show storage group
+-----------------------------------+
|                      Storage Group|
+-----------------------------------+
|                            root.ln|
+-----------------------------------+
Total storage group number = 1
Execute successfully.
It costs 0.006s
```


Insert timeseries data is the basic operation of IoTDB, you can use 'INSERT' command to finish this:

```
IoTDB> INSERT INTO root.ln.wf01.wt01(timestamp,status) values(100,true);
execute successfully.
IoTDB> INSERT INTO root.ln.wf01.wt01(timestamp,status,temperature) values(200,false,20.71) execute successfully.
```
The data we've just inserted displays like this:

```
IoTDB> SELECT status FROM root.ln.wf01.wt01
+-----------------------+------------------------+
|                   Time|root.ln.wf01.wt01.status|
+-----------------------+------------------------+
|1970-01-01T08:00:00.100|                    true|
|1970-01-01T08:00:00.200|                   false|
+-----------------------+------------------------+
record number = 1
execute successfully.
```

We can also query several timeseries data at once like this:

```
IoTDB> SELECT * FROM root.ln.wf01.wt01
+-----------------------+--------------------------+-----------------------------+
|                   Time|  root.ln.wf01.wt01.status|root.ln.wf01.wt01.temperature|
+-----------------------+--------------------------+-----------------------------+
|1970-01-01T08:00:00.100|                      true|                         null|
|1970-01-01T08:00:00.200|                     false|                        20.71|
+-----------------------+--------------------------+-----------------------------+
```

If your session looks similar to what’s above, congrats, your IoTDB is operational!

For more on what commands are supported by IoTDB SQL, see Chapter xx. It will give you help.

### Stop Server

The server can be stopped with ctrl-C or the following script:

```
# Unix/ OS X
> $IOTDB_HOME/bin/stop-server.sh

# Windows
> $IOTDB_HOME\bin\stop-server.bat
```


# Chapter 3
## Terms


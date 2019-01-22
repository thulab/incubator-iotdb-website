<!-- TOC -->

- [Frequently Asked Questions](#frequently-asked-questions)
        - [How can I identify my version of IoTDB?](#how-can-i-identify-my-version-of-iotdb)
        - [Where can I find IoTDB logs?](#where-can-i-find-iotdb-logs)
        - [Where can I find IoTDB data files?](#where-can-i-find-iotdb-data-files)
        - [How do I know how many time series are stored in IoTDB?](#how-do-i-know-how-many-time-series-are-stored-in-iotdb)
        - [Does IoTDB support Hadoop and Spark?](#does-iotdb-support-hadoop-and-spark)
        - [How does IoTDB handle duplicate points?](#how-does-iotdb-handle-duplicate-points)
        - [How can I tell what type of data are stored?](#how-can-i-tell-what-type-of-data-are-stored)
        - [How can I change IoTDB's CLI time display format?](#how-can-i-change-iotdbs-cli-time-display-format)

<!-- /TOC -->
## Frequently Asked Questions

#### How can I identify my version of IoTDB?
There are several ways to identify the version of IoTDB that you are using:
Launch IoTDB's Command Line Interface:
```
> ./start-client.sh -p 6667 -pw root -u root -h localhost
 _____       _________  ______   ______    
|_   _|     |  _   _  ||_   _ `.|_   _ \   
  | |   .--.|_/ | | \_|  | | `. \ | |_) |  
  | | / .'`\ \  | |      | |  | | |  __'.  
 _| |_| \__. | _| |_    _| |_.' /_| |__) | 
|_____|'.__.' |_____|  |______.'|_______/  version 0.7.0
```

Check pom.xml file:
```
<version>0.7.0</version>
```

Use JDBC API:
```
String iotdbVersion = tsfileDatabaseMetadata.getDatabaseProductVersion();
```

#### Where can I find IoTDB logs?
By default settings, the logs are stored under ```IOTDB_HOME/iotdb/logs```. You can change log level and storage path by configuring ```logback.xml``` under ```IOTDB_HOME/iotdb/conf```. ```IOTDB_HOME``` is the root path of IoTDB project.

#### Where can I find IoTDB data files?
By default settings, the data files (including tsfile, metadata, and WAL files) are stored under ```IOTDB_HOME/iotdb/data```.

#### How do I know how many time series are stored in IoTDB?
Use IoTDB's Command Line Interface:
```
IoTDB> show timeseries root.*
+---------------------------------------------------------------------------+---------------------------------------------+--------+--------+
|                                                                 Timeseries|                                Storage Group|DataType|Encoding|
+---------------------------------------------------------------------------+---------------------------------------------+--------+--------+
|                                                         root.vehicle.d0.s0|                                 root.vehicle|   INT32|     RLE|
|                                                             root.fit.d1.s1|                                  root.fit.d1|   INT32|     RLE|
|                                                             root.fit.d1.s2|                                  root.fit.d1|    TEXT|   PLAIN|
|                                                             root.fit.d2.s1|                                  root.fit.d2|   INT32|     RLE|
|                                                             root.fit.d2.s3|                                  root.fit.d2|   INT32|     RLE|
|                                                              root.fit.p.s1|                                   root.fit.p|   INT32|     RLE|
+---------------------------------------------------------------------------+---------------------------------------------+--------+--------+
----------------------------------------
Total timeseries number = 6
Execute successfully.
```
If you are using Linux, you can use the following shell command:
```
> grep "0,root" IOTDB_HOME/iotdb/data/system/schema/mlog.txt |  wc -l
>   6
```

#### Does IoTDB support Hadoop and Spark?
Yes. IoTDB has intense integration with Open Source Ecosystem. IoTDB supports [Hadoop](https://github.com/thulab/iotdb/tree/master/hadoop), [Spark](https://github.com/thulab/iotdb/tree/master/spark) and [Grafana](https://github.com/thulab/iotdb/tree/master/grafana) visualization tool.

#### How does IoTDB handle duplicate points?
A data point is uniquely identified by a full time series path (e.g. ```root.vehicle.d0.s0```) and timestamp. If you submit a new point with the same path and timestamp as an existing point, 

#### How can I tell what type of data are stored?
Use ```SHOW TIMESERIES``` SQL in IoTDB's Command Line Interface:

Example
```
IoTDB> show timeseries
===  Timeseries Tree  ===

root:{
    vehicle:{
        d0:{
            s0:{
                 DataType: INT32,
                 Encoding: RLE,
                 args: {},
                 StorageGroup: root.vehicle 
            }
        }
    },
    fit:{
        d1:{
            s1:{
                 DataType: INT32,
                 Encoding: RLE,
                 args: {},
                 StorageGroup: root.fit.d1 
            },
            s2:{
                 DataType: TEXT,
                 Encoding: PLAIN,
                 args: {},
                 StorageGroup: root.fit.d1 
            }
        }
    }
}
```
If you want to query specific sensor:
```
IoTDB> show timeseries root.fit.d1.s1
+---------------------------------------------------------------------------+---------------------------------------------+--------+--------+
|                                                                 Timeseries|                                Storage Group|DataType|Encoding|
+---------------------------------------------------------------------------+---------------------------------------------+--------+--------+
|                                                             root.fit.d1.s1|                                  root.fit.d1|   INT32|     RLE|
+---------------------------------------------------------------------------+---------------------------------------------+--------+--------+
----------------------------------------
Total timeseries number = 1
```
or use wildcard in time series path:
```
IoTDB> show timeseries root.fit.d1.*
+---------------------------------------------------------------------------+---------------------------------------------+--------+--------+
|                                                                 Timeseries|                                Storage Group|DataType|Encoding|
+---------------------------------------------------------------------------+---------------------------------------------+--------+--------+
|                                                             root.fit.d1.s1|                                  root.fit.d1|   INT32|     RLE|
|                                                             root.fit.d1.s2|                                  root.fit.d1|    TEXT|   PLAIN|
+---------------------------------------------------------------------------+---------------------------------------------+--------+--------+
----------------------------------------
Total timeseries number = 2
```

#### How can I change IoTDB's CLI time display format?
The default IoTDB's CLI time display format is human readable (e.g. ```1970-01-01T08:00:00.001```), if you want to display numeric timestamp add the parameter ```-disableIS08601``` in start command:
```
>sh IOTDB_HOME/iotdb/bin/start-client.sh -h 10.129.187.21 -p 6667 -u root -pw root -disableIS08601
```
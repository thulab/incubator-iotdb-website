<!-- TOC -->

- [Chapter 4 IoTDB Operation Manual](#chapter-4-iotdb-operation-manual)
    - [4.1 Scenario Description and Sample Data](#41-scenario-description-and-sample-data)
        - [4.1.1 Scenario Description](#411-scenario-description)
        - [4.1.2 Sample Data](#412-sample-data)
    - [4.2 Data Model Selection and Creation](#42-data-model-selection-and-creation)
        - [4.2.1 Storage Model Selection](#421-storage-model-selection)
        - [4.2.2 Storage Group Creation](#422-storage-group-creation)
        - [4.2.3 Show Storage Group](#423-show-storage-group)
        - [4.2.4 Time Series Creation](#424-time-series-creation)
        - [4.2.5 Show Time Series](#425-show-time-series)
        - [4.2.6 Precautions](#426-precautions)
    - [4.3 Data Access](#43-data-access)
        - [4.3.1 Import Historical Data](#431-import-historical-data)
        - [4.3.2 Import Real-time Data](#432-import-real-time-data)
        - [4.3.2.1 Use of INSERT Statements](#4321-use-of-insert-statements)
        - [4.3.2.2 Error Handling of INSERT Statements](#4322-error-handling-of-insert-statements)
    - [4.4 Data Query](#44-data-query)
        - [4.4.1 Time Slice Query](#441-time-slice-query)
            - [4.4.1.1 Select a Column of Data Based on a Time Interval](#4411-select-a-column-of-data-based-on-a-time-interval)
            - [4.4.1.2 Select Multiple Columns of Data Based on a Time Interval](#4412-select-multiple-columns-of-data-based-on-a-time-interval)
            - [4.4.1.3 Select Multiple Columns of Data for the Same Device According to Multiple Time Intervals](#4413-select-multiple-columns-of-data-for-the-same-device-according-to-multiple-time-intervals)
            - [4.4.1.4 Choose Multiple Columns of Data for Different Devices According to Multiple Time Intervals](#4414-choose-multiple-columns-of-data-for-different-devices-according-to-multiple-time-intervals)
        - [4.4.2 Down-Frequency Aggregate Query](#442-down-frequency-aggregate-query)
            - [4.4.2.1 Down-Frequency Aggregate Query without Specifying the Time Axis Origin Position](#4421-down-frequency-aggregate-query-without-specifying-the-time-axis-origin-position)
            - [4.4.2.2 Down-Frequency Aggregate Query Specifying the Time Axis Origin Position](#4422-down-frequency-aggregate-query-specifying-the-time-axis-origin-position)
            - [4.4.2.3 Down-Frequency Aggregate Query Specifying the Time Filtering Conditions](#4423-down-frequency-aggregate-query-specifying-the-time-filtering-conditions)
        - [4.4.3 Index Query (Experimental Function)](#443-index-query-experimental-function)
            - [4.4.3.1 KvIndex (Similarity Matching Query)](#4431-kvindex-similarity-matching-query)
                - [4.4.3.1.1 KvIndex Establishment](#44311-kvindex-establishment)
                - [4.4.3.1.2 KvIndex Query](#44312-kvindex-query)
                - [4.4.3.1.3 KvIndex Deletion](#44313-kvindex-deletion)
        - [4.4.4 Automated Fill](#444-automated-fill)
            - [4.4.4.1 Fill Method](#4441-fill-method)
                - [4.4.4.1.1 Previous Method](#44411-previous-method)
                - [4.4.4.1.2 Linear Method](#44412-linear-method)
            - [4.4.4.2 Correspondence between Data Type and Fill Method](#4442-correspondence-between-data-type-and-fill-method)
        - [4.4.5 Row and Column Control over Query Results](#445-row-and-column-control-over-query-results)
            - [4.4.5.1 Row Control over Query Results](#4451-row-control-over-query-results)
            - [4.4.5.2 Column Control over Query Results](#4452-column-control-over-query-results)
            - [4.4.5.3 Row and Column Control over Query Results](#4453-row-and-column-control-over-query-results)
            - [4.4.5.4 Error Handling](#4454-error-handling)
    - [4.5 Data Maintenance](#45-data-maintenance)
        - [4.5.1 Data Update](#451-data-update)
            - [4.5.1.1 Update Single Time Series](#4511-update-single-time-series)
        - [4.5.2 Data Deletion](#452-data-deletion)
            - [4.5.2.1 Delete Single Time Series](#4521-delete-single-time-series)
            - [4.5.2.2 Delete Multiple Time Series](#4522-delete-multiple-time-series)
    - [4.6 Priviledge Management](#46-priviledge-management)
        - [4.6.1 Basic Concepts](#461-basic-concepts)
            - [4.6.1.1 User](#4611-user)
            - [4.6.1.2 Priviledge](#4612-priviledge)
            - [4.6.1.3 Role](#4613-role)
            - [4.6.1.4 Default User](#4614-default-user)
        - [4.6.2 Priviledge Management Operation Examples](#462-priviledge-management-operation-examples)
            - [4.6.2.1 Create User](#4621-create-user)
            - [4.6.2.2 Grant User Priviledge](#4622-grant-user-priviledge)
        - [4.6.3 Other Instructions](#463-other-instructions)
            - [4.6.3.1 The Relationship among Users, Priviledges and Roles](#4631-the-relationship-among-users-priviledges-and-roles)
            - [4.6.3.2 List of Priviledges Included in the System](#4632-list-of-priviledges-included-in-the-system)
            - [4.6.3.3 Username Restrictions](#4633-username-restrictions)
            - [4.6.3.4 Password Restrictions](#4634-password-restrictions)
            - [4.6.3.5 Role Name Restrictions](#4635-role-name-restrictions)

<!-- /TOC -->
# Chapter 4 IoTDB Operation Manual

## 4.1 Scenario Description and Sample Data

To make this manual more practical, we will use a specific scenario example in this chapter to illustrate how to operate IoTDB databases at all stages of use. For your convenience, we also provide you with a sample data file in the scenario of this chapter for you to import into the IoTDB system for trial and operation.

### 4.1.1 Scenario Description
A power department needs to monitor the operation of various power plants under its jurisdiction. By collecting real-time monitoring data sent by various types of sensors deployed by various power plants, the power department can monitor the real-time operation of the power plants and understand the trend of data changes, etc. IoTDB has the characteristics of high write throughput and rich query functions, which can provide effective support for the needs of the power department.

The real-time data needed to be monitored involves multiple attribute layers:

**Power Generation Group**: The data belongs to nearly ten power generation groups, and the name codes are ln, sgcc, etc.

**Power plant**: The power generation group has more than 10 kinds of electric fields, such as wind farm, hydropower plant and photovoltaic power plant, numbered as wf01, wf02, wf03 and so on.

**Device**: Each power plant has about 5,000 kinds of power generation devices such as wind turbines and photovoltaic panels, numbered as wt01, wt02 and so on.

**Sensors**: For different devices, there are 10 to 1000 sensors monitoring different states of the devices , such as power supply status sensor (named status), temperature sensor (named temperature), hardware version sensor (named hardware), etc. 

It is worth noting that prior to the use of IoTDB by the power sector, some historical monitoring data of various power plants needs to be imported into the IoTDB system (we will introduce the import method in Section 4.3.1 of this chapter). Simutaneouly, the real-time monitoring data is continuously flowing into the IoTDB system (we will introduce the import method in Section 4.3.2 of this chapter). 

### 4.1.2 Sample Data
Based on the description of the above sample scenarios, we provide you with a simplified sample data. The data download address is http://tsfile.org/download.

The basic information of the data is shown in Table 4-1.
 
**Table 4-1 The basic information of the data**

|Name  |Data Type|  Coding | Meaning |
|:---|:---|:---|:---|
|root.ln.wf01.wt01.status|   Boolean|PLAIN| the power supply status of  ln group wf01 plant wt01 device |
|root.ln.wf01.wt01.temperature  |Float|RLE| the temperature of ln group wf01 plant wt01 device|
|root.ln.wf02.wt02.hardware  |Text|PLAIN| the hardware version of ln group wf02 plant wt02 device|
|root.ln.wf02.wt02.status  |Boolean|PLAIN| the power supply status of  ln group wf02 plant wt02 device|
|root.sgcc.wf03.wt01.status|Boolean|PLAIN| the power supply status of  sgcc group wf03 plant wt01 device|
|root.sgcc.wf03.wt01.temperature   |Float|RLE| the temperature of sgcc group wf03 plant wt01 device|

The time span of this data is from 10:00 on November 1, 2017 to 12:00 on November 2, 2017. The frequency at which data is generated is two minutes each.

In Section 4.2, we will show how to apply IoTDB's data model rules to construct the data model shown in Section 4.1.2 using  the data from the scenario in Section 4.1.1. In section 4.3.1, we will introduce you to the method of importing historical data, and in section 4.3.2, we will introduce you to the method of accessing real-time data. In section 4.4, we will introduce you to three typical data query patterns using IoTDB. In Section 4.5, we will show you how to update and delete data using IoTDB.

## 4.2 Data Model Selection and Creation
Before importing data to IoTDB, we first select the appropriate data storage model according to the sample data provided in Section 4.1, and then create the storage group and time series using SET STORAGE GROUP statement and CRATE TIMESERIES statement respectively (see Section 7.1.2.2 of this manual for detailed grammar).

### 4.2.1 Storage Model Selection
According to the data attribute layers described in Section 4.1.1 of this chapter, we can express it as an attribute hierarchy structure based on the coverage of attributes and the subordinate relationship between them, as shown in Figure 4.1 below. Its hierarchical relationship is: group layer - electric field layer - device layer - sensor layer. ROOT is the root node, and each node of sensor layer is called a leaf node. In the process of using IoTDB, you can directly connect the attributes on the path from ROOT node to each leaf node with ".", thus forming the name of a time series in IoTDB. For example, The left-most path in Figure 4.1 can generate a time series named `ROOT.ln.wf01.wt01.status`.

![](./fig/4.1.jpg)

**Figure 4.1 Attribute hierarchy structure**

After getting the name of the time series, we need to set up the storage group according to the actual scenario and scale of the data. Because in the scenario of this chapter data is usually arrived in the unit of groups (i.e., data may be across electric fields and devices), in order to avoid frequent switching of IO when writing data, and to meet the user's requirement of physical isolation of data in the unit of  groups, we set the storage group at the group layer.

### 4.2.2 Storage Group Creation
After selecting the storage model, according to which we can set up the corresponding storage group. The SQL statements for creating storage groups are as follows:

```
IoTDB > set storage group to root.ln
IoTDB > set storage group to root.sgcc
```

We can thus create two storage groups using the above two SQL statements.

It is worth noting that when the path itself or the parent/child layer of the path is already set as a storage group, the path is then not allowed to be set as a storage group. For example, it is not feasible to set `root.ln.wf01` as a storage group when there exist two storage groups `root.ln` and `root.sgcc`. The system will give the corresponding error prompt as shown below:

```
IoTDB> set storage group to root.ln.wf01
error: The prefix of root.ln.wf01 has been set to the storage group.
```

### 4.2.3 Show Storage Group
After the storage group is created, we can use the SHOW STORAGE GROUP statement to view all the storage groups. The SQL statement is as follows:

```
IoTDB> show storage group
```

The result is as follows:
![](./fig/4.2.jpg)

### 4.2.4 Time Series Creation
According to the storage model selected in Section 4.2.1, we can create corresponding time series in the two storage groups respectively. The SQL statements for creating time series are as follows:

```
IoTDB > create timeseries root.ln.wf01.wt01.status with datatype=BOOLEAN,encoding=PLAIN
IoTDB > create timeseries root.ln.wf01.wt01.temperature with datatype=FLOAT,encoding=RLE
IoTDB > create timeseries root.ln.wf02.wt02.hardware with datatype=TEXT,encoding=PLAIN
IoTDB > create timeseries root.ln.wf02.wt02.status with datatype=BOOLEAN,encoding=PLAIN
IoTDB > create timeseries root.sgcc.wf03.wt01.status with datatype=BOOLEAN,encoding=PLAIN
IoTDB > create timeseries root.sgcc.wf03.wt01.temperature with datatype=FLOAT,encoding=RLE
```

It is worth noting that when in the CRATE TIMESERIES statement the encoding method conflicts with the data type, the system will give the corresponding error prompt as shown below:
```
IoTDB> create timeseries root.ln.wf02.wt02.status WITH DATATYPE=BOOLEAN, ENCODING=TS_2DIFF
error: encoding TS_2DIFF does not support BOOLEAN
```

Please refer to Section 3.3.5 of this manual for correspondence between data type and coding.

### 4.2.5 Show Time Series
Currently, IoTDB supports two ways of viewing time series:

* SHOW TIMESERIES statement presents all time series information in JSON form 
* SHOW TIMESERIES <`Path`> statement returns all time series information and the total number of time series under the given <`Path`>  in tabular form. Time series information includes: timeseries path, storage group it belongs to, data type, coding type.  <`Path`> needs to be a prefix path or a path with star or a timeseries path. SQL statements are as follows:

```
IoTDB> show timeseries root
IoTDB> show timeseries root.ln
```

The results are shown below respectly:
![](./fig/4.3.jpg)
![](./fig/4.4.jpg)

It is worth noting that when the path queries does not exist, the system will give the corresponding error prompt as shown below:
```
IoTDB> show timeseries root.ln.wf03
Msg: Failed to fetch timeseries root.ln.wf03's metadata because: Timeseries does not exist.
```

### 4.2.6 Precautions
Version 0.7.0 imposes some limitations on the scale of data that users can operate:

Limit 1: Assuming that the JVM memory allocated to IoTDB at runtime is p and the user-defined size of data in memory written to disk (see `group_size_in_byte` in section 5.2.2.1) is Q, then the number of storage groups should not exceed p/q.

Limit 2: The number of time series should not exceed the ratio of JVM memory allocated to IoTDB at run time to 20KB.

## 4.3 Data Access
### 4.3.1 Import Historical Data
This feature is not supported in version 0.7.0.

### 4.3.2 Import Real-time Data
IoTDB provides users with a variety of ways to insert real-time data, such as directly inputting INSERT statements in Cli/Shell tools (see Section 6.1 of this manual for details), or using Java API (see Section 7.2 for standard JDBC interface) to perform single or batch execution of INSERT statements.

This section mainly introduces the use of INSERT SQL statements for real-time data access in the scenario of Section 4.1.1. See Section 7.1.3.1 for a detailed syntax of INSERT SQL statements.

### 4.3.2.1 Use of INSERT Statements
The INSERT statement can be used to insert data into one or more specified time series that have been created. For each point of data inserted, it consists of a timestamp (see Section 3.1.8) and a sensor acquisition value of a numerical type (see Section 3.2).

In the scenario of this section, take two time series `root.ln.wf02.wt02.status` and `root.ln.wf02.wt02.hardware` as an example, and their data types are BOOLEAN and TEXT, respectively.

The sample code for single column data insertion is as follows:
```
IoTDB > insert into root.ln.wf02.wt02(timestamp,status) values(1,true)
IoTDB > insert into root.ln.wf02.wt02(timestamp,hardware) values(1, "v1")
```

The above example code inserts the long integer timestamp and the value "true" into the time series `root.ln.wf02.wt02.status` and inserts the long integer timestamp and the value "v1" into the time series `root.ln.wf02.wt02.hardware`. When the execution is successful, a prompt "execute successfully" will appear to indicate that the data insertion has been completed.

Note: In IoTDB, TEXT type data can be represented by single and double quotation marks. The insertion statement above uses double quotation marks for TEXT type data. The following example will use single quotation marks for TEXT type data.

The INSERT statement can also support the insertion of multi-column data at the same time point.  The sample code of  inserting the values of the two time series at the same time point '2' is as follows:
```
IoTDB > insert into root.ln.wf02.wt02(timestamp, status, hardware) VALUES (2, false, 'v2')
```

After inserting the data, we can simply query the inserted data using the SELECT statement:
```
IoTDB > select * from root.ln.wf02 where time < 3
```

The result is shown below. From the query results, it can be seen that the insertion statements of single column and multi column data are performed correctly.
![](./fig/4.5.jpg)

### 4.3.2.2 Error Handling of INSERT Statements
If the user inserts data into a non-existent time series, for example, execute the following commands:
```
IoTDB > insert into root.ln.wf02.wt02(timestamp, temperature) values(1,"v1")
```
Because `root.ln.wf02.wt02. temperature` does not exist, the system will return the following ERROR information:
```
error: Timeseries root.ln.wf02.wt02.temperature does not exist.
```
If the data type inserted by the user is inconsistent with the corresponding data type of the timeseries, for example, execute the following command:
```
IoTDB > insert into root.ln.wf02.wt02(timestamp,hardware) values(1,100)
```
The system will return the following ERROR information:
```
error: The TEXT data type should be covered by " or '
```

## 4.4 Data Query
### 4.4.1 Time Slice Query
This chapter mainly introduces the relevant examples of time slice query using IoTDB SELECT statements. Detailed SQL syntax and usage specifications can be found in Section 7.1.3.4 of this manual. You can also use the Java JDBC standard interface to execute related queries, as detailed in Section 7.2.

#### 4.4.1.1 Select a Column of Data Based on a Time Interval
The SQL statement is:
```
select temperature from root.ln.wf01.wt01 where time < 2017-11-01T00:08:00.000
```
which means:

The selected device is ln group wf01 plant wt01 device; the selected time series is the temperature sensor (temperature). The SQL statement requires that all temperature sensor values before the time point of "2017-11-01T00:08:00.000" be selected.

The execution result of this SQL statement is as follows:
![](./fig/4.6.jpg)

#### 4.4.1.2 Select Multiple Columns of Data Based on a Time Interval
The SQL statement is:
```
select 
    status, temperature 
from 
    root.ln.wf01.wt01 
where 
    time > 2017-11-01T00:05:00.000 
    and 
    time < 2017-11-01T00:12:00.000
;
```
which means:

The selected device is ln group wf01 plant wt01 device; the selected time series is "status" and "temperature". The SQL statement requires that the status and temperature sensor values between the time point of "2017-11-01T00:05:00.000" and "2017-11-01T00:12:00.000" be selected.

The execution result of this SQL statement is as follows:
![](./fig/4.7.jpg)

#### 4.4.1.3 Select Multiple Columns of Data for the Same Device According to Multiple Time Intervals
IoTDB supports specifying multiple time interval conditions in a query. Users can combine time interval conditions at will according to their needs. For example, the SQL statement is:
```
select 
    status,temperature 
from 
    root.ln.wf01.wt01 
where 
    (time > 2017-11-01T00:05:00.000 and time < 2017-11-01T00:12:00.000) 
    or 
    (time >= 2017-11-01T16:35:00.000 and time <= 2017-11-01T16:37:00.000)
;
```
which means:

The selected device is ln group wf01 plant wt01 device; the selected time series is "status" and "temperature"; the statement specifies two different time intervals, namely "2017-11-01T00:05:00.000 to 2017-11-01T00:12:00.000" and "2017-11-01T16:35:00.000 to 2017-11-01T16:37:00.000". The SQL statement requires that the values of selected time series satisfying any time interval be selected.

The execution result of this SQL statement is as follows:
![](./fig/4.8.jpg)

#### 4.4.1.4 Choose Multiple Columns of Data for Different Devices According to Multiple Time Intervals
The system supports the selection of data in any column in a query, i.e., the selected columns can come from different devices. For example, the SQL statement is:
```
select 
    wf01.wt01.status,wf02.wt02.hardware 
from 
    root.ln 
where 
    (time > 2017-11-01T00:05:00.000 and time < 2017-11-01T00:12:00.000) 
    or 
    (time >= 2017-11-01T16:35:00.000 and time <= 2017-11-01T16:37:00.000)
;
```
which means:

The selected timeseries are "the power supply status of ln group wf01 plant wt01 device" and "the hardware version of ln group wf02 plant wt02 device"; the statement specifies two different time intervals, namely "2017-11-01T00:05:00.000 to 2017-11-01T00:12:00.000" and "2017-11-01T16:35:00.000 to 2017-11-01T16:37:00.000". The SQL statement requires that the values of selected time series satisfying any time interval be selected.

The execution result of this SQL statement is as follows:
![](./fig/4.9.jpg)

### 4.4.2 Down-Frequency Aggregate Query
This chapter mainly introduces the related examples of down-frequency aggregation query, using the GROUP BY clause of IoTDB SELECT statement, which is used to partition the result set according to the user's given partitioning conditions and aggregate the partitioned result set. IoTDB supports partitioning result sets according to time intervals, and by default results are sorted by time in ascending order. Detailed SQL syntax and usage specifications can be found in Section 7.1 of this manual. You can also use the Java JDBC standard interface to execute related queries, as detailed in Section 7.2.

The GROUP BY statement provides users with three types of specified parameters:

* Parameter 1: Time interval for dividing the time axis
* Parameter 2: Time axis origin position (optional)
* Parameter 3: The display window(s) (one or more) on the time axis

The actual meanings of the three types of parameters are shown in Figure 4.2 below. Among them, the paramter 2 is optional. Next we will give three typical examples of frequency reduction aggregation: parameter 2 specified, parameter 2 not specified, and time filtering conditions specified.

![](./fig/4.10.jpg)
**Figure 4.2 The actual meanings of the three types of parameters**

#### 4.4.2.1 Down-Frequency Aggregate Query without Specifying the Time Axis Origin Position
The SQL statement is:
```
select 
    count(status), max_value(temperature) 
from 
    root.ln.wf01.wt01 
group by 
    (1d, [2017-11-01T00:00:00, 2017-11-07T23:00:00])
;
```
which means:

Since the user does not specify the time axis origin position, the GROUP BY statement will by default set the origin at 0 (+0 time zone) on January 1, 1970.

The first parameter of the GROUP BY statement above is the time interval for dividing the time axis. Taking this parameter (1d) as time interval and the default origin as the dividing origin, the time axis is divided into several continuous intervals, which are [0,1d], [1d, 2d], [2d, 3d], etc.

The second parameter of the GROUP BY statement above is the display window paramter, which determines the final display range is [2017-11-01T00:00:00, 2017-11-07T23:00:00].

Then the system will use the time and value filtering condition in the WHERE clause and the second parameter of the GROUP BY statement as the data filtering condition to obtain the data satisfying the filtering condition (which in this case is the data in the range of [2017-11-01T00:00:00, 2017-11-07 T23:00:00]), and map these data to the previously segmented time axis (in this case there are mapped data in every 1-day period from 2017-11-01T00:00:00 to 2017-11-07T23:00:00:00).

Since there is data for each time period in the result range to be displayed, the execution result of the SQL statement is shown below:
![](./fig/4.11.jpg)

#### 4.4.2.2 Down-Frequency Aggregate Query Specifying the Time Axis Origin Position
The SQL statement is:
```
select 
    count(status), max_value(temperature) 
from 
    root.ln.wf01.wt01 
group by
    (1d, 2017-11-03 00:00:00, [2017-11-01 00:00:00, 2017-11-07 23:00:00])
;
```
which means:

Since the user specifies the time axis origin position parameter as 2017-11-03 00:00:00, the GROUP BY statement will set the origin at 0 (system default time zone) on November 3, 2017.

The first parameter of the GROUP BY statement above is the time interval for dividing the time axis. Taking this parameter (1d) as time interval and the speicified origin as the dividing origin, the time axis is divided into several continuous intervals, which are [2017-11-02T00:00:00, 2017-11-03T00:00:00], [2017-11-03T00:00:00, 2017-11-04T00:00:00], etc.

The third parameter of the GROUP BY statement above is the display window paramter, which determines the final display range is [2017-11-01T00:00:00, 2017-11-07T23:00:00].

hen the system will use the time and value filtering condition in the WHERE clause and the second parameter of the GROUP BY statement as the data filtering condition to obtain the data satisfying the filtering condition (which in this case is the data in the range of [2017-11-01T00:00:00, 2017-11-07T23:00:00]), and map these data to the previously segmented time axis (in this case there are mapped data in every 1-day period from 2017-11-01T00:00:00 to 2017-11-07T23:00:00:00).

Since there is data for each time period in the result range to be displayed, the execution result of the SQL statement is shown below:
![](./fig/4.12.jpg)

#### 4.4.2.3 Down-Frequency Aggregate Query Specifying the Time Filtering Conditions
The SQL statement is:
```
select 
    count(status), max_value(temperature) 
from 
    root.ln.wf01.wt01 
where 
    time > 2017-11-03T06:00:00 and temperature > 20 
group by
    (1h, [2017-11-03T00:00:00, 2017-11-03T23:00:00])
;
```
which means:

Since the user does not specify the time axis origin position, the GROUP BY statement will by default set the origin at 0 (+0 time zone) on January 1, 1970.

The first parameter of the GROUP BY statement above is the time interval for dividing the time axis. Taking this parameter (1d) as time interval and the default origin as the dividing origin, the time axis is divided into several continuous intervals, which are [0,1d], [1d, 2d], [2d, 3d], etc.

The second parameter of the GROUP BY statement above is the display window paramter, which determines the final display range is [2017-11-03T00:00:00, 2017-11-03T23:00:00].

Then the system will use the time and value filtering condition in the WHERE clause and the second parameter of the GROUP BY statement as the data filtering condition to obtain the data satisfying the filtering condition (which in this case is the data in the range of (2017-11-03T06:00:00, 2017-11-03T23:00:00] and satisfying root.ln.wf01.wt01.temperature > 20), and map these data to the previously segmented time axis (in this case there are mapped data in every 1-day period from 2017-11-03T00:06:00 to 2017-11-03T23:00:00).

Since there is  no data in the result range [2017-11-03T00:00:00, 2017-11-03T00:06:00], the aggregation results of this segment will be null. There is data in all other time periods in the result range to be displayed. The execution result of the SQL statement is shown below:
![](./fig/4.13.jpg)

It is worth noting that the path after SELECT in GROUP BY statement must be aggregate function, otherwise the system will give the corresponding error prompt, as shown below:
![](./fig/4.14.jpg)

### 4.4.3 Index Query (Experimental Function)
Indexing time series can speed up some queries of this column (such as accelerating aggregate queries), or add new query functions to the column (such as similarity matching introduced in Section 4.4.3.1 of this chapter). User's operations mainly include the establishment, deletion and query of time series.

The present 0.7.0 version of IoTDB supports KvIndex, which is used to speed up the query of time series subsequence similarity matching.

#### 4.4.3.1 KvIndex (Similarity Matching Query)
In the field of timeseries data, similarity matching is a very common requirement. Users specify a time series subsequence as a pattern, hoping to find in another longer time series all subsequences similar to the specified pattern and return. As shown in Figure 4.3, for a given pattern, there are two subsequences (marked red) similar to the given pattern in a longer time series. Similarity matching requires that the two subsequences be found and returned. KvIndex is the index used to solve the problem of similarity matching.

![](./fig/4.15.jpg)
**Figure 4.3  KvIndex similarity matching query**

##### 4.4.3.1.1 KvIndex Establishment
When created, KvIndex divides the time series into a series of equal-length blocks (the block length is parameterized as `window_length` in table 4-2) and creates indexes for the data after a timestamp (the timestamp is parameterized as `since_time` in table 4-2). Note that the time series must already exist before indexing. Successful execution will result in an "execute successfully" prompt that represents the completion of time series index establishment.

Note: After the index establishment, flush operation is required for the index to take effect.

**Table 4-2 KvIndex establishment paramter list**

|Parameter name (case insensitive)|Interpretation|
|:---|:---|
|window_length|INT32 type; mandatory; KvIndex divides the time series into a series of equal-length blocks, whose length is 'window_length'.|
|since_time|INT32 type; mandatory; create indexes for data larger than the timestamp 'since_time'; default value 0, i.e., index all data.|

See Section 7.1.4.1 for detailed SQL statements of establishing KvIndex. Here we give a practical example:
```
CREATE INDEX 
    ON root.ln.wf01.wt01.status 
    USING kvindex 
        WITH window_length=3, since_time=1000;
```
The above example creates a Kvindex for the time series with path root. ln. wf01. wt01. status, and the parameters required for the index are listed after the keyword WITH. Take KvIndex as an example, the following parameters are included: the length of the index block is 3, and the data with the timestamp greater than 1000 is indexed.

##### 4.4.3.1.2 KvIndex Query
After creating the KvIndex, the user can specify a pattern sequence and specify the KvIndex index query (i.e. similarity matching) for the data within a certain time range of a sequence. See Section 7.1.4.3 of this manual for detailed SQL statements.

Let's explain with a concrete example.
```
SELECT 
    KvIndex(root.ln.wf02.wt02.status,1,100,0.5,1.0,2.5) 
FROM
    root.ln.wf01.wt01.status 
WHERE 
    time >= 500 
    and 
    time <= 1000
;
```
The above example queries data in the column `root.ln.wf01.wt01.status` over a time range of [500, 1000]. Users use the fragment of the `root.ln.wf02.wt02.status` sequence within a time range of [1,100] as a pattern.

For queries on the KvIndex, the time range must be a continuous time period, i.e., the time condition can only be in the following three forms:

(1) time > a, e.g., time > 1000;

(2) time < b, e.g., time < 2000;

(3) time > a and time < b, e.g., time > 1000 and time < 2000.

KvIndex does not support other forms of time condition such as "time > 1000 and time < 2000 and time > 3000".

Users can also specify the remaining three parameters, namely:

(1) KVIndex requires that the Euclidean distance between the pattern and the matching subsequence be less than epsilon, i.e. the epsilon parameter in Table 4-3, which is a mandatory parameter. In the above example, epsilon=0.5;

(2) Since there may be a mean shift between the pattern and the matched subsequence, the user is allowed to specify the mean threshold, i.e., the alpha parameter in Table 4-3, which is an optional parameter with a default value of 0. In the above example, alpha=1.0.

(3) Because there may be a standard deviation shift between the pattern and the matched subsequence, the user is allowed to specify the standard deviation threshold, i.e., the beta parameter in Table 4-3, which is an optional parameter with a default value of 1. In the above example, beta=2.5;

Detailed descriptions of all parameters are given in Table 4-3.

**Table 4-3 KvIndex query paramter list**

|Parameter name (case insensitive)|Interpretation|
|:---|:---|
|pattern_path|the time series that the pattern belongs to|
|pattern_start_time|INT64; the start timestamp of the pattern|
|pattern_end_time|INT64; the end timestamp of the pattern|
|epsilon|DOUBLE; Euclidean distance threshold between the pattern and the matching subsequence|
|alpha|DOUBLE; mean threshold; optional; default value 0|
|beta|DOUBLE; standard deviation threshold; optional; default value 1|

The matching results are sorted in ascending order according to Euclidean distance and returned. The returned result is a triple, including start time, end time and Euclidean distance. The query result of the above example is shown below:
![](./fig/4.16.jpg)

##### 4.4.3.1.3 KvIndex Deletion
For a time series that has created a KvIndex, the user can delete the time series. Users need to specify the name of the time series to be deleted. See Section 7.1.4.2 of this manual for detailed SQL syntax.

Here we give an example of deletion:
```
DROP INDEX kvindex ON root.ln.wf01.wt01.status;
```
The above example deletes the KvIndex of the time series with the path `root.ln.wf01.wt01.status`. Successful execution will result in an "execute successfully" prompt that represents the completion of time series index deletion.

###  4.4.4 Automated Fill
In the actual use of IoTDB, when doing the query operation of time series, situations where the value is null at some time points may appear, which will obstruct the further analysis by users. In order to better reflect the degree of data change, users expect missing values to be automatically filled. Therefore, the IoTDB system introduces the function of Automated Fill.

Automated fill function refers to filling empty values according to the user's specified method and effective time range when performing time series queries for single or multiple columns. If the queried point's value is not null, the fill function will not work.

Note: In the current version 0.7.0, IoTDB provides users with two methods: Previous and Linear. The previous method fills blanks with previous value. The linear method fills blanks through linear fitting. And the fill function can only be used when performing point-in-time queries.

#### 4.4.4.1 Fill Method
##### 4.4.4.1.1 Previous Method
When the value of the queried timestamp is null, the value of the previous timestamp is used to fill the blank. The formalized previous method is as follows (see Section 7.1.3.6 for detailed syntax):
```
select 
    <path> 
from 
    <prefixPath> 
where 
    time = <T> 
fill
    (<data_type>[previous, <before_range>], …)
```

Detailed descriptions of all parameters are given in Table 4-4.

**Table 4-4 Previous fill paramter list**

|Parameter name (case insensitive)|Interpretation|
|:---|:---|
|path, prefixPath|query path; mandatory field|
|T|query timestamp (only one can be specified); mandatory field|
|data_type|the type of data used by the fill method. Optional values are int32, int64, float, double, boolean, text; optional field|
|before_range|represents the valid time range of the previous method. The previous method works when there are values in the [T-before_range, T] range. When before_range is not specified, before_range takes the default value T; optional field|

Here we give an example of filling null values using the previous method. The SQL statement is as follows:
```
select 
    temperature 
from 
    root.sgcc.wf03.wt01 
where 
    time = 2017-11-01T16:37:50.000 
fill
    (float[previous, 1m]) 
```
which means:

Because the time series root.sgcc.wf03.wt01.temperature is null at 2017-11-01T16:37:50.000, the system uses the previous timestamp of 2017-11-01T16:37:50.000 (and the timestamp is in the [2017-11-01T16:36:50.000, 2017-11-01T16:37:50.000] time range) for fill and display.

On the sample data given in Section 4.1.2 of this chapter, the execution result of this statement is shown below:
![](./fig/4.17.jpg)

It is worth noting that if there is no value in the specified valid time range, the system will not fill the null value, as shown below:
![](./fig/4.18.jpg)

##### 4.4.4.1.2 Linear Method
When the value of the queried timestamp is null, the value of the previous and the next timestamp is used to fill the blank. The formalized linear method is as follows (see Section 7.1.3.6 for detailed syntax):
```
select 
    <path> 
from 
    <prefixPath> 
where 
    time = <T> 
fill
    (<data_type>[linear, <before_range>, <after_range>]…)
```

Detailed descriptions of all parameters are given in Table 4-5.

**Table 4-5 Linear fill paramter list**

|Parameter name (case insensitive)|Interpretation|
|:---|:---|
|path, prefixPath|query path; mandatory field|
|T|query timestamp (only one can be specified); mandatory field|
|data_type|the type of data used by the fill method. Optional values are int32, int64, float, double, boolean, text; optional field|
|before_range, after_range|represents the valid time range of the linear method. The previous method works when there are values in the [T-before_range, T+after_range] range. When before_range and after_range are not explicitly specified, both before_range and after_range default to infinity; optional field|

Here we give an example of filling null values using the linear method. The SQL statement is as follows:
```
select 
    temperature 
from 
    root.sgcc.wf03.wt01 
where 
    time = 2017-11-01T16:37:50.000 
fill
    (float [linear, 1m, 1m])
```
which means:

Because the time series root.sgcc.wf03.wt01.temperature is null at 2017-11-01T16:37:50.000, the system uses the previous timestamp 2017-11-01T16:37:00.000 (and the timestamp is in the [2017-11-01T16:36:50.000, 2017-11-01T16:37:50.000] time range) and its value 21.927326, the next timestamp 2017-11-01T16:39:00.000 (and the timestamp is in the [2017-11-01T16:36:50.000, 2017-11-01T16:37:50.000] time range) and its value 25.311783 to perform linear fitting calculation: 21.927326 + (25.311783-21.927326)/60s*50s = 24.747707

On the sample data given in Section 4.1.2, the execution result of this statement is shown below:
![](./fig/4.17.jpg)

It is worth noting that if there is no value in the specified valid time range, the system will not fill the null value, as shown below:
![](./fig/4.18.jpg)

#### 4.4.4.2 Correspondence between Data Type and Fill Method
Data types and the supported fill methods are shown in Table 4-6.

**Table 4-6 Data types and the supported fill methods**

|Data Type|Supported Fill Methods|
|:---|:---|
|boolean|previous|
|int32|previous, linear|
|int64|previous, linear|
|float|previous, linear|
|double|previous, linear|
|text|previous|


It is worth noting that IoTDB will give error prompts for fill methods that are not supported by data types, as shown below:

![](./fig/4.19.jpg)

When the fill method is not specified, each data type bears its own default fill methods and parameters. The corresponding relationship is shown in Table 4-7.

**Table 4-7 Default fill methods and parameters for various data types**

|Data Type|Default Fill Methods and Parameters|
|:---|:---|
|boolean|previous, 0|
|int32|linear, 0, 0|
|int64|linear, 0, 0|
|float|linear, 0, 0|
|double|linear, 0, 0|
|text|previous, 0|

Note: In version 0.7.0, at least one fill method should be specified in the Fill statement.

### 4.4.5 Row and Column Control over Query Results
IoTDB provides LIMIT/SLIMIT clause and OFFSET/SOFFSET clause in order to make users have more control over query results. The use of LIMIT and SLIMIT clauses allows users to control the number of rows and columns of query results, and the use of OFFSET and SOFSET clauses allows users to set the starting position of the results for display.

This chapter mainly introduces related examples of row and column control of query results. Detailed SQL syntax and usage specifications can be found in Section 7.1.3.7 of this manual. You can also use the Java JDBC standard interface to execute queries, as detailed in section 7.2.

#### 4.4.5.1 Row Control over Query Results
By using LIMIT and OFFSET clauses, users can control the query results in a row-related manner. We will demonstrate how to use LIMIT and OFFSET clauses through the following examples.

**Example 1: basic LIMIT clause**

The SQL statement is:
```
select status, temperature from root.ln.wf01.wt01 limit 10
```
which means:

The selected device is ln group wf01 plant wt01 device; the selected time series is "status" and "temperature". The SQL statement requires the first 10 rows of the query result be returned.

The result is shown below:

![](./fig/4.20.jpg)


**Example 2: LIMIT clause with OFFSET**

The SQL statement is:
```
select status, temperature from root.ln.wf01.wt01 limit 5 offset 3
```
which means:

The selected device is ln group wf01 plant wt01 device; the selected time series is "status" and "temperature". The SQL statement requires rows 3 to 7 of the query result be returned (with the first row numbered as row 0).

The result is shown below:

![](./fig/4.21.jpg)

**Example 3: LIMIT clause combined with WHERE clause**

The SQL statement is:
```
select status,temperature 
from root.ln.wf01.wt01 
where time > 2017-11-01T00:05:00.000 and time < 2017-11-01T00:12:00.000 
limit 2 
offset 3
```
which means:

The selected device is ln group wf01 plant wt01 device; the selected time series is "status" and "temperature". The SQL statement requires rows 3 to 4 of  the status and temperature sensor values between the time point of "2017-11-01T00:05:00.000" and "2017-11-01T00:12:00.000" be returned (with the first row numbered as row 0).

The result is shown below:

![](./fig/4.22.jpg)

**Example 4: LIMIT clause combined with GROUP BY clause**

The SQL statement is:
```
select count(status), max_value(temperature) 
from root.ln.wf01.wt01 
group by (1d, [2017-11-01T00:00:00, 2017-11-07T23:00:00]) 
limit 5 offset 3
```
which means:

For the specific meaning of the GROUP BY clause, see Section 4.4.2.1 of this chapter. The SQL statement clause requires rows 3 to 7 of the query result be returned (with the first row numbered as row 0).

The result is shown below:

![](./fig/4.23.jpg)

It is worth noting that because the current FILL clause can only fill in the missing value of time series at a certain time point, that is to say, the execution result of FILL clause is exactly one line, so LIMIT and OFFSET are not expected to be used in combination with FILL clause, otherwise errors will be prompted. For example, executing the following SQL statement:
```
select temperature from root.sgcc.wf03.wt01 
where time = 2017-11-01T16:37:50.000 
fill(float[previous, 1m]) 
limit 10
```
The SQL statement will not be executed and the corresponding error prompt is given as follows:

![](./fig/4.24.jpg)

#### 4.4.5.2 Column Control over Query Results
By using SLIMIT and SOFFSET clauses, users can control the query results in a column-related manner. We will demonstrate how to use SLIMIT and SOFFSET clauses through the following examples.

**Example 1: basic SLIMIT clause**

The SQL statement is:
```
select * from root.ln.wf01.wt01 where time > 2017-11-01T00:05:00.000 and time < 2017-11-01T00:12:00.000 slimit 1
```
which means:

The selected device is ln group wf01 plant wt01 device; the selected time series is the first column under this device, i.e., the power supply status. The SQL statement requires the status sensor values between the time point of "2017-11-01T00:05:00.000" and "2017-11-01T00:12:00.000" be selected.

The result is shown below:

![](./fig/4.25.jpg)


**Example 2: SLIMIT clause with SOFFSET**

The SQL statement is:
```
select * from root.ln.wf01.wt01 
where time > 2017-11-01T00:05:00.000 and time < 2017-11-01T00:12:00.000 
slimit 1 soffset 1
```
which means:

The selected device is ln group wf01 plant wt01 device; the selected time series is the second column under this device, i.e., the temperature. The SQL statement requires the temperature sensor values between the time point of "2017-11-01T00:05:00.000" and "2017-11-01T00:12:00.000" be selected.

The result is shown below:

![](./fig/4.26.jpg)


**Example 3: SLIMIT clause combined with GROUP BY clause**

The SQL statement is:
```
select max_value(*) from root.ln.wf01.wt01 
group by (1d, [2017-11-01T00:00:00, 2017-11-07T23:00:00]) 
slimit 1 soffset 1
```
which means:

For the specific meaning of the GROUP BY clause, see Section 4.4.2.1 of this chapter. The selected device is ln group wf01 plant wt01 device; the selected time series is the second column under this device, i.e., the temperature.

The result is shown below:

![](./fig/4.27.jpg)

**Example 4: SLIMIT clause combined with FILL clause**

The SQL statement is:
```
select * from root.sgcc.wf03.wt01 
where time = 2017-11-01T16:37:50.000 
fill(float[previous, 1m]) 
slimit 1 soffset 1
```
which means:

For the specific meaning of the FILL clause, see Section 4.4.4.1 of this chapter. The selected device is ln group wf01 plant wt01 device; the selected time series is the second column under this device, i.e., the temperature.

The result is shown below:

![](./fig/4.28.jpg)

It is worth noting that SLIMIT clause is expected to be used in conjunction with star path or prefix path, and the system will prompt errors when SLIMIT clause is used in conjunction with complete path query. For example, executing the following SQL statement:
```
select status,temperature from root.ln.wf01.wt01 where time > 2017-11-01T00:05:00.000 and time < 2017-11-01T00:12:00.000 slimit 1
```
The SQL statement will not be executed and the corresponding error prompt is given as follows:
![](./fig/4.29.jpg)

#### 4.4.5.3 Row and Column Control over Query Results
In addition to row or column control over query results, IoTDB allows users to control both rows and columns of query results. Here is a complete example with both LIMIT clauses and SLIMIT clauses.
The SQL statement is:
```
select * from root.ln.wf01.wt01 
limit 10 offset 100 
slimit 2 soffset 0
```
which means:

The selected device is ln group wf01 plant wt01 device; the selected time series is columns 0 to 1 under this device (with the first column numbered as column 0). The SQL statement clause requires rows 100 to 109 of the query result be returned (with the first row numbered as row 0).

The result is shown below:

![](./fig/4.30.jpg)

#### 4.4.5.4 Error Handling
When the parameter N/SN of LIMIT/SLIMIT exceeds the size of the result set, IoTDB will return all the results as expected. For example, the query result of the original SQL statement consists of six rows, and we select the first 100 rows through the LIMIT clause:
```
select status,temperature from root.ln.wf01.wt01 
where time > 2017-11-01T00:05:00.000 and time < 2017-11-01T00:12:00.000 
limit 100
```
The result is shown below:

![](./fig/4.31.jpg)

When the parameter N/SN of LIMIT/SLIMIT clause exceeds the allowable maximum value (N/SN is of type int32), the system will prompt errors. For example, executing the following SQL statement:
```
select status,temperature from root.ln.wf01.wt01 
where time > 2017-11-01T00:05:00.000 and time < 2017-11-01T00:12:00.000 
limit 1234567890123456789
```
The SQL statement will not be executed and the corresponding error prompt is given as follows:
![](./fig/4.32.jpg)

When the parameter N/SN of LIMIT/SLIMIT clause is not a positive intege, the system will prompt errors. For example, executing the following SQL statement:
```
select status,temperature from root.ln.wf01.wt01 
where time > 2017-11-01T00:05:00.000 and time < 2017-11-01T00:12:00.000 
limit 13.1
```
The SQL statement will not be executed and the corresponding error prompt is given as follows:
![](./fig/4.33.jpg)

When the parameter OFFSET of LIMIT clause exceeds the size of the result set, IoTDB will return an empty result set. For example, executing the following SQL statement:
```
select status,temperature from root.ln.wf01.wt01 
where time > 2017-11-01T00:05:00.000 and time < 2017-11-01T00:12:00.000 
limit 2 offset 6
```
The result is shown below:
![](./fig/4.34.jpg)

When the parameter SOFFSET of SLIMIT clause is not smaller than the number of available time series, the system will prompt errors. For example, executing the following SQL statement:
```
select * from root.ln.wf01.wt01 
where time > 2017-11-01T00:05:00.000 and time < 2017-11-01T00:12:00.000 
slimit 1 soffset 2
```
The SQL statement will not be executed and the corresponding error prompt is given as follows:
![](./fig/4.35.jpg)

## 4.5 Data Maintenance
### 4.5.1 Data Update
Users can use UPDATE statements to update data over a period of time in a specified time series. Details of SQL usage can be found in Section 7.1.3.2 of this manual. When updating data, users can select a time series to be updated (version 0.7.0 does not support multiple time series updates) and specify a time point or period to be updated (version 0.7.0 must have time filtering conditions).

In a JAVA programming environment, you can use the JDBC API to execute single or batch UPDATE statements. See Section 7.2 of this manual for details on how to use JDBC.

#### 4.5.1.1 Update Single Time Series
Taking the power supply status of ln group wf02 plant wt02 device as an example, there exists such a usage scenario:

After data access and analysis, it is found that the power supply status from 2017-11-01 15:54:00 to 2017-11-01 16:00:00 is true, but the actual power supply status is abnormal. You need to update the status to false during this period. The SQL statement for this operation is:
```
update 
    root.ln.wf02 SET wt02.status = false
where 
    time <=2017-11-01T16:00:00 and time >= 2017-11-01T15:54:00
```
It should be noted that when the updated data type does not match the actual data type, IoTDB will give the corresponding error prompt as shown below:
```
IoTDB> update root.ln.wf02 set wt02.status = 1205 where time < now()
error: The BOOLEAN data type should be true/TRUE or false/FALSE
```
When the updated path does not exist, IoTDB will give the corresponding error prompt as shown below:
```
IoTDB> update root.ln.wf02 set wt02.sta = false where time < now()
error: do not select any existing path
```
### 4.5.2 Data Deletion
Users can delete data that meet the deletion condition in the specified time series by using the DELETE statement. Details of SQL usage can be found in Section 7.1.3.3 of this manual. When deleting data, users can select one or more timeseries paths, prefix paths, or paths with star  to delete data before a certain time (version 0.7.0 does not support the deletion of data within a closed time interval).

In a JAVA programming environment, you can use the JDBC API to execute single or batch UPDATE statements. See Section 7.2 of this manual for details on how to use JDBC.

#### 4.5.2.1 Delete Single Time Series
Taking ln Group as an example, there exists such a usage scenario:

The wf02 plant's wt02 device has many segments of errors in its power supply status before 2017-11-01 16:26:00, and the data cannot be analyzed correctly. The erroneous data affected the correlation analysis with other devices. At this point, the data before this time point needs to be deleted. The SQL statement for this operation is
```
delete from root.ln.wf02.wt02.status where time<=2017-11-01T16:26:00;
```

#### 4.5.2.2 Delete Multiple Time Series
When both the power supply status and hardware version of the ln group wf02 plant wt02 device before 2017-11-01 16:26:00 need to be deleted, the prefix path with broader meaning (see Section 3.1.6 of this manual) or the path with star can be used to delete the data. The SQL statement for this operation is:
```
delete from root.ln.wf02.wt02 where time <= 2017-11-01T16:26:00;
```
or
```
delete from root.ln.wf02.wt02.* where time <= 2017-11-01T16:26:00;
```
It should be noted that when the deleted path does not exist, IoTDB will give the corresponding error prompt as shown below:
```
IoTDB> delete from root.ln.wf03.wt02.status where time < now()
error: TimeSeries does not exist and cannot be delete data
```
## 4.6 Priviledge Management
IoTDB provides users with priviledge management operations, so as to ensure data security.

We will show you basic user priviledge management operations through the following specific examples. Detailed SQL syntax and usage details can be found in Section 7.1.5 of this manual. At the same time, in the JAVA programming environment, you can use the JDBC API to execute priviledge management statements in a single or batch mode. See section 7.2 for details on how to use JDBC.

### 4.6.1 Basic Concepts
#### 4.6.1.1 User
The user is the legal user of the database. A user corresponds to a unique username and has a password as a means of authentication. Before using a database, a person must first provide a legitimate username and password to make himself/herself a user.
#### 4.6.1.2 Priviledge
The database provides a variety of operations, and not all users can perform all operations. If a user can perform an operation, the user is said to have the priviledge to perform the operation. Priviledges can be divided into data management priviledge (such as adding, deleting and modifying data) and authority management priviledge (such as creation and deletion of users and roles, granting and revoking of priviledges, etc.). Data management priviledge often needs a path to limit its effective range, which is a subtree rooted at the path's corresponding node (see IoTDB's data organization for details).

#### 4.6.1.3 Role
A role is a set of priviledges and has a unique role name as an identifier. A user usually corresponds to a real identity (such as a traffic dispatcher), while a real identity may correspond to multiple users. These users with the same real identity tend to have the same priviledges. Roles are abstractions that can unify the management of such priviledges.

#### 4.6.1.4 Default User
There is a default user in IoTDB after the initial installation: root, and the default password is root. This user is an administrator user, who cannot be deleted and has all the priviledges. Neither can new priviledges be granted to the root user nor can priviledges owned by the root user be deleted.

### 4.6.2 Priviledge Management Operation Examples
According to the sample data described in Section 4.1 of this chapter, the sample data of IoTDB may belong to different power generation groups such as ln, sgcc, etc. Different power generation groups do not want others to obtain their own database data, so we need to have data priviledge isolated at the group layer.

#### 4.6.2.1 Create User
We can create two users for ln and sgcc groups, named ln_write_user and sgcc_write_user, with both passwords being write_pwd. The SQL statement is:
```
CREATE USER ln_write_user write_pwd
CREATE USER sgcc_write_user write_pwd
```
Then use the following SQL statement to show the user:
```
LIST USER
```
As can be seen from the result shown below, the two users have been created:
![](./fig/4.36.jpg)
#### 4.6.2.2 Grant User Priviledge
At this point, although two users have been created, they do not have any priviledges, so they can not operate on the database. For example, we use ln_write_user to write data in the database, the SQL statement is:
```
INSERT INTO root.ln.wf01.wt01(timestamp,status) values(1509465600000,true)
```
The SQL statement will not be executed and the corresponding error prompt is given as follows:
![](./fig/4.37.jpg)
Now, we grant the two users write priviledges to the corresponding storage groups, and try to write data again. The SQL statement is:
```
GRANT USER ln_write_user PRIVILEGES 'INSERT_TIMESERIES' on root.ln
GRANT USER sgcc_write_user PRIVILEGES 'INSERT_TIMESERIES' on root.sgcc
INSERT INTO root.ln.wf01.wt01(timestamp, status) values(1509465600000, true)
```
The execution result is as follows:
![](./fig/4.38.jpg)

### 4.6.3 Other Instructions
#### 4.6.3.1 The Relationship among Users, Priviledges and Roles
A Role is a set of priviledges, and priviledges and roles are both attributes of users. That is, a role can have several priviledges and a user can have several roles and priviledges (called the user's own priviledges).

At present, there is no conflicting priviledge in IoTDB, so the real priviledges of a user is the union of the user's own priviledges and the priviledges of the user's roles. That is to say, to determine whether a user can perform an operation, it depends on whether one of the user's own priviledges or the priviledges of the user's roles permits the operation. The user's own priviledges and priviledges of the user's roles may overlap, but it does not matter.

It should be noted that if users have a priviledge (corresponding to operation A) themselves and their roles contain the same priviledge, then revoking the priviledge from the users themselves alone can not prohibit the users from performing operation A, since it is necessary to revoke the priviledge from the role, or revoke the role from the user. Similarly, revoking the priviledge from the users's roles alone can not prohibit the users from performing operation A.

At the same time, changes to roles are immediately reflected on all users who own the roles. For example, adding certain priviledges to roles will immediately give all users who own the roles corresponding priviledges, and deleting certain priviledges will also deprive the corresponding users of the priviledges (unless the users themselves have the priviledges).
#### 4.6.3.2 List of Priviledges Included in the System

**Table 4-8 List of Priviledges Included in the System**

|Priviledge Name|Interpretation|
|:---|:---|
|SET_STORAGE_GROUP|create time series; set storage groups; path dependent|
|INSERT_TIMESERIES|insert data; path dependent|
|UPDATE_TIMESERIES|update data; path dependent|
|READ_TIMESERIES|query data; path dependent|
|DELETE_TIMESERIES|delete data or time series; path dependent|
|CREATE_USER|create users; path independent|
|DELETE_USER|delete users; path independent|
|MODIFY_PASSWORD|modify passwords for all users; path independent; (Those who do not have this priviledge can still change their own asswords. )|
|LIST_USER|list all users; list a user's priviledges; list a user's roles with three kinds of operation priviledges; path independent|
|GRANT_USER_PRIVILEGE|grant user priviledges; path independent|
|REVOKE_USER_PRIVILEGE|revoke user priviledges; path independent|
|GRANT_USER_ROLE|grant user roles; path independent|
|REVOKE_USER_ROLE|revoke user roles; path independent|
|CREATE_ROLE|create roles; path independent|
|DELETE_ROLE|delete roles; path independent|
|LIST_ROLE|list all roles; list the priviledges of a role; list the three kinds of operation priviledges of all users owning a role; path independent|
|GRANT_ROLE_PRIVILEGE|grant role priviledges; path independent|
|REVOKE_ROLE_PRIVILEGE|revoke role priviledges; path independent|

#### 4.6.3.3 Username Restrictions
IoTDB specifies that the character length of a username should not be less than 4, and the username cannot contain spaces.
#### 4.6.3.4 Password Restrictions
IoTDB specifies that the character length of a password should not be less than 4, and the password cannot contain spaces. The password is encrypted with MD5.
#### 4.6.3.5 Role Name Restrictions
IoTDB specifies that the character length of a role name should not be less than 4, and the role name cannot contain spaces.
<template>
  <div id="app">
    <router-link to="/Test#heading22" class="nav-link"><span>heading22</span></router-link>
    <router-link to="/Test#heading23" class="nav-link"><span>heading23</span></router-link>

    <vue-markdown :postrender="isReadyForPrerender">

# Heading1

## Heading21


Use git to get IoTDB source code:

```
Shell > git clone https://github.com/thulab/iotdb.git
```

If you are not the first time that building IoTDB, remember deleting the following files:

```
rm -rf iotdb/data/
rm -rf iotdb/lib/
```

Then under the IoTDB path, you can build IoTDB using Maven:

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

Use git to get IoTDB source code:

```
Shell > git clone https://github.com/thulab/iotdb.git
```

If you are not the first time that building IoTDB, remember deleting the following files:

```
rm -rf iotdb/data/
rm -rf iotdb/lib/
```

Then under the IoTDB path, you can build IoTDB using Maven:

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

## Heading22


If you are not the first time that building IoTDB, remember deleting the following files:

```
rm -rf iotdb/data/
rm -rf iotdb/lib/
```

Then under the IoTDB path, you can build IoTDB using Maven:

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

Use git to get IoTDB source code:

```
Shell > git clone https://github.com/thulab/iotdb.git
```

If you are not the first time that building IoTDB, remember deleting the following files:

```
rm -rf iotdb/data/
rm -rf iotdb/lib/
```

Then under the IoTDB path, you can build IoTDB using Maven:

```
mvn clean package -Dmaven.test.skip=true
```

If successful, you will see the the following text in the terminal:

```
[INFO] BUILD SUCCESS
```
Otherwise, you may need to check the error statements and fix the problems.

After build, the IoTDB project will be at the subfolder named iotdb. The folder will include the following contents:


## Heading23


If you are not the first time that building IoTDB, remember deleting the following files:

```
rm -rf iotdb/data/
rm -rf iotdb/lib/
```

Then under the IoTDB path, you can build IoTDB using Maven:

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

Use git to get IoTDB source code:

```
Shell > git clone https://github.com/thulab/iotdb.git
```

If you are not the first time that building IoTDB, remember deleting the following files:

```
rm -rf iotdb/data/
rm -rf iotdb/lib/
```

Then under the IoTDB path, you can build IoTDB using Maven:

```
mvn clean package -Dmaven.test.skip=true
```

If successful, you will see the the following text in the terminal:

```
[INFO] BUILD SUCCESS
```
Otherwise, you may need to check the error statements and fix the problems.

After build, the IoTDB project will be at the subfolder named iotdb. The folder will include the following contents:

    </vue-markdown>

  </div>
</template>


<script>
  import VueMarkdown from 'vue-markdown' // production
  const cheerio = require('cheerio');
  export default {
    name: 'Test',
    data () {
      return {
      }
    },
    components: {
      VueMarkdown
    },
    mounted () {
    },
    methods: {
      isReadyForPrerender (html){
        const $ = cheerio.load(html);
        $('h1').each( function(i, elem) {
          $(this).attr('id', $(this).text().toLowerCase().replace(/\s/g, '') );

        });
        $('h2').each( function(i, elem) {
          $(this).attr('id', $(this).text().toLowerCase().replace(/\s/g, '') );

        });

        return $('body').html();
      },
    }


  }
</script>

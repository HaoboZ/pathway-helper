# Pathway Helper

## Install

0. `cd client`
0. `npm install`
0. `cd ../server`
0. `npm install`
0. `npm run debug`
0. go to localhost

### Setup local Database
0. Install postgreSql
0. create a database called pathwayhelperdb
0. create a user called pathwayhelper
0. configure hardcoded password in main.ts Sequelize call (this will be fixed later)
0. Ensure the user has correct access rights to the db
0. You will need to run the databaseSync configuration 'databaseSync.ts' 
<p>Note. If ENFILE: file table overflow happens on Mac </br> </p>
[refer to this stack overflow post](https://stackoverflow.com/questions/45004352/error-enfile-file-table-overflow-scandir-while-run-reaction-on-mac)




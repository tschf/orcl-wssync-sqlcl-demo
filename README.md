# Syncing data from a web service using SQLcl

---
**note: ** This is jsut example code. It doesn't actually do anything for you if you are looking on. For it to be useful, you would have to update the script `fetchAndLoad.js` with a meaningful webservice and appropriate credentials.

---

PL/SQL can connect with external services over the web, but I always dred this task due to having to deal with the wallet and ACL's. We eventually got it up and running, but I thought this might be a good case where you could leaverage SQLcl to perform the daily task. Afterall, in this particular situation, it's not a real time fetch - just a job that runs once per day.

To simplify things, I know my XML result shows a `count` at the top level, so I'll create a simple table to log the count each time we run the script.

```sql
create table ORG_COUNT(
    date_run DATE PRIMARY KEY,
    count NUMBER NOT NULL
);
```

So, with that, I know my query to fetch the count from the XML would resemble:

```sql
select
    orgs.org_count
from
    xmltable(
        '/Result'
        passing xmltype.createxml(**inject_response_here**)
            columns
                org_count number path '/Result/count'

    ) orgs
```


## Usage

```bash
sql /nolog @run.sql
```

Which I've wrapped into an executable shell script, so should be a matter of scheduling a task to run the program:

```bash
cd /path/to/this/project
wsync.sh
```

## License

The Unlicense - do with this what you will :)

## Author

Trent Schafer

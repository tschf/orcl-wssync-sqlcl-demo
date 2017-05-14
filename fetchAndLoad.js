//All the required Java clasees
var CredentialsProvider = Java.type("org.apache.http.client.CredentialsProvider"),
    BasicCredentialsProvider = Java.type("org.apache.http.impl.client.BasicCredentialsProvider"),
    UsernamePasswordCredentials = Java.type("org.apache.http.auth.UsernamePasswordCredentials"),
    AuthScope = Java.type("org.apache.http.auth.AuthScope"),
    HttpClient = Java.type("org.apache.http.client.HttpClient"),
    HttpClientBuilder = Java.type("org.apache.http.impl.client.HttpClientBuilder"),
    HttpGet = Java.type("org.apache.http.client.methods.HttpGet"),
    HttpResponse = Java.type("org.apache.http.HttpResponse"),
    HttpEntity = Java.type("org.apache.http.HttpEntity"),
    EntityUtils = Java.type("org.apache.http.util.EntityUtils"),
    HashMap = Java.type("java.util.HashMap");

// Store the results of the Java calls
var provider,
    basicAuthCreds,
    client,
    get,
    resp,
    entity,
    respBody,
    map,
    xmlAsClob;

// Queries and binds
var insertCountQuery,
    insertCountResult;

// usage example borrowed from: http://www.baeldung.com/httpclient-4-basic-authentication
// method 2.
// note: The preemptive better is probably more efficient, but this will do for example
// purposes
provider = new BasicCredentialsProvider();
basicAuthCreds = new UsernamePasswordCredentials("fakeuser", "fakepassword");
provider.setCredentials(AuthScope.ANY, basicAuthCreds);

client = HttpClientBuilder.create().setDefaultCredentialsProvider(provider).build();

get = new HttpGet("https://example.com/path/to/ws")

resp = client.execute(get);

entity = resp.getEntity();
respBody = EntityUtils.toString(entity);

map = new HashMap();
xmlAsClob = conn.createClob();
xmlAsClob.setString(1, respBody);

map.put("xml", xmlAsClob);

insertCountQuery =
"insert into org_count (date_run, count)" +
"select " +
"    sysdate" +
"  , orgs.org_count " +
"from " +
"    xmltable( " +
"        '/Result' " +
"        passing xmltype.createxml(:xml) " +
"            columns " +
"                org_count number path '/Result/count' " +
"    ) orgs";

insertCountResult = util.execute(insertCountQuery, map);

if (insertCountResult){
    print("Successfully updated from the web service");
} else {
    print ("An error occurred");
    print ("sqldev.last.err.message.forsqlcode reported:")
    print (ctx.getProperty("sqldev.last.err.message.forsqlcode"));
}

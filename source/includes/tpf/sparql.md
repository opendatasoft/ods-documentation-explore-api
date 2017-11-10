# Run SPARQL queries

The TPF API can be used to run `SPARQL` queries over OpenDataSoft datasets.

## SPARQL query langage

> a SPARQL query to retrieve roman emperors born in Rome whose reign start after AD 14.

```shell
PREFIX roman: <http://public.opendatasoft.com/ld/ontologies/roman-emperors/>

SELECT ?name WHERE {
  ?s roman:birth_cty "Rome"^^xsd:string .
  ?s roman:reign_start ?date .
    FILTER (?date > "0014-12-31T00:00:00+00:00"^^xsd:dateTime)
  ?s  roman:name ?name .
}
```

SPARQL Protocol and RDF Query Language (SPARQL) is a SQL-like query language that can be used to access OpenDataSoft datasets described in RDF. Such query can be used to run multiple triple patterns, filters and more.

The following SPARQL query is composed of 3 triple patterns and a filter. See the usage of the
`PREFIX` declaration to shorten predicate URI's. This SPARQL query can be executed [here](http://client.linkeddatafragments.org/#datasources=https%3A%2F%2Fpublic.opendatasoft.com%2Fapi%2Ftpf%2Froman-emperors%2F&query=PREFIX%20roman%3A%20%3Chttps%3A%2F%2Fpublic.opendatasoft.com%2Fld%2Fontologies%2Froman-emperors%2F%3E%0A%0ASELECT%20%3Fname%20WHERE%20%7B%0A%20%20%3Fs%20roman%3Abirth_cty%20%22Rome%22%5E%5Exsd%3Astring%20.%0A%20%20%3Fs%20roman%3Areign_start%20%3Fdate%20.%0A%20%20%20%20FILTER%20(%3Fdate%20%3E%20%220014-12-31T00%3A00%3A00%2B00%3A00%22%5E%5Exsd%3AdateTime)%0A%20%20%3Fs%20%20roman%3Aname%20%3Fname%20.%0A%7D).

## TPF client

A TPF client decomposes SPARQL into simple triple patterns. Thus, it can be used to run SPARQL over OpenDataSoft TPF API.

Multiple implementations of TPF client can be found [here](http://linkeddatafragments.org/software/). Online version of the client available [here](http://client.linkeddatafragments.org/) can also be used.

### Parameters

The following list describes the 2 parameters used by any TPF client:

Parameter | Description | Optionality
--------- | ----------- | -----------
`datasources` | TPF API address of the dataset to query | (Mandatory)
`query` | SPARQL query to execute | (Mandatory)

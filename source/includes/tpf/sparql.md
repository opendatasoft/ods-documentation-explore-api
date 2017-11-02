# Run SPARQL queries

TPF API can be used to run `SPARQL` queries over OpenDataSoft datasets.

## SPARQL query langage

> a SPARQL query to retrieve roman emperors born in Rome whose reign start after AD 14.

```shell
PREFIX roman: <https://public.opendatasoft.com/ld/ontologies/roman-emperors/>

SELECT ?name WHERE {
  ?s roman:birth_cty "Rome"^^xsd:string .
  ?s roman:reign_start ?date .
    FILTER (?date > "0014-12-31T00:00:00+00:00"^^xsd:dateTime)
  ?s  roman:name ?name .
}
```

SPARQL Protocol and RDF Query Language (SPARQL) is a SQL-like query language that can be used to access OpenDataSoft datasets described in RDF. Such query can be used to run multiple triple patterns, filters and more.

The following SPARQL query is composed of 3 triple patterns and a filter. See the usage of the
`PREFIX` declaration to shorten predicate URI's.

## TPF client

A `TPF client` decomposes SPARQL into simple triple patterns. Thus, it can be used to run SPARQL over OpenDataSoft TPF API.

Multiple implementations of TPF client can be found [here](http://linkeddatafragments.org/software/). You can also use the online version of the client [here](http://client.linkeddatafragments.org/).

### Parameters

The following list describe the 2 parameters used by any TPF client:

Parameter | Description | Optionality
--------- | ----------- | -----------
`datasources` | The TPF API address of the dataset to query | (Mandatory)
`query` | The SPARQL query to execute | (Mandatory)

# Triple Pattern Fragments API

Opendatasoft datasets can be queried using Triple Pattern Fragments (TPF). This is an approach for querying linked data described with Resource Description Framework (RDF) without using traditional SPARQL Endpoints. More information on TPF [here](http://linkeddatafragments.org/).

## Concepts

The TPF API enables triple pattern querying over Opendatasoft datasets.

> A triple representing the fact that Nero was born in Rome

```shell
roman:Nero roman:birth_cty "Rome"^^xsd:string
```

A `triple` can be seen as a fact described by a `subject`, a `predicate` and an `object`.
Those 3 elements are represented with a `Unique Resource Identifier (URI)`. An object can also
be described with a `Literal`.

> A triple pattern matching all subjects born in Rome

```shell
?s roman:birth_cty "Rome"^^xsd:string
```

A triple pattern is a simple query where `subject`, `predicate` or `object` can be variables in order
to match triples.

More complex queries can be run using a TPF client [See here](#tpf-client).

## Service address

The service can be reached at the following entry address.

GET http://documentation-resources.opendatasoft.com/api/tpf/{DATASET_ID}

For this documentation, the domain [http://documentation-resources.opendatasoft.com](http://documentation-resources.opendatasoft.com) will be used as an example but it can be replaced with any other custom domain name.

The TPF API supports `GET` HTTP methods.

## Parameters

> TPF API call with parameters

```http
GET https://documentation-resources.opendatasoft.com/api/tpf/roman-emperors/?predicate=http%3A%2F%2Fdocumentation-resources.opendatasoft.com%3A8000%2Fld%2Fontologies%2Froman-emperors%2Fname&object=%22Nero%22%5E%5Ehttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23string
```

When the HTTP `GET` method is used, the parameters are appended to the URL using a Keyword Value Pair (KVP)
encoding. Note that the parameter values have to be URL encoded.

Here is the list of the 4 parameters supported by the TPF API:

Parameter | Description | Possible values | Optionality and use
--------- | ----------- | --------------- | -------------------
`subject` | subject of the triple pattern | `URI` | (Optional)
`predicate` | predicate of the triple pattern | `URI` | (Optional)
`object` | object of the triple pattern | `URI` or `Literal` | (Optional)
`page` | result page to retrieve | INTEGER | (Optional)

## TPF Client

A TPF client decomposes a SPARQL query into simple triple patterns. Thus, it can be used to run SPARQL queries over Opendatasoft TPF API.

Multiple implementations of TPF client can be found [here](http://linkeddatafragments.org/software/). Online version of the client available [here](http://query.linkeddatafragments.org/) can also be used (Warning, this service does not support HTTPS).

### Parameters

The following list describes the 2 parameters used by any TPF client:

Parameter | Description | Optionality
--------- | ----------- | -----------
`datasources` | TPF API address of the dataset to query | (Mandatory)
`query` | SPARQL query to execute | (Mandatory)

### SPARQL query language

> a SPARQL query to retrieve roman emperors whose reign start after AD 14.

```turtle
PREFIX roman: <https://documentation-resources.opendatasoft.com/ld/ontologies/roman-emperors/>

SELECT ?name WHERE {
  ?s roman:reign_start ?date .
    FILTER (?date > "0014-12-31T00:00:00+00:00"^^xsd:dateTime)
  ?s  roman:name ?name .
}
```

SPARQL Protocol and RDF Query Language (SPARQL) is a SQL-like query language that can be used with a TPF client to access Opendatasoft datasets described in RDF. Such query can be used to run multiple triple patterns, filters and [more](https://www.w3.org/TR/rdf-sparql-query/).

The following SPARQL query is composed of 2 triple patterns and a filter. See the usage of the
`PREFIX` declaration to shorten predicate URI's. This SPARQL query can be executed [here](http://query.linkeddatafragments.org/#datasources=https%3A%2F%2Fdocumentation-resources.opendatasoft.com%2Fapi%2Ftpf%2Froman-emperors%2F&query=PREFIX%20roman%3A%20%3Chttps%3A%2F%2Fdocumentation-resources.opendatasoft.com%2Fld%2Fontologies%2Froman-emperors%2F%3E%0A%0ASELECT%20%3Fname%20WHERE%20%7B%0A%20%20%3Fs%20roman%3Areign_start%20%3Fdate%20.%0A%20%20%20%20FILTER%20(%3Fdate%20%3E%20%220014-12-31T00%3A00%3A00%2B00%3A00%22%5E%5Exsd%3AdateTime)%0A%20%20%3Fs%20%20roman%3Aname%20%3Fname%20.%0A%7D) (Warning, this service does not support HTTPS).

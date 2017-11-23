# Triple Pattern Fragments API

OpenDataSoft datasets can be queried using Triple Pattern Fragments (TPF). This is an approach for querying linked data described with Resource Description Framework (RDF).

## Concepts

The TPF API enables triple pattern querying over OpenDataSoft datasets.

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

More complex queries can be run using a TPF client [See here](#run-sparql-queries).

## Service address

The service can be reached at the following entry address.

GET http://public.opendatasoft.com/api/tpf/{DATASET_UID}

For this documentation, the domain [http://public.opendatasoft.com](http://public.opendatasoft.com) will be used as an example but it can be replaced with any other custom domain name.

The TPF API supports `GET` HTTP methods.

## Parameters

> TPF API call with parameters

```http
GET https://public.opendatasoft.com/api/tpf/roman-emperors/?predicate=http%3A%2F%2Fpublic.opendatasoft.com%3A8000%2Fld%2Fontologies%2Froman-emperors%2Fname&object=%22Nero%22%5E%5Ehttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23string
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

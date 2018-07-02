# OpenDataSoft RDF data

Data retrieved with the OpenDataSoft TPF API is in triple format described with RDF.
Data in such format can use ontologies (vocabularies) to define their meaning.

## Default Structure

By default, OpenDataSoft datasets are not enriched with ontologies. A direct mapping
of datasets to triple is used and follows 3 rules:

* A `record` is the `subject` of a triple
* A `field` is the `predicate` of a triple
* A `field value` is the `object` of a triple

Data resulting from this transformation describe dataset structure and contents but not its semantic.

## Edit Structure

> An example of RML mapping in turtle format

```turtle
@prefix ql: <http://semweb.mmlab.be/ns/ql#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix rml: <http://semweb.mmlab.be/ns/rml#> .
@prefix rr: <http://www.w3.org/ns/r2rml#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<#RomanEmperor> rml:logicalSource [ rml:iterator "$.[*].fields" ;
            rml:referenceFormulation ql:JSONPath ;
            rml:source "roman-emperors@public" ] ;
    rr:predicateObjectMap [ rr:objectMap [ rml:reference "$.name_full" ] ;
            rr:predicate <http://www.w3.org/2000/10/swap/pim/contact#fullName> ],
        [ rr:objectMap [ rml:reference "$.image" ] ;
            rr:predicate <http://dbpedia.org/ontology/picture> ],
        [ rr:objectMap [ rr:parentTriplesMap <#City> ] ;
            rr:predicate <http://dbpedia.org/ontology/birthPlace> ],
        [ rr:objectMap [ rr:parentTriplesMap <#Province> ] ;
            rr:predicate <http://dbpedia.org/ontology/birthPlace> ],
        [ rr:objectMap [ rml:reference "$.dynasty" ] ;
            rr:predicate <http://dbpedia.org/ontology/dynasty> ],
        [ rr:objectMap [ rml:reference "$.death" ;
                    rr:datatype xsd:datetime ] ;
            rr:predicate <http://data.archiveshub.ac.uk/def/dateDeath> ],
        [ rr:objectMap [ rml:reference "$.cause" ] ;
            rr:predicate <http://dbpedia.org/ontology/deathCause> ],
        [ rr:objectMap [ rml:reference "$.killer" ] ;
            rr:predicate <http://dbpedia.org/ontology/killedBy> ],
        [ rr:objectMap [ rml:reference "$.notes" ] ;
            rr:predicate <http://www.w3.org/2000/01/rdf-schema#comment> ],
        [ rr:objectMap [ rml:reference "$.reign_start" ;
                    rr:datatype xsd:datetime ] ;
            rr:predicate <http://dbpedia.org/ontology/startReign> ],
        [ rr:objectMap [ rml:reference "$.name" ] ;
            rr:predicate <http://purl.org/ontology/wo/name> ],
        [ rr:objectMap [ rml:reference "$.birth" ;
                    rr:datatype xsd:datetime ] ;
            rr:predicate <http://data.archiveshub.ac.uk/def/dateBirth> ],
        [ rr:objectMap [ rml:reference "$.era" ] ;
            rr:predicate <http://dbpedia.org/ontology/era> ],
        [ rr:objectMap [ rml:reference "$.reign_end" ;
                    rr:datatype xsd:datetime ] ;
            rr:predicate <http://dbpedia.org/ontology/endReign> ],
        [ rr:objectMap [ rml:reference "$.name" ] ;
            rr:predicate rdfs:label ] ;
    rr:subjectMap [ rr:class <http://dbpedia.org/ontology/RomanEmperor> ;
            rr:class <http://xmlns.com/foaf/0.1/Person> ;
            rr:template "http://dbpedia.org/resource/{name}" ] .

<#City> rml:logicalSource [ rml:iterator "$.[*].fields" ;
            rml:referenceFormulation ql:JSONPath ;
            rml:source "roman-emperors@public" ] ;
    rr:predicateObjectMap [ rr:objectMap [ rml:reference "$.birth_cty" ] ;
            rr:predicate rdfs:label ] ;
    rr:subjectMap [ rr:class <http://purl.org/ontology/places#City> ;
            rr:class <http://schema.org/Place> ;
            rr:template "http://dbpedia.org/resource/{birth_cty}" ] .

<#Province> rml:logicalSource [ rml:iterator "$.[*].fields" ;
            rml:referenceFormulation ql:JSONPath ;
            rml:source "roman-emperors@public" ] ;
    rr:predicateObjectMap [ rr:objectMap [ rml:reference "$.birth_prv" ] ;
            rr:predicate rdfs:label ] ;
    rr:subjectMap [ rr:class <http://purl.org/ontology/places#Province> ;
            rr:class <http://schema.org/Place> ;
            rr:template "http://dbpedia.org/resource/{birth_prv}" ] .

```

OpenDataSoft datasets RDF structure can be edited using the RDF Mapping language ([RML](http://rml.io/)).
Editing the RML mapping of a dataset modify the RDF result returned by TPF api and RDF exports and update the `Classes` and `Properties` filters.

### Classes and Properties filters

The `Classes` and `Properties` filters contain all the classes and properties used in the RML mapping of the dataset.
They can be used to search datasets representing a specific concept such as Persons, Cars or properties such as age or fuel consumption.

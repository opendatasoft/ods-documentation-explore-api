# ODSQL

Filtering features are built in the core of OpenDataSoft API engine.

The OpenDataSoft Query Language (ODSQL) makes it possible to express complex queries as a filtering context for datasets or records, but also to build aggregations or computed fields.

Note that a given filtering context can simply be copied from one API to another. For example, you can easily build a user interface which first allows the user to visually select the records they are are interested in, using full text search, facets and geo filtering ; and then allowing them to download these records with the same filtering context.

## Introduction

The ODSQL is split into five different kinds of clauses:

- the select clause allows you to choose the returned fields, give them an alias, or manipulate them with functions like count, sum, min, max, etc.
- the where clause acts as a filter for the returned datasets or records, thanks to boolean operations, filter functions, arithmetic expressions, and more.
- the group by clause lets you aggregate rows together based on fields, numeric ranges, or dates,
- the order by and limit clauses let you choose the order and quantity of rows you will receive as a response.

These clauses are used as parameters in the Search API v2 for searching, aggregating and exporting datasets and records. Depending on the endpoint you use, some features of the query language are available or not in the request.

The whole query language is case insensitive but we will use upper case in the documentation for language keywords for clarity. Spaces are optional.

## Language elements

ODSQL clauses use in their expression basic language elements. These can be either **literals** or **reserved keywords**.

Literals are used in comparison, assignments or functions. Literal types are fields, strings, numbers, date, boolean and geometry.

### Field literal

> Example of field literal

```plain-text
my_field > 10  # my_field is a string literal
`12` > 10      # without back-quotes 12 is considered as a numeric literal
`and`: "value" # AND is a keyword
```

Field literals are literals that are not enclosed in quotes. They contain only alphanumeric characters or underscore.

<aside>
If a field name contains only digits or is a keyword, it must be enclosed in back-quotes
</aside>

### String literal

> Example of string literal

```plain-text
"Word"
"Multiple words"
'Using single quotes'
```

String literals are enclosed in either single or double quotes.

### Number literal

> Example of number literal

```plain-text
100
5.8
my_field > 108.7
```

Number literals are **integer** or **decimal** value not enclosed in quotes.

### Date literal

> Example of date literal

```plain-text
date'2017-04-03T08:02'
date'2018/04/01'
```

Date literals are defined with a **date** keyword followed by a valid date format enclosed in single quotes.
A valid date is :

- [ISO 8601 date](https://en.wikipedia.org/wiki/ISO_8601)
- slash separated date with format YYYY/MM/DD (year/month/day)

### Boolean literal

> Example of boolean literal

```plain-text
my_boolean_field is TRUE
my_boolean_field: FALSE
```

Boolean literals should be used in boolean filters and can be either TRUE or FALSE keywords (non case sensitive)

### Geometry literal

> Example of geometry literal

```plain-text
distance(my_geo_field, geom'POINT(1 1)', 10km)
geometry(my_geo_field, geom'{"type": "Polygon","coordinates":[[[100.0, 0.0],[101.0, 0.0],[101.0, 1.0],[100.0, 1.0],[100.0,0.0]]]}')
```

Geometry literals are defined with a geom keyword followed by a valid geometry expression enclosed in single quotes. Supported geometry expression are :

- [WKT/WKB](https://en.wikipedia.org/wiki/Well-known_text)
- [GeoJSON geometry](https://en.wikipedia.org/wiki/GeoJSON)


### Reserved keywords

> **not** is a reserved keywords and must be escaped with back-quotes if referred as field literal

```plain-text
my_field_literal is not true # my_field_literal is not a reserved keyword, no need to escape it
`not` is not true # not is a reserved keyword and must be escaped


```

Reserved keywords insinde clauses for building ODSQL expression. Reserved keyword must be escaped with back-quotes when used in a clause as field literal.

List of reserved keywords:

- and
- as
- asc
- avg
- by
- count
- date_format
- day
- dayofweek
- desc
- equi
- false
- group
- hour
- or
- limit
- lower
- max
- millisecond
- min
- minute
- month
- not
- null
- quarter
- range
- second
- select
- sum
- top
- true
- upper
- where
- year

## Select clause

The select clause can be used in records search APIs as the parameter select. Its goal is to allow you to choose the fields that will be returned for each row, transform them using arithmetic, rename them, add computed virtual fields, include or exclude fields based on a pattern.

A select clause can be:

- a single expression
- a list of comma-separated expressions


### Select expression

> Examples of select expressions

```plain-text
*                           # Select all fields
field1, field2, field3      # Select field1, field2 and field3
field1 AS my_field, field2  # Renaming field1 as my_field and select field2
field1 * 2 AS twice_field1  # Create a new field twice_field1 with value field1 * 2
```

### Include and exclude

> Example of include/exclude
```plain-text
include(pop) # will only include fields which name is pop
exclude(pop) # will exclude fields which name is pop
include(pop*) # Will include fields beginning by pop
```

Include and exclude are functions that accept fields name. Fields listed in include (resp. exclude) are present (resp absent) from result. Field can contain a wildcard suffix ('*' char). In that case, inclusion/exclusion works on all field name beginning with the value preceding the wildcard.

## Where clause

The where clause can be used in the whole search API as the parameter where. Its goal is to filter rows with a combination of boolean expressions, functions, expressions or search queries.

A where clause can be:

- a single expression
- a list of comma-separated expressions that must all be satisfied at the same time
empty


### Filter functions


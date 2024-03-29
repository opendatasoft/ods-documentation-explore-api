# Query Language and Geo Filtering

Filtering features are built in the core of the Opendatasoft API engine. Many of the previously listed APIs can take filters as parameters, so that the response only contains the datasets or records you want.

Note that a given filtering context can simply be copied from one API to another. For example, you can easily build a
user interface that first allows the user to visually select the records they are interested in, using full-text
search, facets, and geo filtering, and then allowing them to download these records with the same filtering context.

## Query language

The Opendatasoft query language makes it possible to express complex boolean conditions as a filtering context.

The user query can most of the time be expressed through the `q` HTTP parameter.

### Full-text search

``` text
q=film -> results that contain film, films, filmography, etc.
q="film" -> results containing exactly film.
```

The query language accepts full-text queries.

If a given word, or compounds, is surrounded with double quotes, only exact matches are returned (modulo an accent and
case insensitive match).

### Boolean expressions

``` text
film OR trees
(film OR trees) AND paris
```

The query language supports the following boolean operators `AND`, `OR`, and `NOT`.

Parenthesis can be used to group together expressions and alter the default priority model:

* `NOT`
* `AND`
* `OR`

### Field queries

> Search on the `documentation-resources` domain for datasets having "Paris" in their title or description and containing at least 50 records

``` text
GET https://documentation-resources.opendatasoft.com/api/datasets/1.0/search?q=(title:paris OR description:paris) AND records_count >= 50
```

One of the major features of the query language is to allow per field filtering. You can use field names as a prefix to
your queries to filter the results based on a specific field's value.

For the dataset search API, the list of available fields corresponds exactly to available metadata. By default

Field name      | Description
----------------|------------
`publisher`     | The dataset publisher
`title`         | The dataset title
`description`   | The dataset description
`license`       | The dataset license
`records_count` | The number of records in the dataset
`modified`      | The last modification date of the dataset
`language`      | The language of the dataset (iso code)
`theme`         | The theme of the dataset
`references`    | The references for the dataset

The domain administrator might define a richer metadata template, thus giving access to a richer set of filtering fields.

> Examples of queries for the record search API

``` text
film_date >= 2002
film_date >= 2013/02/11
film_date: [1950 TO 2000]
film_box_office > 10000 AND film_date < 1965
```

For the record search API, the list of available fields depends on the schema of the dataset. To fetch the list of
available fields for a given dataset, you may use the search dataset or lookup dataset APIs.

Multiple operator fields can be used between the field name and the query:

* `:`, `-`, `==`: return results whose field exactly matches the given value (granted the fields are of text or numeric
  type)
* `>`, `<`, `>=`, `<=`: return results whose field values are larger, smaller, larger or equal, smaller or equal to the given value (granted the field is of date or numeric type)
* `[start_date TO end_date]`: query records whose date is between `start_date` and `end_date`

Date formats can be specified in different formats: simple (`YYYY[[/mm]/dd]`) or ISO 8601 (`YYYY-mm-DDTHH:MM:SS`)


### Query language functions

> Return records in `birthdate` field that are smaller or equal to the current datetime:

```text
birthdate <= #now()
```

> Return empty records in `birthdate` field:

```text
#null(birthdate)
```

> Return records in `firstname` field that contain "Marie":

```text
#exact(firstname, "Marie")
```

> Return records where `fistname` field contains "Jean" followed by a word starting with "c":

```text
#search(firstname, "Jean-C")
```

> Return records in `firstname` field that start with "Mar":

```text
#startswith(firstname, "Mar")
```

> Return records in `location` field which point is maximum 1 meter away from "48.864923, 2.382842":

```text
#distance(location, "48.864923, 2.382842", 1)
```

> Return records in `location` field that are within the given polygon:

```text
#polygon(location, “(48.36208891167685,-5.053710937499999),(51.03310377200486,2.0654296875),(48.88494684672119,8.3056640625),(44.04653631510921,7.55859375),(42.21875444410035,2.8125),(43.18755555543226,-1.9775390625),(48.36208891167685,-5.053710937499999)“)
```

> Return records in `coordinates` field which value is a polygon:

```text
#geometry(coordinates, “polygon”)
```

Advanced functions can be used in the query language. Function names need to be prefixed with a sharp (`#`) sign.

Function name | Description
------------- | -----------
`now`         | Return the current date. This function should be called as a query value for a field
`null`        | Search for records where no value is defined for the given field
`exact`       | Search for records with a field exactly matching a given value
`search`      | Search for records with one or more fields with a word starting with a given value
`startswith`  | Search for records with a field starting with a given value (case sensitive).
`distance`    | Search for records within a given distance from a given point
`polygon`     | Search for records within a given polygon
`geometry`    | Search for records which value (point, polygon) is a given type

#### Available parameters for the `#now` function

``` text
#now(years=-1, hours=-1) -> current date minus a year and an hour
```

* years, months, weeks, days, hours, minutes, seconds, microseconds: these parameters add time to the current date.

``` text
#now(year=2001) -> current time, day and month for year 2001
```

* year, month, day, hour, minute, second, microsecond: can also be used to specify an absolute date.

``` text
#now(weeks=-2, weekday=1) -> Tuesday before last
#now(weekday=MO(2)) -> Monday after next
```

* weekday: Specifies a day of the week. This parameter accepts either an integer between 0 and 6 (where 0 is Monday and
  6 is Sunday) or the first two letters of the day (in English) followed by the cardinal of the first week on which to
  start the query.
  
#### Usage of the `#search` function

`#search` function accepts multiple fields.
The `n` first parameters are the fields to search in, and the last parameter is the string value to search for.

``` text
#search(firstname, lastname, "Jean") -> search for firstname or lastname containing "Jean" 
```

The function also accepts `*` character as first parameter to search in all fields.

``` text
#search(*, "Jean") -> search for records containing "Jean" in their fields 
```

When search value contains multiple words, only the last word is treated as a prefix.

```text
#search(firstname, "Jean-C") -> search for firstname containing Jean followed by a word starting with "c"
```

When searching for a small prefix, `#search` function can sometimes return incomplete results.
For complete results consider using `#startswith` function or contact the support.

## Geo Filtering

> Examples of geo filtering expressions

``` text
geofilter.distance=48.8520930694,2.34738897685,1000
geofilter.polygon=(48.883086, 2.379072), (48.879022, 2.379930), (48.883651, 2.386968)
```

Records search APIs accept geofilter parameters to filter in records which are located in a specific geographical area.

The following parameters may be used.

Parameter Name       | Description
-------------------- | -----------
`geofilter.distance` | Limit the result set to a geographical area defined by a circle center (WGS84) and radius (in meters): `latitude, longitude, distance`
`geofilter.polygon`  | Limit the result set to a geographical area defined by a polygon (points expressed in WGS84): `((lat1, lon1), (lat2, lon2), (lat3, lon3))`

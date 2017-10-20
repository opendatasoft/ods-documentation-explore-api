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

<div class=“clearfix”></div>
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

<div class=“clearfix”></div>
### String literal

> Example of string literal

```plain-text
"Word"
"Multiple words"
'Using single quotes'
```

String literals are enclosed in either single or double quotes.

<div class=“clearfix”></div>
### Number literal

> Example of number literal

```plain-text
100
5.8
my_field > 108.7
```

Number literals are **integer** or **decimal** value not enclosed in quotes.

<div class=“clearfix”></div>
### Date literal

> Example of date literal

```plain-text
date'2017-04-03T08:02'
date'2018/04/01'
```

Date literals are defined with a **date** keyword followed by a valid date format enclosed in single quotes.
A valid date is:

- [ISO 8601 date](https://en.wikipedia.org/wiki/ISO_8601)
- slash separated date with format YYYY/MM/DD (year/month/day)

<div class=“clearfix”></div>
### Boolean literal

> Example of boolean literal

```plain-text
my_boolean_field is TRUE
my_boolean_field: FALSE
```

Boolean literals should be used in boolean filters and can be either TRUE or FALSE keywords (non case sensitive)

<div class=“clearfix”></div>
### Geometry literal

> Example of geometry literal

```plain-text
distance(my_geo_field, geom'POINT(1 1)', 10km)
geometry(my_geo_field, geom'{"type": "Polygon","coordinates":[[[100.0, 0.0],[101.0, 0.0],[101.0, 1.0],[100.0, 1.0],[100.0,0.0]]]}')
```

Geometry literals are defined with a geom keyword followed by a valid geometry expression enclosed in single quotes. Supported geometry expression are:

- [WKT/WKB](https://en.wikipedia.org/wiki/Well-known_text)
- [GeoJSON geometry](https://en.wikipedia.org/wiki/GeoJSON)

<div class=“clearfix”></div>
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


### Select expressions

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
include(pop*) # Will include fields beginning with pop
```

Include and exclude are functions that accept fields name. Fields listed in include (resp. exclude) are present (resp absent) from result. Field can contain a wildcard suffix ('*' char). In that case, inclusion/exclusion works on all field name beginning with the value preceding the wildcard.

## Where clause

> Where clause with boolean operators

```plain-text
my_numeric_field > 10 and my_text_field like "paris" or distance(my_geo_field, geom'POINT(1 1)', 1 km)
```

> This where clause filters results where numeric_field > 10 and (my_text_field contains the word `paris` or distance between my_geo_field and the point with 1,1 as lat,lon is under 1 kilometer)

The where clause can be used in the whole search API as the parameter where.
Its goal is to filter rows with a combination of where expressions.
A where expression can be:

- a search query
- a filter function
- a comparison filter
- a filter expression

Where expressions can be combined thanks to boolean operators (`AND`, `OR`, `NOT`) and grouped via parenthesiss.

<div class=“clearfix”></div>
### Boolean operators

> Boolean operators

```plain-text
my_boolean_field OR my_numeric_field > 50 and my_date_field > date'1972'
# Results can have my_boolean_field to true. They can also have my_numeric_field greater than 50 and my_date_field older than 1972

(my_boolean_field OR my_numeric_field > 50) and my_date_field > date'1972'
# Results must have my_date_field older than 1972. They also must have my_boolean_field to true or my_numeric_field greater than 50
```

Where expression can use boolean operators to express boolean filter.

- `AND`: results must match left and right expressions
- `OR`: results must match left or right expression
- `NOT`: inverse next expression

`AND` has precedence over `OR` operator. That means that, in the expression `a or b and c`, the sub-expression `b and c` is interpreted and executed before. It can be rewritten with parenthesis: `a or (b and c)`.

In order to change operator precedence, it is possible to use parenthesis in expression. To give precedence to `OR` operator, above expression can be rewritten to `(a or b) and c`.


### Filter functions

Filter functions are built-in functions that can be used in a `where` expression

<div class=“clearfix”></div>
#### Distance function
> Distance function examples

```plain-text
DISTANCE(field_name, GEOM'<geometry>', 1 km)
DISTANCE(field_name, GEOM'<geometry>', 100 yd)
```

The distance function limits the result set to a geographical area defined by a circle defined by its center and a distance. The center of the circle is expressed as a [geometry literal](#geometry-literal)). The distance is numeric and can have a unit in mi, yd, ft, m, cm, km, mm.


<div class=“clearfix”></div>
#### Geometry function
> Geometry function examples

```plain-text
GEOMETRY(field_name, GEOM'<geometry>', INTERSECT)
GEOMETRY(field_name, GEOM'<geometry>', DISJOINT)
GEOMETRY(field_name, GEOM'<geometry>', WITHIN)
```

The geometry function limits the result set to a geographical area defined by a polygon as a [geometry literal](#geometry-literal), and a mode in INTERSECT, DISJOINT, WITHIN.


<div class=“clearfix”></div>
#### Bbox function
> Bbox function example

```plain-text
BBOX(field_name, GEOM'<geometry>', GEOM'<geometry>')
```

The bbox function limits the result set to a rectangular box defined by its top left and its bottom right coordinates expressed with two [geometry literals](#geometry-literal).

<div class=“clearfix”></div>
### Filter expression

<div class=“clearfix”></div>
#### Boolean field filter

> Example of a boolean field filter

```plain-text
my_boolean_field          # Filters results where boolean_field is true
my_boolean_field is false # Filters results where boolean_field is false
```

A boolean field filter takes a boolean field and restricts result only if boolean value is `true`.
There are two ways of creating a filter expression:

- with a field_literal only. In that case, it filters the result where field_literal value is `true`
- with a field_literal followed by `is` keyword then `true` or `false` keywords.

#### Usage

- `<field_literal>`
- `<field_literal> is (true|false)`
`<field_literal>` must be a valid boolean field


<div class=“clearfix”></div>
#### Like filter

> Example of a like expression

```plain-text
film_name like "star"      # matches `star wars` and `Star Trek`
film_name like "star wars" # match fields containing `star` and `wars`
```

Format: `<field_literal> LIKE <string_literal>`

<div class=“clearfix”></div>
#### In filter

> `In filter` on numeric

```plain-text
numeric_field IN [1..10] # Filter results such as 1 <= numeric_field <= 10
numeric_field IN ]1..10[ # Filter results such as 1 < numeric_field < 10
numeric_field: [1..10]   # Use `:` instead of `IN` operator
```

> `In filter` on date

```plain-text
date_field IN [date'2017'..date'2018'] # Filter results such as date_field date is between year 2017 and 2018
```

The `In expression` filters results based on a a numeric or date range. It only works on a field_literal.
Formats are:

- on numeric: `<field_literal> IN (]|[)<numeric_literal> (TO|..) <numeric_literal>(]|[)`
- on date: `<field_literal> IN (]|[)<date_literal> (TO|..) <date_literal>(]|[)`

<div class=“clearfix”></div>
### Comparison filter

<div class=“clearfix”></div>
#### Text comparison filter

Operators | Description
--------- | -----------
`:`,`=` | Perform an exact query (not tokenized and not normalized) on the specified field

<div class=“clearfix”></div>
#### Numeric comparison filter

Operators | Description
--------- | -----------
`:`,`=` | Match a numeric value
`>`,`<`,`>=`,`<=` | Return results whose field values are larger, smaller, larger or equal, smaller or equal to the given value

<div class=“clearfix”></div>
#### Date comparison filter

Operators | Description
--------- | -----------
`:`,`=` | Match a date value
`>`,`<`,`>=`,`<=` | Return results whose field date are after, before the given value.

<div class=“clearfix”></div>
### Search query filter

> Examples for search query

```plain-text
"tree"
"tree" AND "flower"
"tree" OR "car"
NOT "dog"
"dog" AND NOT "cat"
```

> Examples of search query with mutliple words

```plain-text
"film"           # returns results that contain film
"action movies"  # returns results that contain action and movies.
```

> Example of wildcarded search query

```plain-text
"film*"      # returns results that contain film, films, filmography, etc.
```

Filter search queries are queries that don’t refer to fields, only containing quoted strings and boolean operators. They perform full-text searches on all visible fields of each record and return matching rows.

If the string contains more than one word, the query will be an AND query on each tokenized word.

It is possible to perform a greedy query by adding a wildcard * at the end of a word.

## Group by clause

> Simple group by expression with label

```plain-text
group_by=my_field as myfield
```

> multiple group by expressions with label

```plain-text
group_by=my_field1,my_field2 as my_field
```

The group by clause can be used in aggregations search API as the parameter group_by.
It creates groups from data depending on a `group by expression`.

A group by clause can contains:

- a single `group by expression`
- a list of comma-separated `group by expressions`.

Like selects, a group by expression can have an AS statement to give it a label.

List of group by expressions:

- field
- static range
- equi range
- date function

<div class=“clearfix”></div>
### Group by field

> Simple group by field

```plain-text
group_by=my_field
```

Group by field expression allows grouping on specified field value. It will create a group for each different value of field.

#### Usage
`group_by=<field_literal>`


<div class=“clearfix”></div>
### Group by Static range

> group by static range examples

```plain-text
RANGE(population, ]10, 50, 100[) # Creates 4 groups: *-10, 10-50, 50-100 and 100-*
RANGE(population, [20.5[)        # Creates 1 group: 20.5-*
RANGE(population, [1,2,3])       # Creates 2 groups: 1-2 and 2-3
```

The static range function takes two parameters: a field name and an array of steps inside brackets. The side of brackets determines if values lower than the lower bound and higher than the higher bound should be grouped together or ignored.

#### Usage
`group_by=range(<field_literal>, [|] <numeric_literal> [,<numeric_literal>]* [|])`
`<field_literal>` must be a numeric field


<div class=“clearfix”></div>
### Group by Equi range

> group by equi range examples

```plain-text
RANGE(population, EQUI(5, 10, 30))  # 5 is step value. 10 is the lower bound and 30 The higher bound.
```
> Creates the following group:
```markdown
- *-10
- 10-15
- 15-20
- 20-25
- 25-30
- 30-*
```

An equi range function can be used in [static range funciton](#group-by-static-range) replacing the static range parameter.
The equi range function takes four parameters: a field name, a step value, a lower bound and an higher bound.
It creates a group for the lower bound, then it will create another group at each step, adding step value from previous value until reaching higher bound.

#### Usage
`group_by=range(<field_literal>, EQUI(<numeric_literal>[,<numeric_literal>]*))`
`<field_literal>` must be a numeric field

<div class=“clearfix”></div>
### Group by date functions

> group by date examples

```plain-text
year(date_field) # Create a group for each different years in date_field values
hour(date_field) # Create a group for each different hours in date_field values
```

Date functions allow to group data on a date field by a specific unit of time:

Function name | Description
------------- | -----------
year | group by year
month | group by month
day | group by day
hour | group by hour
minute | group by minute
second | group by second
millisecond | group by millisecond

#### Usage
`group_by=<date_function>(<field_literal>)`
`<field_literal>` must be a datetime field


<div class=“clearfix”></div>
### Group by date format

> group by date format examples

```plain-text
date_format(date_field, "YYYY-MM-dd'T'HH") # Creates a group for each minutes in date_field and returning date with an pseudo ISO 8061 format
date_format(date_field, "w") # Create a group for each different week in date_field
```

Group by date format expression allow to group by a custom date format.
`Date format` is a string enclosed in double-quotes.
Every characters between a-z and A-Z are considered to be a pattern representing a date unit. In order to use these characters as simple characters and not pattern, they must be enlosed in single-quotes.

Following formats come from [joda time documentation](http://joda-time.sourceforge.net/apidocs/org/joda/time/format/DateTimeFormat.html)

Symbol | Meaning | Presentation | Examples
------ | ------- | ------------ | --------
G | era | text | AD
C | century of era (>=0) | number | 20
Y | year of era (>=0) | year | 1996
x | weekyear | year | 1996
w | week of weekyear | number | 27
e | day of week | number | 2
E | day of week | text | Tuesday; Tue
y | year | year | 1996
D | day of year | number | 189
M | month of year | month | July; Jul; 07
d | day of month | number | 10
a | halfday of day | text | PM
K | hour of halfday (0~11) | number | 0
h | clockhour of halfday (1~12) | number | 12
H | hour of day (0~23) | number | 0
k | clockhour of day (1~24) | number | 24
m | minute of hour | number | 30
s | second of minute | number | 55
S | fraction of second | number | 978
z | time zone | text | Pacific Standard Time; PST
Z | time zone offset/id | zone | -0800; -08:00; America/Los_Angeles
' | escape for text | delimiter
'' | single quote | literal | '

The count of pattern letters determine the format.
Text: If the number of pattern letters is 4 or more, the full form is used; otherwise a short or abbreviated form is used if available.

Number: The minimum number of digits. Shorter numbers are zero-padded to this amount.

Year: Numeric presentation for year and weekyear fields are handled specially. For example, if the count of 'y' is 2, the year will be displayed as the zero-based year of the century, which is two digits.

Month: 3 or over, use text, otherwise use number.

Zone: 'Z' outputs offset without a colon, 'ZZ' outputs the offset with a colon, 'ZZZ' or more outputs the zone id.

Zone names: Time zone names ('z') cannot be parsed.

#### Usage
`group_by=date_format(<string_literal>)`
`<string_literal>` contains a date format




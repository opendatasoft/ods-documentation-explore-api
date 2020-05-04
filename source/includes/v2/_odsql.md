# ODSQL

Filtering features are built in the core of Opendatasoft API engine.

The Opendatasoft Query Language (ODSQL) makes it possible to express complex queries as a filtering context for datasets or records, but also to build aggregations or computed fields.

Note that a given filtering context can simply be copied from one API to another. For example, it is possible to build a user interface which first allows the user to visually select the records they are are interested in, using full text search, facets and geo filtering ; and then allowing them to download these records with the same filtering context.

## Introduction

The ODSQL is split into 5 different kinds of clauses:

- the `select` clause: it allows to choose the returned fields, to give them an alias, or to manipulate them with functions like count, sum, min, max, etc.
- the `where` clause: it acts as a filter for the returned datasets or records, thanks to boolean operations, filter functions, arithmetic expressions, etc.
- the `group by` clause: it allows to aggregate rows together based on fields, numeric ranges, or dates
- the `order by` and `limit` clauses: they allow to choose the order and quantity of rows received as a response

These clauses are used as parameters in the Search API v2 for searching, aggregating and exporting datasets and records. Depending on the used endpoint, some features of the query language are available or not in the request.

<aside>
The whole query language is case insensitive and spaces are optional. In this documentation, upper case will however be used for language keywords, only for clarity purpose.
</aside>


## Language elements

ODSQL clauses are composed of basic language elements. These can either be literals or reserved keywords.

### Literals in ODSQL clauses

Literals are used in comparison, assignments or functions.

There are 7 types of literal:

- field
- string
- number
- date
- boolean
- geometry

<div class=“clearfix”></div>
#### Field literal

> Example of field literal

```sql
my_field > 10  -- my_field is a string literal
`12` > 10      -- without back-quotes 12 is considered as a numeric literal
`and`: "value" -- AND is a keyword
```

A field literals is a literal not enclosed in quotes. It can only contain alphanumeric characters or underscores.

<aside>
If a field name contains only numbers or is a keyword, it must be enclosed in back-quotes.
</aside>

<div class=“clearfix”></div>
#### String literal

> Example of string literal

```sql
"Word"
"Multiple words"
'Using single quotes'
```

A string literal is a literal enclosed in either single or double quotes.

<div class=“clearfix”></div>
#### Number literal

> Example of number literal

```sql
100
5.8
my_field > 108.7
```

A number literal is either an integer or a decimal value. It is not enclosed in quotes.

<div class=“clearfix”></div>
#### Date literal

> Example of date literal

```sql
date'2017-04-03T08:02'
date'2018/04/01'
```

A date literal is defined with a date keyword followed by a valid date format enclosed in single quotes.

A valid date can be:

- an [ISO 8601 date](https://en.wikipedia.org/wiki/ISO_8601)
- a slash separated date in the YYYY/MM/DD (year/month/day) format

<div class=“clearfix”></div>
#### Boolean literal

> Example of boolean literal

```sql
my_boolean_field is TRUE
my_boolean_field: FALSE
```

A boolean literal can either be a TRUE or a FALSE keyword (case insensitive). It should be used in boolean filters.

<div class=“clearfix”></div>
#### Geometry literal

> Example of geometry literal

```sql
distance(my_geo_field, geom'POINT(1 1)', 10km)
geometry(my_geo_field, geom'{"type": "Polygon","coordinates":[[[100.0, 0.0],[101.0, 0.0],[101.0, 1.0],[100.0, 1.0],[100.0,0.0]]]}')
```

A geometry literal is defined with a geom keyword followed by a valid geometry expression enclosed in single quotes.

Supported geometry expressions are:

- [WKT/WKB](https://en.wikipedia.org/wiki/Well-known_text)
- [GeoJSON geometry](https://en.wikipedia.org/wiki/GeoJSON)


<div class=“clearfix”></div>
#### Scalar functions

A scalar function can be used in [select arithmetic expressions](#arithmetic-select-expression) or [filter expressions](#filter-expression).

Function|Parameters|Description|Limitation
--------|-----------|----------|----------
`length`|string literal or string field literal|Returns the number of characters|
`now`|no parameter|Returns the current date|Only works on filter expressions
`year`|date field literal|Returns the year of the field literal|
`month`|date field literal|Returns the month of the field literal|
`day`|date field literal|Returns the day of the field literal|
`hour`|date field literal|Returns the hour of the field literal|
`minute`|date field literal|Returns the minute of the field literal|
`second`|date field literal|Returns the second of the field literal|
`date_format`|date field literal|Returns the formatted date (see [Group by date format](#group-by-date-format) for examples)|

<div class=“clearfix”></div>
### Reserved keywords in ODSQL clauses

> `not` is a reserved keywords and must be escaped with back-quotes if referred as field literal

```sql
my_field_literal is not true -- my_field_literal is not a reserved keyword, no need to escape it
`not` is not true -- not is a reserved keyword and must be escaped
```

Reserved keywords can be used inside clauses for building ODSQL expressions.
When used in a clause as a field literal, reserved keyword must be escaped with back-quotes.

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

The select clause can be used in records search APIs as the parameter `select`.

The select clause allows to:
- choose the fields that will be returned for each row
- transform fields using arithmetic
- rename fields
- add computed virtual fields to fields
- include or exclude fields based on a pattern

A select clause is composed of a single select expression or a list of comma-separated expressions.

A select expression can be:

 - a field literal
 - an include/exclude function
 - an arithmetic expression
 - an aggregation function

 Except for the include/exclude function, a select expression can define a label with the keyword `AS`. This label will be used in the output of the API as `key` for the select expression result.

<div class=“clearfix”></div>
### Select field literal

> Examples of select field literal

```sql
*                           -- Select all fields
field1, field2, field3      -- Only select field1, field2 and field3
field1 AS my_field, field2  -- Renaming field1 as my_field and select field2
```

A select field literal is the simplest form of select expression. It takes a field literal that must be returned in the result.
It also accepts the special character `*` to select all fields (it is the default behaviour).

<aside>
If a select expression is used in conjunction with a `group by` clause, the selected field literal must be in the `group by` clause.
</aside>

<div class=“clearfix”></div>
### Include and exclude functions

> Example of include/exclude

```sql
include(pop) -- will only include fields which name is pop
exclude(pop) -- will exclude fields which name is pop
include(pop*) -- Will include fields beginning with pop
```

Include and exclude are functions that accept fields names.

Fields listed in an include function are present in the result whereas fields listed in an exclude function are absent from the result.

Fields can contain a wildcard suffix (the `*` character). In that case, the inclusion/exclusion works on all field names beginning with the value preceding the wildcard.


<div class=“clearfix”></div>
### Arithmetic select expression

> Example of include/exclude

```sql
2 as const_2 -- Creates a field `const_2` containing the value `2`
2 * population as double_population -- Create a field `double_population` containing the double of population field
"hello" as hello -- Creates a field containing "hello" value
length(country_name) -- Get length (number of characters) of country_name field values
```

An arithmetic select expression accepts simple arithmetic operations. It accepts field literals, constant numeric or text values and [scalar functions](#scalar-functions). More complex arithmetic expressions can be formed by connecting these elements with arithmetic operators:

 - `+`: add
 - `-`: substract
 - `*`: multiply
 - `/`: divide

### Select aggregation

> Examples of aggregation expression

```sql
SUM(population) as sum_population -- Will compute the sum of all values for the field `population` returned as sum_population
COUNT(*) -- Return number of elements
```

Like in the SQL language, a `select` can also express an aggregation expression.

Available aggregation functions are:

- count
- max (maximum)
- min (minimum)
- avg (average)
- envelope
- percentile
- median

<div class=“clearfix”></div>
#### Count aggregation

> Examples of count aggregation

```sql
COUNT(*) -- Return number of elements
count(population) as population_count_not_empty -- Return number of elements where `population` field is not empty
```

This function computes numbers of elements.

It accepts the following parameters:
  - a field literal: only returns the count for not `null` value of this field
  - a `*` : returns the count of all elements


<div class=“clearfix”></div>
#### Max aggregation

> Examples of max aggregation

```sql
max(population) as max_population -- Return max value for population field
```

This function takes a numeric field literal. It returns the maximum value (`max`) of this field.

<div class=“clearfix”></div>
#### Min aggregation

> Examples of min aggregation

```sql
min(population) as min_population -- Return min value for population field
```

This function takes a numeric field literal. It returns the minimum value (`min`) of this field.


<div class=“clearfix”></div>
#### Avg aggregation

> Examples of avg aggregation

```sql
avg(population) as avg_population -- Return the average of the population
```

This function takes a numeric field literal. It returns the average (`avg`) of this field.

<div class=“clearfix”></div>
#### Envelope aggregation

> Examples of envelope aggregation

```plain-text
envelope(geo_point) as convex_hull # Return the convex_hull for the geo_point field
```

This function takes a geo_point field literal. It returns the convex hull (`envelope`) of all the points of the geo_point field.

<div class=“clearfix”></div>
#### Percentile aggregation

> Examples of percentile aggregation

```plain-text
percentile(age, 1) as first_percentile # Return the first percentile of the age field
```

This function takes a numeric field literal and a percentile. It returns the nth percentile (`percentile`) of this field. Percentile must be a decimal value between `0` and `100`.

<div class=“clearfix”></div>
#### Median aggregation

> Examples of median aggregation

```plain-text
median(age) as med # Return the median of the age field
```

This function takes a numeric field literal. It returns the median (`median`) of this field. Since the median is in fact the 50th percentile, it is a shortcut for `percentile(field, 50)`.


## Where clause

> Where clause with boolean operators

```sql
my_numeric_field > 10 and my_text_field like "paris" or distance(my_geo_field, geom'POINT(1 1)', 1km)
```

> This where clause filters results where numeric_field > 10 and (my_text_field contains the word `paris` or distance between my_geo_field and the point with 1,1 as lat,lon is under 1 kilometer)

The where clause can be used in the whole search API as the parameter `where`.

The where clause allows to filter rows with a combination of where expressions.

A where expression can be:

- a search query
- a filter function
- a comparison filter
- a filter expression

Where expressions can be combined with boolean operators (see **Boolean operations** documentation section below) and grouped via parenthesis.

<div class=“clearfix”></div>
##### Boolean operators

> Boolean operators

```sql
my_boolean_field OR my_numeric_field > 50 and my_date_field > date'1972'
-- Results can have my_boolean_field to true. They can also have my_numeric_field greater than 50 and my_date_field older than 1972

(my_boolean_field OR my_numeric_field > 50) and my_date_field > date'1972'
-- Results must have my_date_field older than 1972. They also must have my_boolean_field to true or my_numeric_field greater than 50
```

Where expressions can use boolean operators to express boolean filter.

There are 3 different boolan operations:

- `AND`: results must match left and right expressions
- `OR`: results must match left or right expression
- `NOT`: inverses the next expression

`AND` has precedence over `OR` operator. It means that, in the expression `a or b and c`, the sub-expression `b and c` is interpreted and executed first. It can also be written with parenthesis: `a or (b and c)`.

In order to change operator precedence, it is possible to use parenthesis in the expression. To give precedence to `OR` operator, the above expression can be written `(a or b) and c`.


<div class=“clearfix”></div>
### Search query filter

> Examples for search query

```sql
"tree"
"tree" AND "flower"
"tree" OR "car"
NOT "dog"
"dog" AND NOT "cat"
```

> Examples of search query with multiple words

```sql
"film"           -- returns results that contain film
"action movies"  -- returns results that contain action and movies.
```

> Example of wildcarded search query

```sql
"film*"      -- returns results that contain film, films, filmography, etc.
```

Filter search queries are queries that don’t refer to fields, they only contain quoted strings and boolean operators. Filter search queries perform full-text searches on all visible fields of each record and return matching rows.

If the string contains more than one word, the query will be an `AND` query on each tokenized word.

It is possible to perform a greedy query by adding a wildcard `*` at the end of a word.


### Filter functions

Filter functions are built-in functions that can be used in a `where` clause.

There are 3 filter functions:

- distance functions, to filter in a geographical area defined by a circle
- geometry functions, to filter in a geographical area defined by a polygon
- bbox functions, to filter in a rectangular box

<div class=“clearfix”></div>
#### Distance function

> Distance function examples

```sql
distance(field_name, GEOM'<geometry>', 1km)
distance(field_name, GEOM'<geometry>', 100yd)
```

The distance function limits the result set to a geographical area defined by a circle. This circle must be defined by its center and a distance.

- The center of the circle is expressed as a [geometry literal](#geometry-literal)).
- The distance is numeric and can have an unit in:

  - miles (mi)
  - yards (yd)
  - feet (ft)
  - meters (m)
  - centimeters (cm)
  - kilometers (km)
  - millimeters (mm)

<div class=“clearfix”></div>
#### Geometry function

> Geometry function examples

```sql
geometry(field_name, GEOM'<geometry>', INTERSECT)
geometry(field_name, GEOM'<geometry>', DISJOINT)
geometry(field_name, GEOM'<geometry>', WITHIN)
```

The geometry function limits the result set to a geographical area defined by a geometry.

This function only supports `geo_shape` fields. It should not be confused with the [polygon function](#polygon-function), which can be used on `geo_point` fields.

This function must be defined with both:

- a [geometry literal](#geometry-literal). 
- one of the following modes:

  - `INTERSECTS`: if the polygon intersects with the shape defined in the record
  - `DISJOINT`: if the polygon is disjoint from the shape defined in the record
  - `WITHIN`: if the polygon encloses the shape defined in the record


  <div class=“clearfix”></div>
#### Polygon function

> Polygon function examples

```plain-text
polygon(field_name, GEOM'<geometry>')
```

The polygon function limits the result set to a geographical area defined by a polygon.

Field defined by `field_name` must be of type `geo_point`.

The polygon must be defined with a [geometry literal](#geometry-literal).


<div class=“clearfix”></div>
#### Bbox function

> Bbox function example

```sql
bbox(field_name, GEOM'<geometry>', GEOM'<geometry>')
```

The bbox function limits the result set to a rectangular box.

This rectangular box is defined by its top left and its bottom right coordinates, both expressed with 2 [geometry literals](#geometry-literal).

<div class=“clearfix”></div>
### Comparison filter

3 kinds of comparison filter can be used in a `where` clause:

- text comparison filter
- numeric comparison filter
- date comparison filter

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
`>`,`<`,`>=`,`<=` | Return results whose field date are after or before the given value.


<div class=“clearfix”></div>
### Filter expression

4 kinds of filter expression can be used in a `where` clause:

- boolean field filter
- like filter
- in filter
- null filter

<div class=“clearfix”></div>
#### Boolean field filter

> Example of a boolean field filter

```sql
my_boolean_field          -- Filters results where boolean_field is true
my_boolean_field is false -- Filters results where boolean_field is false
```

A boolean field filter takes a boolean field and restricts results only if the boolean value is `true`.

There are 2 ways of creating a filter expression:

- with a field literal only: in that case, it filters the result where the field literal value is `true`
- with a field literal followed by `is` keyword, then `true` or `false` keywords

##### Format:

- `<field_literal>`
- `<field_literal> is (true|false)`

in which `<field_literal>` must be a valid boolean field

<div class=“clearfix”></div>
#### Like filter

> Example of a like expression

```sql
film_name like "star"      -- matches `star wars` and `Star Trek`
film_name like "star wars" -- match fields containing `star` and `wars`
```

A like filter restricts results to field literal values containing a defined string literal.

##### Format:
`<field_literal> LIKE <string_literal>`

<div class=“clearfix”></div>
#### In filter

> `In filter` on numeric

```sql
numeric_field IN [1..10] -- Filter results such as 1 <= numeric_field <= 10
numeric_field IN ]1..10[ -- Filter results such as 1 < numeric_field < 10
numeric_field: [1..10]   -- Use `:` instead of `IN` operator
```

> `In filter` on date

```sql
date_field IN [date'2017'..date'2018'] -- Filter results such as date_field date is between year 2017 and 2018
```

`In filters` results are based on a numeric or a date range. `In filters` only work on a field literal.

##### Format:

- on a numeric: `<field_literal> IN (]|[)<numeric_literal> (TO|..) <numeric_literal>(]|[)`
- on a date: `<field_literal> IN (]|[)<date_literal> (TO|..) <date_literal>(]|[)`


<div class=“clearfix”></div>
#### Null filter

> Example of a null filter expression

```sql
film_name is null      -- match records where film_name is null
film_name is not null  -- match records where film_name is not null
```

A null field filter takes a field and restricts results only if the field values are null.
The opposite filter, `is not null` takes a field and restricts results only if the field values are not null.

##### Format:
`<field_literal> is null`

`<field_literal> is not null`

## Group by clause

> Simple group by expression with label

```sql
group_by=my_field as myfield
```

> multiple group by expressions with label

```sql
group_by=my_field1,my_field2 as my_field
```

The group by clause can be used in aggregations of the search API as the parameter `group_by`.

The group by clause creates groups from data depending on a group by expression.

A group by clause can contain:

- a single group by expression
- a list of comma-separated group by expressions.

Like selects, a group by expression can have an `AS` statement to give it a label.

A group by expression can be:

- a field
- a static range
- an equi range
- a date function
- a date format

<div class=“clearfix”></div>
### Group by field

> Simple group by field

```sql
group_by=my_field
```

A group by field expression allows to group specified field values. It creates a group for each different field value.

##### Format:
`group_by=<field_literal>`


<div class=“clearfix”></div>
### Group by static range

> group by static range examples

```sql
RANGE(population, ]10, 50, 100[) -- Creates 4 groups: *-10, 10-50, 50-100 and 100-*
RANGE(population, [20.5[)        -- Creates 1 group: 20.5-*
RANGE(population, [1,2,3])       -- Creates 2 groups: 1-2 and 2-3
```

The static range function takes 2 parameters:

- a field name
- an array of steps inside brackets

The side of the brackets determines if the values lower than the lower bound and higher than the higher bound should be grouped together or ignored.

##### Format:
`group_by=range(<field_literal>, [|] <numeric_literal> [,<numeric_literal>]* [|])`
in which `<field_literal>` must be a numeric field


<div class=“clearfix”></div>
### Group by equi range

> group by equi range examples

```sql
RANGE(population, EQUI(5, 10, 30))  -- 5 is step value. 10 is the lower bound and 30 The higher bound.
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

An equi range function can be used in a [static range function](#group-by-static-range) replacing the static range parameter.

The equi range function takes 4 parameters:

- a field name
- a step value
- a lower bound
- a higher bound

The equi range function creates a group for the lower bound. It then creates another group at each step, adding the step value from the previous value until the higher bound is reached.

##### Format:
`group_by=range(<field_literal>, EQUI(<numeric_literal>[,<numeric_literal>]*))`
in which `<field_literal>` must be a numeric field

### Group by date functions

> group by date examples

```sql
year(date_field) -- Create a group for each different years in date_field values
hour(date_field) -- Create a group for each different hours in date_field values
```

Group by date functions allow to group data on a date field by a specific unit of time.

Function name | Description
------------- | -----------
`year` | Groups by year
`month` | Groups by month
`day` | Groups by day
`hour` | Groups by hour
`minute` | Groups by minute
`second` | Groups by second
`millisecond` | Groups by millisecond

##### Format:
`group_by=<date_function>(<field_literal>)`
in which `<field_literal>` must be a datetime field


<div class=“clearfix”></div>
### Group by date format

> group by date format examples

```sql
date_format(date_field, "YYYY-MM-dd'T'HH") -- Creates a group for each minutes in date_field and returning date with an pseudo ISO 8061 format
date_format(date_field, "w") -- Create a group for each different week in date_field
```

A group by date format expression allows to group by a custom date format.

A `date format` is a string enclosed in double-quotes.
Every character between a-z and A-Z is considered to be a pattern representing a date unit. In order to use these characters as simple characters and not pattern, they must be enclosed in single-quotes.

The formats below are available for a date format expression. They come from [joda time documentation](http://joda-time.sourceforge.net/apidocs/org/joda/time/format/DateTimeFormat.html).

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

- Text: if the number of pattern letters is 4 or more, the full form is used; otherwise a short or abbreviated form is used if available.
- Number: the minimum number of digits. Shorter numbers are zero-padded to this amount.
- Year: numeric presentation for year and weekyear fields are handled specially. For example, if the count of 'y' is 2, the year will be displayed as the zero-based year of the century, which is 2 digits.
- Month: 3 or over, use text, otherwise use number.
- Zone: 'Z' outputs offset without a colon, 'ZZ' outputs the offset with a colon, 'ZZZ' or more outputs the zone id.
- Zone names: time zone names ('z') cannot be parsed.

##### Format:
`group_by=date_format(<string_literal>)`
in which `<string_literal>` contains a date format

## Order by clause

> Order by examples

```sql
group_by=city & order_by=city ASC -- Order cities alphabetically
group_by=city & order_by=count(*) DESC -- Order each city by its number of records
select=count(*) as population_count & group_by=city  & order_by=population_count DESC -- Order each city by its number of records, using a label
group_by=city, year(birth_date) as birth_year & order_by=city DESC, birth_year ASC -- Order by city and then by year of birth
```

The order by clause can be used to sort the results of an aggregation.

The parameter `order_by` adds an order by clause to an API query.
It accepts a list of comma-separated expressions followed by a direction:

- ASC for ascending
- DESC for descending

### Format:

`order_by = expression [ ASC | DESC ], ...`

An order by expression can be :

- a field
- an aggregation function

The direction, if not specified, is by default ASC (ascending).

<aside>
When ordering by both aggregations and fields, the aggregation order must be in head of the list.
For example : <code>order_by = avg(age), gender</code> works, but <code>order_by = gender, avg(age)</code> returns an error.
</aside>

# ODSQL

Filtering features are built in the core of the Opendatasoft API engine.

The Opendatasoft Query Language (ODSQL) makes it possible to express complex queries as a filtering context for datasets or records, but also to build aggregations or computed fields.

Note that a given filtering context can simply be copied from one API to another. For example, it is possible to build a user interface that first allows the user to visually select the records they are interested in, using full-text search, facets, and geo filtering; and then allowing them to download these records with the same filtering context.

## Introduction

The ODSQL is split into 5 different kinds of clauses:

- the `select` clause: it allows choosing the returned fields, giving them an alias, manipulating them with functions like count, sum, min, max, etc.
- the `where` clause: it acts as a filter for the returned datasets or records, thanks to boolean operations, filter functions, arithmetic expressions, etc.
- the `group by` clause: it allows aggregating rows together based on fields, numeric ranges, or dates
- the `order by` and `limit` clauses: they allow choosing the order and quantity of rows received as a response

These clauses are used as parameters in the Search API v2 for searching, aggregating, and exporting datasets and records. Depending on the used endpoint, some features of the query language are available or not in the request.

<aside>
The whole query language is case insensitive, and spaces are optional. In this documentation, the uppercase is used for language keywords, only for clarity purposes.
</aside>


## Language elements

ODSQL clauses are composed of basic language elements. These can either be literals or reserved keywords.

### Literals in ODSQL clauses

Literals are used in comparison, assignments, or functions.

There are six types of literal:

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

A field literal is a literal not enclosed in quotes. It can only contain alphanumeric characters or underscores.

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
- a slash-separated date in the YYYY/MM/DD (year/month/day) format

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

A geometry literal is defined with a `geom` keyword followed by a valid geometry expression enclosed in single quotes.

Supported geometry expressions are:

- [WKT/WKB](https://en.wikipedia.org/wiki/Well-known_text)
- [GeoJSON geometry](https://en.wikipedia.org/wiki/GeoJSON)


<div class=“clearfix”></div>
### Scalar functions

A scalar function can be used in [select arithmetic expressions](#arithmetic-select-expression), [filter expressions](#filter-expression) or in the [group by clause](#group-by-clause).

Function|Parameters|Description
--------|-----------|----------
`length`|string literal or string field literal|Returns the number of characters
`now`|optional named parameters (see below)|Returns the current date
`year`|date field literal|Returns the year of a date
`month`|date field literal|Returns the month of a date
`day`|date field literal|Returns the day of a date
`hour`|date field literal|Returns the hour of a date
`minute`|date field literal|Returns the minute of a date
`second`|date field literal|Returns the second of a date
`date_format`|date field literal|Returns a formatted date

#### Parameters to the now() function

> Examples, assuming the current date time is 2021-05-06 12:34:55.450500+00:00, which is a thursday

```sql
now() -- Returns '2021-05-06T12:34:55.450500+00:00'
now(year=2000) -- Sets the year component to return '2000-05-06T12:34:55.450500+00:00'
now(year=2001, months=-1) -- Sets the year to 2001 and substract 1 month to return '2000-04-06T12:34:55.450500+00:00'
now(day=31,month=2) -- Sets the day to 31, then the month to 2. The actual day part is rounded to 28 '2021-02-28T12:34:55.450500+00:00'
now(weekday=0) -- Sets the day to the next monday which is '2021-05-10T12:34:55.450500+00:00'
now(mondays=+1) -- Sets the day to the next monday which is also '2021-05-10T12:34:55.450500+00:00'
now(mondays=-1) -- Sets the day to the previous monday which is '2021-05-03T12:34:55.450500+00:00'
```

Without any parameters, the `now()` function returns the current date and time.

The function may also be called with named parameters to set or modify certain parts of the current date and time.

With each parameter an integer value is required, interpreted as an absolute value or as a relative value to a part of the current date and time.

Parameter names in their singular form will set a certain part of the current date and time to the given value. Parameter names written in plural will add or substract the given value to a part of the current date and time.

If a parameter is used multiple times in the call, only the last one is actually used, the others are ignored.

Parameter name|Accepted values|Description
--------------|---------------|-----------
`year`|1 to 9999|Year component
`years`|Any integer|Value to add to or substract from the year component
`month`|1 to 12|Month component
`months`|Any integer|Value to add to or substract from the month component, then the year component in case of overflow
`day`|Any positive integer|Day component, rounded to the maximum valid day number for the current month
`days`|Any integer|Value to add to or substract from the day component, then the month component in case of overflow
`hour`|0 to 23|Hour component
`hours`|Any integer|Value to add to or substract from the hour component, then the day component in case of overflow
`minute`|0 to 59|Minute component
`minutes`|Any integer|Value to add to or substract from the minute component, then the hour component in case of overflow
`second`|0 to 59|Second component
`seconds`|Any integer|Value to add to or substract from the second component, then the minute component in case of overflow
`microsecond`|0 to 999999|Microsecond component
`microseconds`|Any integer|Value to add to or substract from the microsecond component, then the second component in case of overflow
`weekday`|0 to 6|Day of the week, 0 for monday to 6 for sunday
`mondays`|Any integer|Number of mondays to add to or substract from the current date
`tuesdays`|Any integer|Number of tuesdays to add to or substract from the current date
`wednesdays`|Any integer|Number of wednesdays to add to or substract from the current date
`thursdays`|Any integer|Number of thursdays to add to or substract from the current date
`fridays`|Any integer|Number of fridays to add to or substract from the current date
`saturdays`|Any integer|Number of saturdays to add to or substract from the current date
`sundays`|Any integer|Number of sundays to add to or substract from the current date

#### Date format function

> Examples, where `date_field` = '2007-11-20T01:23:45'

```sql
date_format(date_field, 'dd/MM/YYYY') -- Returns '20/11/2007'
date_format(date_field, "'The date is 'dd/MM/YYYY") -- Returns 'The date is 20/11/2007'
date_format(date_field, "'The date is '''dd/MM/YYYY''") -- Returns "The date is '20/11/2007'"
date_format(date_field, 'E') -- Returns 'mar.'
date_format(date_field, 'EEEE') -- Returns 'mardi'
date_format(date_field, 'H') -- Returns '1'
date_format(date_field, 'HH') -- Returns '01'
date_format(date_field, 'yy') -- Returns '07'
date_format(date_field, 'yyyy') -- Returns '2007'
date_format(date_field, 'M') -- Returns '11'
date_format(date_field, 'MM') -- Returns '11'
```

**Syntax**: `date_format(<date>, <date_format>)`

**Arguments**:

- `<date>`: a date field,
- `<date_format>`: a string describing how to format the date (see below)

**Returned value**: a string.

`<date_format>` is a string, where each character or group of characters will be replaced by parts of the date in the returned string.

The formats below are available for a date format expression.

Symbol | Meaning | Examples
------ | ------- | --------
yy or YY | year on two digits | 20
yyyy or YYYY | year on four digits | 2020
xx | weekyear* on two digits| 96
xxxx | weekyear* on four digits| 1996
w | week of weekyear | 7
ww | week of weekyear, left-padded with 0 | 07
e | day of week, as a number, 1 for monday to 7 for sunday | 2
E | day of week, abbreviated name | sun.
EEEE | day of week, full name | sunday
D | day of year | 89
DDD | day of year, left-padded with 0 | 089
M | month of year | 7
MM | month of year, left-padded with 0 | 07
d | day of month | 8
dd | day of month, left-padded with 0 | 08
H | hour of day, 0-23 | 9
HH | hour of day, 00-23, left-padded with 0 | 09
m | minute of hour, 0-59 | 13
mm | minute of hour, 00-59, left-padded with 0 | 09
s | second of minute, 0-59 | 13
ss | second of minute, 00-59, left-padded with 0 | 09

*Years and week years differ sligthly, see the [definition](https://en.wikipedia.org/wiki/ISO_week_date) of week years.

The date format can contain a free text that won't be interpreted. Free text must be surrounded by single quotes `'`.
To insert a single quote in the final string, it must be doubled.

Some special characters can also be used as delimiters between date components: `?`, `,`, `.`, `:`, `/` and `-`.

When used in the `where` clause, `date_format` must be compared to string values, e.g.
```sql
where=date_format(date_field, 'dd') = '08'
```

<div class=“clearfix”></div>
### Reserved keywords in ODSQL clauses

> `not` is a reserved keyword and must be escaped with back-quotes if referred to as a field literal

```sql
my_field_literal is not true -- my_field_literal is not a reserved keyword, there's no need to escape it
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

The select clause allows:
- choosing the fields that will be returned for each row,
- transforming fields using arithmetic,
- renaming fields,
- adding computed virtual fields to fields,
- including or excluding fields based on a pattern.

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
field1, field2, field3      -- Only select field1, field2, and field3
field1 AS my_field, field2  -- Renaming field1 as my_field and select field2
```

A select field literal is the simplest form of select expression. It takes a field literal that must be returned in the result.
It also accepts the special character `*` to select all fields (it is the default behavior).

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

Fields listed in an include function are present in the result, whereas fields listed in an exclude function are absent from the result.

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

An arithmetic select expression accepts simple arithmetic operations. It accepts field literals, constant numeric or text values, and [scalar functions](#scalar-functions). More complex arithmetic expressions can be formed by connecting these elements with arithmetic operators:

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

- avg (average)
- count
- envelope
- max (maximum)
- median
- min (minimum)
- percentile
- sum


<div class=“clearfix”></div>
#### Avg aggregation

> Examples of avg aggregation

```sql
avg(population) as avg_population -- Return the average of the population
```

This function takes a numeric field literal. It returns the average (`avg`) of this field.


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
  - a `*`: returns the count of all elements


<div class=“clearfix”></div>
#### Envelope aggregation

> Examples of envelope aggregation

```plain-text
envelope(geo_point) as convex_hull # Return the convex_hull for the geo_point field
```

This function takes a geo_point field literal. It returns the convex hull (`envelope`) of all the points of the geo_point field.


<div class=“clearfix”></div>
#### Max aggregation

> Examples of max aggregation

```sql
max(population) as max_population -- Return max value for population field
```

This function takes a numeric field literal. It returns the maximum value (`max`) of this field.


<div class=“clearfix”></div>
#### Median aggregation

> Examples of median aggregation

```plain-text
median(age) as med # Return the median of the age field
```

This function takes a numeric field literal. It returns the median (`median`) of this field. Since the median is the 50th percentile, it is a shortcut for `percentile(field, 50)`.


<div class=“clearfix”></div>
#### Min aggregation

> Examples of min aggregation

```sql
min(population) as min_population -- Return min value for population field
```

This function takes a numeric field literal. It returns the minimum value (`min`) of this field.


<div class=“clearfix”></div>
#### Percentile aggregation

> Examples of percentile aggregation

```plain-text
percentile(age, 1) as first_percentile # Return the first percentile of the age field
```

This function takes a numeric field literal and a percentile. It returns the nth percentile (`percentile`) of this field. Percentile must be a decimal value between `0` and `100`.


<div class=“clearfix”></div>
#### Sum aggregation

> Examples of sum aggregation

```sql
sum(population) as sum_population -- Return the sum of all values for the population field
```

This function takes a numeric field literal as an argument. It returns the sum of all values for a field.


## Where clause

> Where clause with boolean operators

```sql
my_numeric_field > 10 and my_text_field like "paris" or distance(my_geo_field, geom'POINT(1 1)', 1km)
```

> This where clause filters results where numeric_field > 10 and (my_text_field contains the word `paris` or distance between my_geo_field and the point with 1,1 as lat,lon is under 1 kilometer)

The where clause can be used in the whole Search API as the parameter `where`.

The where clause allows one to filter rows with a combination of where expressions.

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

There are 3 different boolean operations:

- `AND`: results must match left and right expressions
- `OR`: results must match left or right expression
- `NOT`: inverses the next expression

`AND` has precedence over the `OR` operator. It means that, in the expression `a or b and c`, the sub-expression `b and c` is interpreted and executed first. It can also be written with parenthesis: `a or (b and c)`.

In order to change operator precedence, it is possible to use parenthesis in the expression. To give precedence to the `OR` operator, the above expression can be written `(a or b) and c`.


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

Filter search queries are queries that don’t refer to fields. They only contain quoted strings and boolean operators. Filter search queries perform full-text searches on all visible fields of each record and return matching rows.

If the string contains more than one word, the query will be an `AND` query on each tokenized word.

It is possible to perform a greedy query by adding a wildcard `*` at the end of a word.


### Filter functions

Filter functions are built-in functions that can be used in a `where` clause.

There are 3 filter functions:

- distance functions, to filter in a geographical area defined by a circle
- geometry and polygon functions, to filter in a geographical area defined by a polygon

<div class=“clearfix”></div>
#### Distance function

> Distance function examples

```sql
distance(field_name, GEOM'<geometry>', 1km)
distance(field_name, GEOM'<geometry>', 100yd)
```

The distance function limits the result set to a geographical area defined by a circle. This circle must be defined by its center and a distance.

- The center of the circle is expressed as a [geometry literal](#geometry-literal)).
- The distance is numeric and can have a unit in:

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
geometry(field_name, GEOM'<geometry>', INTERSECTS)
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

A `like` filter restricts results to field literal values containing a defined string literal.

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
- static ranges
- ranges of equal widths
- a date function
- a date format

<div class=“clearfix”></div>
### Group by field

> Simple group by field

```sql
group_by=my_field
```

A group by field expression allows the grouping of specified field values. It creates a group for each different field value.

##### Format:
`group_by=<field_literal>`


<div class=“clearfix”></div>
### Group by static ranges

> group by static ranges examples

```sql
RANGE(population, ]10, 50, 100[)                  -- Creates 4 groups: *-10, 10-50, 50-100 and 100-*
RANGE(population, [20.5[)                         -- Creates 1 group: 20.5-*
RANGE(population, [1,2,3])                        -- Creates 2 groups: 1-2 and 2-3
RANGE(date, ]date'2020-11-13', date'2021-01-01']) -- Creates 2 groups: *-2020-11-13 and 2020-11-13-2021-01-01
```

The static range function takes 2 parameters:

- a field name
- an array of steps inside brackets

The side of the brackets determines if the values lower than the lower bound and higher than the higher bound should be grouped together or ignored.

Ranges can be set on numerical fields and on date/datetime fields.

##### Format for numerical ranges:
`group_by=range(<field_literal>, [|] <numeric_literal> [,<numeric_literal>]* [|])`
in which `<field_literal>` must be a numeric field

##### Format for date/datetime ranges:
`group_by=range(<field_literal>, [|] <date_literal> [,<date_literal>]* [|])`
in which `<field_literal>` must be a date or datetime field.

For a recall, date literals are composed of the `date` identifier followed by a date in ISO format, e.g. `date'2021-02-01'`


<div class=“clearfix”></div>
### Group by ranges of equal widths

> Example of group by ranges of equal widths:

```sql
RANGE(population, 5)
```
> `5` is the desired width of each returned group.

> For values of a `population` field that span from 10 to 28, it creates the following groups:

```markdown

- 10-15
- 15-20
- 20-25
- 25-30
```

> Example of a date histogram:

```sql
RANGE(date, 1 day)
```

> Groups created (one for each day):

```markdown

- 2020-01-01
- 2020-01-02
- 2020-01-04
- ...
```
> Note that no group is created for 2020-01-03 since no data is available for this day.


It is possible to group values of a field by ranges of equal widths, a.k.a. histograms. 

Ranges of equal widths are supported for numerical fields and date/datetime fields.

The `range` function for ranges of equal widths takes for parameters:

- a field name,
- the desired width of each group.

For date/datetime fields, the width of each group is expressed by a time interval with a special syntax (see below).

**Note**: groups that do not contain any data are not returned.

##### Format for numerical fields:
`group_by=range(<field_literal>, <numeric_literal>)`
in which `<field_literal>` must be a numeric field

##### Format for date/datetime fields:
`group_by=range(<field_literal>, <integer><interval_unit>)`
where `<field_literal>` must be a date/datetime field
and `<interval_unit>` is one of the following (case sensitive) string constants:

- `ms`, `millisecond` or `milliseconds`,
- `s`, `second` or `seconds`,
- `m`, `minute` or `minutes`,
- `h`, `hour` or `hours`,
- `d`, `day` or `days`,
- `w`, `week` or `weeks`,
- `M`, `month` or `months`,
- `q`, `quarter` or `quarters`,
- `y`, `year` or `years`.

Note that for some interval units (week, month, quarter, and year), an interval value of more than one is not supported yet.

### Group by date functions

> group by date examples

```sql
year(date_field) -- Create a group for each different years in date_field values
hour(date_field) -- Create a group for each different hours in date_field values
```

Group by date functions allow grouping data on a date field by a specific unit of time.

Function name | Description
------------- | -----------
`year` | Group by year
`month` | Group by month
`day` | Group by day
`hour` | Group by hour
`minute` | Group by minute
`second` | Group by second

##### Format:
`group_by=<date_function>(<field_literal>)`
in which `<field_literal>` must be a datetime field


<div class=“clearfix”></div>
### Group by date format

> group by date format examples

```sql
group_by=date_format(date_field, "YYYY-MM-dd'T'HH") -- Creates a group for each hour in date_field and return date with a pseudo ISO 8061 format
group_by=date_format(date_field, "w") -- Create a group for each different week in date_field
```

Results can be grouped by parts of a date, using the `date_format` function. For the full syntax, see the [description of the function](#date-format-function).

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
When ordering by both aggregations and fields, the aggregation order must be at the head of the list.
For example : <code>order_by = avg(age), gender</code> works, but <code>order_by = gender, avg(age)</code> returns an error.
</aside>

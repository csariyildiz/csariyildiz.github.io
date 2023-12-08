---
layout: post3
title: "Two Good Features Of Excel: VLOOKUP And Pivot Tables"
category: main
tags:
  - Excel
---

In this article, we will evaluate two very useful functions on Excel: VLOOKUP and Pivot Table features.

## VLOOKUP

`VLOOKUP` stands for `Vertical Lookup`. It's an `Excel function` used to search for a value in the first column of a table, then retrieve a corresponding piece of information located in the same row but from a specified column within that table.

Use `VLOOKUP` in Excel might seem challenging at first but its a very powerfull tool once you learned.

`VLOOKUP` function operates on four parameters: 
* the cell to inspect, (values to search for each row).
* the table to search (usually represented as a range of columns).
* the index indicating which row's data to retrieve from the table. 
* range_lookup, which is either TRUE or FALSE.

For an accurate match, the fourth argument, range_lookup, is set to FALSE. This setting ensures that the function precisely matches the sought value without approximation.

The important thing is that the column we are searching for appears should come first. If this column is the column we returned as a result, it will appear later in the table.
Therefore, we must ensure this order in the table we are searching by "cutting and pasting" the columns.

The fourth value, range_lookup, to find an exact match is given false.

Lets assume we have a table called `Table_X` with `DOI` numbers as column. We want to get `Authors` for each `DOI` using another table called `Table_Y`.
We can write this for each line as a column to our `Table_X`

```
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
=VLOOKUP([@DOI],Table_Y[[DOI]:[Authors]],3,FALSE)
```

We write this function in a column in our Table5.
For every value of `DOI` we want to get `Authors` from `Table7` with the same `DOI`. If `DOI` velues are matched than the `Authors` retrived. 
If it can't find any corresponding `DOI` than it will get `N\A` values.

We can copy the column and paste with values to remove the formulas by keeping the results.

Additionally, the question of how we can do a similar operation in SQL may come to mind. 

In SQL, the `LEFT JOIN statement` matches `DOI` values from `Table_X` to `DOI values` in `Table_Y`, retrieving Authors for matching DOIs. 
If there's no match in `Table_Y` for a particular DOI from `Table_X`, it would show `NULL` for `Authors` in the result set.

```
SELECT t1.DOI, t2.Authors
FROM Table_X t1
LEFT JOIN Table_Y t2 ON t1.DOI = t2.DOI;
```


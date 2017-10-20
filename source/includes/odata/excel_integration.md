# Microsoft Excel integration

The OpenDataSoft OData service makes it possible to gather data directly from Microsoft Excel without any programming
knowledge.

There are 3 ways to proceed:

* the OData native integration (Excel 2013 only)
* the PowerPivot extension (Excel 2010 and 2013)
* the PowerQuery extension (Excel 2010 and 2013)

This article will give a detailed explanation on how to do it.

## Native Integration

Here are the steps that will allow you to import data through the Excel native OData integration.

![Data sources supported natively by Microsoft Excel.](odata/data1.png)

* To import data from OpenDataSoft OData service, open Microsoft Excel and click the "DATA" tab. Once done, click
  "From Other Source". This should let you see the list of supported data sources. Select "From OData Feed".

![Data feed connection form.](odata/data2.png)

* In the address bar of the window that was opened, enter the service address. This address should be
  "http://platform.url/api/odata". Replace the platform.URL by the actual platform URL.

![Table selection window.](odata/data3.png)

* Select the table(s) of your choosing by clicking their checkbox.

![A table selected to become a data source.](odata/data4.png)

* After validation, the "Import Data" window will open. Click "OK".

![The "Import Data" window.](odata/data5.png)

* Your data are now displayed in the Microsoft Excel cells.

![Imported data in Microsoft Excel.](odata/data6.png)

## PowerPivot

Here are the steps that will allow you to import data through PowerPivot for Microsoft Excel.

!["Add-Ins" tab in the Microsoft Excel settings window.](odata/ppivot1.png)


* Before you can use PowerPivot, you must activate it. To do so, open the "Add-ins" tab in the Microsoft Excel settings
  window. In the "Manage" drop down menu, select "COM Add-ins" and click "Go...".

![The COM add ins selection window.](odata/ppivot2.png)


* In the window that was just opened, select "Microsoft PowerPivot for Excel 2013" or
  "Microsoft PowerPivot for Excel 2010", whichever applies.

![PowerPivot menu bar.](odata/ppivot3.png)

* Back in Microsoft Excel main window click the "POWERPIVOT" tab to display the PowerPivot menu bar. In it, click the
  "Manage" button. It will open a source management window.

![Data sources management window.](odata/ppivot4.png)

* In this window, click "Get External Data", and in the menu that appears, click "From Data Service". In the second
  menu that appears, click "From OData Data Feed"

![Data feed connection window.](odata/ppivot5.png)

* In the import window that was opened, enter the OpenDataSoft OData service in the address bar.

![Table selection window.](odata/ppivot6.png)

* In the table selection window, select the dataset(s) of your choosing by clicking their checkbox. Once done, click
  "Finish".

![Data transfer window.](odata/ppivot7.png)

* When the transfer window shows a success indicator, close it with the "Close" button on the bottom right.

![Data preview.](odata/ppivot8.png)

* You can now verify the integrity of your data on the data source management window.

![The data import list in PowerPivot.](odata/ppivot10.png)

* In the Microsoft Excel main window, click "PivotTable", and in the popped up list, click "PivotTable".

![The destination selection window.](odata/ppivot11.png)

* In the destination selection window, select the worksheet of your choosing, and click "OK".

![Data aggregation using PowerPivot.](odata/ppivot12.png)


## Power Query

Here are the steps that will allow you to import data through Power Query for Microsoft Excel.


* Before you can use Power Query, you must download and activate it. To download it, visit
  this link: <http://www.microsoft.com/en-us/download/details.aspx?id=39379>. The activation process is similar to
  that of PowerPivot.

![Data sources supported by Microsoft Power Query.](odata/pquery1.png)

* Once done, return to Microsoft Excel main window, click "POWER QUERY" to display its menu bar. In the
  "POWER QUERY" menu bar, click "From Other Sources". You should see a list with all data sources supported by
  Microsoft Power Query.

![OData data source selection window.](odata/pquery2.png)

* In this window, enter the OpenDataSoft OData service URL and click "OK".

![Power Query navigation window.](odata/pquery3.png)

* Once done, a Power Query navigation window will be displayed on the right hand side of the main window. In it, click
  the IDs of the table of your choosing.

![Imported data through Power Query.](odata/pquery4.png)

* Your data is now displayed in the Microsoft Excel cells.

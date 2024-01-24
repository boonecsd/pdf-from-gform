# Generate a PDF from a Google Form

## Why ?
Sometimes, you may need nicely formatted output as the result of a submission from a Google Form. Perhaps you need to physically print a copy, or you want to send a nicely formatted attachment to someone outside your organization.

There are Google Workspace add-ons that provide similar functionality, but many are not free to use, and require permission to access your data. With this solution, all data remains internal to your organization.

## How ?

* Create a Google Form https://forms.google.com
    * Link the responses to a Sheeet https://support.google.com/docs/answer/2917686?hl=en
* Go to the linked sheet
    * Change the column headers to something short and meaningful (they'll be the full form question label by default, which will be unwieldy in our later steps)
* Create a new blank google doc http://docs.google.com
    * Give your Doc a name that will remind you it is the PDF template for your form e.g. "Super Important Form PDF Template"
    * Type out a letter, or layout the document using tables, etc. Whatever you need to do to make it look nicely formatted, substituting {{fieldname}} into the form where you want the corresponding fields from the spreadsheet to appear
    * For example, you might say "Thanks {{firstname}} {{lastname}} for filling out our form" if "firstname" and "lastname" are the column headings in the response spreadsheet
* Go back to your form response spreadsheet, open the 'Extensions' menu and click on 'Apps Script'
* A new apps-script project should be automatically generated. Give it a name.
    * In the Code.gs file, paste the contents of the Code.gs file from this repository
        * At a minimum, review and update the fields in the script with "UPDATEME" in the comments
        * Click the 'save' icon to save your changes to the script
    * Using the lefthand menu, go to 'Triggers', click the '+ Add Trigger' button in the bottom right
    * Fill in the following:
        * Choose which function to run: onFormSubmit
        * Which runs at deployment: Head
        * Select event source: From spreadsheet
        * Select event type: On form submit
        * Failure noficiation settings: Notify me immediately (up to you, but I find this most useful)
    * Authorize the script permissions as prompted - check in the address bar for blocked pop ups
* Test it out ! Fill out your form and see if it works

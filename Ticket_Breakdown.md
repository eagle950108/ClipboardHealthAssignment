# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add custom ids to Agents
#### Description: 
    We need to modify our system to allow Facilities to store their own custom ids for each Agent they work with. 
    To do this, we'll add a new column called custom_id to the Agents table. 
#### Acceptance criteria: 
    - The custom_id field will be unique for each Agent 
    - The custom_id will allow NULL values for Facilities that choose not to use custom ids. 
#### Time/Effort Estimate: 
    3 hrs
#### Implementation Details: 
    - Add a new column custom_id to the Agents table with the data type VARCHAR(255).
    - We'll also need to update our code that interacts with the Agents table to include the new custom_id column. 
    - Finally, we'll modify the Facility's interface for managing Agents to display and allow editing of the new custom_id field.

### Ticket 2: Update Shifts with custom Agent ids
#### Description: 
    Once we've added the custom_id field to the Agents table, we'll need to update our Shifts table to use the custom_id instead of the internal id when generating reports for the Facilities.
#### Acceptance criteria: 
    - The generateReport function must be updated to use the custom_id field from the Agents table when generating the report.
    - The custom_id must be used in all places where the Agent id is displayed in the report, including metadata about the Agent assigned to each shift.
#### Time/Effort Estimate: 
    3 hrs
#### Implementation Details: 
    - Modify our generateReport function to retrieve the custom_id field from the Agents table when generating the report.
    - Update our report generation code to use the custom_id field when displaying metadata about the Agent assigned to each shift. 
    - If a Shift has an Agent without a custom_id, we'll use the internal id instead.

### Ticket 3: Add ability to map custom ids to internal ids
#### Description: 
    Add a mapping feature to allow Facilities to map their custom ids to the internal database ids for Agents.
#### Acceptance criteria: 
    - Facilities must be able to map their custom ids to the internal database ids for Agents.
    - The mapping feature must be available in the Facility's interface for managing Agents.
    - The mapping must be stored in the database and persist between sessions.
    - The getShiftsByFacility function must use the mapped internal database ids to retrieve Shifts for generating reports.
    - If a custom id has not been mapped, the generateReport function should fall back to using the internal database id.
#### Time/Effort Estimate: 
    8 hrs
#### Implementation Details: 
    - Modify the Facility's interface for managing Agents to include this feature. 
    - Create a new table in the database to store the mappings, which will persist between sessions. 
    - Update our getShiftsByFacility function to use the mapped internal database ids to retrieve Shifts for generating reports. 
    - If a custom id has not been mapped, the generateReport function will fall back to using the internal database id.






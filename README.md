
# dataform_salesforce

## Development progress

- Basic source files
- Assertions
- Basic Reporting


## This is the Dataform package for Salesforce

## Supported backends 
- Stitch (being tested)
- Fivetran (not started)
- Matillion (not started)
- Alooma (not started)

## Supported Warehouse
- BigQuery
- Redshift (in progress)
- Postgres (in progress)
- Snowflake (in progress)

## Installation

Add the package to your package.json file in your Dataform project. 

## Configure the package

TODO

### Getting to know Salesforce

First thing’s first. What is Salesforce and why does your sales organization use it?
Salesforce offers tools for all parts of the business, but we’re going to focus on its capacity as a customer relationship management (CRM) tool.

As a team, sales uses Salesforce to stay organized and track progress towards goals. Sales representatives record information in Salesforce as they learn more about existing and potential customers. Sales operations teams use it to automate processes that help sales development reps (SDRs) and account executives (AEs) focus on selling. Other systems like marketing automation or billing software can be integrated to pro- vide additional context.

However, at the end of the day, it’s the bottom line that matters. Salesforce’s ultimate value lies in aggregating data to provide a clear view of revenue. Sales leaders look at reports to understand how many deals have resulted in revenue (or, in sales terms, have been “closed won”), how much revenue is in the bank, and how much revenue they’re likely to bring in from pending deals.

As an analyst working with CRM data, you have a big opportunity to help sales leaders figure out how to increase revenue. But first, you need to understand how data is generated and organized in Salesforce.


### Caveats

The Pareto principle applies to every Salesforce implementation; 80% of the fields for every Salesforce instance are likely the same; however, the 20% that is different represents what is unique about each particular business, workflows and definitions. 

#### How Salesforce generates and organizes CRM data

It's best to think of Salesforce as a flexible database - similar to any database, information gets recorded in Salesforce both manually and automatically. Salesforce stores this information - regardless of how it was entered - in an organized system. When analysts work with Salesfroce, they typically use the raw data behind the system, made available through the Salesforce API. Most companies prefer to extract data from Salesforce into their data warehouse

## Value of Salesforce data in the warehouse

TODO: add notes here on why the DW is the best place to house Salesforce data
- allows custom reporting, harder to do using Salesforce reporting interface
- joining sales + marketing + product data together (plug here for Dataform)


## Understanding the Salesforce object hierarchy

### Leads

Leads are people the sales organization knows about but hasn’t yet associated with an account. Maybe your company has an email news- letter list. The people who signed up but never expressed any other buying signal, might be in your system as leads.

### Accounts

In the B2B context. *accounts* in Salesforce represent companies, but they can be any organization or person that's buying something from your business. Accounts have Owners - the owners are the sales reps in charge of closing deals with a particular business. It is a common approach for many companies to set a default user set for accounts that aren't owned by anyone, like a sales operations specalist, a sales development representative, or a Salesforce admin.

### Contacts

Contacts represent people associated with an account.

In addition to accounts, contacts are sometimes associated with specific opportuntities usually because they’re decision makers for those opportunities.

### Opportunities

Opportunities are potential deals with buyers. Each opportunity must be assigned to an account. Sales reps create opportunities when they believe they could win the business of a buyer. If the buyer might be interested in multiple products, a sales rep might assign multiple opportunities to that buyer’s account.
Sales reps move the opportunities through the stages of a sales cycle, typically following company guidelines to determine which stage an opportunity is in. And when a deal is closed, the opportunity is flagged as won or lost.

### The Salesforce schema

TODO: 

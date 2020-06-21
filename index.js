odd
// Salesforce package
//

const accounts = require("./includes/accounts");
const opportunities = require("./includes/opportunities");
const contacts = require("./includes/contacts");
const leads = require("./includes/leads");
const users = require("./includes/users")
const report_pipeline_by_users = require('./includes/report_pipeline_by_rep')

module.exports = (params) => {

 params = {
    salesforceSchema: "salesforce", // Schema that ETL vendor writes to
    customAccountFields: [], // Add custom fields from the Account object
    customUserFields: [], // Add custom fields from the User object
    customLeadFields: [], // Add custom fields from the Lead object
    customOpportunityFields: [], // Add custom fields from the Opportunity object
    customContactFields: [], // Add custom fields from the Contact object
    inputDatasetName: null,
    ...params
  };

  const {
    defaultConfig,
    salesforceSchema
  } = params;
  
  // Publish and return datasets.
  return {
    accounts: accounts(params),
    opportunities: opportunities(params),
    contacts: contacts(params),
    leads: leads(params),
    users: users(params),
    report_pipeline_by_rep: report_pipeline_by_rep(params)

  }
}


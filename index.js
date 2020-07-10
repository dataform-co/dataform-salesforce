// Base Salesforce tables
const salesforceAccounts = require("./includes/accounts");
const salesforceOpportunities = require("./includes/opportunities");
const salesforceLeads = require("./includes/leads");
const salesforceUsers = require("./includes/users");
const salesforceContacts = require("./includes/contacts");

// Reports
const reportPipelinebyRep = require("./includes/reports/pipeline_by_rep");

module.exports = (params) => {
/// assumes Stitch, but if Fivetran do this.


  params = {
    salesforceSchema: 'salesforce', // schema that the Salesforce table are written into by ELT vendor
    accountsTableName: 'Account', // accounts table name; 
    opportunitiesTableName: 'Opportunity', // opportunities table name; 
    leadsTableName: 'Lead', // leads table name; 
    usersTableName: 'User', // users table name; 
    contactsTableName: 'Contact', // users table name;
    ...params
  };

  const {
    defaultConfig,
    salesforceSchema,
    accountsTableName,
    opportunitiesTableName,
    leadsTableName,
    usersTableName,
    contactsTableName
  } = params;
  
  // Declare the source tables
  const accountsTables = declare({
    ...defaultConfig,
    schema: salesforceSchema,
    name: accountsTableName,
  });

  const opportunitiesTables = declare({
    ...defaultConfig,
    schema: salesforceSchema,
    name: opportunitiesTableName,
  });

  const leadsTables = declare({
    ...defaultConfig,
    schema: salesforceSchema,
    name: leadsTableName,
  });

  const usersTables = declare({
    ...defaultConfig,
    schema: salesforceSchema,
    name: usersTableName,
  });

  const contactTables = declare({
    ...defaultConfig,
    schema: salesforceSchema,
    name: contactsTableName,
  });

  // Publish and return datasets.
  return {
    accountsTables,
    opportunitiesTables,
    leadsTables,
    usersTables,
    contactTables,
    salesforceAccounts: salesforceAccounts(params),
    salesforceOpportunities: salesforceOpportunities(params),
    salesforceLeads: salesforceLeads(params),
    salesforceUsers: salesforceUsers(params),
    // salesforceContacts: salesforceContacts(params),
    reportPipelinebyRep: reportPipelinebyRep(params)
  }
}
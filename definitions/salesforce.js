const salesforcePackage = require("../");

const salesforceModel = salesforcePackage({
  salesforceSchema: "salesforce_playground",
  // accountsTableName: 'Account',
  // opportunitiesTableName: 'Opportunity',
  defaultConfig: {
    tags: ["salesforce"],
    type: "view"
  },
});

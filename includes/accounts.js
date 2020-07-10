module.exports = (params) => {
  return publish("salesforce_accounts", {
    description: "Base model for Salesforce Accounts",
    columns: {
      account_id: "Unique ID for accounts.",
      account_name: "Account Name, usually entered by sales rep. TEXT, Not Unique",
      industry: "Name of Industry, usually entered by sales rep. TEXT, Not unique",
      number_of_employees: "Number of Employees at Account; entered by sales rep. INTEGER"
    },
    assertions: {
      uniqueKey: ['account_id'],
      nonNull: ['account_id', 'account_name']
    },
    ...params.defaultConfig
  }).query(ctx => `

  with base as (
        select *
        from ${ctx.ref(params.salesforceSchema, params.accountsTableName)}
        where not isdeleted
    ),
    
    fields as (
        select 
            -- keys
            id                    as account_id,

            -- object properties
            name                  as account_name,
            industry,
            numberofemployees     as number_of_employees,

        from base
    )
    
    select * 
    from fields

`)
}
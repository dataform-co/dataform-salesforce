module.exports = (params) => {
  return publish("salesforce_opportunities", {
    description: "Base model for Salesforce Opportunities",
    columns: {
      opportunity_id: "Unique ID for opportunities.",
      opportunity_name: "Account Name, usually entered by sales rep. TEXT, Not Unique",
      probability: "Probability that the opp will close. NUMERIC",
      forecast_category: "Category of forecast. INTEGER",
      stage_name: "Opportunity Stage. STRING",
      type: "Opportunity Type. usually used to denote New vs Existing Opps on the same Account",
      created_date: 'Date the opportunity was created',
      closed_date: "Date the opportunity was closed"
    },
    assertions: {
      uniqueKey: ['opportunity_id'],
      nonNull: ['opportunity_id', 'opportunity_name']
    },
    ...params.defaultConfig
  }).query(ctx => `

  with base as (
        select *
        from ${ctx.ref(params.salesforceSchema, params.opportunitiesTableName)}
        where not isdeleted
    ),
    
    fields as (
        select 
            -- keys
            id                      as opportunity_id,
            accountid               as account_id,
            ownerid                 as owner_id,
            
            -- opportunity info
            name                    as opportunity_name,
            probability,
            forecastcategory        as forecast_category,
            stagename               as stage_name,
            amount, 
            type                    as department,
            iswon                   as is_won,
            isclosed                as is_closed,

            -- dates
            createddate             as created_date,
            closedate              as close_date

        from base
    )
    
    select * 
    from fields

`)
}
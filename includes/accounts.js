
module.exports = (params) => {
    return publish("salesforce_accounts", {
        description: "Base table for Salesforce Accounts object",
        columns: {
            // TODO: add column descriptions
        },
        ...params.defaultConfig
    }).query(ctx => `

    with base as (
        select *
        from ${constants.SALESFORCE_ACCOUNTS_TABLE_NAME}
    
    ),
    
    fields as (
        select 
            id as account_id,
            name as account_name,
            industry,
            number_of_employees,
            account_score
        from base
    )
    
    select * 
    from fields
        
    `)
}
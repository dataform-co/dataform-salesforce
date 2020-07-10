// TODO: opportunity.stage_names should be fetched from package config

module.exports = (params) => {
    return publish("salesforce_opportunities_extended_xf", {
        description: "Intermediate table that combines opportunities, accounts and user data",
        type: "view",
        columns: {
            // TODO: add column descriptions
        },
        ...params.defaultConfig
    }).query(ctx => `

    with opportunitites as (
        select *
        from ${ctx.ref("salesforce_opportunities")}
    
    ),
    
    users as (
        select *
        from ${ctx.ref("salesforce_users")}
    
    ),

    accounts as (
        select *
        from ${ctx.ref("salesforce_accounts")}
    
    ),

    add_fields as (

        select 
            opportunities.*
            accounts.*,
            opportunity_owner.user_id as opportunity_owner_id, 
            opportunity_owner.user_id as opportunity_owner_name
            case
                when opportunity.is_won then 'Won'
                when not opportunity.is_won and opportunity.is_closed then 'Lost'
                when not opportunity.is_closed and lower(opportunity.forecast_category) in ('pipeline','forecast','bestcase') then 'Pipeline'
                else 'Other'
            end as status
        from opportunitites
        left join account on opportunities.opportunity_id = account.account_id
        left join users on users.user_id = opportunities.opportunity_id

    )
    
    select * 
    from add_fields
        
    `)
}
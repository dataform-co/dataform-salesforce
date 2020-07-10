// TODO: opportunity.stage_names should be fetched from package config

module.exports = (params) => {
    return publish("salesforce_opportunities_extended", {
        description: "Intermediate table that combines opportunities, accounts and user data",
        type: "view",
        columns: {
            // TODO: add column descriptions
        },
        ...params.defaultConfig
    }).query(ctx => `

    with opportunity as (
        select *
        from ${ctx.ref("salesforce_opportunities")}
    
    ),

    user as (
        select *
        from ${ctx.ref("salesforce_users")}
    
    ),

    account as (
        select *
        from ${ctx.ref("salesforce_accounts")}
    
    ),

    add_fields as (

        select 
            opportunity.*,
            account.* except (account_id),
            user.user_id as opportunity_user_id, 
            user.name as opportunity_owner_name,
            case
                when opportunity.is_won then 'Won'
                when not opportunity.is_won and opportunity.is_closed then 'Lost'
                when not opportunity.is_closed and lower(opportunity.forecast_category) in ('pipeline','forecast','bestcase') then 'Pipeline'
                else 'Other'
            end as status
                  case when is_created_this_month then amount else 0 end as created_amount_this_month
        from opportunity
        left join account on opportunity.opportunity_id = account.account_id
        left join user on user.user_id = opportunity.owner_id

    )
    
    select * 
    from add_fields
        
    `)
}
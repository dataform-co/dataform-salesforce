module.exports = (params) => {
  return publish("report_pipeline_by_rep", {
    description: "Pipeline by Rep",
    columns: {
    // DIMENSIONS


    // MEASURES
    
    },
    assertions: {
      //
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
    
    pipeline_by_rep as (
        select 
            -- dimensions
            u.name             as rep_name,
            o.stage_name       as stage_name,       
            o.close_date,

            -- measures
            sum(amount)        as opportunity_amount
        from opportunity o 
        join user u
        on u.user_id = o.owner_id

        where o.stage_name in ('Evaluation', 'Contract Negotiation', 'Closed Won') 
        and o.type = 'New Business'
        group by 1,2,3
    )
    
    select * 
    from pipeline_by_rep

`)
}
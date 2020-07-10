module.exports = (params) => {
  return publish("salesforce_leads", {
    description: "Base model for Salesforce Leads",
    columns: {
      lead_id: "Unique ID for the Lead object.",
      email_hash: "Hashed Email address",
      name_hash: "Hashed Name of Lead",
      status: "Lead Status, usually from dropdown.",
      lead_source: "Source of Lead, based on simple attribution models.",
      is_converted: "Flag denoting whether lead was converted to a contact. BOOLEAN",
      created_date: "Calendar date for when the lead was created, DATETIME",
    },
    assertions: {
      uniqueKey: ['lead_id'],
      nonNull: ['lead_id', 'email_hash']
    },
    ...params.defaultConfig
  }).query(ctx => `

  with base as (
        select *
        from ${ctx.ref(params.salesforceSchema, params.leadsTableName)}
        where not isdeleted
    ),
    
    fields as (
        select 
            -- keys
            id                      as lead_id,
            
            -- lead info
            ${utils.hash("email")}   as email_hash,
            ${utils.hash("name")}    as name_hash, 
            
            status                  as lead_status,
            leadsource              as lead_source,
            isconverted             as is_converted,

            -- dates
            createddate             as created_date,

        from base
    )
    
    select * 
    from fields

`)
}
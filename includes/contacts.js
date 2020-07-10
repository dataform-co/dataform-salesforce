module.exports = (params) => {
  return publish("salesforce_contacts", {
    description: "Base model for Salesforce Contacts object",
    columns: {
      contact_id: "Unique ID for Contact object.",
      account_id: "Account ID for object, Foreignkey",
      owner_id: "ID of the Salesperson/rep"
    },
    assertions: {
      uniqueKey: ['contact_id'],
      nonNull: ['contact_id', 'email_hash']
    },
    ...params.defaultConfig
  }).query(ctx => `

  with base as (
        select *
        from ${ctx.ref(params.salesforceSchema, params.contactsTableName)}
        where not isdeleted
    ),
    
    fields as (
        select 
            -- keys
            id                          as contact_id,
            accountid                   as account_id,
            ownerid                     as owner_id,
            
            -- contact details
            ${utils.hash("email")}        as email_hash,
            ${utils.hash("firstname")}    as first_name_hash,
            ${utils.hash("lastname")}     as last_name_hash,
            title,
            phone, 
            department              as department,

            -- dates
            createddate             as created_date,
        from base
    )
    
    select * 
    from fields

`)
}
module.exports = (params) => {
  return publish("salesforce_users", {
    description: "Base model for Salesforce Users object",
    columns: {
      user_id: "Unique ID for Users object.",
      name: "User Name, not hashed",
      user_type: "Type of Salesforce user. STRING",
      created_date: 'Date the opportunity was created',
    },
    assertions: {
      uniqueKey: ['user_id'],
      nonNull: ['user_id', 'name']
    },
    ...params.defaultConfig
  }).query(ctx => `

  with base as (
        select *
        from ${ctx.ref(params.salesforceSchema, params.usersTableName)}
    ),
    
    fields as (
        select 
            -- keys
            id                      as user_id,
        
            -- user info
            name,
            usertype                as user_type,
            
            -- dates
            createddate             as created_date,

        from base
    )
    
    select * 
    from fields

`)
}
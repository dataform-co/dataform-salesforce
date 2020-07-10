module.exports = (params) => {
  return publish("report_sales_snapshot", {
    description: "Sales Snapshot report",
    columns: {
    // DIMENSIONS


    // MEASURES
    
    },
    assertions: {
      //
    },
    ...params.defaultConfig
  }).query(ctx => `

    with opportunities_extended as (
        select *
        from ${ctx.ref("salesforce_opportunities_extended")}
    
    ),
    
    pipeline as (

    select 
        sum(created_amount_this_month)                  as pipeline_created_amount_this_month,
        sum(created_amount_this_quarter)                as pipeline_created_amount_this_quarter,
        sum(created_amount_this_month * probability)    as pipeline_created_forecast_amount_this_month,
        sum(created_amount_this_quarter * probability)  as pipeline_created_forecast_amount_this_quarter,
        sum(created_count_this_month)                   as pipeline_count_created_this_month,
        sum(created_count_this_quarter)                 as pipeline_count_created_this_quarter,
        count(*) as total_number_pipeline,
        sum(amount) as total_pipeline_amount,
        sum(amount * probability) as total_pipeline_forecast_amount,
        avg(amount) as avg_pipeline_opp_amount,
        max(amount) as largest_deal_in_pipeline,
        avg(days_since_created) as avg_days_open
    from opportunities_extended
        where status = 'Pipeline'

    ), bookings as (

    select 
        sum(closed_amount_this_month)                    as bookings_amount_closed_this_month,
        sum(closed_amount_this_quarter)                  as bookings_amount_closed_this_quarter,
        count(*)                                         as total_number_bookings,
        sum(amount)                                      as total_bookings_amount,
        sum(closed_count_this_month)                     as bookings_count_closed_this_month,
        sum(closed_count_this_quarter)                   as bookings_count_closed_this_quarter,
        avg(amount)                                      as avg_bookings_amount,
        max(amount)                                      as largest_booking,
        avg(days_to_close)                               as avg_days_to_close
    from opportunities_extended
        where status = 'Won'

    ), lost as (

    select 
        sum(closed_amount_this_month)                   as lost_amount_this_month,
        sum(closed_amount_this_quarter)                 as lost_amount_this_quarter,
        count(*)                                        as total_number_lost,
        sum(amount)                                     as total_lost_amount,
        sum(closed_count_this_month)                    as lost_count_this_month,
        sum(closed_count_this_quarter)                  as lost_count_this_quarter
    from opportunities_extended
    where status = 'Lost'

)

select 
  bookings.*,
  pipeline.*,
  lost.*,
  bookings.bookings_amount_closed_this_month / (bookings.bookings_amount_closed_this_month + lost.lost_amount_this_month) * 100                                                    as win_percent_this_month,
  bookings.bookings_amount_closed_this_quarter / (bookings.bookings_amount_closed_this_quarter + lost.lost_amount_this_quarter) * 100                  as win_percent_this_quarter,
  bookings.total_bookings_amount / (bookings.total_bookings_amount + lost.total_lost_amount) * 100 as total_win_percent
from bookings, pipeline, lost

`)
}
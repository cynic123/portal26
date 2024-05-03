const { Event } = require('../model/event');


module.exports = async (req, res, next) => {
  const { tenant } = req.params;
  const queryBody = req.body;
  const from = queryBody?.from_date;
  const to = queryBody?.to_date;
  const userId = queryBody?.user_id;
  const domain = queryBody?.domain;
  const category = queryBody?.category;

  console.log('tenant: ' + tenant);
  console.log('req body: ' + JSON.stringify(queryBody));

  if (!tenant) {
    next(new Error('Param tenant is missing'));
  }
  try {
    let query = { tenant: tenant };

    if (queryBody) {
      if (from && to) {
        query.event_timestamp = { $gte: new Date(from), $lte: new Date(to) };
      }
      if (userId) {
        query.user_id = userId;
      }
      if (domain) {
        query.domain = domain;
      }
      if (category) {
        query.category = category;
      }
    }

    const allEvents = await Event.find(query).select({ event_timestamp: 1, user_id: 1, body: 1, _id: 0 });
    res.status(200).json(allEvents);
  } catch (error) {
    console.error('Error while fetching events: ', error);
    next(new Error(error));
  }
}
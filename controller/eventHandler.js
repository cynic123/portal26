const { Event } = require('../model/event');

module.exports = async (req, res, next) => {
  const { tenant } = req.params;
  const eventData = req.body;
  const userId = eventData?.user_id;
  const url = eventData?.url;
  const body = eventData?.body;
  let domain;

  console.log('tenant: ' + tenant);
  console.log('req body: ' + JSON.stringify(eventData));

  if (!tenant) {
    next(new Error('Param tenant is missing'));
  }

  if (!eventData || Object.keys(eventData).length == 0) {
    next(new Error('Request body is missing'));
  }

  if (!userId) {
    next(new Error('Missing request body param: user_id'));
  }

  if (!url) {
    next(new Error('Missing request body param: url'));
  } else {
    try {
      domain = new URL(eventData?.url).hostname;
    } catch (error) {
      console.error('Invalid url in request: ' + eventData?.url);
      next(new Error('Invalid url in request: ' + eventData?.url));
    }
  }

  let timeStamp;
  if (eventData?.event_timestamp) {
    try {
      timeStamp = new Date(eventData.event_timestamp);
    } catch (error) {
      console.error('Invalid event_timestamp format: ' + eventData?.event_timestamp);
    }
  } else {
    timeStamp = new Date();
  }

  const event = new Event({ ...eventData, event_timestamp: timeStamp, domain: domain, tenant: tenant });
  try {
    await event.save();
    res.status(200).json({ 'status': 'success' });
  } catch (error) {
    next(new Error(error));
  }
}
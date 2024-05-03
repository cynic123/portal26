const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
  event_timestamp: { type: Date, default: new Date() },
  tenant: { type: String, required: true },
  user_id: { type: String, required: true },
  url: { type: String },
  body: { type: String },
  update_timestamp: { type: Date },
  domain: { type: String, required: true },
  category: { type: [String] }
},
  { autoCreate: false, collection: 'events_log' }
);

const Event = mongoose.model('Events', eventsSchema);

module.exports = { Event };
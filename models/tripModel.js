const mongoose = require('mongoose');
const Joi = require('joi');

const tripSchema = new mongoose.Schema({
  email: { type: String, required: true },
  location: { type: String, required: true },
  total: { type: Number, required: true },
  didGas: { type: Boolean, default: false },
  didBrisket: { type: Boolean, default: false },
  didDessert: { type: Boolean, default: false },
  didHomeGood: { type: Boolean, default: false },
  didOutdoor: { type: Boolean, default: false },
  didJerky: { type: Boolean, default: false },
  didColdGrab: { type: Boolean, default: false },
  didHotGrab: { type: Boolean, default: false },
  did3rdParty: { type: Boolean, default: false }
});

const Trip = mongoose.model("Trip", tripSchema);

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    location: Joi.string().required().label("Location"),
    total: Joi.number().required().label("Total"),
    didGas: Joi.boolean().label("Did Gas"),
    didBrisket: Joi.boolean().label("Did Brisket"),
    didDessert: Joi.boolean().label("Did Dessert"),
    didHomeGood: Joi.boolean().label("Did Home Good"),
    didOutdoor: Joi.boolean().label("Did Outdoor"),
    didJerky: Joi.boolean().label("Did Jerky"),
    didColdGrab: Joi.boolean().label("Did Cold Grab"),
    didHotGrab: Joi.boolean().label("Did Hot Grab"),
    did3rdParty: Joi.boolean().label("Did 3rd Party")
  });
  return schema.validate(data);
};

module.exports = { Trip, validate };




// const mongoose = require('mongoose');
// const Joi = require('joi');

// const tripSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   location: { type: String, required: true },
//   total: { type: Number, required: true },
//   didGas: { type: Boolean, default: false},
//   didBrisket: { type: Boolean, default: false},
//   didDessert: { type: Boolean, default: false},
//   didHomeGood: { type: Boolean, default: false},
//   didOutdoor: { type: Boolean, default: false},
//   didJerky: { type: Boolean, default: false},
//   didColdGrab: { type: Boolean, default: false},
//   didHotGrab: { type: Boolean, default: false},
//   did3rdParty: { type: Boolean, default: false}
// });

// const Trip = mongoose.model("trip", tripSchema);

// const validate = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().email().required().label("Email"),
//     location: Joi.string().required().label("Location"),

//   });
//   return schema.validate(data);
// };

// module.exports = { Trip, validate };

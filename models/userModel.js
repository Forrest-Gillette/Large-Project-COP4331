// user model
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    verified: {type: Boolean, default: false},

    total_trips: {type: Number, default: 0},
    total_spent: {type: Number, default: 0},
	
	al_unique: {type: Number, default: 0},
    fl_unique: {type: Number, default: 0},
    ga_unique: {type: Number, default: 0},
    ky_unique: {type: Number, default: 0},
    sc_unique: {type: Number, default: 0},
    tn_unique: {type: Number, default: 0},
    tx_unique: {type: Number, default: 0},

    al_trips: {type: Number, default: 0},
    fl_trips: {type: Number, default: 0},
    ga_trips: {type: Number, default: 0},
    ky_trips: {type: Number, default: 0},
    sc_trips: {type: Number, default: 0},
    tn_trips: {type: Number, default: 0},
    tx_trips: {type: Number, default: 0},

	al_total: {type: Number, default: 0},
    fl_total: {type: Number, default: 0},
    ga_total: {type: Number, default: 0},
    ky_total: {type: Number, default: 0},
    sc_total: {type: Number, default: 0},
    tn_total: {type: Number, default: 0},
    tx_total: {type: Number, default: 0},
	
    trips_1: { type: Number, default: 0 },
	spent_1: { type: Number, default: 0 },

	trips_2: { type: Number, default: 0 },
	spent_2: { type: Number, default: 0 },

	trips_3: { type: Number, default: 0 },
	spent_3: { type: Number, default: 0 },

	trips_7: { type: Number, default: 0 },
	spent_7: { type: Number, default: 0 },

	trips_8: { type: Number, default: 0 },
	spent_8: { type: Number, default: 0 },

	trips_12: { type: Number, default: 0 },
	spent_12: { type: Number, default: 0 },

	trips_13: { type: Number, default: 0 },
	spent_13: { type: Number, default: 0 },

	trips_14: { type: Number, default: 0 },
	spent_14: { type: Number, default: 0 },

	trips_16: { type: Number, default: 0 },
	spent_16: { type: Number, default: 0 },

	trips_17: { type: Number, default: 0 },
	spent_17: { type: Number, default: 0 },

	trips_18: { type: Number, default: 0 },
	spent_18: { type: Number, default: 0 },

	trips_19: { type: Number, default: 0 },
	spent_19: { type: Number, default: 0 },

	trips_20: { type: Number, default: 0 },
	spent_20: { type: Number, default: 0 },

	trips_21: { type: Number, default: 0 },
	spent_21: { type: Number, default: 0 },

	trips_22: { type: Number, default: 0 },
	spent_22: { type: Number, default: 0 },

	trips_23: { type: Number, default: 0 },
	spent_23: { type: Number, default: 0 },

	trips_24: { type: Number, default: 0 },
	spent_24: { type: Number, default: 0 },

	trips_25: { type: Number, default: 0 },
	spent_25: { type: Number, default: 0 },

	trips_26: { type: Number, default: 0 },
	spent_26: { type: Number, default: 0 },

	trips_28: { type: Number, default: 0 },
	spent_28: { type: Number, default: 0 },

	trips_29: { type: Number, default: 0 },
	spent_29: { type: Number, default: 0 },

	trips_30: { type: Number, default: 0 },
	spent_30: { type: Number, default: 0 },

	trips_31: { type: Number, default: 0 },
	spent_31: { type: Number, default: 0 },

	trips_32: { type: Number, default: 0 },
	spent_32: { type: Number, default: 0 },

	trips_33: { type: Number, default: 0 },
	spent_33: { type: Number, default: 0 },

	trips_34: { type: Number, default: 0 },
	spent_34: { type: Number, default: 0 },

	trips_35: { type: Number, default: 0 },
	spent_35: { type: Number, default: 0 },

	trips_36: { type: Number, default: 0 },
	spent_36: { type: Number, default: 0 },

	trips_37: { type: Number, default: 0 },
	spent_37: { type: Number, default: 0 },

	trips_38: { type: Number, default: 0 },
	spent_38: { type: Number, default: 0 },

	trips_39: { type: Number, default: 0 },
	spent_39: { type: Number, default: 0 },

	trips_40: { type: Number, default: 0 },
	spent_40: { type: Number, default: 0 },

	trips_42: { type: Number, default: 0 },
	spent_42: { type: Number, default: 0 },

	trips_43: { type: Number, default: 0 },
	spent_43: { type: Number, default: 0 },

	trips_44: { type: Number, default: 0 },
	spent_44: { type: Number, default: 0 },

	trips_45: { type: Number, default: 0 },
	spent_45: { type: Number, default: 0 },

	trips_46: { type: Number, default: 0 },
	spent_46: { type: Number, default: 0 },

	trips_47: { type: Number, default: 0 },
	spent_47: { type: Number, default: 0 },

	trips_48: { type: Number, default: 0 },
	spent_48: { type: Number, default: 0 },

	trips_50: { type: Number, default: 0 },
	spent_50: { type: Number, default: 0 },

	trips_51: { type: Number, default: 0 },
	spent_51: { type: Number, default: 0 },

	trips_52: { type: Number, default: 0 },
	spent_52: { type: Number, default: 0 },

	trips_53: { type: Number, default: 0 },
	spent_53: { type: Number, default: 0 },

	trips_55: { type: Number, default: 0 },
	spent_55: { type: Number, default: 0 },

	trips_57: { type: Number, default: 0 },
	spent_57: { type: Number, default: 0 },

	trips_58: { type: Number, default: 0 },
	spent_58: { type: Number, default: 0 },

    al_spent: {type: Number, default: 0},
    fl_spent: {type: Number, default: 0},
    ga_spent: {type: Number, default: 0},
    ky_spent: {type: Number, default: 0},
    sc_spent: {type: Number, default: 0},
    tn_spent: {type: Number, default: 0},
    tx_spent: {type: Number, default: 0},

    most_visited_location: {type: String, default: "None yet!"},
	most_visited_location_spent: {type: Number, default: 0},
	most_visited_location_trips: {type: Number, default: 0},
	
    most_spent_location: {type: String, default: "None yet!"},
	most_spent_location_spent: {type: Number, default: 0},
	most_spent_location_trips: {type: Number, default: 0},
	
    most_item_category: {type: String, default: "None yet!"},
	most_item_category_count: {type: Number, default: 0},
	total_gas: {type: Number, default: 0},
	total_brisket: {type: Number, default: 0},
    total_dessert: {type: Number, default: 0},
	total_jerky: {type: Number, default: 0},
	total_outdoor: {type: Number, default: 0},
	total_3rdparty: {type: Number, default: 0},
	total_hotgrab: {type: Number, default: 0},
	total_coldgrab: {type: Number, default: 0},
	total_homegoods: {type: Number, default: 0}
    
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "1d"});
    return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data)
}

module.exports = {User, validate};

// // user model
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const Joi = require('joi');
// const passwordComplexity = require('joi-password-complexity');

// const userSchema = new mongoose.Schema({
//     firstName: {type: String, required: true},
//     lastName: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, required: true},
//     verified: {type: Boolean, default: false},

//     total_trips: {type: Number, default: 0},
//     total_spent: {type: Number, default: 0},

//     al_trips: {type: Number, default: 0},
//     fl_trips: {type: Number, default: 0},
//     ga_trips: {type: Number, default: 0},
//     ky_trips: {type: Number, default: 0},
//     sc_trips: {type: Number, default: 0},
//     tn_trips: {type: Number, default: 0},
//     tx_trips: {type: Number, default: 0},
	
//     trips_1: { type: Number, default: 0 },
// 	spent_1: { type: Number, default: 0 },

// 	trips_2: { type: Number, default: 0 },
// 	spent_2: { type: Number, default: 0 },

// 	trips_3: { type: Number, default: 0 },
// 	spent_3: { type: Number, default: 0 },

// 	trips_7: { type: Number, default: 0 },
// 	spent_7: { type: Number, default: 0 },

// 	trips_8: { type: Number, default: 0 },
// 	spent_8: { type: Number, default: 0 },

// 	trips_12: { type: Number, default: 0 },
// 	spent_12: { type: Number, default: 0 },

// 	trips_13: { type: Number, default: 0 },
// 	spent_13: { type: Number, default: 0 },

// 	trips_14: { type: Number, default: 0 },
// 	spent_14: { type: Number, default: 0 },

// 	trips_16: { type: Number, default: 0 },
// 	spent_16: { type: Number, default: 0 },

// 	trips_17: { type: Number, default: 0 },
// 	spent_17: { type: Number, default: 0 },

// 	trips_18: { type: Number, default: 0 },
// 	spent_18: { type: Number, default: 0 },

// 	trips_19: { type: Number, default: 0 },
// 	spent_19: { type: Number, default: 0 },

// 	trips_20: { type: Number, default: 0 },
// 	spent_20: { type: Number, default: 0 },

// 	trips_21: { type: Number, default: 0 },
// 	spent_21: { type: Number, default: 0 },

// 	trips_22: { type: Number, default: 0 },
// 	spent_22: { type: Number, default: 0 },

// 	trips_23: { type: Number, default: 0 },
// 	spent_23: { type: Number, default: 0 },

// 	trips_24: { type: Number, default: 0 },
// 	spent_24: { type: Number, default: 0 },

// 	trips_25: { type: Number, default: 0 },
// 	spent_25: { type: Number, default: 0 },

// 	trips_26: { type: Number, default: 0 },
// 	spent_26: { type: Number, default: 0 },

// 	trips_28: { type: Number, default: 0 },
// 	spent_28: { type: Number, default: 0 },

// 	trips_29: { type: Number, default: 0 },
// 	spent_29: { type: Number, default: 0 },

// 	trips_30: { type: Number, default: 0 },
// 	spent_30: { type: Number, default: 0 },

// 	trips_31: { type: Number, default: 0 },
// 	spent_31: { type: Number, default: 0 },

// 	trips_32: { type: Number, default: 0 },
// 	spent_32: { type: Number, default: 0 },

// 	trips_33: { type: Number, default: 0 },
// 	spent_33: { type: Number, default: 0 },

// 	trips_34: { type: Number, default: 0 },
// 	spent_34: { type: Number, default: 0 },

// 	trips_35: { type: Number, default: 0 },
// 	spent_35: { type: Number, default: 0 },

// 	trips_36: { type: Number, default: 0 },
// 	spent_36: { type: Number, default: 0 },

// 	trips_37: { type: Number, default: 0 },
// 	spent_37: { type: Number, default: 0 },

// 	trips_38: { type: Number, default: 0 },
// 	spent_38: { type: Number, default: 0 },

// 	trips_39: { type: Number, default: 0 },
// 	spent_39: { type: Number, default: 0 },

// 	trips_40: { type: Number, default: 0 },
// 	spent_40: { type: Number, default: 0 },

// 	trips_42: { type: Number, default: 0 },
// 	spent_42: { type: Number, default: 0 },

// 	trips_43: { type: Number, default: 0 },
// 	spent_43: { type: Number, default: 0 },

// 	trips_44: { type: Number, default: 0 },
// 	spent_44: { type: Number, default: 0 },

// 	trips_45: { type: Number, default: 0 },
// 	spent_45: { type: Number, default: 0 },

// 	trips_46: { type: Number, default: 0 },
// 	spent_46: { type: Number, default: 0 },

// 	trips_47: { type: Number, default: 0 },
// 	spent_47: { type: Number, default: 0 },

// 	trips_48: { type: Number, default: 0 },
// 	spent_48: { type: Number, default: 0 },

// 	trips_50: { type: Number, default: 0 },
// 	spent_50: { type: Number, default: 0 },

// 	trips_51: { type: Number, default: 0 },
// 	spent_51: { type: Number, default: 0 },

// 	trips_52: { type: Number, default: 0 },
// 	spent_52: { type: Number, default: 0 },

// 	trips_53: { type: Number, default: 0 },
// 	spent_53: { type: Number, default: 0 },

// 	trips_55: { type: Number, default: 0 },
// 	spent_55: { type: Number, default: 0 },

// 	trips_57: { type: Number, default: 0 },
// 	spent_57: { type: Number, default: 0 },

// 	trips_58: { type: Number, default: 0 },
// 	spent_58: { type: Number, default: 0 },

//     al_spent: {type: Number, default: 0},
//     fl_spent: {type: Number, default: 0},
//     ga_spent: {type: Number, default: 0},
//     ky_spent: {type: Number, default: 0},
//     sc_spent: {type: Number, default: 0},
//     tn_spent: {type: Number, default: 0},
//     tx_spent: {type: Number, default: 0},

//     most_visited_location: {type: String, default: "None yet!"},
// 	most_visited_location_spent: {type: Number, default: 0},
// 	most_visited_location_trips: {type: Number, default: 0},
	
//     most_spent_location: {type: String, default: "None yet!"},
// 	most_spent_location_spent: {type: Number, default: 0},
// 	most_spent_location_trips: {type: Number, default: 0},
	
//     most_item_category: {type: String, default: "None yet!"},
// 	most_item_category_count: {type: Number, default: 0},
// 	total_gas: {type: Number, default: 0},
// 	total_brisket: {type: Number, default: 0},
//     total_dessert: {type: Number, default: 0},
// 	total_jerky: {type: Number, default: 0},
// 	total_outdoor: {type: Number, default: 0},
// 	total_3rdparty: {type: Number, default: 0},
// 	total_hotgrab: {type: Number, default: 0},
// 	total_coldgrab: {type: Number, default: 0},
// 	total_homegoods: {type: Number, default: 0}
    
// });

// userSchema.methods.generateAuthToken = function() {
//     const token = jwt.sign({id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "1d"});
//     return token;
// };

// const User = mongoose.model("user", userSchema);

// const validate = (data) => {
//     const schema = Joi.object({
//         firstName: Joi.string().required().label("First Name"),
//         lastName: Joi.string().required().label("Last Name"),
//         email: Joi.string().email().required().label("Email"),
//         password: passwordComplexity().required().label("Password"),
//     });
//     return schema.validate(data)
// }

// module.exports = {User, validate};

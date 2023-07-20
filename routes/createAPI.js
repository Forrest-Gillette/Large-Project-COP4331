const router = require("express").Router();
const { Trip } = require('../models/tripModel');
const { User } = require("../models/userModel");
const express = require("express");

const app = express();

router.post("/", async (req, res) => {
  let trip = await new Trip({
    email: req.body.email,
    location: req.body.location,
    total: req.body.total,
    didGas: req.body.didGas,
    didBrisket: req.body.didBrisket,
    didDessert: req.body.didDessert,
    didHomeGood: req.body.didHomeGood,
    didOutdoor: req.body.didOutdoor,
    didJerky: req.body.didJerky,
    didColdGrab: req.body.didColdGrab,
    didHotGrab: req.body.didHotGrab,
    did3rdParty: req.body.did3rdParty,
  }).save();

  let user = await User.findOne({ email: req.body.email });

  let totalTrips = user.total_trips + 1;
  let totalCost = user.total_spent + trip.total;

  await User.updateOne({ _id: user._id }, { total_trips: totalTrips });
  await User.updateOne({ _id: user._id }, { total_spent: totalCost });

  let storeID = 0;
  let state = "";
  let newStateTotal = 0;

  var al_pattern = /, AL/;
  var fl_pattern = /, FL/;
  var ga_pattern = /, GA/;
  var ky_pattern = /, KY/;
  var sc_pattern = /, SC/;
  var tn_pattern = /, TN/;
  var tx_pattern = /, TX/;
  
  if(al_pattern.test(req.body.location)) {
		state = "AL";
        var trips = user.al_trips + 1;
		newStateTotal = req.body.total + user.al_total;
		await User.updateOne({_id: user.id}, {al_total : newStateTotal});
        await User.updateOne({_id: user._id}, {al_trips: trips});
		var storePattern = /#57 /;
		if(storePattern.test(req.body.location))
			storeID = 57;
		
		storePattern = /#58 /;
		if(storePattern.test(req.body.location))
			storeID = 58;
		
		storePattern = /#43 /;
		if(storePattern.test(req.body.location))
			storeID = 43;
		
		storePattern = /#42 /;
		if(storePattern.test(req.body.location))
			storeID = 42;
  }
  
  else if(fl_pattern.test(req.body.location)) {
	state = "FL";
    var trips = user.fl_trips + 1;
	newStateTotal = req.body.total + user.fl_total;
	await User.updateOne({_id: user.id}, {fl_total : newStateTotal});
    await User.updateOne({_id: user._id}, {fl_trips: trips});
	var storePattern = /#47 /;
	if(storePattern.test(req.body.location))
		storeID = 47;
		
	storePattern = /#46 /;
	if(storePattern.test(req.body.location))
		storeID = 46;
  }
  
  else if(ga_pattern.test(req.body.location)) {
	state = "GA";
    var trips = user.ga_trips + 1;
	newStateTotal = req.body.total + user.ga_total;
	await User.updateOne({_id: user.id}, {ga_total : newStateTotal});
    await User.updateOne({_id: user._id}, {ga_trips: trips});
	var storePattern = /#52 /;
	if(storePattern.test(req.body.location))
		storeID = 52;
		
	storePattern = /#51 /;
	if(storePattern.test(req.body.location))
		storeID = 51;
  }
  
  // Treating KY and SC like the multi-location states in case they get new ones in the future
  else if(ky_pattern.test(req.body.location)) {
	state = "KY";
    var trips = user.ky_trips + 1;
	newStateTotal = req.body.total + user.ky_total;
	await User.updateOne({_id: user.id}, {ky_total : newStateTotal});
    await User.updateOne({_id: user._id}, {ky_trips: trips});
	storeID = 55;
  }

  else if(sc_pattern.test(req.body.location)) {
	state = "SC";
    var trips = user.sc_trips + 1;
	newStateTotal = req.body.total + user.sc_total;
	await User.updateOne({_id: user.id}, {sc_total : newStateTotal});
    await User.updateOne({_id: user._id}, {sc_trips: trips});
	storeID = 53;
  }
  
  else if(tn_pattern.test(req.body.location)) {
	state = "TN";
    var trips = user.tn_trips + 1;
	newStateTotal = req.body.total + user.tn_total;
	await User.updateOne({_id: user.id}, {tn_total : newStateTotal});
    await User.updateOne({_id: user._id}, {tn_trips: trips});
	
	var storePattern = /#50 /;
	if(storePattern.test(req.body.location))
		storeID = 50;
		
	storePattern = /#45 /;
	if(storePattern.test(req.body.location))
		storeID = 45;
  }
  
  else if(tx_pattern.test(req.body.location)) {
	state = "TX";
    var trips = user.tx_trips + 1;
	newStateTotal = req.body.total + user.tx_total;
	await User.updateOne({_id: user.id}, {tx_total : newStateTotal});
    await User.updateOne({_id: user._id}, {tx_trips: trips});
	var storePattern = /#14 /;
	if(storePattern.test(req.body.location))
		storeID = 14;
		
	storePattern = /#13 /;
	if(storePattern.test(req.body.location))
		storeID = 13;
		
	storePattern = /#21 /;
	if(storePattern.test(req.body.location))
		storeID = 21;
		
	storePattern = /#25 /;
	if(storePattern.test(req.body.location))
		storeID = 25;
		
	storePattern = /#28 /;
	if(storePattern.test(req.body.location))
		storeID = 28;
		
	storePattern = /#34 /;
	if(storePattern.test(req.body.location))
		storeID = 34;
		
	storePattern = /#3 /;
	if(storePattern.test(req.body.location))
		storeID = 3;
		
	storePattern = /#32 /;
	if(storePattern.test(req.body.location))
		storeID = 32;
		
	storePattern = /#39 /;
	if(storePattern.test(req.body.location))
		storeID = 39;
		
	storePattern = /#24 /;
	if(storePattern.test(req.body.location))
		storeID = 24;
		
	storePattern = /#48 /;
	if(storePattern.test(req.body.location))
		storeID = 48;
		
	storePattern = /#37 /;
	if(storePattern.test(req.body.location))
		storeID = 37;
		
	storePattern = /#7 /;
	if(storePattern.test(req.body.location))
		storeID = 7;
	
	storePattern = /#8 /;
	if(storePattern.test(req.body.location))
		storeID = 8;
	
	storePattern = /#16 /;
	if(storePattern.test(req.body.location))
		storeID = 16;
		
	storePattern = /#40 /;
	if(storePattern.test(req.body.location))
		storeID = 40;
		
	storePattern = /#1 /;
	if(storePattern.test(req.body.location))
		storeID = 1;
		
	storePattern = /#2 /;
	if(storePattern.test(req.body.location))
		storeID = 2;
	
	storePattern = /#29 /;
	if(storePattern.test(req.body.location))
		storeID = 29;
		
	storePattern = /#23 /;
	if(storePattern.test(req.body.location))
		storeID = 23;
		
	storePattern = /#17 /;
	if(storePattern.test(req.body.location))
		storeID = 17;
	
	storePattern = /#26 /;
	if(storePattern.test(req.body.location))
		storeID = 26;
	
	storePattern = /#44 /;
	if(storePattern.test(req.body.location))
		storeID = 44;
	
	storePattern = /#22 /;
	if(storePattern.test(req.body.location))
		storeID = 22;
	
	storePattern = /#19 /;
	if(storePattern.test(req.body.location))
		storeID = 19;
	
	storePattern = /#20 /;
	if(storePattern.test(req.body.location))
		storeID = 20;
	
	storePattern = /#12 /;
	if(storePattern.test(req.body.location))
		storeID = 12;
	
	storePattern = /#31 /;
	if(storePattern.test(req.body.location))
		storeID = 31;
	
	storePattern = /#38 /;
	if(storePattern.test(req.body.location))
		storeID = 38;
	
	storePattern = /#35 /;
	if(storePattern.test(req.body.location))
		storeID = 35;
	
	storePattern = /#36 /;
	if(storePattern.test(req.body.location))
		storeID = 36;
	
	storePattern = /#33 /;
	if(storePattern.test(req.body.location))
		storeID = 33;
		
	storePattern = /#18 /;
	if(storePattern.test(req.body.location))
		storeID = 18;
		
	storePattern = /#30 /;
	if(storePattern.test(req.body.location))
		storeID = 30;
  }
  
  let new_loc_total = 0;
  let new_loc_spent = 0;
  // Now that we have the specific store, we update that store's total trips and total spent
	if(storeID == 1){
		new_loc_total = user.trips_1 + 1;
		new_loc_spent = user.spent_1 + trip.total;
		await User.updateOne({_id: user._id}, {trips_1 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_1 : new_loc_spent});
	}

	else if(storeID == 2){
		new_loc_total = user.trips_2 + 1;
		new_loc_spent = user.spent_2 + trip.total;
		await User.updateOne({_id: user._id}, {trips_2 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_2 : new_loc_spent});
	}

	else if(storeID == 3){
		new_loc_total = user.trips_3 + 1;
		new_loc_spent = user.spent_3 + trip.total;
		await User.updateOne({_id: user._id}, {trips_3 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_3 : new_loc_spent});
	}

	else if(storeID == 7){
		new_loc_total = user.trips_7 + 1;
		new_loc_spent = user.spent_7 + trip.total;
		await User.updateOne({_id: user._id}, {trips_7 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_7 : new_loc_spent});
	}

	else if(storeID == 8){
		new_loc_total = user.trips_8 + 1;
		new_loc_spent = user.spent_8 + trip.total;
		await User.updateOne({_id: user._id}, {trips_8 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_8 : new_loc_spent});
	}

	else if(storeID == 12){
		new_loc_total = user.trips_12 + 1;
		new_loc_spent = user.spent_12 + trip.total;
		await User.updateOne({_id: user._id}, {trips_12 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_12 : new_loc_spent});
	}

	else if(storeID == 13){
		new_loc_total = user.trips_13 + 1;
		new_loc_spent = user.spent_13 + trip.total;
		await User.updateOne({_id: user._id}, {trips_13 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_13 : new_loc_spent});
	}

	else if(storeID == 14){
		new_loc_total = user.trips_14 + 1;
		new_loc_spent = user.spent_14 + trip.total;
		await User.updateOne({_id: user._id}, {trips_14 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_14 : new_loc_spent});
	}

	else if(storeID == 16){
		new_loc_total = user.trips_16 + 1;
		new_loc_spent = user.spent_16 + trip.total;
		await User.updateOne({_id: user._id}, {trips_16 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_16 : new_loc_spent});
	}

	else if(storeID == 17){
		new_loc_total = user.trips_17 + 1;
		new_loc_spent = user.spent_17 + trip.total;
		await User.updateOne({_id: user._id}, {trips_17 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_17 : new_loc_spent});
	}

	else if(storeID == 18){
		new_loc_total = user.trips_18 + 1;
		new_loc_spent = user.spent_18 + trip.total;
		await User.updateOne({_id: user._id}, {trips_18 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_18 : new_loc_spent});
	}

	else if(storeID == 19){
		new_loc_total = user.trips_19 + 1;
		new_loc_spent = user.spent_19 + trip.total;
		await User.updateOne({_id: user._id}, {trips_19 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_19 : new_loc_spent});
	}

	else if(storeID == 20){
		new_loc_total = user.trips_20 + 1;
		new_loc_spent = user.spent_20 + trip.total;
		await User.updateOne({_id: user._id}, {trips_20 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_20 : new_loc_spent});
	}

	else if(storeID == 21){
		new_loc_total = user.trips_21 + 1;
		new_loc_spent = user.spent_21 + trip.total;
		await User.updateOne({_id: user._id}, {trips_21 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_21 : new_loc_spent});
	}

	else if(storeID == 22){
		new_loc_total = user.trips_22 + 1;
		new_loc_spent = user.spent_22 + trip.total;
		await User.updateOne({_id: user._id}, {trips_22 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_22 : new_loc_spent});
	}

	else if(storeID == 23){
		new_loc_total = user.trips_23 + 1;
		new_loc_spent = user.spent_23 + trip.total;
		await User.updateOne({_id: user._id}, {trips_23 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_23 : new_loc_spent});
	}

	else if(storeID == 24){
		new_loc_total = user.trips_24 + 1;
		new_loc_spent = user.spent_24 + trip.total;
		await User.updateOne({_id: user._id}, {trips_24 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_24 : new_loc_spent});
	}

	else if(storeID == 25){
		new_loc_total = user.trips_25 + 1;
		new_loc_spent = user.spent_25 + trip.total;
		await User.updateOne({_id: user._id}, {trips_25 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_25 : new_loc_spent});
	}

	else if(storeID == 26){
		new_loc_total = user.trips_26 + 1;
		new_loc_spent = user.spent_26 + trip.total;
		await User.updateOne({_id: user._id}, {trips_26 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_26 : new_loc_spent});
	}

	else if(storeID == 28){
		new_loc_total = user.trips_28 + 1;
		new_loc_spent = user.spent_28 + trip.total;
		await User.updateOne({_id: user._id}, {trips_28 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_28 : new_loc_spent});
	}

	else if(storeID == 29){
		new_loc_total = user.trips_29 + 1;
		new_loc_spent = user.spent_29 + trip.total;
		await User.updateOne({_id: user._id}, {trips_29 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_29 : new_loc_spent});
	}

	else if(storeID == 30){
		new_loc_total = user.trips_30 + 1;
		new_loc_spent = user.spent_30 + trip.total;
		await User.updateOne({_id: user._id}, {trips_30 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_30 : new_loc_spent});
	}

	else if(storeID == 31){
		new_loc_total = user.trips_31 + 1;
		new_loc_spent = user.spent_31 + trip.total;
		await User.updateOne({_id: user._id}, {trips_31 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_31 : new_loc_spent});
	}

	else if(storeID == 32){
		new_loc_total = user.trips_32 + 1;
		new_loc_spent = user.spent_32 + trip.total;
		await User.updateOne({_id: user._id}, {trips_32 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_32 : new_loc_spent});
	}

	else if(storeID == 33){
		new_loc_total = user.trips_33 + 1;
		new_loc_spent = user.spent_33 + trip.total;
		await User.updateOne({_id: user._id}, {trips_33 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_33 : new_loc_spent});
	}

	else if(storeID == 34){
		new_loc_total = user.trips_34 + 1;
		new_loc_spent = user.spent_34 + trip.total;
		await User.updateOne({_id: user._id}, {trips_34 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_34 : new_loc_spent});
	}

	else if(storeID == 35){
		new_loc_total = user.trips_35 + 1;
		new_loc_spent = user.spent_35 + trip.total;
		await User.updateOne({_id: user._id}, {trips_35 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_35 : new_loc_spent});
	}

	else if(storeID == 36){
		new_loc_total = user.trips_36 + 1;
		new_loc_spent = user.spent_36 + trip.total;
		await User.updateOne({_id: user._id}, {trips_36 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_36 : new_loc_spent});
	}

	else if(storeID == 37){
		new_loc_total = user.trips_37 + 1;
		new_loc_spent = user.spent_37 + trip.total;
		await User.updateOne({_id: user._id}, {trips_37 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_37 : new_loc_spent});
	}

	else if(storeID == 38){
		new_loc_total = user.trips_38 + 1;
		new_loc_spent = user.spent_38 + trip.total;
		await User.updateOne({_id: user._id}, {trips_38 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_38 : new_loc_spent});
	}

	else if(storeID == 39){
		new_loc_total = user.trips_39 + 1;
		new_loc_spent = user.spent_39 + trip.total;
		await User.updateOne({_id: user._id}, {trips_39 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_39 : new_loc_spent});
	}

	else if(storeID == 40){
		new_loc_total = user.trips_40 + 1;
		new_loc_spent = user.spent_40 + trip.total;
		await User.updateOne({_id: user._id}, {trips_40 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_40 : new_loc_spent});
	}

	else if(storeID == 42){
		new_loc_total = user.trips_42 + 1;
		new_loc_spent = user.spent_42 + trip.total;
		await User.updateOne({_id: user._id}, {trips_42 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_42 : new_loc_spent});
	}

	else if(storeID == 43){
		new_loc_total = user.trips_43 + 1;
		new_loc_spent = user.spent_43 + trip.total;
		await User.updateOne({_id: user._id}, {trips_43 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_43 : new_loc_spent});
	}

	else if(storeID == 44){
		new_loc_total = user.trips_44 + 1;
		new_loc_spent = user.spent_44 + trip.total;
		await User.updateOne({_id: user._id}, {trips_44 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_44 : new_loc_spent});
	}

	else if(storeID == 45){
		new_loc_total = user.trips_45 + 1;
		new_loc_spent = user.spent_45 + trip.total;
		await User.updateOne({_id: user._id}, {trips_45 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_45 : new_loc_spent});
	}

	else if(storeID == 46){
		new_loc_total = user.trips_46 + 1;
		new_loc_spent = user.spent_46 + trip.total;
		await User.updateOne({_id: user._id}, {trips_46 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_46 : new_loc_spent});
	}

	else if(storeID == 47){
		new_loc_total = user.trips_47 + 1;
		new_loc_spent = user.spent_47 + trip.total;
		await User.updateOne({_id: user._id}, {trips_47 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_47 : new_loc_spent});
	}

	else if(storeID == 48){
		new_loc_total = user.trips_48 + 1;
		new_loc_spent = user.spent_48 + trip.total;
		await User.updateOne({_id: user._id}, {trips_48 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_48 : new_loc_spent});
	}

	else if(storeID == 50){
		new_loc_total = user.trips_50 + 1;
		new_loc_spent = user.spent_50 + trip.total;
		await User.updateOne({_id: user._id}, {trips_50 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_50 : new_loc_spent});
	}

	else if(storeID == 51){
		new_loc_total = user.trips_51 + 1;
		new_loc_spent = user.spent_51 + trip.total;
		await User.updateOne({_id: user._id}, {trips_51 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_51 : new_loc_spent});
	}

	else if(storeID == 52){
		new_loc_total = user.trips_52 + 1;
		new_loc_spent = user.spent_52 + trip.total;
		await User.updateOne({_id: user._id}, {trips_52 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_52 : new_loc_spent});
	}

	else if(storeID == 53){
		new_loc_total = user.trips_53 + 1;
		new_loc_spent = user.spent_53 + trip.total;
		await User.updateOne({_id: user._id}, {trips_53 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_53 : new_loc_spent});
	}

	else if(storeID == 55){
		new_loc_total = user.trips_55 + 1;
		new_loc_spent = user.spent_55 + trip.total;
		await User.updateOne({_id: user._id}, {trips_55 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_55 : new_loc_spent});
	}

	else if(storeID == 57){
		new_loc_total = user.trips_57 + 1;
		new_loc_spent = user.spent_57 + trip.total;
		await User.updateOne({_id: user._id}, {trips_57 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_57 : new_loc_spent});
	}

	else if(storeID == 58){
		new_loc_total = user.trips_58 + 1;
		new_loc_spent = user.spent_58 + trip.total;
		await User.updateOne({_id: user._id}, {trips_58 : new_loc_total});
		await User.updateOne({_id: user._id}, {spent_58 : new_loc_spent});
	}
	// We realized after that we could (and should) have just used a regex lol
  
	let mostVisitedLocationTrips = user.most_visited_location_trips;
	let mostSpentLocationSpent = user.most_spent_location_spent;
  
	if (new_loc_total > mostVisitedLocationTrips) {
	  await User.updateOne({ _id: user._id }, { most_visited_location: req.body.location });
	  await User.updateOne({ _id: user._id }, { most_visited_location_spent: new_loc_spent });
	  await User.updateOne({ _id: user._id }, { most_visited_location_trips: new_loc_total });
	}
  
	if (new_loc_spent > mostSpentLocationSpent) {
	  await User.updateOne({ _id: user._id }, { most_spent_location: req.body.location });
	  await User.updateOne({ _id: user._id }, { most_spent_location_spent: new_loc_spent });
	  await User.updateOne({ _id: user._id }, { most_spent_location_trips: new_loc_total });
	}
  
  let original_most_item_category = user.most_item_category;
	let original_most_item_category_count = user.most_item_category_count || 0;
	let original_total_gas = user.total_gas || 0;
	let original_total_brisket = user.total_brisket || 0;
	let original_total_dessert = user.total_dessert || 0;
	let original_total_jerky = user.total_jerky || 0;
	let original_total_outdoor = user.total_outdoor || 0;
	let original_total_3rdparty = user.total_3rdparty || 0;
	let original_total_hotgrab = user.total_hotgrab || 0;
	let original_total_coldgrab = user.total_coldgrab || 0;
	let original_total_homegoods = user.total_homegoods || 0;
	
	if(req.body.didGas == true){
		let new_total_gas = original_total_gas + 1;
		await User.updateOne({_id: user._id}, {total_gas : new_total_gas});
		if(new_total_gas > original_most_item_category_count){
			await User.updateOne({_id: user._id}, {most_item_category : "Gas"});
			await User.updateOne({_id: user._id}, {most_item_category_count : new_total_gas});
		}
	}
	
	if(req.body.didBrisket == true){
		let new_total_brisket = original_total_brisket + 1;
		await User.updateOne({_id: user._id}, {total_brisket : new_total_brisket});
		if(new_total_brisket > original_most_item_category_count){
			await User.updateOne({_id: user._id}, {most_item_category : "Brisket"});
			await User.updateOne({_id: user._id}, {most_item_category_count : new_total_brisket});
		}
	}
	
	if(req.body.didDessert == true){
		let new_total_dessert = original_total_dessert + 1;
		await User.updateOne({_id: user._id}, {total_dessert : new_total_dessert});
		if(new_total_dessert > original_most_item_category_count){
			await User.updateOne({_id: user._id}, {most_item_category : "Dessert"});
			await User.updateOne({_id: user._id}, {most_item_category_count : new_total_dessert});
		}
	}
	
	if(req.body.didHomeGood == true){
		let new_total_homegoods = original_total_homegoods + 1;
		await User.updateOne({_id: user._id}, {total_homegoods : new_total_homegoods});
		if(new_total_homegoods > original_most_item_category_count){
			await User.updateOne({_id: user._id}, {most_item_category : "Home Goods"});
			await User.updateOne({_id: user._id}, {most_item_category_count : new_total_homegoods});
		}
	}
	if(req.body.didOutdoor == true){
		let new_total_outdoor = original_total_outdoor + 1;
		await User.updateOne({_id: user._id}, {total_outdoor : new_total_outdoor});
		if(new_total_outdoor > original_most_item_category_count){
			await User.updateOne({_id: user._id}, {most_item_category : "Outdoor"});
			await User.updateOne({_id: user._id}, {most_item_category_count : new_total_outdoor});
		}
	}
	
	if(req.body.didJerky == true){
		let new_total_jerky = original_total_jerky + 1;
		await User.updateOne({_id: user._id}, {total_jerky : new_total_jerky});
		if(new_total_jerky > original_most_item_category_count){
			await User.updateOne({_id: user._id}, {most_item_category : "Jerky"});
			await User.updateOne({_id: user._id}, {most_item_category_count : new_total_jerky});
		}
	}

  if(req.body.did3rdparty == true){
		let new_total_3rdparty = original_total_3rdparty + 1;
		await User.updateOne({_id: user._id}, {total_3rdparty : new_total_3rdparty});
		if(new_total_3rdparty > original_most_item_category_count){
			await User.updateOne({_id: user._id}, {most_item_category : "3rd Party"});
			await User.updateOne({_id: user._id}, {most_item_category_count : new_total_3rdparty});
		}
	}
	
	if(req.body.didColdGrab == true){
		let new_total_coldgrab = original_total_coldgrab + 1;
		await User.updateOne({_id: user._id}, {total_coldgrab : new_total_coldgrab});
		if(new_total_coldgrab > original_most_item_category_count){
			await User.updateOne({_id: user._id}, {most_item_category : "Cold Grab 'n Go"});
			await User.updateOne({_id: user._id}, {most_item_category_count : new_total_coldgrab});
		}
	}
	
	if(req.body.didHotGrab == true){
		let new_total_hotgrab = original_total_hotgrab + 1;
		await User.updateOne({_id: user._id}, {total_gas : new_total_hotgrab});
		if(new_total_hotgrab > original_most_item_category_count){
			await User.updateOne({_id: user._id}, {most_item_category : "Hot Grab 'n Go"});
			await User.updateOne({_id: user._id}, {most_item_category_count : new_total_hotgrab});
		}
	}
	
	if(req.body.didHomeGood == true){
		let new_total_homegoods = original_total_homegoods + 1;
		await User.updateOne({_id: user._id}, {total_homegoods : new_total_homegoods});
		if(new_total_homegoods > original_most_item_category_count){
			await User.updateOne({_id: user._id}, {most_item_category : "Home Goods"});
			await User.updateOne({_id: user._id}, {most_item_category_count : new_total_homegoods});
		}
	}

	//Unique "x out of y" counters per state being updated.
	//By this point, we have already added this trip into the individual stores' counters
	let uniqueCounter = 0;
	let stateTotal = 0;
	if(state == "AL"){
		if(user.trips_42 > 0)
			uniqueCounter++;
		if(user.trips_43 > 0)
			uniqueCounter++;
		if(user.trips_57 > 0)
			uniqueCounter++;
		if(user.trips_58 > 0)
			uniqueCounter++;
		await User.updateOne({_id: user._id}, {al_unique : uniqueCounter});
	}

	else if(state == "FL"){
		if(user.trips_46 > 0)
			uniqueCounter++;
		if(user.trips_47 > 0)
			uniqueCounter++;
		await User.updateOne({_id: user._id}, {fl_unique : uniqueCounter});
	}

	else if(state == "GA"){
		if(user.trips_51 > 0)
			uniqueCounter++;
		if(user.trips_52 > 0)
			uniqueCounter++;
		await User.updateOne({_id: user._id}, {ga_unique : uniqueCounter});
	}


	// Treating KY and SC just like the other states in case they ever get more than 1 location
	else if(state == "KY"){
		if(user.trips_55 > 0)
			uniqueCounter++;
		await User.updateOne({_id: user._id}, {ky_unique : uniqueCounter});
	}

	else if(state == "SC"){
		if(user.trips_53 > 0)
			uniqueCounter++;
		await User.updateOne({_id: user._id}, {sc_unique : uniqueCounter});
	}

	else if(state == "TN"){
		if(user.trips_45 > 0)
			uniqueCounter++;
		if(user.trips_50 > 0)
			uniqueCounter++;
		await User.updateOne({_id: user._id}, {tn_unique : uniqueCounter});
	}

	else if(state == "TX"){
		if(user.trips_14 > 0)
			uniqueCounter++;
		if(user.trips_13 > 0)
			uniqueCounter++;
		if(user.trips_21 > 0)
			uniqueCounter++;
		if(user.trips_25 > 0)
			uniqueCounter++;
		if(user.trips_28 > 0)
			uniqueCounter++;
		if(user.trips_34 > 0)
			uniqueCounter++;
		if(user.trips_3 > 0)
			uniqueCounter++;
		if(user.trips_32 > 0)
			uniqueCounter++;
		if(user.trips_39 > 0)
			uniqueCounter++;
		if(user.trips_24 > 0)
			uniqueCounter++;
		if(user.trips_48 > 0)
			uniqueCounter++;
		if(user.trips_37 > 0)
			uniqueCounter++;
		if(user.trips_7 > 0)
			uniqueCounter++;
		if(user.trips_8 > 0)
			uniqueCounter++;
		if(user.trips_16 > 0)
			uniqueCounter++;
		if(user.trips_40 > 0)
			uniqueCounter++;
		if(user.trips_1 > 0)
			uniqueCounter++;
		if(user.trips_2 > 0)
			uniqueCounter++;
		if(user.trips_29 > 0)
			uniqueCounter++;
		if(user.trips_23 > 0)
			uniqueCounter++;
		if(user.trips_17 > 0)
			uniqueCounter++;
		if(user.trips_26 > 0)
			uniqueCounter++;
		if(user.trips_44 > 0)
			uniqueCounter++;
		if(user.trips_22 > 0)
			uniqueCounter++;
		if(user.trips_19 > 0)
			uniqueCounter++;
		if(user.trips_20 > 0)
			uniqueCounter++;
		if(user.trips_12 > 0)
			uniqueCounter++;
		if(user.trips_31 > 0)
			uniqueCounter++;
		if(user.trips_38 > 0)
			uniqueCounter++;
		if(user.trips_35 > 0)
			uniqueCounter++;
		if(user.trips_36 > 0)
			uniqueCounter++;
		if(user.trips_33 > 0)
			uniqueCounter++;
		if(user.trips_18 > 0)
			uniqueCounter++;
		if(user.trips_30 > 0)
			uniqueCounter++;
		await User.updateOne({_id: user._id}, {tx_unique : uniqueCounter});
	}

  res.status(200).json({ message: "Trip saved successfully." });
});

module.exports = router;
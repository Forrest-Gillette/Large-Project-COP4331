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

  const locations = [
    { pattern: /, AL/, tripsKey: 'al_trips', storePatterns: [/#57 /, /#58 /, /#43 /, /#42 /] },
    { pattern: /, FL/, tripsKey: 'fl_trips', storePatterns: [/#47 /, /#46 /] },
    { pattern: /, GA/, tripsKey: 'ga_trips', storePatterns: [/#52 /, /#51 /] },
    { pattern: /, KY/, tripsKey: 'ky_trips', storePatterns: [] },
    { pattern: /, SC/, tripsKey: 'sc_trips', storePatterns: [] },
    { pattern: /, TN/, tripsKey: 'tn_trips', storePatterns: [/#50 /, /#45 /] },
    { pattern: /, TX/, tripsKey: 'tx_trips', storePatterns: [/#14 /, /#13 /, /#21 /, /#25 /, /#28 /, /#34 /, /#3 /, /#32 /, /#39 /, /#24 /, /#48 /, /#37 /, /#7 /, /#8 /, /#16 /, /#40 /, /#1 /, /#2 /, /#29 /, /#23 /, /#17 /, /#26 /, /#44 /, /#22 /, /#19 /, /#20 /, /#12 /, /#31 /, /#38 /, /#35 /, /#36 /, /#33 /, /#18 /, /#30 /] }
  ];

  for (const location of locations) {
    if (location.pattern.test(req.body.location)) {
      let trips = user[location.tripsKey] + 1;
      await User.updateOne({ _id: user._id }, { [location.tripsKey]: trips });

      for (const storePattern of location.storePatterns) {
        if (storePattern.test(req.body.location)) {
          storeID = parseInt(storePattern.exec(req.body.location)[0].substring(1));
          break;
        }
      }

      break;
    }
  }


  let newLocTotal = user[`trips_${storeID}`] + 1;
  let newLocSpent = user[`spent_${storeID}`] + trip.total;
  await User.updateOne({ _id: user._id }, { [`trips_${storeID}`]: newLocTotal });
  await User.updateOne({ _id: user._id }, { [`spent_${storeID}`]: newLocSpent });
  

  let mostVisitedLocation = user.most_visited_location;
  let mostVisitedLocationSpent = user.most_visited_location_spent;
  let mostVisitedLocationTrips = user.most_visited_location_trips;
  let mostSpentLocation = user.most_spent_location;
  let mostSpentLocationSpent = user.most_spent_location_spent;
  let mostSpentLocationTrips = user.most_spent_location_trips;

  if (newLocTotal > mostVisitedLocationTrips) {
    await User.updateOne({ _id: user._id }, { most_visited_location: req.body.location });
    await User.updateOne({ _id: user._id }, { most_visited_location_spent: newLocSpent });
    await User.updateOne({ _id: user._id }, { most_visited_location_trips: newLocTotal });
  }

  if (newLocSpent > mostSpentLocationSpent) {
    await User.updateOne({ _id: user._id }, { most_spent_location: req.body.location });
    await User.updateOne({ _id: user._id }, { most_spent_location_spent: newLocSpent });
    await User.updateOne({ _id: user._id }, { most_spent_location_trips: newLocTotal });
  }
  
  let original_most_item_category = User.most_item_category;
	let original_most_item_category_count = User.most_item_category_count || 0;
	let original_total_gas = User.total_gas || 0;
	let original_total_brisket = User.total_brisket || 0;
	let original_total_dessert = User.total_dessert || 0;
	let original_total_jerky = User.total_jerky || 0;
	let original_total_outdoor = User.total_outdoor || 0;
	let original_total_3rdparty = User.total_3rdparty || 0;
	let original_total_hotgrab = User.total_hotgrab || 0;
	let original_total_coldgrab = User.total_coldgrab || 0;
	let original_total_homegoods = User.total_homegoods || 0;
	
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

  res.status(200).json({ message: "Trip saved successfully." });
});

module.exports = router;
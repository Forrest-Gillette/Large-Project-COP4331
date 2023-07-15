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

  if (storeID !== 0) {
    // let newLocTotal = user[`trips_${storeID}`] + 1;
    // let newLocSpent = user[`spent_${storeID}`] + trip.total;
    await User.updateOne({ _id: user._id }, { [`trips_${storeID}`]: newLocTotal });
    await User.updateOne({ _id: user._id }, { [`spent_${storeID}`]: newLocSpent });
  }

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

  if (totalCost > mostSpentLocationSpent) {
    await User.updateOne({ _id: user._id }, { most_spent_location: req.body.location });
    await User.updateOne({ _id: user._id }, { most_spent_location_spent: totalCost });
    await User.updateOne({ _id: user._id }, { most_spent_location_trips: totalTrips });
  }

  res.status(200).json({ message: "Trip saved successfully." });
});

module.exports = router;

var _ = require('lodash');

var sera = require('sera');
var utils = sera.utils;

exports.allMakes = function (done) {
  sera.model('vehicle-makes').find({}).select('id title').exec(function (err, makes) {
    if (err) {
      return done(err);
    }
    makes = _.map(makes, utils.json);
    var makesById = _.keyBy(makes, 'id');
    sera.model('vehicle-models').find({}).select('id title make').exec(function (err, models) {
      if (err) {
        return done(err);
      }
      models = _.map(models, utils.json);
      models.forEach(function (model) {
        var make = makesById[model.make];
        var models = make.models || (make.models = []);
        models.push(model);
      });
      done(null, makes);
    });
  });
};

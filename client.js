var querystring;

querystring = function() {
  var k, pair, qs, v, _i, _len, _ref, _ref1;
  qs = {};
  _ref = window.location.search.replace("?", "").split("&");
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    pair = _ref[_i];
    _ref1 = pair.split("="), k = _ref1[0], v = _ref1[1];
    qs[k] = v;
  }
  return qs;
};

Meteor.startup(function() {

    if (!Session.get('currentVisit')) {

      var qs, tracking;

      // Parse query string
      qs = querystring();

      // If the url has an SID add the tracking variables
      if (qs.sid) {
        tracking = {
          sid: qs.sid,
          cmp: qs.cmp  ? qs.cmp : null,
          s1: qs.s1 ? qs.s1 : null,
          s2: qs.s2 ? qs.s2 : null,
          s3: qs.s3 ? qs.s3 : null,
          s4: qs.s4 ? qs.s4 : null,
          s5: qs.s5 ? qs.s5 : null
        };
      } else {
        tracking = {
          sid: VisitTracker.options.defaultSource
        };
      }

      Meteor.call('logVisit', tracking, Meteor.userId(), function(err, res) {
        //console.log('new visit', res);
        Session.set('currentVisit', res);
      });

    } else {
        //console.log("VisitorID", Visitor.id());
      //var visitorId = Visitor.id();
      Meteor.call('logReturnVisit', Session.get('currentVisit')._id, function(err, res) {
        //console.log('return visit', res);
      });


  }

});

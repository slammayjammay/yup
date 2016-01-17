Yup.Models.Review = Backbone.Model.extend({
  urlRoot: '/api/reviews',

  getTimeCreated: function () {
    if (this.get('created_at')) {
      return new Date(this.get('created_at'));
    } else {
      return this.get('time_created') * 1000;
    }
  },

  parse: function (res) {
    if (res.user) {
      this._user = new Yup.Models.User(res.user);
    }

    if (res.user.hash) {
      this._user = new Yup.Models.User(res.user.hash);
      this.isYelpReview = true;
    }

    return res;
  },

  user: function () {
    return this._user;
  }
});

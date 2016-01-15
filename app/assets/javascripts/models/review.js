Yup.Models.Review = Backbone.Model.extend({
  urlRoot: '/api/reviews',

  getTimeCreated: function () {
    if (this.isYupReview()) {
      return new Date(this.get('created_at'));
    } else {
      return this.get('time_created') * 1000;
    }
  },

  isYupReview: function () {
    if (!this._isYupReview) {
      this._isYupReview = this.get('created_at');
    }
    return this._isYupReview;
  }
});

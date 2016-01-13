Yup.Views.ReviewForm = Backbone.View.extend({
  className: "review-form begin",
  template: JST['reviews/form'],
  events: {
    "submit form": "save",
    "click button.close": "close"
  },

  initialize: function () {
    $('.backdrop').click(this.close.bind(this));
    setTimeout(function () {
      this.$el.removeClass('begin').addClass('end');
    }.bind(this), 200);
  },

  close: function (event) {
    if ($(event.target).attr('class') === 'backdrop' ||
        $(event.target).attr('class') === 'close') {
      event.preventDefault();
      this.exit();
    }
  },

  displayRating: function () {
    this.$("#input-id").rating();
  },

  exit: function () {
    this.$el.removeClass('end').addClass('begin');
    $('.backdrop').addClass('begin');
    $('.backdrop').one('transitionend', function () {
      $('.backdrop').remove();
      this.remove();
    }.bind(this));
  },

  parseErrors: function(response) {
    var $errors = this.$('ul').empty();
    if (response.responseJSON.excerpt) {
      var $error = $('<li class="">').text('Your review cannot be blank');
      $errors.append($error);
    }

    if (response.responseJSON.rating) {
      var $error = $('<li class="">').text('You need to give a rating');
      $errors.append($error);
    }

    setTimeout(function () {
      $errors.removeClass('begin');
    }, 0);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$('#input-id').on('rating.change', function (e, v, c) {
      this.rating = parseFloat(v);
    }.bind(this));

    this.displayRating();
    return this;
  },

  renderSuccess: function () {
    var $success = $('<div class="review-success">').text('Reviewed!');
    $('.business-show').append($success);

    setTimeout(function () {
      $success.css('opacity', 1);
    }, 0);

    setTimeout(function () {
      $success.css('opacity', 0);
      $success.one('transitionend', function () {
        $success.remove();
      });
    }, 3000);

    this.exit();
  },

  save: function (event) {
    event.preventDefault();
    var review = new Yup.Models.Review({ rating: this.rating });
    review.set('excerpt', this.$('textarea').val());
    review.set('business_id', this.model.get('id'));

    review.save({}, {
      success: function () {
        this.renderSuccess();
      //   this.model.fetch();
      //   this.remove();
      //   Backbone.history.navigate(
      //     "businesses/" + this.model.get('id'),
      //     { trigger: true }
      //   );
      }.bind(this),

      error: function (model, response) {
        this.parseErrors(response);
      }.bind(this)
    });
  }
});

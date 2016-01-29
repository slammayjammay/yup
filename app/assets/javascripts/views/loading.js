Yup.Views.Loading = Backbone.View.extend({
  className: 'loading',

  initialize: function (options) {
    this.text = options.text || 'Loading...';
    this.loopTransition();
  },

  createLetters: function () {
    for (var i = 0; i < this.text.length; i++) {
      var $letter = $('<div>').addClass('loading-letter').text(this.text[i]);

      if (this.text[i] === ' ') $letter.html('&nbsp');
      this.$el.append($letter);
    }
  },

  loopTransition: function () {
    this.createLetters();
    this.startTransition();
  },

  endTransition: function () {
    var loopTransition = this.loopTransition.bind(this);
    var $letters = this.$el.children();
    $letters.each(function (index, letter) {
      setTimeout(function () {
        $(letter).css('opacity', 0);
      }, (index + 1) * 100);

      if (index === $letters.length - 1) {
        $(letter).one('transitionend', function () {
          $('.loading').empty();
          loopTransition();
        });
      }
    });
  },

  startTransition: function () {
    var callback = this.endTransition.bind(this);
    var $letters = this.$el.children();
    $letters.each(function (index, letter) {
      setTimeout(function () {
        $(letter).css('margin-left', '0px');
        $(letter).css('opacity', 1);
      }, (index + 1) * 100);

      if (index === $letters.length - 1) {
        $(letter).one('transitionend', function () {
          setTimeout(callback, 0);
        });
      }
    });
  }
});

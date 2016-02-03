$(function () {
  $.ajax({
    type: 'GET',
    url: 'https://itunes.apple.com/US/rss/customerreviews/id=962679660/sortBy=mostRecent/json',
    dataType: 'json',
    success: function (results) {
      var reviews = results.feed.entry;
      reviews.forEach((review) => {
        if (!review.content) {
          return;
        }

        var rating = '';
        for (var i = 0; i < parseInt(review['im:rating'].label); i++) rating += '★';

        var element = `
          <div class="review">
            <h1>${review.author.name.label}</h1>
            <p>${review.content.label}</p>
            <span>${rating}</span>
          </div>
        `;

        $('#reviews').append(element);
      })
    }
  });
});

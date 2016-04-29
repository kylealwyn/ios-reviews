$(function () {

  let $hero = $('.hero'),
      $input = $('#app-id-input'),
      $submit = $('#app-id-submit'),
      $appMeta = $('#app-meta'),
      $appReviews = $('#app-reviews');

  function getReviews(id, cb) {
    $.get({
      url: `https://itunes.apple.com/US/rss/customerreviews/id=${id}/sortBy=mostRecent/json`,
      dataType: 'json',
      success(results) {
        cb(results);
      },
      error(err) {
        cb(err);
      }
    });
  }

  $submit.on('click', event => {
    event.preventDefault();
    let input = $input.val();
    if (!input) {
      return;
    }

    $submit.addClass('loading');

    getReviews(input, ({feed}) => {
      $appReviews.empty();
      console.log(feed);
      feed.entry.forEach((review, index) => {
        if (!review.content) {
          return;
        }

        let rating = '';
        for (let i = 0; i < parseInt(review['im:rating'].label); i++) {
          rating += '★';
        }

        $appReviews.append(`
          <div id="review-${index}" class="review">
            <h3 class="review-username">${review.author.name.label}</h3>
            <p>${review.content.label}</p>
            <span>${rating}</span>
          </div>
        `);

        $hero.addClass('hero-shrunk');
        $submit.removeClass('loading')
      })
    })
  })
});

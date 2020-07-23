let data = [{
  src: "https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/01_exotic_animals_tooltip/images/quetzal.jpg",
  alt: "quetzal",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus rutrum odio, in euismod lorem efficitur ac. Vestibulum varius, justo vehicula convallis viverra, est mi condimentum purus, non dignissim nisi urna vitae lorem. Nam interdum efficitur magna nec auctor. Nunc fringilla dui et quam tincidunt pulvinar. Nullam molestie enim quis vestibulum bibendum. Sed dapibus, metus nec tincidunt egestas, sem diam lobortis tellus, a pretium lacus felis sed magna",
}, {
  src: "https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/01_exotic_animals_tooltip/images/blackbuck.jpg",
  alt: "blackbuck",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus rutrum odio, in euismod lorem efficitur ac. Vestibulum varius, justo vehicula convallis viverra, est mi condimentum purus, non dignissim nisi urna vitae lorem. Nam interdum efficitur magna nec auctor. Nunc fringilla dui et quam tincidunt pulvinar. Nullam molestie enim quis vestibulum bibendum. Sed dapibus, metus nec tincidunt egestas, sem diam lobortis tellus, a pretium lacus felis sed magna",
}, {
  src: "https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/01_exotic_animals_tooltip/images/golden_pheasant.jpg",
  alt: "golden_pheasant",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus rutrum odio, in euismod lorem efficitur ac. Vestibulum varius, justo vehicula convallis viverra, est mi condimentum purus, non dignissim nisi urna vitae lorem. Nam interdum efficitur magna nec auctor. Nunc fringilla dui et quam tincidunt pulvinar. Nullam molestie enim quis vestibulum bibendum. Sed dapibus, metus nec tincidunt egestas, sem diam lobortis tellus, a pretium lacus felis sed magna",
}, {
  src: "https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/01_exotic_animals_tooltip/images/greater_bird_of_paradise.jpg",
  alt: "greater_bird_of_paradise",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus rutrum odio, in euismod lorem efficitur ac. Vestibulum varius, justo vehicula convallis viverra, est mi condimentum purus, non dignissim nisi urna vitae lorem. Nam interdum efficitur magna nec auctor. Nunc fringilla dui et quam tincidunt pulvinar. Nullam molestie enim quis vestibulum bibendum. Sed dapibus, metus nec tincidunt egestas, sem diam lobortis tellus, a pretium lacus felis sed magna",
}, {
  src: "https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/01_exotic_animals_tooltip/images/rainbow_lorikeet.jpg",
  alt: "rainbow_lorikeet",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus rutrum odio, in euismod lorem efficitur ac. Vestibulum varius, justo vehicula convallis viverra, est mi condimentum purus, non dignissim nisi urna vitae lorem. Nam interdum efficitur magna nec auctor. Nunc fringilla dui et quam tincidunt pulvinar. Nullam molestie enim quis vestibulum bibendum. Sed dapibus, metus nec tincidunt egestas, sem diam lobortis tellus, a pretium lacus felis sed magna",
}, {
  src: "https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/01_exotic_animals_tooltip/images/vampire_squid.jpg",
  alt: "vampire_squid",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus rutrum odio, in euismod lorem efficitur ac. Vestibulum varius, justo vehicula convallis viverra, est mi condimentum purus, non dignissim nisi urna vitae lorem. Nam interdum efficitur magna nec auctor. Nunc fringilla dui et quam tincidunt pulvinar. Nullam molestie enim quis vestibulum bibendum. Sed dapibus, metus nec tincidunt egestas, sem diam lobortis tellus, a pretium lacus felis sed magna",
}, {
  src: "https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/01_exotic_animals_tooltip/images/genet.jpg",
  alt: "genet",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus rutrum odio, in euismod lorem efficitur ac. Vestibulum varius, justo vehicula convallis viverra, est mi condimentum purus, non dignissim nisi urna vitae lorem. Nam interdum efficitur magna nec auctor. Nunc fringilla dui et quam tincidunt pulvinar. Nullam molestie enim quis vestibulum bibendum. Sed dapibus, metus nec tincidunt egestas, sem diam lobortis tellus, a pretium lacus felis sed magna",
}, {
  src: "https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/01_exotic_animals_tooltip/images/lined_butterflyfish.jpg",
  alt: "lined_butterflyfish",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus rutrum odio, in euismod lorem efficitur ac. Vestibulum varius, justo vehicula convallis viverra, est mi condimentum purus, non dignissim nisi urna vitae lorem. Nam interdum efficitur magna nec auctor. Nunc fringilla dui et quam tincidunt pulvinar. Nullam molestie enim quis vestibulum bibendum. Sed dapibus, metus nec tincidunt egestas, sem diam lobortis tellus, a pretium lacus felis sed magna",
}];

$(function() {
  $photos = $('#exotic_animals');
  let template = Handlebars.compile($('#photos').html());
  $photos.append(template({ photos: data }));
  let showCaption;

  $photos.on('mouseover', 'img', function(e) {
    let $img = $(e.target);
    $img.next().delay(2000).fadeIn();
    // showCaption = setInterval(function() {
    //   $img.next().toggle(true);
    // }, 2000);
  }).on('mouseleave', 'img', function(e) {
    let $img = $(e.target);
    $img.next().stop(true).fadeOut();
    // clearInterval(showCaption);
    // $img.next().toggle(false);
  });
});

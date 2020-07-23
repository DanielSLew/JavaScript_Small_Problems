$(function() {
  var cars = [
    { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
    { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
    { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
    { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
    { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
    { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
    { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
  ];

  const templates     = {};
  const $filters      = $('#filters');
  const $filter_boxes = $('#filter_boxes');
  const $cars         = $('#cars');
  const categories    = ['make', 'model', 'year', 'price'];

  $('[type="text/x-handlebars"]').each((i, template) => {
    let $tmpl = $(template);
    templates[$tmpl.attr('id')] = Handlebars.compile($tmpl.html());
  });

  Handlebars.registerPartial('car_template', $('#car_template').html());

  function getUniqueCategoryValues(cars, category) {
    let valuesUsed = [];

    cars.forEach(car => {
      if (!valuesUsed.includes(car[category])) {
        valuesUsed.push(car[category]);
      }
    });

    return { category, options: valuesUsed.map(v => ({ option: v })) }
  }

  function renderFilters(cars) {
    let filters = categories.reduce((filters, category) => {
      return filters + templates.filter_template(getUniqueCategoryValues(cars, category));
    }, '');

    $filter_boxes.html(filters);
  }

  function filterCars(filters) {
    return cars.filter(car => {
      return filters.every(filter => {
        let category = filter.name;
        return String(car[category]) === filter.value || filter.value === 'all';
      });
    });
  }

  function renderCars(filteredCars) {
    $cars.html(templates.cars_template({ cars: filteredCars }))    
  }

  $filters.on('submit', function(e) {
    e.preventDefault();
    renderCars(filterCars($filters.serializeArray()));
  });

  renderFilters(cars);
  renderCars(cars);

  function hideUnavailableOptions(options, values, filter) {
    let $selectedOption = filter.find(':selected');

    if (!values.includes($selectedOption.val())) {
        $selectedOption.attr('selected', false);
    }

    options.each((i, option) => {
      let $op = $(option);
      let opVal = $op.val();
      if (!values.includes(opVal)) $op.hide();
    });
  }

  $filters.on('input', 'select', function(e) {
    let filteredCars = filterCars($filters.serializeArray());

    categories.forEach((c, i) => {
      let $filter = $(`[name="${c}"]`);
      let options = $filter.find('option').show();
      let values = filteredCars.map(car => String(car[c])).concat('all');
      
      hideUnavailableOptions(options, values, $filter)
    });
  });
});

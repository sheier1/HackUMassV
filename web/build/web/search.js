/* global instantsearch */

app({
  appId: 'WR38GHZLH6',
  apiKey: 'b19491615fa2b7c47d0476dd30e5d876',
  indexName: 'studyspot',
});

function app(opts) {
  const search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true,
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Search for products',
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 10,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats',
    })
  );

  search.addWidget(
    instantsearch.widgets.sortBySelector({
      container: '#sort-by',
      autoHideContainer: true,
      indices: [{
        name: opts.indexName, label: 'Most relevant',
      }, {
        name: `${opts.indexName}_price_asc`, label: 'Closest Distance',
      }, {
        name: `${opts.indexName}_price_desc`, label: 'Farthest Distance',
      }],
    })
  );

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination',
      scrollTo: '#search-input',
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#category',
      attributeName: 'categories',
      sortBy: ['isRefined', 'count:desc', 'name:asc'],
      limit: 10,
      operator: 'or',
      templates: {
        header: getHeader('Category'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#name',
      attributeName: 'name',
      sortBy: ['isRefined', 'count:desc', 'name:asc'],
      limit: 10,
      operator: 'or',
      searchForFacetValues: {
        placeholder: 'Search by building name',
        templates: {
          noResults: '<div class="sffv_no-results">No matching building names.</div>',
        },
      },
      templates: {
        header: getHeader('Name'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.rangeSlider({
      container: '#distance',
      attributeName: 'distance',
      templates: {
        header: getHeader('Distance'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#noise',
      attributeName: 'noise',
      sortBy: ['isRefined', 'count:desc', 'name:asc'],
      limit: 10,
      operator: 'and',
      templates: {
        header: getHeader('Noise'),
      },
    })
  );

  search.start();
}

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getHeader(title) {
  return `<h5>${title}</h5>`;
}

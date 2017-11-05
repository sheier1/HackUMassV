/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const search = instantsearch({
appId: 'WR38GHZLH6',
        apiKey: 'b19491615fa2b7c47d0476dd30e5d876',
        indexName: 'studyspot',
        urlSync: true
        });
        search.start();
        search.addWidget(
                instantsearch.widgets.searchBox({
                container: '#search-input'
                })
                );
        search.addWidget(
                instantsearch.widgets.hits({
                container: '#hits',
                        hitsPerPage: 10,
                        templates: {
                        item: document.getElementById('hit-template').innerHTML,
                                empty: "We didn't find any results for the search<em>\"{{query}}\"</em>"
                        }
                })
                );
        
search.start();
        
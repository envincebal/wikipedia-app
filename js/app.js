$(document).ready(function () {
  // performs search when Enter key is pressed
  $(`.search-box`).submit(searching);
  // performs search when Search icon is clicked
  $(`.search-img`).click(searching);
  // opens up new window and displays random Wikipedia page
  $(`.random`).click(function () {
    window.open(`https://en.wikipedia.org/wiki/Special:Random`);
  })
});

const searching = (event) => {
  event.preventDefault();
  // user input is stored onto a constant
  const userInput = $(`.input`).val();
  // this is the wikipedia API endpoint
  const wikiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${userInput}&format=json&callback?`;
  const $results = $(`.result-items`);
  // clears search results when a new search is performed
  $results.html(``);

  if (userInput === ``) {
    $results.append(`<li id=error><h2 class=item-header>Please enter search inquiry</h2></li>`);
    return false;
  }

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: wikiUrl,
    success: (data) => {
      // iterates through each list item and appends wikipedia data from
      // user input
      for (let i = 0; i < data[1].length; i++) {
        $results.append(`<a class=item-link href=${data[3][i]}  target=_blank><li class=list-item><h2 class=item-header>${data[1][i]}  </h2><p class=summary>${data[2][i]}</p></li></a>`);
      }
    },
    error: () => {
      $results.append(`<li id=error><h2 class=item-header>Error! Could not retrieve data</h2></li>`);
    }
  });
}


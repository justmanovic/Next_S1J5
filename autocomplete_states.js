const search = document.querySelector("#search")
const matchList = document.querySelector("#match-list")

const searchStates = async (searchText) => {
  const res = await fetch('../data/states.json')
  const states = await res.json()
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, 'gi')
    return state.name.match(regex) || state.abbr.match(regex)
  })

  if (searchText.length === 0) {
    matches = []
    matchList.innerHTML = ''
  }
  outputHtml(matches)
}

const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches.map(match =>
      `<div class="card card-body mb-4">
        <h4>${match.name}(${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
        <small>lat: ${match.lat} / long: ${match.long}</small>
      </div>
      `).join('')
    matchList.innerHTML = html
  }
}

search.addEventListener("input", function () {
  return searchStates(search.value)
})
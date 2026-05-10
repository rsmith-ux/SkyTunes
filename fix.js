// fix.js — save next to index.html, then in index.html find the line:
//   <script>
// and add THIS LINE just before it:
//   <script src="fix.js"></script>
//
// ─────────────────────────────────────────────────────────────────────────────
// ROOT CAUSE: closeModal() references `similarReleases` and `selectedSimilarIdx`
// which are never declared anywhere. This throws a ReferenceError the moment
// the script block is parsed — so NONE of the app's functions ever register.
// That's why the whole UI is dead: openModal, renderCollection, everything.
// ─────────────────────────────────────────────────────────────────────────────

// Fix 1 — declare the missing variables before the main script runs
var similarReleases = [];
var selectedSimilarIdx = null;

// Fix 2 — the function lookupAlbum() calls but that never existed
function processItunesResult(result) {
  var year = result.releaseDate ? String(result.releaseDate).substring(0, 4) : '';
  var genres = (result.primaryGenreName && result.primaryGenreName !== 'Unknown')
    ? [result.primaryGenreName] : [];

  // pendingAlbumData is declared with `let` in the main script, so we can assign it
  pendingAlbumData = {
    id:      result.collectionId || Date.now(),
    title:   result.collectionName,
    artist:  result.artistName,
    year:    year,
    artUrl:  result.artworkUrl100 || '',
    genres:  genres,
    label:   result.label   || '',
    country: result.country || ''
  };

  var resultBox = document.getElementById('lookupResult');
  var inner     = document.getElementById('lookupResultInner');
  if (resultBox) resultBox.classList.add('show');
  if (inner) inner.innerHTML =
    '<img class="lookup-result-art" src="' + _esc(pendingAlbumData.artUrl) +
    '" onerror="this.style.display=\'none\'" alt="">' +
    '<div class="lookup-result-title">'  + _esc(pendingAlbumData.title)  + '</div>' +
    '<div class="lookup-result-artist">' + _esc(pendingAlbumData.artist) + '</div>' +
    '<div class="lookup-result-meta">'   + year +
      (genres.length ? ' · ' + genres.join(', ') : '') + '</div>' +
    '<div style="clear:both"></div>';

  showLookupStatus('\u2713 Found \u2014 review and add below', 'success');
  var btn = document.getElementById('addBtn');
  if (btn) btn.disabled = false;
}

function _esc(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

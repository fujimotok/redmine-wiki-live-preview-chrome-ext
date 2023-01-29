var gTimer = null;
const text = document.getElementById('content_text');
const preview = document.getElementById('preview_content_text');
const url = document.querySelector('div.jstTabs a.tab-preview').getAttribute('data-url')
const token = document.querySelector('meta[name="csrf-token"]').content

// プレビュー画面を更新する
const makePreveiw = () => {
  const method = 'POST';
  const body = 'text=' + encodeURIComponent(text.value) + '&';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'X-CSRF-Token': token
  };
  
  fetch(url, {
    method,
    headers,
    body
  })
    .then(response => response.body.getReader().read())
    .then(({done, value}) => {
      const decoder = new TextDecoder()
      preview.innerHTML = decoder.decode(value)
    });
}

// タイマー登録
text.addEventListener('input', () => {
  if (gTimer) {
    clearTimeout(gTimer);
  }
  gTimer = setTimeout(makePreveiw, 2000)
})


// 初回更新
makePreveiw()

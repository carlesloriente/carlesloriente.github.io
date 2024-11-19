var user = "carlesloriente"
var opts = 10

request('/users/' + user, function (res) {
  if (!res.public_repos) {
    console.log(res.message)
    console.log("hola")
    return
  }
  console.log(user)
  var pages = Math.ceil(res.public_repos / 100), i = pages, repos = []
  console.log(pages)
  while (i--) {
    request('/users/' + user + '/repos?per_page=100&page=' + (i + 1), check)
  }
  function check (res) {
    repos = repos.concat(res)
    pages--
    console.log("hola2")
    if (!pages) output(repos)
  }
})

function request (url, cb) {
  fetch('https://api.github.com', {
    method: 'GET',
    headers: {'User-Agent': 'GitHub StarCounter'}
  }, function (res) {
    var body = ''
    res
    .on('data', function (buf) {
      body += buf.toString()
    })
    .on('end', function () {
      cb(JSON.parse(body))
    })
  })
  console.log("hola3")

}

 
function output (repos) {
  var total = 0, longest = 0, list = repos
  .filter(function (r) {
    total += r.stargazers_count
    if (r.stargazers_count >= opts.thresh) {
      if (r.name.length > longest) {
        longest = r.name.length
      }
      return true
    }
  })
  .sort(function (a, b) {
    return b.stargazers_count - a.stargazers_count
  })

  if (list.length > opts.limit) {
    list = list.slice(0, opts.limit)
  }

  console.log('\nTotal: ' + total + '\n')
  console.log(list.map(function (r) {
    return r.name + new Array(longest - r.name.length + 4).join(' ') + '\u2605  ' + r.stargazers_count
  }).join('\n'))
}

function parseOpts (args) {
  var opts = {
    thresh: 1, limit: Infinity
  }
  args.forEach(function (a, i) {
    var next = args[i + 1]
    if (a === '-t') {
      opts.thresh = parseInt(next, 10) || 1
    } else if (a === '-l') {
      opts.limit = parseInt(next, 10) || Infinity
    }
  })
  return opts
}
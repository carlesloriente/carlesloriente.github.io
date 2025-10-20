source "https://rubygems.org"

gem "jekyll", "~> 4.4.0"
gem "json", ">= 2.7.1"
# NOTE: Check for indirect dependencies on the 'json' gem and update/remove them if possible.
gem "base64", "~> 0.2.0"
gem "bigdecimal"
gem "csv", "~> 3.3"
gem "faraday-retry", "2.3.0"
# gem "kramdown-parser-gfm", "~> 1.1.0" # REMOVED: rexml vulnerabilities (DoS, Resource Exhaustion, ReDoS, XML Entity Expansion)
gem "kramdown-syntax-coderay"
# gem "openssl" # Removed due to Covert Timing Channel vulnerability
gem "webrick", "1.8.2"
gem "ostruct"
gem "logger"

group :jekyll_plugins do
  gem "jekyll-debug"
  gem "jekyll-feed"
  gem "jekyll-last-modified-at"
  gem "jekyll-paginate"
  gem "jekyll-redirect-from"
  gem "jekyll-seo-tag"
  gem "jekyll-toc"
end

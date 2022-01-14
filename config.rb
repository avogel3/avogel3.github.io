# frozen_string_literal: true

# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = 'last 2 versions'
end

activate :livereload

activate :blog do |blog|
  blog.prefix = "blog"
  blog.permalink = "/{category}/{year}-{month}-{day}-{title}.html"
  blog.layout = "blog_layout"
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

helpers do
  def by_created_at
    -> (a, b) {
      Time.parse(b.created_at) <=> Time.parse(a.created_at)
    }
  end

  def blogs_and_tils
    (data.blogs + data.tils).sort(&by_created_at)
  end

  def tils
    data.tils.sort(&by_created_at)
  end
end

set :haml, { format: :html5 }
# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end

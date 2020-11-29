require 'middleman-gh-pages'


namespace :sync do 
  task :writing_contributions do 
    require 'nokogiri'
    require 'open-uri'
    require 'json'

    HASHROCKET_BLOGS_URL = "https://hashrocket.com/blog/rocketeers/andrew-vogel"
    HASHROCKET_TILS_URL = "https://til.hashrocket.com/authors/andrewvogel"

    doc = Nokogiri::HTML(URI.open(HASHROCKET_BLOGS_URL))
    blog_posts = doc.css('.blog-posts .post').map do |post|
      permalink = "https://hashrocket.com" + post.css('h3 a').first["href"]
      blog_page = Nokogiri::HTML(URI.open(permalink))
      created_at = (blog_page.css(".byline").first&.content || "").gsub("\n", " ").split(" ").last(3).join(" ")
      {
        title: post.css('h3').first&.content,
        category: post.css('.category_flag').first&.content,
        permalink: permalink,
        source: "Hashrocket Blog",
        created_at: created_at
      }
    end
    File.open('./data/blogs.json', "w+") { |f| f.write(blog_posts.to_json) }
    puts "Hashrocket Blog posts written to data file"

    doc = Nokogiri::HTML(URI.open(HASHROCKET_TILS_URL))
    hashrocket_tils = doc.css('article.post').map do |til|
      {
        title: til.css("section h1 a").first&.content,
        category: til.css("section aside ul li").first&.content&.strip&.slice(1..-1)&.capitalize,
        permalink: "https://til.hashrocket.com" + til.css('section h1 a').first["href"],
        source: "Hashrocket TIL",
        created_at: til.css("section footer time a").first&.content
      }
    end
    File.open('./data/tils.json', "w+") { |f| f.write(hashrocket_tils.to_json) }
    puts "Hashrocket TILS written to data file"
  end
end

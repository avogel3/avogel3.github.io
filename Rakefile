require "date"
require "middleman-gh-pages"
require "nokogiri"
require "open-uri"
require "json"
require "colorize"

HASHROCKET_TILS_URL = "https://til.hashrocket.com/authors/andrewvogel"
HASHROCKET_BLOGS_URL = "https://hashrocket.com/blog/rocketeers/andrew-vogel"

namespace :sync do
  namespace :hr do
    task :tils_to_file do
      doc = Nokogiri::HTML(URI.open(HASHROCKET_TILS_URL))
      new_tils = doc.css("article.post").map do |til|
        {
          title: til.css("section h1 a").first&.content,
          category: til.css("section aside ul li").first&.content&.strip&.slice(1..-1)&.capitalize,
          permalink: "https://til.hashrocket.com" + til.css("section h1 a").first["href"],
          source: "Hashrocket TIL",
          created_at: til.css("section footer time a").first&.content
        }
      end
      previous_tils = JSON.load_file("data/tils.json", {symbolize_names: true})

      hashrocket_tils = (new_tils + previous_tils).uniq do |til|
        _, _, slug = til[:permalink].partition("/posts/")
        slug.split("-").first
      end

      File.write("./data/tils.json", JSON.pretty_generate(hashrocket_tils))
      puts "Hashrocket TILS written to data file".green
    end

    task :blogs_to_file do
      doc = Nokogiri::HTML(URI.open(HASHROCKET_BLOGS_URL))
      blog_posts = doc.css(".blog-posts .post").map do |post|
        permalink = "https://hashrocket.com" + post.css("h3 a").first["href"]
        blog_page = Nokogiri::HTML(URI.open(permalink))
        created_at = (blog_page.css(".byline").first&.content || "").tr("\n", " ").split(" ").last(3).join(" ")
        {
          title: post.css("h3").first&.content,
          category: post.css(".category_flag").first&.content,
          permalink: permalink,
          source: "Hashrocket Blog",
          created_at: created_at
        }
      end
      File.write("./data/blogs.json", JSON.pretty_generate(blog_posts))
      puts "Hashrocket Blog posts written to data file".green
    end
  end

  task :_commit do
    `git add data/tils.json data/blogs.json`
    no_changes = `git diff --cached`.empty?
    if no_changes
      puts "Writing contributions are up to up to date, nothing to commit".yellow
      return
    end

    `git commit -m "chore: sync writing contributions on #{Date.today}"`

    puts "Committed contributions to version control! ".green
  end

  desc "Sync writing contributions from accross the web"
  task writing_contributions: ["hr:tils_to_file", "hr:blogs_to_file", "_commit"]
end

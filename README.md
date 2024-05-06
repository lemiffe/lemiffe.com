# Lemiffe.com

This is the Jekyll-based repository for lemiffe.com's page + blog archive; after migrating from Wordpress on a hosting provider, then Wordpress on a droplet in DigitalOcean, it seemed rather annoying to have a long-running process that is at the mercy of spikes and crawlers causing downtime due to the VM's low ram (1GB is not enough for a LAMP stack when a traffic spike occurs).

## Local Development

- `gem install bundler` (needs Ruby)
- `bundle install` (might need sudo)
  - If it fails try `sudo /usr/bin/ruby /usr/local/bin/bundle install --without production`
- `bundle exec jekyll serve --watch`

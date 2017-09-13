# VectorWiktor
## A Wikipedia-like Zim Wiki static site template

[Zim desktop wiki](http://zim-wiki.org/) template to generate a static website that is made to look similar to MediaWiki, the engine that runs Wikipedia.

Here is the template [demo](https://idmdepot.com) and [another demo](https://iamhow.com).

The template can be used as is. It has hardcoded references to wiki pages like "index" (home page), "Catalog" (auto generated list of all pages), "404" (error page), "Troubleshooting", "How To", "Technical Notes", "Tools and Scripts" (generic subcatalogs).
If you do not need/use all that you can simply ignore them.

The template also supports static site search, based on lunr, google analytics, disqus, source code syntax highlighting and a dynamic, client side, table of contents, but to get all that goodness going, you have to re-process the template a bit. More on this in the "setup" section. If you do not need all that, remove it off the template HTML code.

The CSS that it uses is shamelesly lifted off MediaWiki, simplified and trimmed a bit to fit a static site. The template itself only needs wiktor.html, wiktor/logo.png and wiktor/wiktor.css. Everything else is a nice to have.

## Setting it up
Get your favicons generated somewhere like [these guys](https://realfavicongenerator.net/) and replace the generic ones provided with the template. Save you 150x150 logo to wiktor/logo.png

Pre-process the template to replace generic values with your own values, for example

``` bash
SITE_URL=mycoolsite.com # name of the site inside your wiki notebook
SITE_FOLDER=mycoolsite.com # name of the folder inside your notebook folder (should probably match SITE_URL)
SITE_TITLE="The coolest site there is"
TEMPLATE=wiktor.html
NOTEBOOK_NAME=notebook.zim
NOTEBOOK_FOLDER=~/Documents/Zim/
DISQUS_URL=mycoolsite-com.disqus.com
GOOGLE_ANALYTICS_ID=UA-12312312

cp $TEMPLATE $STAGING_DIR/$TEMPLATE
sed -i "s/{SITE_URL}/$SITE_URL/g;s/{SITE_TITLE}/$SITE_TITLE/g;s/{DISQUS_URL}/$DISQUS_URL/g;s/{GOOGLE_ANALYTICS_ID}/$GOOGLE_ANALYTICS_ID/g" $STAGING_DIR/$TEMPLATE
```

Now export your site with Zim:
```
zim --export --recursive --overwrite --output=$STAGING_DIR/temp.html --format=html --root-url=/ --template=$STAGING_DIR/$TEMPLATE $NOTEBOOK_FOLDER/$NOTEBOOK_NAME $SITE_FOLDER
```

You should be good to go. I also do some post-processing, like HTML proofing, minifying, generating search index for lunr and building a sitemap for SEO, but all that is not required.

## It it responsive?
It looks ok on a small screen, but not yet made to scale.

## What's in the name?
It's a tribute to Anton Yelchin ('wictor wictor too'), Airplane! ('what's our vector Victor?'), and the fact that MediaWiki's default skin is named Vector.
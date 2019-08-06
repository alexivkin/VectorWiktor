# How to build lunr search and the sitemap

```bash
echo -e "\e[36mBuilding search...\e[39m"
node build-lunr-index.js $NOTEBOOK_FOLDER/$SITE_FOLDER $STAGING_DIR/searchIndex.json

echo -e "\e[36mBuilding sitemap...\e[39m"
node build-sitemap.js http://${SITE_URL}/ $STAGING_DIR $STAGING_DIR/sitemap.xml

```
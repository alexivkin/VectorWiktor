var sitemap = require('sitemap-static');
var fs = require('fs');

if (process.argv.length <= 4) {
    console.log("Usage: " + __filename + " <site> <source-folder> <output xml file>");
    process.exit(-1);
}

var site = process.argv[2];
var dir = process.argv[3];
var outf = process.argv[4];

var writer = fs.createWriteStream(outf);

sitemap(writer, {
    findRoot: dir,
    ignoreFile: '',
    prefix: site,
    pretty: false
}, function(err, data) {
    if(err) {
        return console.error(err);
    }
    // xml sitemap
    //console.log(data);
})

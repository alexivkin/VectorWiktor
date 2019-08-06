// Build lunr index
const lunr = require('lunr');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const progress = require('ascii-progress');

if (process.argv.length <= 3) {
    console.log("Usage: " + __filename + " <source zimwiki folder> <output index file>");
    process.exit(-1);
}

var dir = process.argv[2];
var outf = process.argv[3];

function readDirR(dir) {
    return fs.statSync(dir).isDirectory()
        ? Array.prototype.concat(...fs.readdirSync(dir).map(f => readDirR(path.join(dir, f))))
        : dir;
}

var files = readDirR(dir); // list files recursively
var entries = [];
var entry={};
var file;

var bar1 = new progress({
	schema: '  collecting [:bar.cyan] :percent :etas :current/:total',
    total: files.length, width: 20, filled: '='
})

// build entries from files
files.forEach(function(fn){
	if (fn.indexOf('.txt') == fn.length - 4) {
		entry.href="/"+fn.substr(dir.length,fn.length-dir.length-4)+".html"; // absolute links
		entry.title=fn.substr(dir.length,fn.length-dir.length-4).replace(/_/g,' ').replace(/\//g,': ');
		/*file=readline.createInterface({
			input: fs.createReadStream(fn)
		});
		entry.content="";
		file.on('line', function (line) {
  			entry.content+=line;
		});
		file.on('end', function (){
			entries.push(entry);
			entry={};
			file.close();
		});
		*/
		// file contents stripping zimwiki headers
		var filetext=fs.readFileSync(fn,'utf8').split('\n').filter(function stripZimHeaders(ln,lnum){
			return ln.lenght!=0 && (lnum > 4 || !(ln.startsWith("Content-Type") || ln.startsWith("Wiki-Format") || ln.startsWith("Creation-Date")));
		});
		// grab all headers, stipping them off the markup
		entry.toc=filetext.filter(line => { return line.startsWith('=') && line.endsWith('=')}).map(line => { return line.replace(/=+/g,'') }).join(' ')
		// grab contents
		entry.content=filetext.join(' ')
		entries.push(entry);
		entry={};
	}
	bar1.tick()
});

//console.log(entries[20])
//console.log(entries[90])
// this is a store with some document meta data to display
// in the search results.
var store = {};

var bar2 = new progress({
	schema: '    indexing [:bar.green] :percent :etas :current/:total',
    total: entries.length, width: 20, filled: '='
})
// create the index
var idx = lunr(function(){
    // boost increases the importance of words found in this field
    this.field('title', {boost: 10});
    this.field('toc', {boost: 5});
    this.field('content');
    // the id
    this.ref('href');
    var that=this;
	entries.forEach(function(entry){
		bar2.tick();
		that.add({
			href: entry.href,
			title: entry.title,
			toc: entry.toc,
	        content: entry.content
	    });
		store[entry.href] = {title: entry.title};
	});
});
fs.writeFileSync(outf, JSON.stringify({
    index: idx.toJSON(),
    store: store
}));

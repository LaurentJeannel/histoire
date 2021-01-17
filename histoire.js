exports.action = (data)=>{
console.log(data.histoire)
//https://singemp3.com/telechargement-mp3/15694257/le-lievre-et-la-tortue
var exec = require('child_process').exec;
var DataHistoire=data.histoire
var path = require('path');
var Histoire=[]
var cheerio = require('cheerio');
var  balcon= path.resolve('%CD%', './plugins/histoire/balcon/balcon.exe').replace('\\%CD%', '');
var  balcon1= path.resolve('%CD%', './plugins/histoire/balcon/balcon.exe').replace('\\%CD%', '');
compteurLecture=0
 	
if(DataHistoire=="0"){
	Histoire.push('hhh:'); JarvisIASound((Histoire))
	try{delete dd}
    catch(err){console.log(err);return}
	return
}
if(DataHistoire=="2"){ 
	Histoire.push('pause')
    JarvisIASound(Histoire)
	return
} //pause
if(DataHistoire=="3"){ 
	Histoire.push('restard')
    JarvisIASound(Histoire)	 
	return
} //reprise
if(DataHistoire=="1"){ 
  Histoire.push(path.resolve('%CD%', './plugins/histoire/sample/'+data.histoirechemin+'.mp3').replace('\\%CD%', ''))
  JarvisIASound(Histoire)
  return 
}

	
if(DataHistoire=="55"){

	//list voices
const { spawn } = require('child_process');
const bat = spawn(balcon1, ['-l']);
bat.stdout.on('data', (data) => {console.log(data.toString());});
bat.stderr.on('data', (data) => {console.error(data.toString());});
bat.on('exit', (code) => {console.log(`Child exited with code ${code}`);});

	var EPub = require("./epub");
	var livre=path.resolve('%CD%', './plugins/histoire/sample/'+data.histoirechemin+'.epub').replace('\\%CD%', '')
	var epub = new EPub(livre, "/imagewebroot/", "/articlewebroot/");

	epub.on("error", (err)=>{ console.log("ERROR\n-----");throw err;});

	epub.on("end", (err)=>{
  //  	console.log("METADATA:\n");
   		console.log(epub.metadata);

    //	console.log("\nSPINE:\n");
   		console.log(epub.flow);
console.log(epub.spine.contents.length,' chapitres');
var chapdepart=0 ; var nbchap=0
  for(var i=0;i<epub.spine.contents.length;i++){
  	//console.log()
  	if( (epub.spine.contents[i].id.search('chap')>-1) || (epub.spine.contents[i].id.search('Chap')>-1) || (epub.spine.contents[i].id.search('main')>-1) ){
  		nbchap=nbchap+1
  		console.log(epub.spine.contents[i].id+"  "+i+"  "+epub.spine.contents[i].id.search('chap'))
  	}
  	else{if(nbchap==0){chapdepart=chapdepart+1}}
  }//fin for

JarvisAskMe('il y a '+nbchap+' paragraphe , quel paragraphe veux tu ?',(result)=>{
	try{result=result.replace(new RegExp("[^0-9]", 'ig'),"");console.log(result,chapdepart)
	result=eval(result)+chapdepart-1
console.log(result)
//return
}
catch(err){return}
    // get first chapter
    	epub.getChapter(epub.spine.contents[result].id, (err, data)=>{
        	if(err){ console.log(err);return;}
		    $ = cheerio.load(data);
    		var $ = cheerio.load(data, { xmlMode: false, ignoreWhitespace: true, lowerCaseTags: true });
    		var a= $('p').text()
            console.log(a)
 			ab=a.split(".");console.log(ab.length)
		
dd=(ab,compteurLecture)=>{
 	var processb=balcon + ' -n "ScanSoft Virginie_Dri40_16kHz" -t "'+ab[compteurLecture]+'"'                    
	exec(processb,(err, stdout, stderr)=>{
		
		if (err) {console.error(err);return;}
		compteurLecture=compteurLecture+1
		console.log(" paragraphe "+compteurLecture+" sur "+ab.length)
		if(compteurLecture>ab.length){return}
		try{ dd(ab,compteurLecture) ; return}
		catch(err){return}
	});
}//fin fnct dd
//return
dd(ab,compteurLecture)
});//epub get chapter
})//fin askme
    
});//epub on end

epub.parse();
}//fin 55

}
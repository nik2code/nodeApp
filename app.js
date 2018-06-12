console.log('starting app.js');
const fs = require('fs');
 
const notes = require('./notes');
var yargs = require('yargs');
var argv = yargs.argv;

var command = argv._[0];// process.argv[2];

console.log('command : '+ command );
//console.log('yargs',argv);
if(command === 'add')
 { 
   var note = notes.addNote(argv.title,argv.body);
   if(note)
   {
       console.log('note created');
       notes.logNote(note);
   }
   else
        console.log('title taken');
}
else if (command == 'list')
{
   var allNotes = notes.listAll();
   console.log(`reading all ${allNotes.length} note(s)`);
   allNotes.forEach((note) => {
       notes.logNote(note);
   });
}
else if(command === 'read')
{
    var note = notes.read(argv.title);
    if(note )
    {
        console.log(note.title + ' found');
        notes.logNote(note);
    }
    else
       console.log(argv.title + ' not found');
}
else if(command === 'remove'){
   var removed = notes.remove(argv.title);
   var message = removed ? 'title removed' : 'title not found';
   console.log(message);
}
else{
    console.log('command not recognized');
}
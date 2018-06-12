console.log('starting notes.js');
const fs = require('fs');

var fetchNotes=()=>{
    try{
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
       }
       catch(ex){
        return [];
       }
};

var saveNotes=(notes)=>{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNote =(title,body)=>{
    console.log('adding note : ',title ,body);
    var notes = [];
    var note ={
        title,
        body
    };

    notes = fetchNotes();

    var duplicateNote = notes.filter((note)=> note.title === title);
    if(duplicateNote.length == 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}
var listAll =()=>{
    return fetchNotes();
}
var read =(title)=>{
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);

    return filteredNotes[0];
}
var remove =(title)=>{
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note)=> note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
}

var logNote =(note)=>{
    console.log('-------------------------');
    console.log(`Title : ${note.title}`);
    console.log(`Body  : ${note.body}`);
};

module.exports ={
    addNote,
    listAll,
    read,
    remove,
    logNote
}
var config = {
  baseURL: "https://skygear-demo.github.io/skypad",
  skygearAPIEndpoint: "https://skypad.skygeario.com/",
  skygearAPIKey: "ac59c61350b14227ad5a6114a40176ba",
  writerUser: "writer",
  writerPass: "writerpass"

}

var skygearPad = $("textarea#skypad")
const Note = skygear.Record.extend("Note");
var thisNote = null;
var ramdomToken = Math.random().toString(36).substring(7); // for distinguishing tabs

function createNote(){
  var note = new Note({content:""});
  return skygear.publicDB.save(note);
}

function saveNote(content) {
  thisNote['content'] = content;

  var toSaveNote = new Note({
    _id: thisNote.id,
    content: thisNote.content
  });
  skygear.publicDB.save(toSaveNote);
}

function fireSync(){
  if (thisNote) {
    skygear.pubsub.publish('note/'+thisNote._id, 
      {
        token: ramdomToken,
        content: skygearPad.val()
      });
    saveNote(skygearPad.val());
  }
}

function sync(data){
  if (data.token == ramdomToken) {
    return;
  }
  //console.log(data);
  skygearPad.val(data.content);
}

function loadExistingNote(noteId) {
  const query = new skygear.Query(Note);
  query.equalTo('_id', noteId);

  skygear.publicDB.query(query)
  .then(function (records) {
    if (records.length == 0) {
      console.log(`No Record for ${noteId}`);
      skygearPad.val(`❌ 404 not found.\n\nYou can create a new pad at ${config.baseURL}`);
      return;
    }

    const record = records[0];
    console.log("found!");
    
    skygear.on('note/'+record._id, sync);
    thisNote = record;

    skygearPad.val(record.content);
    
  } , function (error) {
    console.error(error);
  });

}

function configSkygear(apiEndpoint, apiKey) {
  skygear.config({
    'endPoint': apiEndpoint, // trailing slash is required
    'apiKey': apiKey,
  }).then(function (){
    skygear.loginWithUsername(config.writerUser, config.writerPass).then(function(user) {
      var noteId = getHashFromURL();
      if(noteId) {
        loadExistingNote(noteId)
      } else {
        createNote().then(function(note){
          console.log(note._id);
          thisNote = note;
          skygear.on('note/'+note._id, sync);
          window.location.hash = note._id;

          skygearPad.val('Welcome to Skypad!' +
           `\n😎Share with this URL ${config.baseURL}#${note._id}` + 
           '\n\nStart typing.');
          fireSync(null);
        });
      }

    });
  }, function(error) {
    console.error(error.message);
  });
}

function getHashFromURL(){
  var readNote = null;
  if(window.location.hash) {
    // Fragment exists
    readNote = window.location.hash.substr(1);
    console.log(readNote)
  }
  return readNote;
}

skygearPad.on("keypress", fireSync);


$().ready(function(){
  configSkygear(config.skygearAPIEndpoint, config.skygearAPIKey);
})
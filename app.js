const config = {
  baseURL: "https://skygear-demo.github.io/skypad",
  skygearAPIEndpoint: "https://skypad.skygeario.com/",
  skygearAPIKey: "ac59c61350b14227ad5a6114a40176ba",
  writerUser: "writer",
  writerPass: "writerpass"
}

var skygearPad = $("div#skypad-display");
var skygearTitle = $("div#skypad-title input");
var codeHighlightSelector = $(".code-highlight-selector");
const Note = skygear.Record.extend("Note");
var thisNote = null;
var ramdomToken = Math.random().toString(36).substring(7); // for distinguishing tabs

var cachedCode = '';


function createNote() {
  var note = new Note({
    title:"",
    content: "",
    viewcount: 0
  });
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

function updateTitleUI(title) {
  document.title = "Skypad - "+ title + " ";
}

function saveTitle(title) {
  thisNote['title'] = title;

  var toSaveNote = new Note({
    _id: thisNote.id,
    title: thisNote.title
  });
  skygear.publicDB.save(toSaveNote);
}

function increaseNoteCount(note) {
  var viewCount = note.viewcount;
  viewCount = (viewCount == undefined)? 0 :viewCount;
  var toSaveNote = new Note({
    _id: note.id,
    viewcount: viewCount + 1
  });
  skygear.publicDB.save(toSaveNote);
}

function fireSyncTitle(title) {
  if (thisNote) {
    skygear.pubsub.publish('note/' + thisNote._id, {
      token: ramdomToken,
      title: title
    });
    updateTitleUI(title);
    saveTitle(title);
  }
}


function fireSync(content) {
  if (thisNote) {
    skygear.pubsub.publish('note/' + thisNote._id, {
      token: ramdomToken,
      content: content
    });
    saveNote(content);
  }
}

function sync(data) {
  if (data.token === ramdomToken) {
    return;
  } else {
    if (data.content !== undefined) {
      cachedCode = data.content;
      flask.update(data.content);
    } else {
      syncTitle(data);
    }
  }
}

function syncTitle(data) {
  if (data.token === ramdomToken) {
    return;
  } else {
    skygearTitle.val(data.title);
  }
}

function loadExistingNote(noteId) {
  const query = new skygear.Query(Note);
  query.equalTo('_id', noteId);

  skygear.publicDB.query(query)
    .then(function(records) {
      if (records.length == 0) {
        console.log("No Record for " + noteId);
        flask.update(
          "// ❌ 404 not found.\n\nYou can create a new pad at " + config.baseURL
        );
        return;
      }

      const record = records[0];
      var noteURL = config.baseURL+"#"+record._id;

      increaseNoteCount(record);

      skygear.pubsub.on('note/' + record._id, sync);
      thisNote = record;

      flask.update(record.content);
      displaySharingOptions(noteURL);

      var titleText = record.title? record.title : "untitled";
      skygearTitle.val(titleText);
      updateTitleUI(titleText);

    }, function(error) {
      console.error(error);
    });
}

function configSkygear(apiEndpoint, apiKey) {
  skygear.config({
    'endPoint': apiEndpoint, // trailing slash is required
    'apiKey': apiKey,
  }).then(function() {
    skygear.auth.loginWithUsername(config.writerUser, config.writerPass).then(
      function(user) {
        var noteId = getHashFromURL();
        codeHighlightSelector.show();
        if (noteId) {
          loadExistingNote(noteId);
        } else {
          createNote().then(function(note) {
            var noteURL = config.baseURL + "#" + note._id;

            thisNote = note;
            skygear.pubsub.on('note/' + note._id, sync);
            window.location.hash = note._id;

            var initTitle = 'untitled';
            var initContent =  '// Welcome to Skypad!' +
              '\n// 😎 Share with this URL ' + noteURL +
              '\n\n// Start typing.';

              initContent += '\n\n// Now supports Syntax highlight. Uncomment the following lines to try:'+
'\n'+
'\n/*'+
'\nfunction hello(name) {'+
'\n    console.log(`hello ${name}!`);'+
'\n}'+
'\n'+
'\nhello(\'world\');'+
'\n*/';
            flask.update(initContent);
            skygearTitle.val(initTitle);
            displaySharingOptions(noteURL)
            fireSync(initContent);
            fireSyncTitle(initTitle);
          });
        }

      });
  }, function(error) {
    console.error(error.message);
  });
}

function getHashFromURL() {
  var readNote = null;
  if (window.location.hash) {
    // Fragment exists
    readNote = window.location.hash.substr(1);
  }
  return readNote;
}

function displaySharingOptions(noteURL) {
  var shareBarEl =  $("#share-bar");

  var shareURLEl = $("#share-url");
  var shareTwitterEl = $("#share-twitter");
  var shareFBEl = $("#share-fb");

  shareURLEl[0].href = noteURL;
  noteURL=noteURL.replace("#","%23");
  shareTwitterEl[0].href = shareTwitterEl[0].href.replace('{{note-url}}',noteURL);
  shareFBEl[0].href = shareFBEl[0].href.replace('{{note-url}}',noteURL);

  shareBarEl.show();
}

$().ready(function() {
  configSkygear(config.skygearAPIEndpoint, config.skygearAPIKey);
})

// Code highlight
   var flask = new CodeFlask;
    flask.run('#skypad-display', { language: 'javascript'});
    $('#code-highlight-caption').text("JavaScript");  
      flask.onUpdate(function(code) {
        if (cachedCode !== code) {
          cachedCode = code;
          fireSync(code);
        }

      skygearTitle.on("keyup change blur", function(e){
        var title = skygearTitle.val();
        fireSyncTitle(title);
      })
});

$(".code-highlight-selector ul li a").on("click touch", function(e) {
  var langChosen = e.target.dataset.lang;
  flask.run('#skypad-display', { language: langChosen});
  langChosen = (langChosen =="clike")? "C" : langChosen;
  $('#code-highlight-caption').text(langChosen);  
  flask.onUpdate(function(code) {
    if (cachedCode !== code) {
      cachedCode = code;
      fireSync(code);
    }
  });
})

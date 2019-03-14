const yargs = require("yargs");

// Create Version specification
yargs.version("1.1.0");

// Create Add new note
yargs.command({
  command: "add",
  describe: "Add New Note",
  handler: function() {
    console.log("New note is added");
  }
});

// Create Remove note
yargs.command({
  command: "remove",
  describe: "Remove note",
  handler: function() {
    console.log("Note removed");
  }
});

// Create List all notes
yargs.command({
  command: "list",
  describe: "All notes",
  handler: function() {
    console.log("See all notes as below");
  }
});

// Create Read note
yargs.command({
  command: "read",
  describe: "Read note",
  handler: function() {
    console.log("Read note");
  }
});

console.log(yargs.argv);

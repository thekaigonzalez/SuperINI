const superini = require("./index")
const fs = require("fs")
console.log(superini.compile_ini(fs.readFileSync(process.argv[2]).toString()))
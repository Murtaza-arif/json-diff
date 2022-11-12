# JSON Difference

you need to call findDifference method with following parameters
source: source json object
destination: destination json object
fieldMapping: a mapping of fields from source to destination
primaryKeymapping: a mapping of primary key from source to destination
recordMapping : a mapping of records id from source to destination

for example:

findDifference(
    { id: 1, name: "John", last: "Doe" },
     { "id": "a", "first_name": "John", "last_name": "Do" },
      {
    "name": "first_name",
    "last": "last_name"
},
 {
    "id": "id"
},
 {
    1: "a"
})

it will give you a object indicating
what is difference from source and destination
{ added: [], removed: [], edited: [ [ 'last_name', 'Doe', 'Do' ] ] }

# install dependency
npm i

# run the program

node .\index.js --source ./source.json --destination destination.json --fieldmapping .\fieldmapping.json --keymapping .\primarykeymapping.json --recordmapping .\recordmapping.json

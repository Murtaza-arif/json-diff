const { getDiff } = require('./core/get-diff')

function findDifference(source, destination, fieldMapping, primaryKeyMap, recordMapping) {

    let diff = getDiff(source, destination, fieldMapping, primaryKeyMap, recordMapping);
    return diff
}
findDifference({ id: 1, name: "John", last: "Doe" }, { "id": "a", "first_name": "John", "last_name": "Do" }, {
    "name": "first_name",
    "last": "last_name"
}, {
    "id": "id"
}, {
    1: "a"
})



// findDifference(
//     [
//         {
//             "id": 1,
//             "first_name": "John",
//             "last_name": "Doe",
//             "location": {
//                 "city": "Sunnyvale",
//                 "state": "California",
//                 "country": "USA",
//             },
//             "phone_numbers": [
//                 {
//                     "id": 1,
//                     "number": "1234567890",
//                     "type": "Home"
//                 },
//                 {
//                     "id": 2,
//                     "number": "2345678901",
//                     "type": "Mobile"
//                 }
//             ],
//             "email_addresses": [
//                 {
//                     "id": 1,
//                     "number": "john@doe.com",
//                     "type": "Home"
//                 },
//             ],
//         },
//         {
//             "id": 2,
//             "first_name": "First",
//             "last_name": "Last",
//             "location": {
//                 "city": "Bangalore",
//                 "state": "Karnataka",
//                 "country": "India"
//             },
//             "phone_numbers": [
//                 {
//                     "id": 3,
//                     "number": "3456789012",
//                     "type": "Home"
//                 },
//             ],
//             "email_addresses": [
//                 {
//                     "id": 2,
//                     "number": "first@last.com",
//                     "type": "Home"
//                 },
//             ],
//         }
//     ],
//     [
//         {
//             "id": "a",
//             "first": "John",
//             "last": "Doe",
//             "current_address": {
//                 "city_name": "Sunnyvale",
//                 "state_name": "California",
//                 "country_name": "USA",
//             },
//             "phones": [
//                 {
//                     "id": "a",
//                     "value": "1234567890",
//                     "type": "Home"
//                 },
//                 {
//                     "id": "b",
//                     "value": "2345678901",
//                     "type": "Mobile"
//                 }
//             ],
//             "emails": [
//                 {
//                     "id": "a",
//                     "value": "john@doe.com",
//                     "type": "Home"
//                 },
//             ],
//         },
//     ],
//     {
//         "first_name": "first",
//         "last_name": "last",
//         "location": "current_address",
//         "location.city": "current_address.city_name",
//         "location.state": "current_address.state_name",
//         "location.country": "current_address.country_name",
//         "phone_numbers": "phones",
//         "phone_numbers.number": "phones.value",
//         "phone_numbers.type": "phones.type",
//         "email_addresses": "emails",
//         "email_addresses.id": "emails.id",
//         "email_addresses.number": "emails.value",
//         "email_addresses.type": "emails.type"


//     },
//     {
//         "id": "id"
//     }
//     ,
//     {
//         1: "a"
//     }

// )
exports.findDifference = findDifference

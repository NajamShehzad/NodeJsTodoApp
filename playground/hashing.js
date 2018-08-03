const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data ={
    id:4
}


var token = jwt.sign(data,'t@24#nO%Las');
// jwt.verify
console.log(token);

// var message =  'my name is najam 3';
// var hash = SHA256(message).toString();
// var hash1 = SHA256(message).toString();

// var data = {
//     id:4,
//     name:"najam"
// };
// var token ={
//     data,
//     hash: SHA256(JSON.stringify(data) + '1234').toString()
// };


// var result = SHA256(JSON.stringify(token.data) + '1234').toString();

// if(result == token.hash){
//     console.log('Result is matched',result);
// }
// else{
//     console.log('Golamla hae bhai sb golmal hae');
    
// }


// console.log(hash == hash1);
// console.log(hash1);
function AddressBook() {
  this.contacts = [];
}

function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName;
}

// var myObject = {
//   cute: true,
//   age: 2
// }

// myObject.action() = function() {
//   alert('action!');
// } 

// myObject.action();
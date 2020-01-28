// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
  
}

Contact.prototype.addAddress = function(address) {
  this.addresses.push(address);
}
// Buisness Logic for Address --------------------------------------
function Address(address, addressType) {
  this.address = address;
  this.addressType = addressType;
}
///// User Interface Logic ---------------------------------------------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + " " + "</li>";
  });
  contactList.html(htmlForContactInfo);
}



function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  var htmlString = "";
  for (var i = 0; i < contact.addresses.length; i ++) {
    if (contact.addresses[i]) {
      if (contact.addresses[i].address === "") {
        var line = $("p#" + i + "")
        line.hide();
        console.log('second iffed')
      } else {
        htmlString += ('<p id="' + i +'">' + contact.addresses[i].addressType + ": " + contact.addresses[i].address + "</p>");
        console.log(contact.addresses[i].address)
      }
    } 
  }
  $(".address").html(htmlString);
  var buttons = $("div#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete Contact</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("div#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $('#formy').submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $('#new-first-name').val();
    var inputtedLastName = $('#new-last-name').val();
    var inputtedPhoneNumber = $('#new-phone-number').val();
    var inputtedEmail= $('#new-email').val();
    var inputtedAddress= $('#new-address').val();
    var addressType = $("select#address-type").val();
    var inputtedAddress2= $('#new-address2').val();
    var addressType2 = $("select#address-type2").val();
    var inputtedAddress3= $('#new-address3').val();
    var addressType3 = $("select#address-type3").val();


    var addresses = [ inputtedAddress, inputtedAddress2, inputtedAddress3];
    var type = [ addressType, addressType2, addressType3];
    
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);

    for (var i = 0; i < 3; i++) {
      var newAddress = new Address (addresses[i], type[i])
      newContact.addAddress(newAddress)
    }

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-address").val("");
    $("input#new-address2").val("");
    $("input#new-address3").val("");

    // var newAddress = new Address(inputtedAddress, addressType);
    // var newAddress2 = new Address(inputtedAddress2, addressType2);
    // var newAddress3 = new Address(inputtedAddress3, addressType3);
    // newContact.addAddress(newAddress);
    // newContact.addAddress(newAddress2);
    // newContact.addAddress(newAddress3);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})


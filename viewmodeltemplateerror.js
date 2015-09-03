/* global ViewModel */
/* global Meteor */
/* global Template */
if (Meteor.isClient) {
  // counter starts at 0
  
  Template.textInput.viewmodel(
    function (data) {
      // Returns a string so it will be used as the view model id
      return data.id;
    },
    function (data) {
      // Returns an object so it will be used as the view model itself
      return {
        // Use the label and text if they're set when you display the template
        label: data.label,
        text: data.text,
        error: function () {
          // Use the error from the template call, if none then use a default
          var msg = data.error || "Text cannot be empty";
          return !!this.text() ? "" : msg;
        }
      }
    }
    );

  Template.body.viewmodel({
    firstName: function () {
      return ViewModel.byId("body.firstName");
    },
    lastName: function () {
      return ViewModel.byId("body.lastName");
    },
    age: '',
    greeting: function () {
      // In this case we know the view models are going to be there
      // but you probably want to check for undefined first
      if (this.firstName().error() || this.lastName().error()) {
        return "Please fill out this form:"
      } else {
        return "Hello " + this.firstName().text() + " " + this.lastName().text();
      }
    },
    formJS: function() {
      return JSON.stringify(this.toJS());
    },
    formReset: function() {
      this.reset();      
    }
  });
}



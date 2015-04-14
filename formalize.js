/*
*****Formalize.js*****
Author : Vikram Sai Arsid
Date : 03/05/2015
CopyRight : 2015
This is the external javascript library for validating form fields and
storing data into local or session storage of browser depending on internat connectivity.
Please go through the arguments for function below for proper usage.
*/
( function(){

  //Constructor
  function Formalize(){
    if (!(this instanceof Formalize)) {
            return new Formalize();
        }

    return this;
  }

  Formalize.prototype.version = "1.0";
  Formalize.prototype.author = "Vikram Sai Arsid";

  //Name Validation
  Formalize.prototype.NameValidation = function(inputName){
    var namePattern = /^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$/;
    return (namePattern.test(inputName));
  };

  //Email Validation
  Formalize.prototype.EmailValidation = function(inputEmail){
    var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(inputEmail);
  };

  //SSN Validation
  Formalize.prototype.SSNValidation = function(inputSSN){
    var ssnPattern = /(\d{3}-\d{2}|\*{3}-\*{2})-\d{4}/;
    return (ssnPattern.test(inputSSN));
  };

  //Phone Number Validation
  Formalize.prototype.PhoneValidation = function(inputPhone){
    var phonePattern = /^\d{3}-?\d{3}-?\d{4}$/g;
    return (phonePattern.test(inputPhone));
  };

  //URL Validation
  Formalize.prototype.URLValidation = function(inputURL){
    var urlPattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;
    return (urlPattern.test(inputURL));
  };

  //Password Validation
  Formalize.prototype.PasswordValidation = function(inputPassword){
    var passwordPattern =/^(?=.[a-z]{2,})(?=.[A-Z]{3,})(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
    return (passwordPattern.test(inputPassword));
  };

  //Validate Password Strength

  Formalize.prototype.PasswordStrengthValidation = function(passwordElementById,progressElementById,showResultID){

    var score   = 0;
    var res = "";
    var txtpass = document.getElementById(passwordElementById).value;

    if (txtpass.length > 6 && txtpass.length < 24) {
    score+=20;
    }
    if ( ( txtpass.match(/^(.*?[A-Z]){3,}/) ) && ( txtpass.match(/^(.*?[a-z]){2,}/) ) )
    {
    score+=30;
    }

    if (txtpass.match(/\d+/)) {
    score+=20;
    }

    if ( txtpass.match(/^(?=.*[@#$%^&+=]).{2,3}$/) ) {
    //  alert("one");
    score+=10;
    }

    if ( txtpass.match(/^(?=.*[@#$%^&+=]).{3,5}$/) ) {
    //		alert("two");
    score+=20;
    }

    if ( txtpass.match(/^(?=.*[@#$%^&+=]).{5,}$/) ) {
    score+=30;
    //alert("three");
    }

    document.getElementById(progressElementById).value = score;

    if(score<=40)
    res = "Weak";
    else if(score<=60)
    res = "Good";
    else if(score<=80)
    res = "Strong";
    else
    res = "Excellent";
    document.getElementById( showResultID ).innerHTML = res;
    return score;
  };

  //Validate DOB
  Formalize.prototype.DOBValidation = function(inputDOB){
    var dobPattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return (dobPattern.test(inputDOB));
  };

  //Validate DOBTime
  Formalize.prototype.DOBTimeValidation = function(inputDOBT){
    var dobtPattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    var time = /^(2[0-3]|[01][0-9]):[0-5][0-9]$/;
    var spl = inputDOBT.split(" ");
    return (dobtPattern.test(spl[0]) && time.test(spl[1]));
  };

  //Validate Credit Card
  // Supports 'Visa', 'MasterCard', 'Discover', 'American Express', 'Diners Club', 'JCB'
  Formalize.prototype.CreditCardValidation = function(inputCC){
    var ccPattern = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;

    return (ccPattern.test(inputCC));
  };

  Formalize.prototype.confirmPassword =  function(originalPasswordID, confirmPasswordID, matchedID){
        var original = document.getElementById(originalPasswordID).value;
        var confirm = document.getElementById(confirmPasswordID).value;
        if(original === confirm ){
          document.getElementById(matchedID).innerHTML = "Password Matched";
        }
      };
//================================================================================================================================
//Function to store form data in to plain old javascript object
  Formalize.prototype.datastore = function(firstnameId,lastnameId,emailId,ssnId,phoneId,urlId,passwordById,strengthId,dobId,dobtId,ccnId){
    datastored = {
    'sessiondata': [],
    'state': true
  };
  datastored.sessiondata.push({ 'firstname':document.getElementById(firstnameId).value,'lastname':document.getElementById(lastnameId).value,'email':document.getElementById(emailId).value,'ssn':document.getElementById(ssnId).value,'phone':document.getElementById(phoneId).value,'url':document.getElementById(urlId).value,'password':document.getElementById(passwordById).value,
  'strength':document.getElementById(strengthId).value,'dob':document.getElementById(dobId).value,'dobt':document.getElementById(dobtId).value,'ccn':document.getElementById(ccnId).value });
  console.log(datastored);
  var jsondatas = toJSONString(datastored);
  saveToSessionStorage(jsondatas);
  console.log(jsondatas);
  return datastored;
  };

  function toJSONString(datastored){
    var jsondata = JSON.stringify(datastored)
    return jsondata;
  };

  function readFromJSONString(jsondata){
    var objectdata = JSON.parse(jsondata);
    return objectdata;
  };

  function saveToLocalStorage(jsondata){
    localStorage.setItem("formdata", jsondata);
  };

  function saveToSessionStorage(jsondata){
  sessionStorage.setItem("formdata", jsondata);
  };

  function readFromLocalStorage(jsondata){
    var restoredlocaldata = JSON.parse(localStorage.getItem("formdata"));
    return restoredlocaldata;
  };

  function readFromSessionStorage(jsondata){
    var restoredSessiondata = JSON.parse(sessionStorage.getItem("formdata"));
    return restoredSessiondata;
  };

  //===============================================================================================================================
  //Add to Local Storage
  Formalize.prototype.addToLocalStorage = function(key, valueObject){

         if(browserSupport()){
          if(key!=null){

          localStorage.setItem(key, valueObject );
          return true;
          }
          else{
            console.log("No Local Storage");
            return false;
          }

        }
  };

  // Remove from LocalStorage
  Formalize.prototype.removeFromLocalStorage = function(key){

         if(browserSupport()){
          if(key!=null){

          localStorage.removeItem(key);
          return true;
          }
          else{
            console.log("No Local Storage");
            return false;
          }

        }
  };

  //Helper Function to test if the browser has local storage
  function browserSupport(){
    try {
        localStorage.setItem("test", "test");
        console.log("In Browser Support");
        localStorage.removeItem("test");
        return true;
    } catch(e) {
      console.log(e);
        return false;
    }
  }

  // Formalize.prototype.setOffLineMessage = function(){
  window.addEventListener("offline", function(e){

    if(browserSupport()){
      datastoreds = {
      'Localdata': [],
      'state': true
    };
    datastoreds.Localdata.push({ 'firstname':document.getElementById("fname").value,'lastname':document.getElementById("lname").value,'email':document.getElementById("mail").value,'ssn':document.getElementById("ssn").value,'phone':document.getElementById("phone").value,
    'url':document.getElementById("url").value,'password':document.getElementById("password").value,'strength':document.getElementById("pstrength").value,'dob':document.getElementById("dob").value,'dobt':document.getElementById("dobt").value,
    'ccn':document.getElementById("ccn").value });
    console.log("datat" + datastoreds);
    var jsondatasl = toJSONString(datastoreds);
    saveToLocalStorage(jsondatasl);
    console.log(jsondatasl);
    return true;
    } else {
      console.log("No Local Storage");
      return false;
    }
    confirm("Network Disconnected, Your Data has been backed up");
    }, false);
  // };

  Formalize.prototype.setOnLineMessage  = function(){
        window.addEventListener("online", function(){confirm("Network Connected, You are online now");})
  };

  // If there is a window object, that at least has a document property,
    // instantiate and define chance on the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.Formalize = Formalize;
        window.Formalize = new Formalize();
        // window.Formalize.setOffLineMessage();
        window.Formalize.setOnLineMessage();
    }

})();//Self Invoking Function

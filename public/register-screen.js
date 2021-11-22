
const registerButton = document.querySelector(".registerButton"); 
const theInputOne = document.querySelector(".theInputOne"); 
const theInputTwo = document.querySelector(".theInputTwo");
const theInputThree = document.querySelector(".theInputThree");
const messageOne = document.querySelector(".messageOne");
const messageTwo = document.querySelector(".messageTwo");
const messageThree = document.querySelector(".messageThree");

registerButton.addEventListener('click', function() {

    //alert(theInputOne.value);
    //alert(theInputTwo.value);
    //alert(theInputThree.value);

    //alert("hello")

    messageOne.innerHTML = theInputOne.value;
    messageTwo.innerHTML = theInputTwo.value;
    messageThree.innerHTML = theInputThree.value;
    //messageTwo.innerHTML = theInputTwo.value;

}); 

function validateEmail(email) { 
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


function submit_on_click() {
    const input_email = document.getElementById("input-email")
    const input_subject = document.getElementById("input-subject")
    const input_text = document.getElementById("input-text")

    const warning_email = document.getElementById("warning-email")
    const warning_subject = document.getElementById("warning-subject")
    const warning_text = document.getElementById("warning-text")
    const warning_sent = document.getElementById("warning-sent")

    let is_valid = true
    
    warning_email.classList.add("invisible")
    warning_subject.classList.add("invisible")
    warning_text.classList.add("invisible")
    
    if(!validateEmail(input_email.value)) {
        warning_email.classList.remove("invisible")
        is_valid = false 
    } 
    if(input_subject.value.length < 4) {
        warning_subject.classList.remove("invisible")
        is_valid = false 
    }
    if(input_text.value.length < 20) {
        warning_text.classList.remove("invisible")
        is_valid = false
    }
    
    if(!is_valid) {
        return 
    }

    input_email.value = ""
    input_subject.value = ""
    input_text.value = ""

    warning_sent.classList.remove("invisible")

}





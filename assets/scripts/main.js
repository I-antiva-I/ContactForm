const requiredFields = [
    "first-name",
    "last-name",
    "email-address",
    "query-type",
    "message",
    "consent"
]


function onSubmitButtonPressed()
{
    console.log("[!] Submit Button Pressed");

    const form = document.getElementById("contact-form");
    const formData = new FormData(form);

    // Append missing field
    for (const field of requiredFields)
    {
        if (!formData.has(field))
        {
            formData.append(field, "")
        }
    }

    // Check fields
    let checkSum = 0;
    for (const [key, value] of formData.entries()) 
    {
        console.log(`${key}: ${value}`);

        const [checkResult, checkMessage] = checkInput(key, value);
        if (!checkResult)
        {
            changeHint(key, checkMessage, true);
            changeInput(key, true);
        }
        else
        {
            changeHint(key, "", false);
            changeInput(key, false);
        }

        checkSum += Number(checkResult)
    }

    if (requiredFields.length == checkSum)
    {
        console.log("[!] All is Good!");
        const popUp = document.getElementById("pop-up");
        popUp.style.display = "block";
    }
    else
    {
        console.log("[!] Some errors!");
    }

}

function changeHint(key, message, isVisible)
{
    try
    {
        const hint = document.getElementById("hint--"+key);
        hint.innerHTML = message;
        if (isVisible)
        {
            hint.classList.add("hint--visible");
        }
        else
        {
            hint.classList.remove("hint--visible");
        }
    }
    catch (exception)
    {
        console.log("[!] Exception: ", exception, "key", key);
    } 

}

function changeInput(key, isAlerted)
{
    try
    {
        const input = document.getElementById("input--"+key);
        if (isAlerted)
        {
            input.classList.add("input--alerted");
        }
        else
        {
            input.classList.remove("input--alerted");
        }
    }
    catch (exception)
    {
        console.log("[!] Exception: ", exception, "key", key);
    } 
}

function isEmpty(inputValue)
{
    return ((inputValue == null) || (inputValue == undefined) || (inputValue.trim() == ""))
}

function checkInput(inputKey, inputValue)
{
    switch (inputKey)
    {
        case "first-name":
        case "last-name":
        case "message":
            return isEmpty(inputValue) ? [false, "This field is required"] : [true, "OK"];

        case "query-type":
            return isEmpty(inputValue) ? [false, "Please select a query type"] : [true, "OK"];
 
        case "consent":
            return isEmpty(inputValue) ? [false, "To submit this form, please consent to being contacted"] : [true, "OK"];

        case "email-address":
            return isEmpty(inputValue) ? [false, "This field is required"] :
                isEmailValid(inputValue)  ?  [true, "OK"] : [false, "Please enter a valid email address"];

        default:
            return [true, "OK"];
    }
}

function isEmailValid(emailValue)
{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (emailPattern.test(emailValue))
}
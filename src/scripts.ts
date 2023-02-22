const $ = require('jquery');
// import $ from 'jquery';

$('body').append(`
    <div class="container">
    <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
            <h1>MD13 - jQuery Form with validation</h1>
            <form>
                <div class="mb-3">
                    <!-- NAME -->
                    <label for="input-name" class="form-label"
                        >Name</label
                    >
                    <input
                        type="text"
                        class="form-control"
                        id="input-name"
                        aria-describedby="aria-name"
                        autocomplete="off"
                    />
                    <div id="aria-name" class="form-text text-danger">
                    </div>
                    <!-- EMAIL -->
                    <label for="email-id" class="form-label"
                        >Email address</label
                    >
                    <input
                        type="email"
                        class="form-control"
                        id="email-id"
                        aria-describedby="aria-email"
                        autocomplete="off"
                    />
                    <div id="aria-email" class="form-text text-danger">
                    </div>
                    <label for="password-id" class="form-label"
                        >Password</label
                    >
                    <input
                        type="password"
                        id="password-id"
                        class="form-control"
                        aria-describedby="aria-passwd"
                    />
                    <div id="aria-passwd" class="form-text text-danger">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
            </form>
            <br>
            <h1 id="all-fields-valid" class="text-success"></h1>
        </div>
    </div>
</div>
`);

let allFieldsValid: boolean[] = [false, false, false];
// wait until page loaded
$(document).ready(function () {
    // jQuery button event
    $('button').click(function (e: any) {
        e.preventDefault();
        checkInput();
    });

    // enter event, disable realod
    $(document).on('keypress', function (e: any) {
        if (e.which == 13) {
            e.preventDefault();
            checkInput();
        }
    });

    function checkInput() {
        let name: any = $(`#input-name`).val();
        let email: any = $(`#email-id`).val();
        let passwrod: any = $(`#password-id`).val();
        // validate Name field
        let nameText;
        if (lettersOnlyCheck(name) == false && checkNameLength(name) == false) {
            nameText = 'Letters only, 2-50 characters!';
        } else if (lettersOnlyCheck(name) == false) {
            nameText = 'Letters only allowed!';
        } else if (checkNameLength(name) == false) {
            nameText = 'Min length 2 chars, max length 50 chars!';
        } else {
            nameText = '';
            allFieldsValid[0] = true;
        }
        $('#aria-name').text(nameText);

        // validate E-mail field
        let emailText;

        if (emailValidation(email) == false) {
            emailText = 'Email format is invalid!';
        } else {
            emailText = '';
            allFieldsValid[1] = true;
        }
        $('#aria-email').text(emailText);

        // validate Password field
        let passwordText;

        if (
            validatePasswordLength(passwrod) == false &&
            validatePasswordNumber(passwrod) == false &&
            validatePasswordSpecialChar(passwrod) == false
        ) {
            passwordText =
                'At least 8 characters long, contain at least 1 number and 1 special character (!, @, #, $, %, ^, &, *).';
        } else if (
            validatePasswordLength(passwrod) == false &&
            validatePasswordNumber(passwrod) == false
        ) {
            passwordText =
                'At least 8 characters long and should contain at least 1 number.';
        } else if (
            validatePasswordLength(passwrod) == false &&
            validatePasswordSpecialChar(passwrod) == false
        ) {
            passwordText =
                'At least 8 characters long and should contain 1 special character (!, @, #, $, %, ^, &, *).';
        } else if (
            validatePasswordNumber(passwrod) == false &&
            validatePasswordSpecialChar(passwrod) == false
        ) {
            passwordText =
                'Should contain at least 1 number and 1 special character (!, @, #, $, %, ^, &, *).';
        } else if (validatePasswordLength(passwrod) == false) {
            passwordText = 'Required min length 8 characters.';
        } else if (validatePasswordNumber(passwrod) == false) {
            passwordText = 'Must contain atleast 1 number.';
        } else if (validatePasswordSpecialChar(passwrod) == false) {
            passwordText =
                'Must contain at least 1 special character (!, @, #, $, %, ^, &, *).';
        } else {
            passwordText = '';
            allFieldsValid[2] = true;
        }
        $('#aria-passwd').text(passwordText);

        if (
            allFieldsValid[0] == true &&
            allFieldsValid[1] == true &&
            allFieldsValid[2] == true
        ) {
            $('#all-fields-valid').text('All form fields are valid!');
        }
    }
});

// Email validation
function emailValidation(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
}

// Name letters only, 2-50 chars
function lettersOnlyCheck(input: string): boolean {
    var letters = /^[a-zA-Z\s]+$/g;
    if (input.match(letters)) {
        return true;
    } else {
        return false;
    }
}

// Name length 2-50 chars
function checkNameLength(input: string) {
    if (input.length > 1 && input.length < 51) {
        return true;
    } else {
        return false;
    }
}

// Validate password length
function validatePasswordLength(input: string) {
    if (input.length >= 8) {
        return true;
    } else {
        return false;
    }
}

// Validate password num
function validatePasswordNumber(input: string) {
    var numbers = /[0-9]/g;
    if (input.match(numbers)) {
        return true;
    } else {
        return false;
    }
}

// Validate password special char
function validatePasswordSpecialChar(input: string) {
    var characters = /[!@#$%^&*]/g;
    if (input.match(characters)) {
        return true;
    } else {
        return false;
    }
}

export {validatePasswordSpecialChar, checkNameLength, validatePasswordLength};


export function handleValidation(editData, errors) {
    //lấy ngày hiện tại
    //Get DateTime Now
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const current = `${year}-${month}-${day}`;

    if (editData.editFullName == '') {
        errors.editFullName = "FullName must not be blank";
    } else {
        if (!/^[\p{L}\s']+$/u.test(editData.editFullName)) {
            errors.editFullName = "Name can not contain numbers or special characters ";
        } else {
            const length = editData.editFullName.length;
            if (length < 5 || length > 255) {
                errors.editFullName = "Length of fullname must be from 5 to 255";
            }
        }
    }

    if (editData.editBirthDay > current == true) {
        errors.editBirthDay = "BirthDay must be smaller than the current day";
    } else {
        const start = new Date(editData.editBirthDay);
        const end = new Date(current);
        const instance = Math.abs(end - start);
        const days = Math.floor(instance / (1000 * 60 * 60 * 24));
        if (days < 6570) {
            errors.editBirthDay = "User must be older than 18 years old";
        }
    }
}

export function handleValidationCreate(inputData, errors, emailList) {
    //lấy ngày hiện tại
    //Get DateTime Now
    console.log("Valid: " + inputData.inputEmail);
    console.log("Check: " + emailList);
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const current = `${year}-${month}-${day}`;

    if (inputData.inputFullName == '' || inputData.inputFullName == null || inputData.inputFullName == ' ') {
        errors.inputFullName = "FullName must not be blank";
    } else {
        const length = inputData.inputFullName.length;
        if (!/^[\p{L}\s']+$/u.test(inputData.inputFullName)) {
            errors.inputFullName = "Name can not contain numbers or special characters ";
        } else {
            if (length < 5 || length > 255) {
                errors.inputFullName = "Length of fullname must be from 5 to 255";
            }
        }
    }

    if (inputData.inputEmail == '') {
        errors.inputEmail = "Email must not be blank";
    } else {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputData.inputEmail)) {
            errors.inputEmail = "Email is wrong format";
        }
    }
    if (emailList.includes(inputData.inputEmail)) {
        console.log(emailList);
        errors.inputEmail = "Email has already registered";
    }

    if (inputData.inputBirthDay == '') {
        errors.inputBirthDay = "BirthDay must not be blank";
    } else if (inputData.inputBirthDay > current == true) {
        errors.inputBirthDay = "BirthDay must be smaller than the current day";
    } else {
        const start = new Date(inputData.inputBirthDay);
        const end = new Date(current);
        const instance = Math.abs(end - start);
        const days = Math.floor(instance / (1000 * 60 * 60 * 24));
        if (days < 6570) {
            errors.inputBirthDay = "User must be older than 18 years old";
        }
    }
}

export function handleValidationAddProject(inputData, errors, projectNames, shortNames) {
    if (inputData.inputProjectName == '' || inputData.inputProjectName == null || inputData.inputProjectName == ' ') {
        errors.inputProjectName = "Project Name must not be blank";
    }
    if (inputData.inputShortName == '' || inputData.inputShortName == null || inputData.inputShortName == ' ') {
        errors.inputShortName = "Short Name must not be blank";
    }
    if (projectNames.includes(inputData.inputProjectName)) {
        errors.inputProjectName = "Project Name has already existed";
    }
    // if (shortNames.includes(inputData.inputShortName)) {
    //     errors.inputShortName = "Short Name has already existed";
    // }
}

export function handleValidationEditProject(editData, errors, projectNames, shortNames) {
    if (editData.editProjectName == '' || editData.editProjectName == null || editData.editProjectName == ' ') {
        errors.editProjectName = "Project Name must not be blank";
    }
    if (editData.editShortName == '' || editData.editShortName == null || editData.editShortName == ' ') {
        errors.editShortName = "Short Name must not be blank";
    }
    if (projectNames.includes(editData.editProjectName)) {
        errors.editProjectName = "Project Name has already existed";
    }
    // if (shortNames.includes(editData.editShortName)) {
    //     errors.editShortName = "Short Name has already existed";
    // }
}


export function handleValidationEditComponent(editData, errors, componentNames) {
    if (editData.editComponentName == '' || editData.editComponentName == null || editData.editComponentName == ' ') {
        errors.editComponentName = "Component Name must not be blank";
    }
    if (componentNames.includes(editData.editComponentName)) {
        errors.editComponentName = "Component Name has already existed";
    }
}

export function handleValidationAddComponent(inputData, errors, componentNames) {
    if (inputData.inputComponentName == '' || inputData.inputComponentName == null || inputData.inputComponentName == ' ') {
        errors.inputComponentName = "Component Name must not be blank";
    }
    if (componentNames.includes(inputData.inputComponentName)) {
        errors.inputComponentName = "Component Name has already existed";
    }
}

export function handleValidationEditProduct(editData, errors, productNames) {
    if (editData.editProductName == '' || editData.editProductName == null || editData.editProductName == ' ') {
        errors.editProductName = "Product Name must not be blank";
    }
    if (productNames.includes(editData.editProductName)) {
        errors.editProductName = "Product Name has already existed";
    }
}

export function handleValidationAddProduct(inputData, errors, productNames) {
    if (inputData.inputProductName == '' || inputData.inputProductName == null || inputData.inputProductName == ' ') {
        errors.inputProductName = "Product Name must not be blank";
    }
    if (productNames.includes(inputData.inputProductName)) {
        errors.inputProductName = "Product Name has already existed";
    }
}

export function handleValidationChangePassword(editData, errors) {

    if (editData.editNewPassword.length >= 6) {
        if (!/[A-Z]/.test(editData.editNewPassword.charAt(0))) {
            errors.editNewPassword = 'Password must start with a capital letter';
        } else if (!/[a-zA-Z]/.test(editData.editNewPassword) || !/[0-9]/.test(editData.editNewPassword)) {
            errors.editNewPassword = 'Password must contain both letters and numbers';
        } else if (editData.editConfirmPassword == "" || editData.editConfirmPassword == null || editData.editConfirmPassword == " ") {
            errors.editConfirmPassword = 'Confirm password does not be blank';
        } else if (editData.editNewPassword != editData.editConfirmPassword) {
            errors.editConfirmPassword = 'Comfirm password does not match with new password';
        }
    } else {
        errors.editNewPassword = "Length of password must be equal or than 6"
    }

}
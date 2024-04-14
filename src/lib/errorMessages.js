 export default function errorMessage(error){
    let message = undefined

    
    if(error=="Firebase: Password should be at least 6 characters (auth/weak-password)."){
        message = "Password should be at least 6 characters.";
    }
    
    if(error == "Firebase: Error (auth/email-already-in-use).")
            message = "The email already exist";
    return message
 }
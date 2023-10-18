export function authUserValid({ error, user }: any) {
  const errMessage = {
    name: false,
    nameMessage: "",
    email: false,
    emailMessage: "",
    password: false,
    passwordMessage: "",
  };

  const err = Object.entries(error);
  let authErr: any = [];

  err.forEach((item) => {
    item.forEach((e) => {
      if (e === "code") {
        return (authErr = item);
      }
    });
  });

  

 
  if (user.password === '') {
    errMessage.password = true
    errMessage.passwordMessage = "Please enter the password"
  }
  authErr.forEach((e: string) => {
    if (e.includes("auth")) {
      if (e.includes("user")) {
        errMessage.email = true;
        errMessage.emailMessage = "User not found";
      } else if (e.includes("already")) {
        errMessage.email = true;
        errMessage.emailMessage = "This email already exists, please enter another email";
      } else if (e.includes("invalid")) {
        errMessage.email = true;
        if (user.email === "") {
          errMessage.emailMessage = "Please enter your email!";
        } else {
          errMessage.emailMessage = "Please enter the full email address!";
        }
      } else if (e.includes("wrong") || e.includes("weak")) {
        errMessage.password = true;
        if (user.password.length > 0 && user.password.length < 6) {
          errMessage.passwordMessage = "Password should be at least 6 characters long"
        } else {
          errMessage.passwordMessage = "Your password is incorrect";
        }
      } else if (e.includes("missing")) {
        errMessage.password = true;
        errMessage.passwordMessage = "Please enter the password!";
      } else if (user?.name.length == 0) {
        errMessage.name = true;
        errMessage.nameMessage = "Please enter a name!";
      }
    }
  });

  return errMessage;
}

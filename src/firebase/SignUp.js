import Firebase from './firebaseConfig';

export const SignUp = async (email, password) => {
  try {
    return await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password,
    );
  } catch (error) {
    return error;
  }
};

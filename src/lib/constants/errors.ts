export enum ErrorsEnum {
  LOGIN_BAD_CREDENTIALS = 'Bad credentials or the user is inactive.',
  LOGIN_USER_NOT_VERIFIED = 'The user is not verified.',
  VERIFY_USER_BAD_TOKEN = 'Bad token, not existing user ornot the e-mail currently set for the user.',
  VERIFY_USER_ALREADY_VERIFIED = 'The user is already verified.',
}

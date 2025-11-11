const REGEX = {
  CONTAINS: {
    ALPHABET: /^.*[A-Za-z].*$/,
    ALPHABET_SPACE: /^.*[A-Za-z ].*$/,
    LOWERCASE: /^.*[a-z].*$/,
    NUMBER: /^.*\d.*$/,
    SPECIAL_CHARACTER: /^.*[!@#$%^&*(),.?":{}|<>].*$/,
    UPPERCASE: /^.*[A-Z].*$/,
  },
  CRYPTO: /^[0-9]*[.,]?[0-9]{0,8}$/,
  ONLY: {
    ALPHABET: /^[A-Za-z]+$/,
    ALPHABET_SPACE: /^[A-Za-z ]+$/,
    LOWERCASE: /^[a-z]+$/,
    NUMBER: /^\d+$/,
    SPECIAL_CHARACTER: /^.*[!@#$%^&*(),.?":{}|<>].*$/,
    UPPERCASE: /^[A-Z]+$/,
  },
};

export default REGEX;
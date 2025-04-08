export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validatePassword = (password) => {
    // Мінімум 8 символів, принаймні одна літера та одна цифра
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };
  
  export const validateMilitaryUnit = (unit) => {
    // Перевірка формату військової частини
    const re = /^[А-ЩЬЮЯҐІЇЄ]{2}-\d{4}$/;
    return re.test(unit);
  };
  
  export const validateUsername = (username) => {
    // Від 3 до 20 символів, тільки літери, цифри та підкреслення
    const re = /^[a-zA-Z0-9_]{3,20}$/;
    return re.test(username);
  };
  
  export const validateRegistrationForm = (formData) => {
    const errors = {};
  
    if (!validateUsername(formData.username)) {
      errors.username = 'Некоректне ім\'я користувача';
    }
  
    if (!validateEmail(formData.email)) {
      errors.email = 'Некоректна електронна пошта';
    }
  
    if (!validatePassword(formData.password)) {
      errors.password = 'Пароль повинен містити мінімум 8 символів, літери та цифри';
    }
  
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Паролі не збігаються';
    }
  
    if (formData.militaryUnit && !validateMilitaryUnit(formData.militaryUnit)) {
      errors.militaryUnit = 'Некоректний формат військової частини';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
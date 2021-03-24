import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  ar: {
    translation: {
      "signin": "تسجيل دخول",
      "signup" : "تسجيل",
      "email": "بريد الكتروني:",
      "password": "كلمة السر:",
      "forgetPassword": "نسيت كلمة السر",
      "firstName":"الاسم الشخصي:",
      "lastName": "اسم العائلة:",
      "company": "نظام/شركة:",
      "phone": "هاتف:",
      "star": "يجب تعبئة المعلومات التي لديها نجمة",
      "buttonSignin": "دخول",
      "buttonSignup" : "تسجيل",
      "ownSuggestions" : "اقتراحات جديدة لي:",
      "updateSuggestions": "اقتراحات اعالجها:",
      "allSuggestions": "اقتراحات جديدة للجميع:",
      "date": "تاريخ",
      "parlamintary": "ادوات برلمانية",
      "subject": "الموضوع",
      "offer": "المقترح",
      "adoptionrejection":"قبول/رفض",
      "status": "الحالة"
    }
  },
  hb: {
    translation: {
      "signin": "כניסה",
      "signup": "הרשמה",
      "email": "דוא`ל:",
      "password": "סיסמה:",
      "forgetPassword": "שכחתי סיסמה",
      "firstName":"שם פרטי:",
      "lastName": "שם משפחה:",
      "company": "אירגון/חברה:",
      "phone": "טלפון:",
      "star": "חובה למלא פרטים המסומנים בכוכבית",
      "buttonSignin": "התחברות",
      "buttonSignup" : "הרשמה",
      "ownSuggestions" : "הצעות חדשות עבורי:",
      "updateSuggestions": "הצעות בטיפול:",
      "allSuggestions": "הצעות חדשות כללי:",
      "date": "תאריך",
      "parlamintary": "כלי פרלמנטרי",
      "subject": "נושא",
      "offer": "מציע",
      "adoptionrejection":"אימוץ/דחיה",
      "status": "עדכון סטטוס"
    }
  }
};
//هل يجب ترجمة الملاحظات التي تظهر تحت الكونتينر!ان تم تسجيل الشخص بنجاح او ان هناك خطا بمعلومات تسجيل الدخول
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "hb",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;

import { LevelData } from "../types";

export const LEVELS: LevelData[] = [
  {
    id: 1,
    title: "تهران: کافه نادری",
    description: "شروع سفر از پایتخت. اشیاء روزمره را در هیاهوی شهر پیدا کن.",
    mapCoordinates: { x: 52, y: 25 },
    categories: [
      { 
        id: "l1-sub1", title: "کالای خواب", color: "bg-indigo-300", 
        words: ["ملحفه", "بالش", "پتو", "تشک", "روتختی", "لحاف"],
        isSubCategory: true, transformsTo: "Bed", targetCategoryId: "l1-master"
      },
      { 
        id: "l1-sub2", title: "روشنایی", color: "bg-yellow-300", 
        words: ["لامپ", "کلید", "سرپیچ", "مهتابی", "لوستر", "فیوز"],
        isSubCategory: true, transformsTo: "Lamp", targetCategoryId: "l1-master"
      },
      { 
        id: "l1-master", title: "اتاق خواب", color: "bg-purple-400", 
        words: ["کمد", "آینه", "درایور", "فرش"], 
        isVisual: true, icon: "Home"
      },
      { id: "l1-c4", title: "لوازم تحریر", color: "bg-blue-200", words: ["مداد", "خودکار", "پاک‌کن", "تراش", "خط‌کش", "دفتر"] },
      { id: "l1-c5", title: "میوه‌های قرمز", color: "bg-red-300", words: ["هندوانه", "توت‌فرنگی", "گیلاس", "انار", "تمشک", "شاتوت"] },
      { id: "l1-c6", title: "حیوانات اهلی", color: "bg-green-300", words: ["گربه", "سگ", "گاو", "گوسفند", "اسب", "مرغ"] },
      { id: "l1-c7", title: "لباس‌های زمستانی", color: "bg-orange-300", words: ["کاپشن", "شال‌گردن", "کلاه", "دستکش", "پالتو", "بوت"] },
      { id: "l1-c8", title: "اعداد", color: "bg-teal-200", words: ["یک", "دو", "سه", "چهار", "پنج", "شش"] },
    ]
  },
  {
    id: 2,
    title: "گیلان: جنگل‌های هیرکانی",
    description: "باران و طبیعت شمال. شباهت‌ها را در دل جنگل پیدا کن.",
    mapCoordinates: { x: 35, y: 15 },
    categories: [
      { 
        id: "l2-sub1", title: "آب و هوا", color: "bg-sky-300", 
        words: ["باران", "برف", "تگرگ", "طوفان", "رعد", "مه"],
        isSubCategory: true, transformsTo: "CloudRain", targetCategoryId: "l2-master"
      },
      { 
        id: "l2-sub2", title: "گل‌ها", color: "bg-pink-300", 
        words: ["رُز", "یاس", "مریم", "نرگس", "محمدی", "سنبل"],
        isSubCategory: true, transformsTo: "Flower2", targetCategoryId: "l2-master"
      },
      { 
        id: "l2-master", title: "مناظر طبیعی", color: "bg-emerald-500", 
        words: ["کوه", "دشت", "دریا", "کویر"], 
        isVisual: true, icon: "Mountain"
      },
      { id: "l2-c4", title: "درختان جنگلی", color: "bg-emerald-300", words: ["بلوط", "راش", "کاج", "سرو", "چنار", "بید"] },
      { id: "l2-c5", title: "سنگ‌های قیمتی", color: "bg-indigo-300", words: ["الماس", "زمرد", "یاقوت", "فیروزه", "عقیق", "زبرجد"] },
      { id: "l2-c6", title: "سیارات", color: "bg-violet-300", words: ["مریخ", "زهره", "مشتری", "زحل", "عطارد", "نپتون"] },
      { id: "l2-c7", title: "اقیانوس‌ها", color: "bg-cyan-300", words: ["آرام", "اطلس", "هند", "خزر", "عمان", "مدیترانه"] },
      { id: "l2-c8", title: "فلزات", color: "bg-stone-300", words: ["آهن", "مس", "روی", "سرب", "آلومینیوم", "برنج"] },
    ]
  },
  {
    id: 3,
    title: "اصفهان: میدان نقش‌جهان",
    description: "شهر گنبدهای فیروزه‌ای. هنر و معماری را به هم متصل کن.",
    mapCoordinates: { x: 55, y: 55 },
    categories: [
      { 
        id: "l3-sub1", title: "موسیقی", color: "bg-rose-300", 
        words: ["تار", "سه تار", "سنتور", "کمانچه", "دف", "نی"],
        isSubCategory: true, transformsTo: "Music", targetCategoryId: "l3-master"
      },
      { 
        id: "l3-sub2", title: "عکاسی", color: "bg-zinc-300", 
        words: ["لنز", "شاتر", "دیافراگم", "ایزو", "فلاش", "سه پایه"],
        isSubCategory: true, transformsTo: "Camera", targetCategoryId: "l3-master"
      },
      { 
        id: "l3-master", title: "کارگاه هنر", color: "bg-fuchsia-400", 
        words: ["بوم", "قلم‌مو", "پالت", "سه پایه"], 
        isVisual: true, icon: "Palette"
      },
      { id: "l3-c4", title: "شاعران", color: "bg-yellow-200", words: ["حافظ", "سعدی", "مولانا", "فردوسی", "خیام", "عطار"] },
      { id: "l3-c5", title: "سبک نقاشی", color: "bg-purple-300", words: ["رئالیسم", "کوبیسم", "سوررئال", "امپرسیون", "مدرن", "کلاسیک"] },
      { id: "l3-c6", title: "سینما", color: "bg-gray-400", words: ["دوربین", "تدوین", "بازیگر", "کارگردان", "پلان", "سکانس"] },
      { id: "l3-c7", title: "دستگاه‌ها", color: "bg-orange-300", words: ["شور", "ماهور", "همایون", "نوا", "چهارگاه", "سه گاه"] },
      { id: "l3-c8", title: "صنایع دستی", color: "bg-teal-300", words: ["قالی", "گلیم", "میناکاری", "خاتم", "منبت", "ترمه"] },
    ]
  },
  {
    id: 4,
    title: "یزد: بادگیرها",
    description: "شهر خشت و منطق. ساختارها را در کویر پیدا کن.",
    mapCoordinates: { x: 68, y: 65 },
    categories: [
      { 
        id: "l4-sub1", title: "اشکال هندسی", color: "bg-violet-400", 
        words: ["مربع", "دایره", "مثلث", "لوزی", "بیضی", "ذوزنقه"],
        isSubCategory: true, transformsTo: "Shapes", targetCategoryId: "l4-master"
      },
      { 
        id: "l4-sub2", title: "ورزش", color: "bg-yellow-400", 
        words: ["فوتبال", "والیبال", "بسکتبال", "هندبال", "راگبی", "تنیس"],
        isSubCategory: true, transformsTo: "Trophy", targetCategoryId: "l4-master"
      },
      { 
        id: "l4-master", title: "منطق ساختار", color: "bg-blue-500", 
        words: ["تخته", "نیمکت", "گچ", "ماژیک"], 
        isVisual: true, icon: "Home" 
      },
      { id: "l4-c4", title: "احساسات", color: "bg-red-200", words: ["شادی", "امید", "عشق", "آرامش", "غرور", "اشتیاق"] },
      { id: "l4-c5", title: "واحدها", color: "bg-blue-300", words: ["متر", "لیتر", "گرم", "ثانیه", "آمپر", "ژول"] },
      { id: "l4-c6", title: "عناصر", color: "bg-orange-400", words: ["آب", "باد", "خاک", "آتش", "اثیری", "هوا"] }, 
      { id: "l4-c7", title: "ادبیات", color: "bg-emerald-300", words: ["حماسی", "غنایی", "تعلیمی", "درام", "کمدی", "تراژدی"] },
      { id: "l4-c8", title: "علوم", color: "bg-cyan-200", words: ["فیزیک", "شیمی", "زیست", "ریاضی", "نجوم", "زمین"] },
    ]
  },
  {
    id: 5,
    title: "شیراز: تخت جمشید",
    description: "پایتخت فرهنگ و تمدن. پایان سفر در شهر راز.",
    mapCoordinates: { x: 60, y: 80 },
    categories: [
      { 
        id: "l5-sub1", title: "پول و عیدی", color: "bg-green-400", 
        words: ["ریال", "دلار", "یورو", "پوند", "لیر", "ین"],
        isSubCategory: true, transformsTo: "Banknote", targetCategoryId: "l5-master"
      },
      { 
        id: "l5-sub2", title: "هفت سین", color: "bg-red-400", 
        words: ["سیب", "سمنو", "سنجد", "سیر", "سرکه", "سماق"],
        isSubCategory: true, transformsTo: "Apple", targetCategoryId: "l5-master"
      },
      { 
        id: "l5-master", title: "سفره نوروز", color: "bg-rose-500", 
        words: ["آینه", "قرآن", "ماهی", "سبزه"], 
        isVisual: true, icon: "Flower2"
      },
      { id: "l5-c4", title: "شیر", color: "bg-amber-100", words: ["جنگل", "پاکت", "آب", "خوراکی", "شجاع", "سلطان"] }, 
      { id: "l5-c5", title: "گل دخترانه", color: "bg-pink-200", words: ["لادن", "شقایق", "بنفشه", "نیلوفر", "یاسمن", "ارغوان"] },
      { id: "l5-c6", title: "پسوندها", color: "bg-purple-200", words: ["ستان", "زار", "دان", "کده", "آباد", "سرا"] },
      { id: "l5-c7", title: "نگارش", color: "bg-gray-300", words: ["نقطه", "ویرگول", "دوتقطه", "گیومه", "پرانتز", "خط‌تیره"] },
      { id: "l5-c8", title: "برنج", color: "bg-yellow-100", words: ["کته", "آبکش", "دمپخت", "شیربرنج", "پلو", "چلو"] },
    ]
  }
];

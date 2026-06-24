import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Lang = 'en' | 'ar';

interface LangContextType {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  toggleLang: () => void;
  t: (key: string) => string | Record<string, string>;
}

const translations: Record<Lang, Record<string, string | Record<string, string>>> = {
  en: {
    // Nav
    'nav.places': 'Places',
    'nav.experiences': 'Experiences',
    'nav.photographers': 'Photographers',
    'nav.itineraries': 'Itineraries',
    'nav.deals': 'Deals',
    'nav.guides': 'Guides',
    'nav.login': 'Sign In',
    'nav.home': 'Home',
    'nav.cta': 'Book a Photographer',
    'nav.lang': 'AR',
    'top.note': 'The honest Dubai guide: curated places, real experiences and professional photographers.',

    // Hero
    'hero.badge': '50,000+ Experiences Booked',
    'hero.title': 'Discover \u0026 Book Unforgettable',
    'hero.titleSpan': 'Dubai Experiences',
    'hero.subtitle': 'Professional photography, luxury adventures, and carefully selected local services — all in one place.',
    'hero.primary': 'Explore Experiences',
    'hero.secondary': 'Become a Partner',

    // Search
    'search.what': 'What are you looking for?',
    'search.photo': 'Professional photographer',
    'search.place': 'Place to visit',
    'search.experience': 'Travel experience',
    'search.itinerary': 'Trip itinerary',
    'search.area': 'Area',
    'search.budget': 'Budget',
 'budget.value': 'Value',
    'budget.mid': 'Balanced',
    'budget.luxury': 'Luxury',
    'search.btn': 'Search',

    // Browse by mood
    'mood.eyebrow': 'Browse by Mood',
    'mood.title': 'Not every traveler wants the same Dubai.',
    'mood.subtitle': 'Choose your trip style: luxury, family, quiet gems, desert, food or photography.',
    'mood.luxury': 'Luxury Dubai',
    'mood.luxuryDesc': 'Hotels, yachts, restaurants and refined experiences',
    'mood.hidden': 'Hidden Gems',
    'mood.hiddenDesc': 'Quieter corners with local soul',
    'mood.desert': 'Desert Adventures',
    'mood.desertDesc': 'Sunset, safari and private dinner',
    'mood.photo': 'Photography Spots',
    'mood.photoDesc': 'The best angles for premium images',

    // Photographers
    'photo.eyebrow': 'Professional Photography Marketplace',
    'photo.title': 'A local photographer marketplace, clear and easy to book.',
    'photo.whatsapp': 'Contact via WhatsApp',
    'photo.basic': 'Basic',
    'photo.standard': 'Standard',
    'photo.premium': 'Premium',
    'photo.pkgBasic': '45 min / 20 photos',
    'photo.pkgStandard': '90 min / 45 photos',
    'photo.pkgPremium': '3 hours / 90 photos',
    'photo.portfolio': 'View Portfolio',
    'photo.book': 'Book Session',

    // Photo Spots
    'spots.eyebrow': 'Best Photo Spots in Dubai',
    'spots.title': 'Iconic Locations for Unforgettable Photos',
    'spots.spot1': 'Burj Khalifa',
    'spots.spot1Desc': 'Best at sunrise or before sunset for a calmer visit and better photos.',
    'spots.spot2': 'Dubai Marina',
    'spots.spot2Desc': 'A stunning waterfront skyline that shines brightest after dark.',
    'spots.spot3': 'Old Dubai',
    'spots.spot3Desc': 'The abra ride and old markets show a simpler, more honest Dubai.',
    'spots.spot4': 'Desert Dunes',
    'spots.spot4Desc': 'Golden sands at sunset create the most magical photo backdrop.',
    'spots.bookBtn': 'Book Photographer',

    // Experiences
    'exp.eyebrow': 'Curated Experiences',
    'exp.title': 'Beautiful experiences without the tourist-trap feeling.',
    'exp.viewAll': 'View All',
    'exp.bookNow': 'Book Now',
    'exp.from': 'From',
    'exp.exp1.badge': 'Most Visited',
    'exp.exp1.title': 'Burj Khalifa — At the Top',
    'exp.exp1.desc': 'Touch the horizon and capture the most beautiful sunset from the tallest point on earth.',
    'exp.exp1.price': '149',
    'exp.exp2.badge': 'Family',
    'exp.exp2.title': 'Dubai Aquarium — Underwater World',
    'exp.exp2.desc': 'Dive into a magical blue world and walk through the glass tunnel surrounded by sharks.',
    'exp.exp2.price': '120',
    'exp.exp3.badge': 'Cultural',
    'exp.exp3.title': 'Old Souks Walking Tour',
    'exp.exp3.desc': 'Wander through traditional market alleys where the scent of exotic spices meets pure gold.',
    'exp.exp3.price': '89',
    'exp.exp4.badge': 'Luxury',
    'exp.exp4.title': 'VIP Desert Safari',
    'exp.exp4.desc': 'Escape to the golden dunes for a private adventure ending with a luxury dinner under the stars.',
    'exp.exp4.price': '450',
    'exp.exp5.badge': 'Professional',
    'exp.exp5.title': 'Professional Photoshoot — Dubai',
    'exp.exp5.desc': 'Preserve your best moments in Dubai with professional photographers at iconic locations.',
    'exp.exp5.price': '350',
    'exp.exp6.badge': 'Stay',
    'exp.exp6.title': 'Luxury Hotels — Panoramic Views',
    'exp.exp6.desc': 'Experience royal luxury and wake up to stunning skyline views at the world\'s finest resorts.',
    'exp.exp6.price': '1,200',

    // Itineraries
    'iti.eyebrow': 'Ready-Made Itineraries',
    'iti.title': 'Clear plans instead of hundreds of confusing options.',
    'iti.desc': '3-day, 5-day, luxury weekend and family itineraries with a logical visit order.',
    'iti.pill1': '3 Days Dubai',
    'iti.pill2': '5 Days Dubai',
    'iti.pill3': 'Luxury Weekend',
    'iti.pill4': 'Family Dubai',
    'iti.cta': 'View Itineraries',

    // Gallery
    'gallery.eyebrow': 'Captured Moments',
    'gallery.title': 'A curated glimpse of the truest Dubai experiences.',

    // Testimonials
    'testimonials.eyebrow': 'What Our Clients Say',
    'testimonials.title': 'Trusted by travelers from around the world.',
    'testimonials.verified': 'Verified Booking',
    'testimonial1.text': 'An amazing experience from start to finish! The photoshoot at Burj Khalifa was incredibly professional. The photos exceeded all my expectations. I recommend DubaiMemory to everyone!',
    'testimonial1.name': 'Sarah Ahmed',
    'testimonial1.country': 'Saudi Arabia',
    'testimonial2.text': 'The luxury desert safari was the highlight of our trip. The dinner under the stars, the excellent service, and the breathtaking views — everything was perfect. Thank you DubaiMemory team!',
    'testimonial2.name': 'Mohammed Al-Otaibi',
    'testimonial2.country': 'Kuwait',
    'testimonial3.text': 'Easy to use website, transparent prices, and diverse experiences for all tastes. I booked 4 different experiences for my family and all were wonderful. I will definitely return!',
    'testimonial3.name': 'Fatima Zahra',
    'testimonial3.country': 'Morocco',

    // Guides
    'guides.eyebrow': 'Honest Guide Articles',
    'guides.title': 'Content that sells through trust, not noise.',
    'guides.mainTag': 'Culture',
    'guides.mainTitle': 'Where does Dubai become quieter?',
    'guides.mainDesc': 'Less crowded places with more soul for travelers who want to feel the city.',
    'guides.article1': 'Best times for photography in Dubai',
    'guides.article1Desc': 'Sunrise, sunset and late afternoon.',
    'guides.article2': 'What to avoid on a first visit',
    'guides.article2Desc': 'Common mistakes that waste time and money.',
    'guides.article3': 'Dubai for conservative families',
    'guides.article3Desc': 'Comfortable and respectful family choices.',

    // Deals
    'deals.eyebrow': 'Special Offers \u0026 Deals',
    'deals.title': 'Useful deals without noise.',
    'deals.deal1': 'Desert Safari Discount',
    'deals.deal1Desc': 'Partner link with safe tracking through /go/desert-safari.',
    'deals.deal2': 'Dubai Marina Yacht Cruise',
    'deals.deal2Desc': 'Clear CTA to check partner availability.',
    'deals.deal3': 'Burj Khalifa Tickets',
    'deals.deal3Desc': 'Affiliate button ready for partner integration.',
    'deals.book': 'Book Now',

    // Blog
    'blog.eyebrow': 'From the Blog',
    'blog.title': 'Insider Tips \u0026 Honest Guides',
    'blog.viewAll': 'View All Articles',
    'blog.pageTitle': 'DubaiMemory Blog',
    'blog.pageDesc': 'Honest guides, insider tips and local stories to help you discover the real Dubai.',
    'blog.backHome': 'Back to Home',
    'blog.featured': 'Featured',
    'blog1.tag': 'Photography',
    'blog1.date': 'June 15, 2025',
    'blog1.title': 'Best Times for Photography in Dubai',
    'blog1.desc': 'Sunrise at the desert dunes, golden hour at Dubai Marina, and the perfect blue hour at Burj Khalifa.',
    'blog1.read': '5 min read',
    'blog2.tag': 'Travel Tips',
    'blog2.date': 'June 10, 2025',
    'blog2.title': 'What to Avoid on Your First Visit to Dubai',
    'blog2.desc': 'Common mistakes that waste time and money — and how to plan a smoother trip.',
    'blog2.read': '7 min read',
    'blog3.tag': 'Culture',
    'blog3.date': 'June 5, 2025',
    'blog3.title': 'Dubai for Conservative Families',
    'blog3.desc': 'Comfortable and respectful family choices from dining to activities and dress codes.',
    'blog3.read': '6 min read',
    'blog4.tag': 'Hidden Gems',
    'blog4.date': 'May 28, 2025',
    'blog4.title': 'Where Does Dubai Become Quieter?',
    'blog4.desc': 'Less crowded places with more soul for travelers who want to feel the real city.',
    'blog4.read': '4 min read',
    'blog5.tag': 'Food',
    'blog5.date': 'May 20, 2025',
    'blog5.title': 'Dubai Street Food: A Local\'s Guide',
    'blog5.desc': 'From shawarma stalls to Emirati cafeterias — the most authentic bites in the city.',
    'blog5.read': '8 min read',
    'blog6.tag': 'Luxury',
    'blog6.date': 'May 12, 2025',
    'blog6.title': 'Dubai on a Luxury Budget: How to Save',
    'blog6.desc': 'Smart tips for experiencing five-star Dubai without the five-star price tag.',
    'blog6.read': '6 min read',

    // Newsletter
    'news.eyebrow': 'Free Gift',
    'news.title': 'Get the Short Dubai Guide.',
    'news.desc': 'A curated list of places, photographers, itineraries and travel tips.',
    'news.placeholder': 'Your email address',
    'news.btn': 'Send the Guide',

    // Auth
    'auth.login': 'Sign In',
    'auth.register': 'Create Account',
    'auth.loginTitle': 'Welcome Back',
    'auth.loginSubtitle': 'Sign in to access your saved places, bookings, and digital guides.',
    'auth.registerTitle': 'Join DubaiMemory',
    'auth.registerSubtitle': 'Create your account to save favorites, book photographers, and plan your trip.',
    'auth.accountType': 'I am a...',
    'auth.traveler': 'Traveler',
    'auth.photographer': 'Photographer',
    'auth.partner': 'Partner',
    'auth.name': 'Full Name',
    'auth.namePlaceholder': 'Your full name',
    'auth.email': 'Email Address',
    'auth.emailPlaceholder': 'you@example.com',
    'auth.password': 'Password',
    'auth.passwordPlaceholder': 'Min. 8 characters',
    'auth.loginBtn': 'Sign In',
    'auth.registerBtn': 'Create Account',
    'auth.or': 'or continue with',
    'auth.magicLink': 'Send Magic Link to Email',

    // Dashboard
    'dash.welcome': 'Welcome back',
    'dash.manage': 'Manage your saved places, bookings, and account settings.',
    'dash.saved': 'Saved & Wishlist',
    'dash.bookings': 'My Bookings',
    'dash.downloads': 'Digital Downloads',
    'dash.settings': 'Account Settings',
    'dash.new': 'new',
    'dash.personal': 'Personal Information',
    'dash.currency': 'Preferred Currency',
    'dash.danger': 'Danger Zone',
    'dash.deleteDesc': 'Once you delete your account, all your data will be permanently removed. This action cannot be undone.',
    'dash.deleteBtn': 'Delete My Account',
    'dash.confirmDelete': 'Yes, Delete Everything',
    'dash.shoots': 'shoots completed',

    // Footer
    'footer.desc': 'An honest Dubai travel guide combining places, experiences, itineraries, deals and photographer bookings.',
    'footer.explore': 'Explore',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.bottom': '\u00a9 2025 DubaiMemory.com — All rights reserved.',
  },
  ar: {
    // Nav
    'nav.places': 'أماكن',
    'nav.experiences': 'تجارب',
    'nav.photographers': 'مصورين',
    'nav.itineraries': 'خطط سفر',
    'nav.deals': 'عروض',
    'nav.guides': 'دليل',
    'nav.login': 'تسجيل الدخول',
    'nav.home': 'الرئيسية',
    'nav.cta': 'احجز مصور',
    'nav.lang': 'EN',
    'top.note': 'الدليل السياحي الصادق: أماكن مختارة، تجارب حقيقية ومصورون محترفون.',

    // Hero
    'hero.badge': 'أكثر من 50,000 تجربة تم حجزها',
    'hero.title': 'اكتشف واحجز تجارب',
    'hero.titleSpan': 'دبي لا تُنسى',
    'hero.subtitle': 'تصوير احترافي، مغامرات فاخرة، وخدمات محلية مختارة بعناية — كلها في مكان واحد',
    'hero.primary': 'استكشف التجارب',
    'hero.secondary': 'كن شريكاً',

    // Search
    'search.what': 'عما تبحث؟',
    'search.photo': 'مصور احترافي',
    'search.place': 'مكان للزيارة',
    'search.experience': 'تجربة سفر',
    'search.itinerary': 'خطة رحلة',
    'search.area': 'المنطقة',
    'search.budget': 'الميزانية',
    'budget.value': 'اقتصادية',
    'budget.mid': 'متوسطة',
    'budget.luxury': 'فاخرة',
    'search.btn': 'بحث',

    // Browse by mood
    'mood.eyebrow': 'استكشف حسب المزاج',
    'mood.title': 'ليس كل مسافر يريد نفس دبي.',
    'mood.subtitle': 'اختر أسلوب رحلتك: فاخر، عائلي، جواهر هادئة، صحراء، طعام أو تصوير.',
    'mood.luxury': 'دبي الفاخرة',
    'mood.luxuryDesc': 'فنادق، يخوت، مطاعم وتجارب راقية',
    'mood.hidden': 'جواهر مخفية',
    'mood.hiddenDesc': 'زوايا أهدأ بروح محلية',
    'mood.desert': 'مغامرات الصحراء',
    'mood.desertDesc': 'غروب، سفاري وعشاء خاص',
    'mood.photo': 'أماكن التصوير',
    'mood.photoDesc': 'أفضل الزوايا لصور متميزة',

    // Photographers
    'photo.eyebrow': 'سوق التصوير الاحترافي',
    'photo.title': 'سوق مصورين محليين، واضح وسهل الحجز.',
    'photo.whatsapp': 'تواصل عبر واتساب',
    'photo.basic': 'أساسي',
    'photo.standard': 'قياسي',
    'photo.premium': 'مميز',
    'photo.pkgBasic': '45 دقيقة / 20 صورة',
    'photo.pkgStandard': '90 دقيقة / 45 صورة',
    'photo.pkgPremium': '3 ساعات / 90 صورة',
    'photo.portfolio': 'معرض الأعمال',
    'photo.book': 'احجز جلسة',

    // Photo Spots
    'spots.eyebrow': 'أفضل أماكن التصوير في دبي',
    'spots.title': 'مواقع أيقونية لصور لا تُنسى',
    'spots.spot1': 'برج خليفة',
    'spots.spot1Desc': 'الأفضل عند شروق الشمس أو قبل الغروب لزيارة أكثر هدوءاً وصور أفضل.',
    'spots.spot2': 'دبي مارينا',
    'spots.spot2Desc': 'أفق مائي مذهل يتألق بشكل لافت بعد حلول الظلام.',
    'spots.spot3': 'دبي القديمة',
    'spots.spot3Desc': 'رحلة العبرة والأسواق القديمة تُظهر دبي أبسط وأكثر صدقاً.',
    'spots.spot4': 'كثبان الصحراء',
    'spots.spot4Desc': 'الرمال الذهبية عند الغروب تخلق خلفية صور سحرية.',
    'spots.bookBtn': 'احجز مصور',

    // Experiences
    'exp.eyebrow': 'تجارب مختارة',
    'exp.title': 'تجارب جميلة دون الشعور بفخ السياحة.',
    'exp.viewAll': 'عرض الكل',
    'exp.bookNow': 'احجز الآن',
    'exp.from': 'يبدأ من',
    'exp.exp1.badge': 'الأكثر زيارة',
    'exp.exp1.title': 'برج خليفة — قمة السحاب',
    'exp.exp1.desc': 'المس الأفق وصوّر أجمل غروب شمس من أعلى نقطة على وجه الأرض.',
    'exp.exp1.price': '149',
    'exp.exp2.badge': 'عائلي',
    'exp.exp2.title': 'أكواريوم دبي — عالم المحيطات',
    'exp.exp2.desc': 'غص في عالم أزرق ساحر وامشِ عبر النفق الزجاجي المحاط بالقرش.',
    'exp.exp2.price': '120',
    'exp.exp3.badge': 'ثقافي',
    'exp.exp3.title': 'جولة الأسواق القديمة',
    'exp.exp3.desc': 'تجول في أزقة السوق التقليدية حيث يلتقي عبق التوابل بلمعان الذهب.',
    'exp.exp3.price': '89',
    'exp.exp4.badge': 'فاخر',
    'exp.exp4.title': 'سفاري صحراوي فاخر — VIP',
    'exp.exp4.desc': 'اهرب إلى الكثبان الذهبية لمغامرة خاصة تنتهي بعشاء فاخر تحت النجوم.',
    'exp.exp4.price': '450',
    'exp.exp5.badge': 'احترافي',
    'exp.exp5.title': 'جلسة تصوير احترافية — دبي',
    'exp.exp5.desc': 'احتفظ بأجمل لحظاتك في دبي مع مصورين محترفين في مواقع أيقونية.',
    'exp.exp5.price': '350',
    'exp.exp6.badge': 'إقامة',
    'exp.exp6.title': 'فنادق فاخرة — إطلالات بانورامية',
    'exp.exp6.desc': 'استمتع بالفخامة الملكية واستيقظ على إطلالات خط الأفق المذهل.',
    'exp.exp6.price': '1,200',

    // Itineraries
    'iti.eyebrow': 'خطط سفر جاهزة',
    'iti.title': 'خطط واضحة بدلاً من مئات الخيارات المربكة.',
    'iti.desc': 'خطط 3 أيام، 5 أيام، عطلة نهاية أسبوع فاخرة وعائلية بترتيب زيارات منطقي.',
    'iti.pill1': '3 أيام دبي',
    'iti.pill2': '5 أيام دبي',
    'iti.pill3': 'عطلة فاخرة',
    'iti.pill4': 'دبي العائلية',
    'iti.cta': 'عرض خطط السفر',

    // Gallery
    'gallery.eyebrow': 'لحظات ملتقطة',
    'gallery.title': 'لمحة مختارة من أصدق تجارب دبي.',

    // Testimonials
    'testimonials.eyebrow': 'ماذا يقول عملاؤنا',
    'testimonials.title': 'موثوق به من مسافرين من حول العالم.',
    'testimonials.verified': 'حجز مؤكد',
    'testimonial1.text': 'تجربة رائعة من البداية للنهاية! جلسة التصوير في برج خليفة كانت احترافية بشكل لا يصدق. الصور تجاوزت كل توقعاتي. أنصح الجميع بتجربة دبي ميموري!',
    'testimonial1.name': 'سارة الأحمد',
    'testimonial1.country': 'السعودية',
    'testimonial2.text': 'سفاري الصحراء الفاخر كان أبرز ما في رحلتنا. العشاء تحت النجوم، الخدمة الممتازة، والمناظر الخلابة — كل شيء كان مثالياً. شكراً لفريق دبي ميموري!',
    'testimonial2.name': 'محمد العتيبي',
    'testimonial2.country': 'الكويت',
    'testimonial3.text': 'موقع سهل الاستخدام، أسعار شفافة، وتجارب متنوعة تناسب جميع الأذواق. حجزت لعائلتي 4 تجارب مختلفة وكلها كانت رائعة. بالتأكيد سأعود!',
    'testimonial3.name': 'فاطمة الزهراء',
    'testimonial3.country': 'المغرب',

    // Guides
    'guides.eyebrow': 'مقالات دليل صادق',
    'guides.title': 'محتوى يبيع من خلال الثقة، وليس الضوضاء.',
    'guides.mainTag': 'ثقافة',
    'guides.mainTitle': 'أين تصبح دبي أكثر هدوءاً؟',
    'guides.mainDesc': 'أماكن أقل ازدحاماً وبروح أكثر للمسافرين الذين يريدون أن يشعروا بالمدينة.',
    'guides.article1': 'أفضل أوقات التصوير في دبي',
    'guides.article1Desc': 'شروق الشمس، الغروب وما بعد الظهر.',
    'guides.article2': 'ما يجب تجنبه في الزيارة الأولى',
    'guides.article2Desc': 'أخطاء شائعة تضيع الوقت والمال.',
    'guides.article3': 'دبي للعائلات المحافظة',
    'guides.article3Desc': 'خيارات عائلية مريحة ومحترمة.',

    // Deals
    'deals.eyebrow': 'عروض خاصة وصفقات',
    'deals.title': 'صفقات مفيدة بدون ضوضاء.',
    'deals.deal1': 'خصم سفاري الصحراء',
    'deals.deal1Desc': 'رابط شريك مع تتبع آمن عبر /go/desert-safari.',
    'deals.deal2': 'رحلة يخت دبي مارينا',
    'deals.deal2Desc': 'زر واضح للتحقق من توفر الشريك.',
    'deals.deal3': 'تذاكر برج خليفة',
    'deals.deal3Desc': 'زر تسويق بالعمولة جاهز للربط بالشريك.',
    'deals.book': 'احجز الآن',

    // Blog
    'blog.eyebrow': 'من المدونة',
    'blog.title': 'نصائح ودليل صادق',
    'blog.viewAll': 'عرض كل المقالات',
    'blog.pageTitle': 'مدونة دبي ميموري',
    'blog.pageDesc': 'أدلة صادقة، نصائح محلية وقصص من دبي لتساعدك على اكتشاف دبي الحقيقية.',
    'blog.backHome': 'العودة للرئيسية',
    'blog.featured': 'مميز',
    'blog1.tag': 'تصوير',
    'blog1.date': '15 يونيو 2025',
    'blog1.title': 'أفضل أوقات التصوير في دبي',
    'blog1.desc': 'شروق الشمس على كثبان الصحراء، الساعة الذهبية في دبي مارينا، والساعة الزرقاء عند برج خليفة.',
    'blog1.read': '5 دقائق قراءة',
    'blog2.tag': 'نصائح سفر',
    'blog2.date': '10 يونيو 2025',
    'blog2.title': 'ما يجب تجنبه في زيارتك الأولى لدبي',
    'blog2.desc': 'أخطاء شائعة تضيع الوقت والمال — وكيف تخطط لرحلة أكثر سلاسة.',
    'blog2.read': '7 دقائق قراءة',
    'blog3.tag': 'ثقافة',
    'blog3.date': '5 يونيو 2025',
    'blog3.title': 'دبي للعائلات المحافظة',
    'blog3.desc': 'خيارات عائلية مريحة ومحترمة من الطعام إلى الأنشطة وقواعد اللباس.',
    'blog3.read': '6 دقائق قراءة',
    'blog4.tag': 'جواهر مخفية',
    'blog4.date': '28 مايو 2025',
    'blog4.title': 'أين تصبح دبي أكثر هدوءاً؟',
    'blog4.desc': 'أماكن أقل ازدحاماً وبروح أكثر للمسافرين الذين يريدون أن يشعروا بالمدينة الحقيقية.',
    'blog4.read': '4 دقائق قراءة',
    'blog5.tag': 'طعام',
    'blog5.date': '20 مايو 2025',
    'blog5.title': 'طعام الشارع في دبي: دليل المحليين',
    'blog5.desc': 'من أكشاك الشاورما إلى المقاهي الإماراتية — ألذ الأطباق الأصيلة في المدينة.',
    'blog5.read': '8 دقائق قراءة',
    'blog6.tag': 'فخامة',
    'blog6.date': '12 مايو 2025',
    'blog6.title': 'دبي الفاخرة بميزانية ذكية',
    'blog6.desc': 'نصائح ذكية لتجربة دبي بخمس نجوم دون أسعار الخمس نجوم.',
    'blog6.read': '6 دقائق قراءة',

    // Newsletter
    'news.eyebrow': 'هدية مجانية',
    'news.title': 'احصل على دليل دبي المختصر.',
    'news.desc': 'قائمة مختارة من الأماكن، المصورين، خطط السفر ونصائح السفر.',
    'news.placeholder': 'عنوان بريدك الإلكتروني',
    'news.btn': 'أرسل الدليل',

    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب',
    'auth.loginTitle': 'مرحباً بعودتك',
    'auth.loginSubtitle': 'سجل دخولك للوصول إلى أماكنك المحفوظة، حجوزاتك وأدلتك الرقمية.',
    'auth.registerTitle': 'انضم إلى دبي ميموري',
    'auth.registerSubtitle': 'أنشئ حسابك لحفظ المفضلات، حجز المصورين وتخطيط رحلتك.',
    'auth.accountType': 'أنا...',
    'auth.traveler': 'مسافر',
    'auth.photographer': 'مصور',
    'auth.partner': 'شريك',
    'auth.name': 'الاسم الكامل',
    'auth.namePlaceholder': 'اسمك الكامل',
    'auth.email': 'البريد الإلكتروني',
    'auth.emailPlaceholder': 'you@example.com',
    'auth.password': 'كلمة المرور',
    'auth.passwordPlaceholder': '8 أحرف على الأقل',
    'auth.loginBtn': 'تسجيل الدخول',
    'auth.registerBtn': 'إنشاء الحساب',
    'auth.or': 'أو سجل عبر',
    'auth.magicLink': 'إرسال رابط سحري للبريد',

    // Dashboard
    'dash.welcome': 'أهلاً بعودتك',
    'dash.manage': 'إدارة أماكنك المحفوظة، حجوزاتك وإعدادات حسابك.',
    'dash.saved': 'المحفوظات',
    'dash.bookings': 'حجوزاتي',
    'dash.downloads': 'التحميلات الرقمية',
    'dash.settings': 'إعدادات الحساب',
    'dash.new': 'جديد',
    'dash.personal': 'المعلومات الشخصية',
    'dash.currency': 'العملة المفضلة',
    'dash.danger': 'منطقة الخطر',
    'dash.deleteDesc': 'بمجرد حذف حسابك، ستُحذف جميع بياناتك نهائياً. لا يمكن التراجع عن هذا الإجراء.',
    'dash.deleteBtn': 'حذف حسابي',
    'dash.confirmDelete': 'نعم، احذف كل شيء',
    'dash.shoots': 'جلسة تصوير',

    // Footer
    'footer.desc': 'دليل سفر دبي الصادق يجمع الأماكن، التجارب، خطط السفر، العروض وحجز المصورين.',
    'footer.explore': 'استكشف',
    'footer.company': 'الشركة',
    'footer.support': 'الدعم',
    'footer.bottom': '\u00a9 2025 DubaiMemory.com — جميع الحقوق محفوظة.',
  },
};

const LangContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'ar' : 'en';
      document.documentElement.lang = next;
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string | Record<string, string> => {
      return translations[lang][key] ?? key;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, dir, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppLanguage = 'ar' | 'fr';
export type UserRole = 'client' | 'worker';

export type AppScreen =
  | 'splash'
  | 'language_select'
  | 'onboarding'
  | 'role_select'
  | 'client_home'
  | 'category_screen'
  | 'worker_profile_view'
  | 'booking_screen'
  | 'worker_dashboard'
  | 'worker_profile_edit'
  | 'worker_interview'
  | 'worker_reviews'
  | 'messages'
  | 'settings'
  | 'design_kit';

export interface ServiceCategory {
  id: string;
  nameAr: string;
  nameFr: string;
  descAr: string;
  descFr: string;
  color: string;
  badgeAr: string;
  badgeFr: string;
}

export interface WorkerProfile {
  id: string;
  nameAr: string;
  nameFr: string;
  avatar: string; // url or custom svg template representation
  category: 'catering' | 'cleaning' | 'childcare' | 'senior_care';
  rating: number;
  reviewCount: number;
  completedMissions: number;
  experienceYears: number;
  tagsAr: string[];
  tagsFr: string[];
  bioAr: string;
  bioFr: string;
  priceMin: number;
  priceUnitAr: string;
  priceUnitFr: string;
  isVerified: boolean;
  responseTimeAr: string;
  responseTimeFr: string;
  availableDays: number[]; // 0=Sunday, 1=Monday... 6=Saturday
  photos: string[];
}

export interface Review {
  id: string;
  clientName: string;
  avatar: string;
  rating: number;
  date: string;
  commentAr: string;
  commentFr: string;
}

export interface Booking {
  id: string;
  workerId: string;
  workerNameFr: string;
  workerNameAr: string;
  category: string;
  date: string;
  timeSlotAr: string;
  timeSlotFr: string;
  status: 'pending' | 'confirmed' | 'cooking_prep' | 'completed' | 'declined';
  priceEstimate: number;
  description: string;
  clientAddress: string;
  conciergeEnabled: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'worker';
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  workerId: string;
  workerNameFr: string;
  workerNameAr: string;
  avatar: string;
  lastMessageAr: string;
  lastMessageFr: string;
  unread: boolean;
  messages: ChatMessage[];
}

export interface AppNotification {
  id: string;
  titleAr: string;
  titleFr: string;
  bodyAr: string;
  bodyFr: string;
  timeAr: string;
  timeFr: string;
  isRead: boolean;
  type: 'booking' | 'message' | 'system';
}

// Full Bilingual Copy Library
export const COPIES = {
  ar: {
    // Splash & Onboarding
    tagline: 'منزلك، ثقتك',
    selectLanguage: 'اختر لغتك المفضلة',
    continue: 'متابعة',
    next: 'التالي',
    skip: 'تخطي',
    getStarted: 'ابدأ الآن',
    ob1Title: '4 خدمات بين يديك',
    ob1Desc: 'اعثر على عمال محترفين وموثوقين لجميع احتياجات منزلك في الجزائر.',
    ob2Title: 'عمال موثّقون ومقابلون',
    ob2Desc: 'كل عامل في KIN يمر بمقابلة شخصية والتحقق من الهوية قبل تفعيل حسابه.',
    ob3Title: 'سهل، سريع، وآمن',
    ob3Desc: 'احجز بـ 3 نقرات فقط، وتابع طلبك، وقيم تجربتك بكل أمان.',
    
    // Role selection
    chooseRoleTitle: 'كيف ترغب في استخدام كين؟',
    chooseRoleSub: 'اختر حسابك للبدء في استخدام التطبيق',
    roleClientTitle: 'أبحث عن خدمة',
    roleClientDesc: 'أرغب في حجز طباخ، منظف، مربية أطفال أو مرافق لكبار السن.',
    roleWorkerTitle: 'أقدّم خدماتي',
    roleWorkerDesc: 'أنا محترف وأرغب في العثور على عملاء وزيادة مدخولي في الجزائر.',
    
    // Client Home
    greeting: 'مرحباً، ياسمين 👋',
    location: 'الجزائر، باب الوادي 📍',
    searchPlaceholder: 'ماذا تبحث اليوم؟...',
    allCategories: 'الخدمات المتوفرة',
    rebookTitle: 'استكمل من حيث توقفت',
    promoTitle: 'عروض كين المميزة',
    noReservations: 'لا توجد حجوزات حالياً',
    
    // Categories & Details
    catering: 'طباخون ومناسبات',
    cleaning: 'تنظيف منزلي وعام',
    childcare: 'مربيات أطفال',
    seniorCare: 'رعاية كبار السن',
    verifiedBadge: 'عامل موثّق',
    missions: 'مهمة ناجحة',
    experience: 'سنوات خبرة',
    respondsIn: 'يجيب في أقل من',
    aboutMe: 'نبذة عن المحترف',
    servicesOffered: 'الخدمات والأسعار',
    availability: 'أيام العمل المتوفرة',
    reviewsTitle: 'آراء العملاء',
    call: 'اتصال',
    chat: 'محادثة',
    bookNow: 'احجز الآن',
    
    // Booking Form
    bookingTitle: 'تأكيد الحجز',
    selectDate: 'اختر التاريخ والوقت',
    describeNeed: 'اشرح ما تحتاجه بالتفصيل',
    describePlaceholder: 'مثال: وجبة عشاء لـ 20 شخص، طهي أطباق تقليدية عاصمية، خدمة كاملة...',
    clientAddressLabel: 'تأكيد عنوان منزلك',
    priceEstimateLabel: 'التقدير الأولي للميزانية',
    conciergeLabel: 'خدمة كين المساعدة (Concierge)',
    conciergeDesc: 'هل تريد أن يتصل بك فريق كين هاتفياً لتنسيق التفاصيل الدقيقة وحمايتك؟ (موصى به)',
    sendRequest: 'إرسال طلب الحجز',
    bookingSuccess: 'تم إرسال طلبك بنجاح!',
    bookingSuccessDesc: 'سيتلقى المحترف طلبك ويجيبك في أسرع وقت. يمكنك متابعة الطلب في التنبيهات.',
    
    // Worker Dashboard
    workerStatusAvailable: 'متاح للعمل حالياً',
    workerStatusBusy: 'غير متاح / مشغول',
    incompleteProfile: 'ملفك مكتمل بنسبة',
    completeNow: 'أكمل ملفك الآن',
    earningsEst: 'الأرباح المقدرة',
    pendingRequests: 'طلبات في انتظار ردك',
    accept: 'قبول',
    decline: 'رفض',
    tipsTitle: 'نصائح كين لزيادة مدخولك',
    recentActivity: 'النشاطات الأخيرة',
    
    // Worker Registration & Interview
    profileEditTitle: 'تعديل الملف المهني',
    interviewTitle: 'جدولة المقابلة الشخصية',
    interviewDesc: 'في كين، كل شريك يمر بمقابلة وجهاً لوجه لتوثيق حسابه، بناء الثقة العالية، والحصول على شارة التوثيق الزرقاء.',
    whatToExpect: 'ماذا ينتظرك في المقابلة؟',
    expectStep1: 'حضور موعد في أحد مواقع كين المعتمدة أو عبر اتصال مرئي مؤمن.',
    expectStep2: 'محادثة ودية لمدة 20 دقيقة للتعرف على خبراتك ومهاراتك الفنية.',
    expectStep3: 'الحصول على شارة "عامل موثق" وبدء استقبال طلبات حقيقية بأسعار رائعة.',
    selectInterviewLocation: 'اختر موقع المقابلة المفضل',
    documentsList: 'الوثائق المطلوبة للمقابلة',
    idCard: 'بطاقة التعريف الوطنية البيومترية',
    diploma: 'شهادة كفاءة أو دبلوم تدريب (إن وجد)',
    healthCert: 'الشهادة الطبية (إلزامية لطباخي المناسبات)',
    residenceCert: 'شهادة إقامة حديثة',
    confirmInterviewTime: 'تأكيد موعد المقابلة',
    interviewSuccess: 'تم تحديد موعدك بنجاح!',
    
    // General
    back: 'رجوع',
    home: 'الرئيسية',
    bookingsTab: 'حجوزاتي',
    messagesTab: 'الرسائل',
    profileTab: 'حسابي',
    designKitTab: 'دليل التصميم',
    activeMissions: 'مهمة قائمة',
    noMessages: 'لا توجد محادثات نشطة'
  },
  fr: {
    // Splash & Onboarding
    tagline: 'Votre maison, votre confiance',
    selectLanguage: 'Choisissez votre langue',
    continue: 'Continuer',
    next: 'Suivant',
    skip: 'Passer',
    getStarted: 'Démarrer',
    ob1Title: '4 services à portée de main',
    ob1Desc: 'Trouvez des professionnels de confiance pour tous les besoins de votre foyer en Algérie.',
    ob2Title: 'Des prestataires vérifiés',
    ob2Desc: 'Chaque prestataire sur KIN passe un entretien individuel et une vérification d\'identité rigoureuse.',
    ob3Title: 'Simple, rapide et sûr',
    ob3Desc: 'Réservez en 3 clics, suivez votre demande et notez votre professionnel en toute sérénité.',
    
    // Role selection
    chooseRoleTitle: 'Comment allez-vous utiliser KIN ?',
    chooseRoleSub: 'Sélectionnez le type de compte pour démarrer',
    roleClientTitle: 'Je cherche un service',
    roleClientDesc: 'Je veux réserver un traiteur, une femme de ménage, une nounou ou un accompagnateur.',
    roleWorkerTitle: 'Je propose mes services',
    roleWorkerDesc: 'Je suis professionnel et je cherche des clients pour augmenter mes revenus en Algérie.',
    
    // Client Home
    greeting: 'Bonjour, Yasmine 👋',
    location: 'Alger, Bab El Oued 📍',
    searchPlaceholder: 'Que cherchez-vous aujourd\'hui ?...',
    allCategories: 'Nos services disponibles',
    rebookTitle: 'Reprendre où vous étiez',
    promoTitle: 'Promotions KIN exclusives',
    noReservations: 'Pas de réservation pour le moment',
    
    // Categories & Details
    catering: 'Traiteur & Chefs',
    cleaning: 'Ménage & Hygiène',
    childcare: 'Nounou & Garde d\'enfants',
    seniorCare: 'Accompagnement Seniors',
    verifiedBadge: 'Prestataire vérifié',
    missions: 'missions réussies',
    experience: 'ans d\'expérience',
    respondsIn: 'Répond en moins de',
    aboutMe: 'À propos du prestataire',
    servicesOffered: 'Services & Tarifs proposés',
    availability: 'Disponibilité hebdomadaire',
    reviewsTitle: 'Avis des clients',
    call: 'Appeler',
    chat: 'Message',
    bookNow: 'Réserver maintenant',
    
    // Booking Form
    bookingTitle: 'Confirmer la réservation',
    selectDate: 'Choisir la date et l\'heure',
    describeNeed: 'Décrivez votre besoin en détail',
    describePlaceholder: 'Ex: Mariage pour 200 personnes, cuisine algéroise traditionnelle, service complet...',
    clientAddressLabel: 'Confirmez votre adresse de domicile',
    priceEstimateLabel: 'Estimation budgétaire initiale',
    conciergeLabel: 'Service Conciergerie KIN',
    conciergeDesc: 'Souhaitez-vous que l\'équipe KIN vous appelle pour fignoler les détails et sécuriser la prestation ? (Recommandé)',
    sendRequest: 'Envoyer la demande',
    bookingSuccess: 'Demande envoyée avec succès !',
    bookingSuccessDesc: 'Le prestataire a reçu votre demande et vous répondra très vite. Vous pouvez suivre l\'état dans vos réservations.',
    
    // Worker Dashboard
    workerStatusAvailable: 'Disponible pour des missions',
    workerStatusBusy: 'Indisponible / Occupé',
    incompleteProfile: 'Profil complété à',
    completeNow: 'Compléter mon profil',
    earningsEst: 'Revenus estimés',
    pendingRequests: 'Demandes de clients en attente',
    accept: 'Accepter',
    decline: 'Décliner',
    tipsTitle: 'Conseils KIN pour booster vos revenus',
    recentActivity: 'Activités récentes',
    
    // Worker Registration & Interview
    profileEditTitle: 'Édition du profil pro',
    interviewTitle: 'Planifier mon entretien KIN',
    interviewDesc: 'Chez KIN, chaque prestataire passe un entretien en tête-à-tête pour valider son expérience et obtenir le badge vérifié.',
    whatToExpect: 'À quoi vous attendre ?',
    expectStep1: 'Rendez-vous physique dans l\'un de nos centres ou visioconférence sécurisée.',
    expectStep2: 'Discussion bienveillante de 20 minutes sur votre savoir-faire et vos références.',
    expectStep3: 'Activation immédiate de votre badge de confiance pour doubler vos commandes.',
    selectInterviewLocation: 'Sélectionnez le lieu d\'entretien',
    documentsList: 'Documents requis pour l\'entretien',
    idCard: 'Pièce d\'identité nationale biométrique',
    diploma: 'Attestation de travail ou diplôme (si dispo)',
    healthCert: 'Carnet de santé (obligatoire pour Traiteur/Cuisine)',
    residenceCert: 'Fiche d\'état civil ou certificat de résidence',
    confirmInterviewTime: 'Confirmer la date et l\'heure',
    interviewSuccess: 'Entretien planifié !',
    
    // General
    back: 'Retour',
    home: 'Accueil',
    bookingsTab: 'Mes Réserves',
    messagesTab: 'Messages',
    profileTab: 'Mon Compte',
    designKitTab: 'Visual Kit',
    activeMissions: 'Missions actives',
    noMessages: 'Aucune discussion active'
  }
};

// Comprehensive rich mock workers based in Algiers neighborhoods
export const MOCK_WORKERS: WorkerProfile[] = [
  {
    id: 'w1',
    nameFr: 'Fatima Zohra',
    nameAr: 'فاطمة الزهراء',
    category: 'catering',
    rating: 4.9,
    reviewCount: 42,
    completedMissions: 127,
    experienceYears: 12,
    tagsFr: ['Mariage traditionnel', 'Gâteaux Algérois', 'Plats de fêtes', 'Couscous Kabyle'],
    tagsAr: ['أعراس تقليدية', 'حلويات عاصمية', 'أطباق حفلات', 'كسكس قبائلي'],
    bioFr: 'Passionnée de cuisine traditionnelle algérienne depuis mon plus jeune âge, je prépare des buffets somptueux d\'Iftar pendant le Ramadan, des dîners de fiançailles ou des fêtes de circoncision avec des produits frais locaux.',
    bioAr: 'شغوفة بالطبخ الجزائري التقليدي منذ صغري، أحضر بوفيهات فاخرة لوجبات رمضان، حفلات الخطوبة والختان، الكسكس الأصيل والحلويات التقليدية العاصمية والقبائلية بلمسة احترافية.',
    priceMin: 2200,
    priceUnitFr: 'pers.',
    priceUnitAr: 'شخص',
    isVerified: true,
    responseTimeFr: '30 min',
    responseTimeAr: '30 دقيقة',
    availableDays: [0, 2, 4, 5, 6],
    photos: [
      'https://picsum.photos/seed/catering1/400/300',
      'https://picsum.photos/seed/catering2/400/300',
      'https://picsum.photos/seed/catering3/400/300'
    ],
    avatar: '👩‍🍳'
  },
  {
    id: 'w2',
    nameFr: 'Amine El Bachir',
    nameAr: 'أمين البشير',
    category: 'cleaning',
    rating: 4.8,
    reviewCount: 29,
    completedMissions: 98,
    experienceYears: 5,
    tagsFr: ['Nettoyage après-travaux', 'Lavage de vitres', 'Désinfection', 'Aspirateur vapeur'],
    tagsAr: ['تنظيف بعد البناء', 'غسيل نوافذ', 'تعقيم شامل', 'تنظيف بالبخار'],
    bioFr: 'Je propose un service de nettoyage méticuleux garanti pour les appartements, les bureaux et les grandes villas à Hydra et Alger-Centre. Équipement professionnel haut de gamme fourni.',
    bioAr: 'أقدم خدمة تنظيف دقيقة ومضمونة للشقق والمكاتب والفيلات الفاخرة في حيدرة والجزائر الوسطى. نوفر جميع المعدات ومواد التنظيف الاحترافية عالية الجودة.',
    priceMin: 3500,
    priceUnitFr: 'journée',
    priceUnitAr: 'يوم',
    isVerified: true,
    responseTimeFr: '1 heure',
    responseTimeAr: 'ساعة واحدة',
    availableDays: [1, 2, 3, 4, 6],
    photos: [
      'https://picsum.photos/seed/clean1/400/300',
      'https://picsum.photos/seed/clean2/400/300'
    ],
    avatar: '🧹'
  },
  {
    id: 'w3',
    nameFr: 'Khadidja Meriem',
    nameAr: 'خديجة مريم',
    category: 'childcare',
    rating: 4.95,
    reviewCount: 54,
    completedMissions: 165,
    experienceYears: 8,
    tagsFr: ['Bébés & Nourrissons', 'Aide aux devoirs', 'Égayer les soirées', 'Institutrice de formation'],
    tagsAr: ['رضع وحديثي الولادة', 'مراجعة فروض مدرسية', 'تنشيط مسائي', 'معلمة مؤهلة'],
    bioFr: 'Ancienne institutrice en école primaire, je m\'occupe avec tendresse, patience et rigueur de vos enfants après l\'école ou pendant vos absences de week-end. Certifiée secours d\'urgence pédiatrique.',
    bioAr: 'معلمة مدرسة ابتدائية سابقة، أعتني بأطفالكم بكل حب وصبر وانضباط بعد المدرسة أو خلال عطلات نهاية الأسبوع لراحتكم. متدربة على الإسعافات الأولية للأطفال.',
    priceMin: 1200,
    priceUnitFr: 'heure',
    priceUnitAr: 'ساعة',
    isVerified: true,
    responseTimeFr: '2 heures',
    responseTimeAr: 'ساعتين',
    availableDays: [0, 1, 3, 5],
    photos: [
      'https://picsum.photos/seed/child1/400/300'
    ],
    avatar: '🧸'
  },
  {
    id: 'w4',
    nameFr: 'Karim Brahimi',
    nameAr: 'كريم إبراهيمي',
    category: 'senior_care',
    rating: 5.0,
    reviewCount: 19,
    completedMissions: 43,
    experienceYears: 4,
    tagsFr: ['Aide-soignant diplômé', 'Garde de nuit', 'Promenade & Compagnie', 'Aide à la mobilité'],
    tagsAr: ['مساعد تمريض معتمد', 'مرافقة ليلية', 'نزهة ومؤانسة', 'دعم الحركة والنهوض'],
    bioFr: 'Infirmier auxiliaire attentionné et respectueux, j\'accompagne les personnes âgées, gère la prise de médicaments à heure fixe et propose des promenades pour leur bien-être moral.',
    bioAr: 'ممرض مساعد يقظ ومحترم، أرافق كبار السن وأساعدهم في تنقلاتهم اليومية، تنظيم مواعيد وجرعات الأدوية والمشي من أجل الحفاظ على معنوياتهم وصحتهم الجسدية.',
    priceMin: 4000,
    priceUnitFr: 'garde',
    priceUnitAr: 'مرافقة',
    isVerified: true,
    responseTimeFr: '45 min',
    responseTimeAr: '45 دقيقة',
    availableDays: [0, 1, 2, 3, 4, 5, 6],
    photos: [
      'https://picsum.photos/seed/elder1/400/300'
    ],
    avatar: '👴'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    clientName: 'Amira Benali',
    avatar: '👩',
    rating: 5,
    date: '2026-05-10',
    commentAr: 'فاطمة الزهراء حضرت لنا عشاء عائلي لـ 30 شخص، الكسكس كان رائع والحلويات تذوب في الفم. كل الضيوف شكروا نظافتها ودقتها في العمل. ننصح بها بشدة!',
    commentFr: 'Fatima Zohra nous a préparé un réveillon familial splendide pour 30 invités. Le couscous était à tomber et les gâteaux fondaient dans la bouche. Propreté impeccable, je valide !'
  },
  {
    id: 'r2',
    clientName: 'Sofiane Touati',
    avatar: '👨',
    rating: 4,
    date: '2026-05-12',
    commentAr: 'أمين قام بتنظيف شقتنا بعد انتهاء أشغال الطلاء. قام بعمل رائع في تنظيف النوافذ والأرضيات الملطخة. مهني ومؤدب جداً.',
    commentFr: 'Amine a nettoyé notre appartement après les travaux de peinture. Superbe travail sur les vitres et les résidus durs. Ponctuel et extrêmement poli.'
  },
  {
    id: 'r3',
    clientName: 'Meriem B.',
    avatar: '👩',
    rating: 5,
    date: '2026-05-15',
    commentAr: 'خديجة مربية ممتازة، تركت معها طفلي البالغ من العمر سنتين ووجدته سعيداً وهادئاً. قامت بقراءة القصص وتهدئته. سأعيد حجزها بدون شك.',
    commentFr: 'Khadidja est une perle rare ! J\'ai confié mon bébé de 2 ans et je l\'ai retrouvé souriant et apaisé. Elle lui a lu des histoires et l\'a cajolé.'
  }
];

export const MOCK_CHATS: ChatThread[] = [
  {
    id: 'c1',
    workerId: 'w1',
    workerNameFr: 'Fatima Zohra',
    workerNameAr: 'فاطمة الزهراء',
    avatar: '👩‍🍳',
    lastMessageAr: 'مرحباً ياسمين، أنا متوفرة لتلك التواريخ. هل نؤكد المنيو؟',
    lastMessageFr: 'Bonjour Yasmine, je suis libre pour ces dates. Est-ce qu\'on valide le menu ?',
    unread: true,
    messages: [
      {
        id: '1',
        sender: 'client',
        text: 'Bonjour Fatima, j\'aimerais organiser un dîner traditionnel el m\'qam le samedi prochain.',
        timestamp: '15:20'
      },
      {
        id: '2',
        sender: 'worker',
        text: 'مرحباً ياسمين، يشرفني جداً الطبخ لعائلتك! نعم السبت مناسب لي تماماً ويمكنني تحضير الشربة العاصمية واللحم لحلو والبوراك والطبق الرئيسي متوم.',
        timestamp: '15:35'
      },
      {
        id: '3',
        sender: 'worker',
        text: 'Je suis très libre pour ces dates. Est-ce qu\'on valide le menu traditionnel ?',
        timestamp: '15:36'
      }
    ]
  },
  {
    id: 'c2',
    workerId: 'w2',
    workerNameFr: 'Amine El Bachir',
    workerNameAr: 'أمين البشير',
    avatar: '🧹',
    lastMessageAr: 'سأحضر معي آلة البخار المتطورة للتنظيف العميق.',
    lastMessageFr: 'J\'apporterai tout mon matériel vapeur professionnel samedi matin.',
    unread: false,
    messages: [
      {
        id: '1',
        sender: 'client',
        text: 'Quelles sont vos heures d\'arrivée recommandées ?',
        timestamp: '10:12'
      },
      {
        id: '2',
        sender: 'worker',
        text: 'بين الثامنة والنصف والتاسعة صباحاً حتى نستغل النهار في غسل كامل النوافذ وجدران المطبخ بدقة.',
        timestamp: '10:20'
      }
    ]
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    titleAr: 'تم تأكيد حجزك!',
    titleFr: 'Réservation confirmée !',
    bodyAr: 'لقد وافقت فاطمة الزهراء على طلب الطبخ لعائلتكم يوم السبت المقبل.',
    bodyFr: 'Fatima Zohra a accepté votre demande de service traiteur pour samedi.',
    timeAr: 'قبل ساعة',
    timeFr: 'il y a 1h',
    isRead: false,
    type: 'booking'
  },
  {
    id: 'n2',
    titleAr: 'رسالة جديدة من أمين',
    titleFr: 'Nouveau message de Amine',
    bodyAr: '"سأحضر معي آلة البخار المتطورة للتنظيف العميق."',
    bodyFr: '"J\'apporterai tout le matériel nécessaire..."',
    timeAr: 'قبل ساعتين',
    timeFr: 'il y a 2h',
    isRead: false,
    type: 'message'
  },
  {
    id: 'n3',
    titleAr: 'جدول مقابلتك مع كين جاهز',
    titleFr: 'Entretien KIN disponible',
    bodyAr: 'لكي يتم توثيق حسابك كعامل ب شارة زرقاء، يرجى اختيار تاريخ المقابلة.',
    bodyFr: 'Prenez rendez-vous physique pour décrocher votre badge de confiance ✓.',
    timeAr: 'قبل يوم',
    timeFr: 'il y a 1j',
    isRead: true,
    type: 'system'
  }
];

export const MOCK_TIPS = [
  {
    id: 't1',
    titleAr: 'أضف صور حقيقية كافية',
    titleFr: 'Montrez votre savoir-faire',
    bodyAr: 'العمال الذين يرفعون 4 صور على الأقل لطبخهم أو جودة عملهم ينالون طلبات أكثر بـ 3 مرات.',
    bodyFr: 'Les profils affichant au moins 4 photos réelles de réalisations obtiennent 3 fois plus d\'appels.'
  },
  {
    id: 't2',
    titleAr: 'الرد السريع يكسب الزبائن',
    titleFr: 'Répondez très vite',
    bodyAr: 'ردك على الزبون في أول ساعة يرفع فرصة اختيارك والاتفاق على السعر بنسبة 85%.',
    bodyFr: 'Répondre au chat dans la première heure augmente vos chances de sceller le contrat de 85%.'
  },
  {
    id: 't3',
    titleAr: 'شارة التوثيق الزرقاء ✓',
    titleFr: 'L\'Entretien de confiance ✓',
    bodyAr: 'المقابلة الشخصية الودية تجعلك تظهر أولاً في نتائج البحث وتمنحك ثقة كاملة مع العائلات الجزائرية.',
    bodyFr: 'Les prestataires interviewés par KIN bénéficient d\'un surclassement prioritaire sur la carte.'
  }
];

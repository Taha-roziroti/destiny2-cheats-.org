import type { LocaleCode } from '../data/i18n/locales';

export type NavChrome = {
	preview: string;
	store: string;
	status: string;
	reviews: string;
	forums: string;
	primaryAria: string;
	mobileAria: string;
	openMenu: string;
	closeMenu: string;
};

export type CommonChrome = {
	selectLanguage: string;
	breadcrumb: string;
	browse: string;
	skipToContent: string;
	support: string;
	privacy: string;
	terms: string;
	featureList: string;
	pricingPlans: string;
	buyerReviewsNav: string;
	forums: string;
	blog: string;
	officialResources: string;
	officialResourcesLead: string;
	affiliateDisclosure: string;
};

export type ReviewChrome = {
	buyerReviews: string;
	averageAria: string;
	outOfFiveAria: string;
	readAll: string;
	readFullReview: string;
	readyToTry: string;
	comparePricing: string;
	buyNowPrice: string;
	verifiedBuyer: string;
};

export type A11yChrome = {
	skipToContent: string;
	notFoundTitle: string;
	notFoundText: string;
	notFoundBackHome: string;
	forumCommunity: string;
	forumDiscussion: string;
	replies: string;
	viewAllFaq: string;
	answer: string;
};

export const navChrome: Record<LocaleCode, NavChrome> = {
	en: { preview: 'Cheats', store: 'Store', status: 'Status', reviews: 'Reviews', forums: 'Forums', primaryAria: 'Primary', mobileAria: 'Mobile', openMenu: 'Open menu', closeMenu: 'Close menu' },
	es: { preview: 'Trucos', store: 'Tienda', status: 'Estado', reviews: 'Reseñas', forums: 'Foros', primaryAria: 'Principal', mobileAria: 'Móvil', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú' },
	fr: { preview: 'Triches', store: 'Boutique', status: 'Statut', reviews: 'Avis', forums: 'Forum', primaryAria: 'Principal', mobileAria: 'Mobile', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu' },
	de: { preview: 'Cheats', store: 'Shop', status: 'Status', reviews: 'Bewertungen', forums: 'Forum', primaryAria: 'Haupt', mobileAria: 'Mobil', openMenu: 'Menü öffnen', closeMenu: 'Menü schließen' },
	pt: { preview: 'Cheats', store: 'Loja', status: 'Status', reviews: 'Avaliações', forums: 'Fórum', primaryAria: 'Principal', mobileAria: 'Móvel', openMenu: 'Abrir menu', closeMenu: 'Fechar menu' },
	it: { preview: 'Cheat', store: 'Negozio', status: 'Stato', reviews: 'Recensioni', forums: 'Forum', primaryAria: 'Principale', mobileAria: 'Mobile', openMenu: 'Apri menu', closeMenu: 'Chiudi menu' },
	nl: { preview: 'Cheats', store: 'Winkel', status: 'Status', reviews: 'Reviews', forums: 'Forum', primaryAria: 'Primair', mobileAria: 'Mobiel', openMenu: 'Menu openen', closeMenu: 'Menu sluiten' },
	pl: { preview: 'Cheaty', store: 'Sklep', status: 'Status', reviews: 'Opinie', forums: 'Forum', primaryAria: 'Główne', mobileAria: 'Mobilne', openMenu: 'Otwórz menu', closeMenu: 'Zamknij menu' },
	ru: { preview: 'Читы', store: 'Магазин', status: 'Статус', reviews: 'Отзывы', forums: 'Форум', primaryAria: 'Основное', mobileAria: 'Мобильное', openMenu: 'Открыть меню', closeMenu: 'Закрыть меню' },
	tr: { preview: 'Hileler', store: 'Mağaza', status: 'Durum', reviews: 'Yorumlar', forums: 'Forum', primaryAria: 'Ana', mobileAria: 'Mobil', openMenu: 'Menüyü aç', closeMenu: 'Menüyü kapat' },
	ar: { preview: 'غش', store: 'المتجر', status: 'الحالة', reviews: 'المراجعات', forums: 'المنتدى', primaryAria: 'رئيسي', mobileAria: 'جوال', openMenu: 'فتح القائمة', closeMenu: 'إغلاق القائمة' },
	ja: { preview: 'チート', store: 'ストア', status: 'ステータス', reviews: 'レビュー', forums: 'フォーラム', primaryAria: 'メイン', mobileAria: 'モバイル', openMenu: 'メニューを開く', closeMenu: 'メニューを閉じる' },
	ko: { preview: '치트', store: '스토어', status: '상태', reviews: '리뷰', forums: '포럼', primaryAria: '기본', mobileAria: '모바일', openMenu: '메뉴 열기', closeMenu: '메뉴 닫기' },
	zh: { preview: '作弊', store: '商店', status: '状态', reviews: '评价', forums: '论坛', primaryAria: '主要', mobileAria: '移动', openMenu: '打开菜单', closeMenu: '关闭菜单' },
	hi: { preview: 'चीट', store: 'स्टोर', status: 'स्थिति', reviews: 'समीक्षाएँ', forums: 'फ़ोरम', primaryAria: 'मुख्य', mobileAria: 'मोबाइल', openMenu: 'मेनू खोलें', closeMenu: 'मेनू बंद करें' },
	id: { preview: 'Cheat', store: 'Toko', status: 'Status', reviews: 'Ulasan', forums: 'Forum', primaryAria: 'Utama', mobileAria: 'Mobile', openMenu: 'Buka menu', closeMenu: 'Tutup menu' },
	th: { preview: 'สูตร', store: 'ร้านค้า', status: 'สถานะ', reviews: 'รีวิว', forums: 'ฟอรั่ม', primaryAria: 'หลัก', mobileAria: 'มือถือ', openMenu: 'เปิดเมนู', closeMenu: 'ปิดเมนู' },
	vi: { preview: 'Cheat', store: 'Cửa hàng', status: 'Trạng thái', reviews: 'Đánh giá', forums: 'Diễn đàn', primaryAria: 'Chính', mobileAria: 'Di động', openMenu: 'Mở menu', closeMenu: 'Đóng menu' },
	uk: { preview: 'Чіти', store: 'Магазин', status: 'Статус', reviews: 'Відгуки', forums: 'Форум', primaryAria: 'Головне', mobileAria: 'Мобільне', openMenu: 'Відкрити меню', closeMenu: 'Закрити меню' },
	cs: { preview: 'Cheaty', store: 'Obchod', status: 'Stav', reviews: 'Recenze', forums: 'Fórum', primaryAria: 'Hlavní', mobileAria: 'Mobil', openMenu: 'Otevřít menu', closeMenu: 'Zavřít menu' },
	ro: { preview: 'Cheats', store: 'Magazin', status: 'Status', reviews: 'Recenzii', forums: 'Forum', primaryAria: 'Principal', mobileAria: 'Mobil', openMenu: 'Deschide meniul', closeMenu: 'Închide meniul' },
	sv: { preview: 'Cheats', store: 'Butik', status: 'Status', reviews: 'Recensioner', forums: 'Forum', primaryAria: 'Primär', mobileAria: 'Mobil', openMenu: 'Öppna menyn', closeMenu: 'Stäng menyn' },
};

export const commonChrome: Record<LocaleCode, CommonChrome> = {
	en: { selectLanguage: 'Select language', breadcrumb: 'Breadcrumb', browse: 'Browse', skipToContent: 'Skip to main content', support: 'Support', privacy: 'Privacy', terms: 'Terms', affiliateDisclosure: 'Affiliate disclosure', featureList: 'Feature list', pricingPlans: 'Pricing plans', buyerReviewsNav: 'Buyer reviews', forums: 'Forums', blog: 'Forums', officialResources: 'Official Destiny 2 resources', officialResourcesLead: 'Learn the game from official and community-maintained references:' },
	es: { selectLanguage: 'Seleccionar idioma', breadcrumb: 'Ruta', browse: 'Explorar', skipToContent: 'Saltar al contenido principal', support: 'Soporte', privacy: 'Privacidad', terms: 'Términos', affiliateDisclosure: 'Divulgación de afiliados', featureList: 'Lista de funciones', pricingPlans: 'Planes de precios', buyerReviewsNav: 'Reseñas de compradores', forums: 'Foros', blog: 'Foros', officialResources: 'Recursos oficiales de Destiny 2', officialResourcesLead: 'Aprende el juego con referencias oficiales y de la comunidad:' },
	fr: { selectLanguage: 'Choisir la langue', breadcrumb: "Fil d'Ariane", browse: 'Parcourir', skipToContent: 'Aller au contenu principal', support: 'Support', privacy: 'Confidentialité', terms: 'Conditions', affiliateDisclosure: 'Divulgation d’affiliation', featureList: 'Liste des fonctions', pricingPlans: 'Tarifs', buyerReviewsNav: 'Avis acheteurs', forums: 'Forum', blog: 'Forum', officialResources: 'Ressources officielles Destiny 2', officialResourcesLead: 'Découvrez le jeu via des références officielles et communautaires :' },
	de: { selectLanguage: 'Sprache wählen', breadcrumb: 'Brotkrumen', browse: 'Durchsuchen', skipToContent: 'Zum Hauptinhalt springen', support: 'Support', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen', affiliateDisclosure: 'Affiliate-Hinweis', featureList: 'Funktionsliste', pricingPlans: 'Preise', buyerReviewsNav: 'Käuferbewertungen', forums: 'Forum', blog: 'Forum', officialResources: 'Offizielle Destiny-2-Ressourcen', officialResourcesLead: 'Lerne das Spiel mit offiziellen und Community-Quellen:' },
	pt: { selectLanguage: 'Selecionar idioma', breadcrumb: 'Trilha', browse: 'Navegar', skipToContent: 'Ir para o conteúdo principal', support: 'Suporte', privacy: 'Privacidade', terms: 'Termos', affiliateDisclosure: 'Divulgação de afiliados', featureList: 'Lista de recursos', pricingPlans: 'Planos', buyerReviewsNav: 'Avaliações', forums: 'Fórum', blog: 'Fórum', officialResources: 'Recursos oficiais de Destiny 2', officialResourcesLead: 'Aprenda o jogo com referências oficiais e da comunidade:' },
	it: { selectLanguage: 'Seleziona lingua', breadcrumb: 'Percorso', browse: 'Sfoglia', skipToContent: 'Vai al contenuto principale', support: 'Supporto', privacy: 'Privacy', terms: 'Termini', affiliateDisclosure: 'Informativa affiliati', featureList: 'Elenco funzioni', pricingPlans: 'Prezzi', buyerReviewsNav: 'Recensioni', forums: 'Forum', blog: 'Forum', officialResources: 'Risorse ufficiali Destiny 2', officialResourcesLead: 'Scopri il gioco con riferimenti ufficiali e della community:' },
	nl: { selectLanguage: 'Taal kiezen', breadcrumb: 'Broodkruimels', browse: 'Bladeren', skipToContent: 'Ga naar hoofdinhoud', support: 'Support', privacy: 'Privacy', terms: 'Voorwaarden', affiliateDisclosure: 'Affiliate-disclaimer', featureList: 'Functielijst', pricingPlans: 'Prijzen', buyerReviewsNav: 'Reviews', forums: 'Forum', blog: 'Forum', officialResources: 'Officiële Destiny 2-bronnen', officialResourcesLead: 'Leer het spel via officiële en community-bronnen:' },
	pl: { selectLanguage: 'Wybierz język', breadcrumb: 'Ścieżka', browse: 'Przeglądaj', skipToContent: 'Przejdź do treści', support: 'Wsparcie', privacy: 'Prywatność', terms: 'Regulamin', affiliateDisclosure: 'Informacja partnerska', featureList: 'Lista funkcji', pricingPlans: 'Cennik', buyerReviewsNav: 'Opinie', forums: 'Forum', blog: 'Forum', officialResources: 'Oficjalne zasoby Destiny 2', officialResourcesLead: 'Poznaj grę dzięki oficjalnym i społecznościowym źródłom:' },
	ru: { selectLanguage: 'Выбрать язык', breadcrumb: 'Навигация', browse: 'Обзор', skipToContent: 'Перейти к содержимому', support: 'Поддержка', privacy: 'Конфиденциальность', terms: 'Условия', affiliateDisclosure: 'Раскрытие партнёрских ссылок', featureList: 'Список функций', pricingPlans: 'Цены', buyerReviewsNav: 'Отзывы', forums: 'Форум', blog: 'Форум', officialResources: 'Официальные ресурсы Destiny 2', officialResourcesLead: 'Изучайте игру по официальным и community-источникам:' },
	tr: { selectLanguage: 'Dil seç', breadcrumb: 'Konum', browse: 'Gözat', skipToContent: 'Ana içeriğe geç', support: 'Destek', privacy: 'Gizlilik', terms: 'Şartlar', affiliateDisclosure: 'Satış ortaklığı açıklaması', featureList: 'Özellik listesi', pricingPlans: 'Fiyatlar', buyerReviewsNav: 'Yorumlar', forums: 'Forum', blog: 'Forum', officialResources: 'Resmi Destiny 2 kaynakları', officialResourcesLead: 'Oyunu resmi ve topluluk kaynaklarıyla öğrenin:' },
	ar: { selectLanguage: 'اختر اللغة', breadcrumb: 'مسار', browse: 'تصفح', skipToContent: 'انتقل إلى المحتوى الرئيسي', support: 'الدعم', privacy: 'الخصوصية', terms: 'الشروط', affiliateDisclosure: 'إفصاح الروابط التابعة', featureList: 'قائمة الميزات', pricingPlans: 'الأسعار', buyerReviewsNav: 'مراجعات', forums: 'المنتدى', blog: 'المنتدى', officialResources: 'مصادر Destiny 2 الرسمية', officialResourcesLead: 'تعلّم اللعبة من المصادر الرسمية والمجتمع:' },
	ja: { selectLanguage: '言語を選択', breadcrumb: 'パンくず', browse: '閲覧', skipToContent: 'メインコンテンツへスキップ', support: 'サポート', privacy: 'プライバシー', terms: '利用規約', affiliateDisclosure: 'アフィリエイト開示', featureList: '機能一覧', pricingPlans: '料金', buyerReviewsNav: 'レビュー', forums: 'フォーラム', blog: 'フォーラム', officialResources: 'Destiny 2 公式リソース', officialResourcesLead: '公式およびコミュニティの資料でゲームを学ぶ:' },
	ko: { selectLanguage: '언어 선택', breadcrumb: '경로', browse: '탐색', skipToContent: '본문으로 건너뛰기', support: '지원', privacy: '개인정보', terms: '약관', affiliateDisclosure: '제휴 고지', featureList: '기능 목록', pricingPlans: '요금', buyerReviewsNav: '리뷰', forums: '포럼', blog: '포럼', officialResources: 'Destiny 2 공식 리소스', officialResourcesLead: '공식 및 커뮤니티 자료로 게임을 배우세요:' },
	zh: { selectLanguage: '选择语言', breadcrumb: '导航路径', browse: '浏览', skipToContent: '跳到主要内容', support: '支持', privacy: '隐私', terms: '条款', affiliateDisclosure: '联盟披露', featureList: '功能列表', pricingPlans: '价格', buyerReviewsNav: '买家评价', forums: '论坛', blog: '论坛', officialResources: 'Destiny 2 官方资源', officialResourcesLead: '通过官方和社区资料了解游戏：' },
	hi: { selectLanguage: 'भाषा चुनें', breadcrumb: 'ब्रेडक्रंब', browse: 'ब्राउज़', skipToContent: 'मुख्य सामग्री पर जाएँ', support: 'सहायता', privacy: 'गोपनीयता', terms: 'नियम', affiliateDisclosure: 'सहबद्ध प्रकटीकरण', featureList: 'फ़ीचर सूची', pricingPlans: 'मूल्य', buyerReviewsNav: 'समीक्षाएँ', forums: 'फ़ोरम', blog: 'फ़ोरम', officialResources: 'आधिकारिक Destiny 2 संसाधन', officialResourcesLead: 'आधिकारिक और community संदर्भों से गेम सीखें:' },
	id: { selectLanguage: 'Pilih bahasa', breadcrumb: 'Jejak', browse: 'Jelajahi', skipToContent: 'Lewati ke konten utama', support: 'Dukungan', privacy: 'Privasi', terms: 'Ketentuan', affiliateDisclosure: 'Pengungkapan afiliasi', featureList: 'Daftar fitur', pricingPlans: 'Harga', buyerReviewsNav: 'Ulasan', forums: 'Forum', blog: 'Forum', officialResources: 'Sumber resmi Destiny 2', officialResourcesLead: 'Pelajari game dari referensi resmi dan komunitas:' },
	th: { selectLanguage: 'เลือกภาษา', breadcrumb: 'เส้นทาง', browse: 'เรียกดู', skipToContent: 'ข้ามไปเนื้อหาหลัก', support: 'ช่วยเหลือ', privacy: 'ความเป็นส่วนตัว', terms: 'ข้อกำหนด', affiliateDisclosure: 'การเปิดเผยพันธมิตร', featureList: 'รายการฟีเจอร์', pricingPlans: 'ราคา', buyerReviewsNav: 'รีวิว', forums: 'ฟอรั่ม', blog: 'ฟอรั่ม', officialResources: 'แหล่งข้อมูล Destiny 2 อย่างเป็นทางการ', officialResourcesLead: 'เรียนรู้เกมจากแหล่งทางการและชุมชน:' },
	vi: { selectLanguage: 'Chọn ngôn ngữ', breadcrumb: 'Đường dẫn', browse: 'Duyệt', skipToContent: 'Chuyển đến nội dung chính', support: 'Hỗ trợ', privacy: 'Quyền riêng tư', terms: 'Điều khoản', affiliateDisclosure: 'Công bố liên kết tiếp thị', featureList: 'Danh sách tính năng', pricingPlans: 'Giá', buyerReviewsNav: 'Đánh giá', forums: 'Diễn đàn', blog: 'Diễn đàn', officialResources: 'Tài nguyên Destiny 2 chính thức', officialResourcesLead: 'Tìm hiểu game qua nguồn chính thức và cộng đồng:' },
	uk: { selectLanguage: 'Обрати мову', breadcrumb: 'Навігація', browse: 'Огляд', skipToContent: 'Перейти до вмісту', support: 'Підтримка', privacy: 'Конфіденційність', terms: 'Умови', affiliateDisclosure: 'Розкриття партнерських посилань', featureList: 'Список функцій', pricingPlans: 'Ціни', buyerReviewsNav: 'Відгуки', forums: 'Форум', blog: 'Форум', officialResources: 'Офіційні ресурси Destiny 2', officialResourcesLead: 'Вивчайте гру за офіційними та community-джерелами:' },
	cs: { selectLanguage: 'Vybrat jazyk', breadcrumb: 'Navigace', browse: 'Procházet', skipToContent: 'Přejít na hlavní obsah', support: 'Podpora', privacy: 'Soukromí', terms: 'Podmínky', affiliateDisclosure: 'Affiliate prohlášení', featureList: 'Seznam funkcí', pricingPlans: 'Ceny', buyerReviewsNav: 'Recenze', forums: 'Fórum', blog: 'Fórum', officialResources: 'Oficiální zdroje Destiny 2', officialResourcesLead: 'Naučte se hru z oficiálních a komunitních zdrojů:' },
	ro: { selectLanguage: 'Selectează limba', breadcrumb: 'Traseu', browse: 'Răsfoiește', skipToContent: 'Sari la conținut', support: 'Suport', privacy: 'Confidențialitate', terms: 'Termeni', affiliateDisclosure: 'Dezvăluire afiliere', featureList: 'Listă funcții', pricingPlans: 'Prețuri', buyerReviewsNav: 'Recenzii', forums: 'Forum', blog: 'Forum', officialResources: 'Resurse oficiale Destiny 2', officialResourcesLead: 'Învățați jocul din surse oficiale și comunitare:' },
	sv: { selectLanguage: 'Välj språk', breadcrumb: 'Sökväg', browse: 'Bläddra', skipToContent: 'Hoppa till huvudinnehåll', support: 'Support', privacy: 'Integritet', terms: 'Villkor', affiliateDisclosure: 'Affiliate-information', featureList: 'Funktionslista', pricingPlans: 'Priser', buyerReviewsNav: 'Recensioner', forums: 'Forum', blog: 'Forum', officialResources: 'Officiella Destiny 2-resurser', officialResourcesLead: 'Lär dig spelet via officiella och community-källor:' },
};

const reviewExtras = {
	readFullReview: 'Read full review',
	readyToTry: 'Ready to try {{brand}}?',
	comparePricing: 'Compare pricing',
	buyNowPrice: 'Buy Now — ${{price}}',
	verifiedBuyer: 'Verified buyer',
};

export const reviewChrome: Record<LocaleCode, ReviewChrome> = {
	en: { buyerReviews: '{{count}} buyer reviews', averageAria: '{{rating}} average from {{count}} reviews', outOfFiveAria: '{{rating}} out of 5', readAll: 'Read all reviews →', ...reviewExtras },
	es: { buyerReviews: '{{count}} reseñas de compradores', averageAria: '{{rating}} de media de {{count}} reseñas', outOfFiveAria: '{{rating}} de 5', readAll: 'Ver todas las reseñas →', readFullReview: 'Leer reseña completa', readyToTry: '¿Listo para probar {{brand}}?', comparePricing: 'Comparar precios', buyNowPrice: 'Comprar — ${{price}}', verifiedBuyer: 'Comprador verificado' },
	fr: { buyerReviews: '{{count}} avis acheteurs', averageAria: '{{rating}} en moyenne sur {{count}} avis', outOfFiveAria: '{{rating}} sur 5', readAll: 'Voir tous les avis →' },
	de: { buyerReviews: '{{count}} Käuferbewertungen', averageAria: '{{rating}} Durchschnitt aus {{count}} Bewertungen', outOfFiveAria: '{{rating}} von 5', readAll: 'Alle Bewertungen →' },
	pt: { buyerReviews: '{{count}} avaliações de compradores', averageAria: '{{rating}} média de {{count}} avaliações', outOfFiveAria: '{{rating}} de 5', readAll: 'Ver todas as avaliações →' },
	it: { buyerReviews: '{{count}} recensioni acquirenti', averageAria: '{{rating}} media da {{count}} recensioni', outOfFiveAria: '{{rating}} su 5', readAll: 'Leggi tutte le recensioni →' },
	nl: { buyerReviews: '{{count}} kopersreviews', averageAria: '{{rating}} gemiddeld uit {{count}} reviews', outOfFiveAria: '{{rating}} van 5', readAll: 'Alle reviews →' },
	pl: { buyerReviews: '{{count}} opinii kupujących', averageAria: '{{rating}} średnia z {{count}} opinii', outOfFiveAria: '{{rating}} na 5', readAll: 'Wszystkie opinie →' },
	ru: { buyerReviews: '{{count}} отзывов покупателей', averageAria: '{{rating}} средняя из {{count}} отзывов', outOfFiveAria: '{{rating}} из 5', readAll: 'Все отзывы →' },
	tr: { buyerReviews: '{{count}} alıcı yorumu', averageAria: '{{count}} yorumdan {{rating}} ortalama', outOfFiveAria: '5 üzerinden {{rating}}', readAll: 'Tüm yorumlar →' },
	ar: { buyerReviews: '{{count}} مراجعة للمشترين', averageAria: 'متوسط {{rating}} من {{count}} مراجعة', outOfFiveAria: '{{rating}} من 5', readAll: 'كل المراجعات →' },
	ja: { buyerReviews: '購入者レビュー {{count}}件', averageAria: '{{count}}件のレビューで平均{{rating}}', outOfFiveAria: '5点中{{rating}}', readAll: 'すべてのレビュー →' },
	ko: { buyerReviews: '구매자 리뷰 {{count}}개', averageAria: '{{count}}개 리뷰 평균 {{rating}}', outOfFiveAria: '5점 만점에 {{rating}}', readAll: '전체 리뷰 →' },
	zh: { buyerReviews: '{{count}} 条买家评价', averageAria: '{{count}} 条评价平均 {{rating}}', outOfFiveAria: '{{rating}} / 5', readAll: '查看全部评价 →' },
	hi: { buyerReviews: '{{count}} खरीदार समीक्षाएँ', averageAria: '{{count}} समीक्षाओं से औसत {{rating}}', outOfFiveAria: '5 में {{rating}}', readAll: 'सभी समीक्षाएँ →' },
	id: { buyerReviews: '{{count}} ulasan pembeli', averageAria: 'Rata-rata {{rating}} dari {{count}} ulasan', outOfFiveAria: '{{rating}} dari 5', readAll: 'Semua ulasan →' },
	th: { buyerReviews: '{{count}} รีวิวจากผู้ซื้อ', averageAria: 'คะแนนเฉลี่ย {{rating}} จาก {{count}} รีวิว', outOfFiveAria: '{{rating}} จาก 5', readAll: 'รีวิวทั้งหมด →' },
	vi: { buyerReviews: '{{count}} đánh giá người mua', averageAria: 'Trung bình {{rating}} từ {{count}} đánh giá', outOfFiveAria: '{{rating}} / 5', readAll: 'Xem tất cả đánh giá →' },
	uk: { buyerReviews: '{{count}} відгуків покупців', averageAria: '{{rating}} середнє з {{count}} відгуків', outOfFiveAria: '{{rating}} з 5', readAll: 'Усі відгуки →' },
	cs: { buyerReviews: '{{count}} recenzí kupujících', averageAria: 'Průměr {{rating}} z {{count}} recenzí', outOfFiveAria: '{{rating}} z 5', readAll: 'Všechny recenze →' },
	ro: { buyerReviews: '{{count}} recenzii cumpărători', averageAria: 'Medie {{rating}} din {{count}} recenzii', outOfFiveAria: '{{rating}} din 5', readAll: 'Toate recenziile →' },
	sv: { buyerReviews: '{{count}} köparrecensioner', averageAria: '{{rating}} snitt från {{count}} recensioner', outOfFiveAria: '{{rating}} av 5', readAll: 'Alla recensioner →' },
};

export const a11yChrome: Record<LocaleCode, A11yChrome> = {
	en: { skipToContent: 'Skip to main content', notFoundTitle: 'Page not found', notFoundText: 'This URL is not on our site. Use the links below for cheats, store, and setup.', notFoundBackHome: 'Back to home', forumCommunity: 'Community', forumDiscussion: 'Discussion ({{count}})', replies: 'replies', viewAllFaq: 'View all FAQ answers', answer: 'Answer' },
	es: { skipToContent: 'Saltar al contenido principal', notFoundTitle: 'Página no encontrada', notFoundText: 'Esta URL no está en nuestro sitio. Usa los enlaces para trucos, tienda e instalación.', notFoundBackHome: 'Volver al inicio', forumCommunity: 'Comunidad', forumDiscussion: 'Debate ({{count}})', replies: 'respuestas', viewAllFaq: 'Ver todas las FAQ', answer: 'Respuesta' },
	fr: { skipToContent: 'Aller au contenu principal', notFoundTitle: 'Page introuvable', notFoundText: 'Cette URL n\'existe pas sur notre site. Utilisez les liens pour triches, boutique et installation.', notFoundBackHome: 'Retour à l\'accueil', forumCommunity: 'Communauté', forumDiscussion: 'Discussion ({{count}})', replies: 'réponses', viewAllFaq: 'Voir toutes les FAQ', answer: 'Réponse' },
	de: { skipToContent: 'Zum Hauptinhalt springen', notFoundTitle: 'Seite nicht gefunden', notFoundText: 'Diese URL gibt es nicht auf unserer Seite. Nutze die Links für Cheats, Shop und Setup.', notFoundBackHome: 'Zur Startseite', forumCommunity: 'Community', forumDiscussion: 'Diskussion ({{count}})', replies: 'Antworten', viewAllFaq: 'Alle FAQ anzeigen', answer: 'Antwort' },
	pt: { skipToContent: 'Ir para o conteúdo principal', notFoundTitle: 'Página não encontrada', notFoundText: 'Este URL não existe no nosso site. Use os links para cheats, loja e instalação.', notFoundBackHome: 'Voltar ao início', forumCommunity: 'Comunidade', forumDiscussion: 'Discussão ({{count}})', replies: 'respostas', viewAllFaq: 'Ver todas as FAQ', answer: 'Resposta' },
	it: { skipToContent: 'Vai al contenuto principale', notFoundTitle: 'Pagina non trovata', notFoundText: 'Questo URL non esiste sul nostro sito. Usa i link per cheat, negozio e setup.', notFoundBackHome: 'Torna alla home', forumCommunity: 'Community', forumDiscussion: 'Discussione ({{count}})', replies: 'risposte', viewAllFaq: 'Vedi tutte le FAQ', answer: 'Risposta' },
	nl: { skipToContent: 'Ga naar hoofdinhoud', notFoundTitle: 'Pagina niet gevonden', notFoundText: 'Deze URL bestaat niet op onze site. Gebruik de links voor cheats, winkel en setup.', notFoundBackHome: 'Terug naar home', forumCommunity: 'Community', forumDiscussion: 'Discussie ({{count}})', replies: 'reacties', viewAllFaq: 'Alle FAQ bekijken', answer: 'Antwoord' },
	pl: { skipToContent: 'Przejdź do treści', notFoundTitle: 'Nie znaleziono strony', notFoundText: 'Ten adres nie istnieje na naszej stronie. Użyj linków do cheatów, sklepu i instalacji.', notFoundBackHome: 'Wróć na stronę główną', forumCommunity: 'Społeczność', forumDiscussion: 'Dyskusja ({{count}})', replies: 'odpowiedzi', viewAllFaq: 'Zobacz wszystkie FAQ', answer: 'Odpowiedź' },
	ru: { skipToContent: 'Перейти к содержимому', notFoundTitle: 'Страница не найдена', notFoundText: 'Этого URL нет на сайте. Используйте ссылки на читы, магазин и установку.', notFoundBackHome: 'На главную', forumCommunity: 'Сообщество', forumDiscussion: 'Обсуждение ({{count}})', replies: 'ответов', viewAllFaq: 'Все FAQ', answer: 'Ответ' },
	tr: { skipToContent: 'Ana içeriğe geç', notFoundTitle: 'Sayfa bulunamadı', notFoundText: 'Bu URL sitemizde yok. Hileler, mağaza ve kurulum için bağlantıları kullanın.', notFoundBackHome: 'Ana sayfaya dön', forumCommunity: 'Topluluk', forumDiscussion: 'Tartışma ({{count}})', replies: 'yanıt', viewAllFaq: 'Tüm SSS', answer: 'Cevap' },
	ar: { skipToContent: 'انتقل إلى المحتوى الرئيسي', notFoundTitle: 'الصفحة غير موجودة', notFoundText: 'هذا الرابط غير موجود على موقعنا. استخدم الروابط للغش والمتجر والتثبيت.', notFoundBackHome: 'العودة للرئيسية', forumCommunity: 'المجتمع', forumDiscussion: 'نقاش ({{count}})', replies: 'ردود', viewAllFaq: 'كل الأسئلة', answer: 'إجابة' },
	ja: { skipToContent: 'メインコンテンツへスキップ', notFoundTitle: 'ページが見つかりません', notFoundText: 'このURLはサイトにありません。チート、ストア、セットアップのリンクをご利用ください。', notFoundBackHome: 'ホームに戻る', forumCommunity: 'コミュニティ', forumDiscussion: 'ディスカッション ({{count}})', replies: '件の返信', viewAllFaq: 'FAQをすべて見る', answer: '回答' },
	ko: { skipToContent: '본문으로 건너뛰기', notFoundTitle: '페이지를 찾을 수 없습니다', notFoundText: '이 URL은 사이트에 없습니다. 치트, 스토어, 설치 링크를 이용하세요.', notFoundBackHome: '홈으로', forumCommunity: '커뮤니티', forumDiscussion: '토론 ({{count}})', replies: '개 답글', viewAllFaq: 'FAQ 전체 보기', answer: '답변' },
	zh: { skipToContent: '跳到主要内容', notFoundTitle: '页面未找到', notFoundText: '此链接不在本站。请使用下方作弊、商店和安装链接。', notFoundBackHome: '返回首页', forumCommunity: '社区', forumDiscussion: '讨论 ({{count}})', replies: '条回复', viewAllFaq: '查看全部常见问题', answer: '回答' },
	hi: { skipToContent: 'मुख्य सामग्री पर जाएँ', notFoundTitle: 'पेज नहीं मिला', notFoundText: 'यह URL हमारी साइट पर नहीं है। चीट, स्टोर और सेटअप के लिंक उपयोग करें।', notFoundBackHome: 'होम पर वापस', forumCommunity: 'समुदाय', forumDiscussion: 'चर्चा ({{count}})', replies: 'जवाब', viewAllFaq: 'सभी FAQ', answer: 'उत्तर' },
	id: { skipToContent: 'Lewati ke konten utama', notFoundTitle: 'Halaman tidak ditemukan', notFoundText: 'URL ini tidak ada di situs kami. Gunakan tautan cheat, toko, dan setup.', notFoundBackHome: 'Kembali ke beranda', forumCommunity: 'Komunitas', forumDiscussion: 'Diskusi ({{count}})', replies: 'balasan', viewAllFaq: 'Semua FAQ', answer: 'Jawaban' },
	th: { skipToContent: 'ข้ามไปเนื้อหาหลัก', notFoundTitle: 'ไม่พบหน้า', notFoundText: 'URL นี้ไม่มีในเว็บไซต์ ใช้ลิงก์สำหรับสูตร ร้านค้า และการติดตั้ง', notFoundBackHome: 'กลับหน้าแรก', forumCommunity: 'ชุมชน', forumDiscussion: 'การสนทนา ({{count}})', replies: 'ตอบกลับ', viewAllFaq: 'FAQ ทั้งหมด', answer: 'คำตอบ' },
	vi: { skipToContent: 'Chuyển đến nội dung chính', notFoundTitle: 'Không tìm thấy trang', notFoundText: 'URL này không có trên site. Dùng liên kết cheat, cửa hàng và cài đặt.', notFoundBackHome: 'Về trang chủ', forumCommunity: 'Cộng đồng', forumDiscussion: 'Thảo luận ({{count}})', replies: 'phản hồi', viewAllFaq: 'Tất cả FAQ', answer: 'Trả lời' },
	uk: { skipToContent: 'Перейти до вмісту', notFoundTitle: 'Сторінку не знайдено', notFoundText: 'Цього URL немає на сайті. Скористайтеся посиланнями на чіти, магазин і встановлення.', notFoundBackHome: 'На головну', forumCommunity: 'Спільнота', forumDiscussion: 'Обговорення ({{count}})', replies: 'відповідей', viewAllFaq: 'Усі FAQ', answer: 'Відповідь' },
	cs: { skipToContent: 'Přejít na hlavní obsah', notFoundTitle: 'Stránka nenalezena', notFoundText: 'Tato URL na webu neexistuje. Použijte odkazy na cheaty, obchod a instalaci.', notFoundBackHome: 'Zpět na úvod', forumCommunity: 'Komunita', forumDiscussion: 'Diskuze ({{count}})', replies: 'odpovědí', viewAllFaq: 'Všechny FAQ', answer: 'Odpověď' },
	ro: { skipToContent: 'Sari la conținut', notFoundTitle: 'Pagină negăsită', notFoundText: 'Acest URL nu există pe site. Folosiți linkurile pentru cheats, magazin și instalare.', notFoundBackHome: 'Înapoi acasă', forumCommunity: 'Comunitate', forumDiscussion: 'Discuție ({{count}})', replies: 'răspunsuri', viewAllFaq: 'Toate FAQ', answer: 'Răspuns' },
	sv: { skipToContent: 'Hoppa till huvudinnehåll', notFoundTitle: 'Sidan hittades inte', notFoundText: 'Denna URL finns inte på webbplatsen. Använd länkarna för cheats, butik och installation.', notFoundBackHome: 'Tillbaka hem', forumCommunity: 'Community', forumDiscussion: 'Diskussion ({{count}})', replies: 'svar', viewAllFaq: 'Alla FAQ', answer: 'Svar' },
};

const chipLabels: Record<LocaleCode, { chipEsp: string; chipAim: string; chipRadar: string; chipUpdates: string }> = {
	en: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: '2D radar', chipUpdates: 'Patch updates' },
	es: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: 'Radar 2D', chipUpdates: 'Actualizaciones' },
	fr: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: 'Radar 2D', chipUpdates: 'Mises à jour' },
	de: { chipEsp: 'ESP / Wallhack', chipAim: 'Soft Aim', chipRadar: '2D-Radar', chipUpdates: 'Updates' },
	pt: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: 'Radar 2D', chipUpdates: 'Atualizações' },
	it: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: 'Radar 2D', chipUpdates: 'Aggiornamenti' },
	nl: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: '2D-radar', chipUpdates: 'Updates' },
	pl: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: 'Radar 2D', chipUpdates: 'Aktualizacje' },
	ru: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: '2D радар', chipUpdates: 'Обновления' },
	tr: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: '2D radar', chipUpdates: 'Güncellemeler' },
	ar: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: 'رادار ثنائي', chipUpdates: 'تحديثات' },
	ja: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: '2Dレーダー', chipUpdates: 'アップデート' },
	ko: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: '2D 레이더', chipUpdates: '업데이트' },
	zh: { chipEsp: 'ESP / 透视', chipAim: 'Soft aim', chipRadar: '2D雷达', chipUpdates: '更新' },
	hi: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: '2D रडार', chipUpdates: 'अपडेट' },
	id: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: 'Radar 2D', chipUpdates: 'Pembaruan' },
	th: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: 'เรดาร์ 2D', chipUpdates: 'อัปเดต' },
	vi: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: 'Radar 2D', chipUpdates: 'Cập nhật' },
	uk: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: '2D радар', chipUpdates: 'Оновлення' },
	cs: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: '2D radar', chipUpdates: 'Aktualizace' },
	ro: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: 'Radar 2D', chipUpdates: 'Actualizări' },
	sv: { chipEsp: 'ESP / wallhack', chipAim: 'Soft aim', chipRadar: '2D-radar', chipUpdates: 'Uppdateringar' },
};

export function getChipLabels(locale: LocaleCode) {
	return chipLabels[locale] ?? chipLabels.en;
}

/** Localized "from" prefix for hero pricing. */
export const priceFromLabels: Record<LocaleCode, string> = {
	en: 'from',
	es: 'desde',
	fr: 'dès',
	de: 'ab',
	pt: 'desde',
	it: 'da',
	nl: 'vanaf',
	pl: 'od',
	ru: 'от',
	tr: 'den',
	ar: 'من',
	ja: 'から',
	ko: '부터',
	zh: '起',
	hi: 'से',
	id: 'dari',
	th: 'จาก',
	vi: 'từ',
	uk: 'від',
	cs: 'od',
	ro: 'de la',
	sv: 'från',
};

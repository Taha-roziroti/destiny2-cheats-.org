import type { LocaleCode } from './i18n/locales';

export type AffiliateCopy = {
	/** Visible inline disclosure (section 5). */
	disclosure: string;
	/** Optional short label beside buy buttons. */
	shortLabel: string;
	/** Footer / nav link text. */
	navLabel: string;
};

const EN: AffiliateCopy = {
	disclosure:
		'Some links on this site are affiliate links. If you buy through them, we may earn a commission at no extra cost to you.',
	shortLabel: 'Affiliate link',
	navLabel: 'Affiliate disclosure',
};

/** Single source of truth — edit EN here; other locales follow the same meaning. */
export const affiliateCopyByLocale: Record<LocaleCode, AffiliateCopy> = {
	en: EN,
	es: {
		disclosure:
			'Algunos enlaces de este sitio son enlaces de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste extra para ti.',
		shortLabel: 'Enlace de afiliado',
		navLabel: 'Divulgación de afiliados',
	},
	fr: {
		disclosure:
			'Certains liens sur ce site sont des liens affiliés. Si vous achetez via ces liens, nous pouvons percevoir une commission sans surcoût pour vous.',
		shortLabel: 'Lien affilié',
		navLabel: 'Divulgation d’affiliation',
	},
	de: {
		disclosure:
			'Einige Links auf dieser Website sind Affiliate-Links. Wenn du darüber kaufst, erhalten wir ggf. eine Provision ohne Mehrkosten für dich.',
		shortLabel: 'Affiliate-Link',
		navLabel: 'Affiliate-Hinweis',
	},
	pt: {
		disclosure:
			'Alguns links neste site são links de afiliados. Se comprar por eles, podemos receber uma comissão sem custo extra para você.',
		shortLabel: 'Link de afiliado',
		navLabel: 'Divulgação de afiliados',
	},
	it: {
		disclosure:
			'Alcuni link su questo sito sono link di affiliazione. Se acquisti tramite essi, possiamo ricevere una commissione senza costi extra per te.',
		shortLabel: 'Link affiliato',
		navLabel: 'Informativa affiliati',
	},
	nl: {
		disclosure:
			'Sommige links op deze site zijn affiliate-links. Als je via deze links koopt, kunnen wij een commissie ontvangen zonder extra kosten voor jou.',
		shortLabel: 'Affiliatelink',
		navLabel: 'Affiliate-disclaimer',
	},
	pl: {
		disclosure:
			'Niektóre linki na tej stronie to linki partnerskie. Jeśli kupisz przez nie, możemy otrzymać prowizję bez dodatkowych kosztów dla Ciebie.',
		shortLabel: 'Link partnerski',
		navLabel: 'Informacja o linkach partnerskich',
	},
	ru: {
		disclosure:
			'Некоторые ссылки на этом сайте являются партнёрскими. Если вы покупаете по ним, мы можем получить комиссию без дополнительных расходов для вас.',
		shortLabel: 'Партнёрская ссылка',
		navLabel: 'Раскрытие партнёрских ссылок',
	},
	tr: {
		disclosure:
			'Bu sitedeki bazı bağlantılar satış ortaklığı bağlantılarıdır. Bu bağlantılar üzerinden satın alırsanız, sizden ek ücret alınmadan komisyon kazanabiliriz.',
		shortLabel: 'Satış ortaklığı bağlantısı',
		navLabel: 'Satış ortaklığı açıklaması',
	},
	ar: {
		disclosure:
			'بعض الروابط في هذا الموقع روابط تابعة. إذا اشتريت عبرها، قد نحصل على عمولة دون تكلفة إضافية عليك.',
		shortLabel: 'رابط تابع',
		navLabel: 'إفصاح الروابط التابعة',
	},
	ja: {
		disclosure:
			'このサイトの一部のリンクはアフィリエイトリンクです。それらから購入した場合、追加費用なしで当サイトが報酬を得ることがあります。',
		shortLabel: 'アフィリエイトリンク',
		navLabel: 'アフィリエイト開示',
	},
	ko: {
		disclosure:
			'이 사이트의 일부 링크는 제휴 링크입니다. 해당 링크를 통해 구매하면 추가 비용 없이 수수료를 받을 수 있습니다.',
		shortLabel: '제휴 링크',
		navLabel: '제휴 고지',
	},
	zh: {
		disclosure:
			'本网站部分链接为联盟链接。若您通过此类链接购买，我们可能在您无需额外付费的情况下获得佣金。',
		shortLabel: '联盟链接',
		navLabel: '联盟披露',
	},
	hi: {
		disclosure:
			'इस साइट के कुछ लिंक सहबद्ध (affiliate) लिंक हैं। इनके ज़रिए खरीदने पर हमें बिना आप पर अतिरिक्त लागत के कमीशन मिल सकता है।',
		shortLabel: 'सहबद्ध लिंक',
		navLabel: 'सहबद्ध प्रकटीकरण',
	},
	id: {
		disclosure:
			'Beberapa tautan di situs ini adalah tautan afiliasi. Jika Anda membeli melalui tautan tersebut, kami dapat menerima komisi tanpa biaya tambahan untuk Anda.',
		shortLabel: 'Tautan afiliasi',
		navLabel: 'Pengungkapan afiliasi',
	},
	th: {
		disclosure:
			'ลิงก์บางส่วนบนเว็บไซต์นี้เป็นลิงก์พันธมิตร หากคุณซื้อผ่านลิงก์เหล่านั้น เราอาจได้รับค่าคอมมิชชันโดยไม่มีค่าใช้จ่ายเพิ่มสำหรับคุณ',
		shortLabel: 'ลิงก์พันธมิตร',
		navLabel: 'การเปิดเผยพันธมิตร',
	},
	vi: {
		disclosure:
			'Một số liên kết trên trang này là liên kết tiếp thị liên kết. Nếu bạn mua qua các liên kết đó, chúng tôi có thể nhận hoa hồng mà bạn không phải trả thêm.',
		shortLabel: 'Liên kết tiếp thị',
		navLabel: 'Công bố liên kết tiếp thị',
	},
	uk: {
		disclosure:
			'Деякі посилання на цьому сайті є партнерськими. Якщо ви купуєте через них, ми можемо отримати комісію без додаткових витрат для вас.',
		shortLabel: 'Партнерське посилання',
		navLabel: 'Розкриття партнерських посилань',
	},
	cs: {
		disclosure:
			'Některé odkazy na tomto webu jsou affiliate odkazy. Pokud nakoupíte prostřednictvím nich, můžeme získat provizi bez dalších nákladů pro vás.',
		shortLabel: 'Affiliate odkaz',
		navLabel: 'Affiliate prohlášení',
	},
	ro: {
		disclosure:
			'Unele linkuri de pe acest site sunt linkuri de afiliere. Dacă cumperi prin ele, putem primi un comision fără cost suplimentar pentru tine.',
		shortLabel: 'Link afiliat',
		navLabel: 'Dezvăluire afiliere',
	},
	sv: {
		disclosure:
			'Vissa länkar på den här webbplatsen är affiliate-länkar. Om du köper via dem kan vi få provision utan extra kostnad för dig.',
		shortLabel: 'Affiliatelänk',
		navLabel: 'Affiliate-information',
	},
};

export function getAffiliateCopy(locale: LocaleCode): AffiliateCopy {
	return affiliateCopyByLocale[locale] ?? EN;
}

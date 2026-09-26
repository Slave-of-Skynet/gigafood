console.log('its work');

// Полный словарь проекта на 3 языка (RU / MD / EN)
const dictionary = {
    ru: {
        login: 'Вход',
        nav: [
            'Готовая Кулинария (Гриль)',
            'Свежие овощи',
            'Мясной отдел',
            'Пекарня'
        ],
        categories: {
            grill: 'Готовая Кулинария (Гриль)',
            vegetables: 'Свежие овощи',
            meat: 'Мясной отдел',
            cookies: 'Пекарня'
        },
        compareTitle: 'Сравнение Характеристик',
        products: [
            {
                name: 'Термо-контейнер PP 360 мл (Горячая кулинария / СВЧ)',
                info: 'Базовый контейнер из первичного полипропилена (14.8 г). Выдерживает горячий розлив до +121°C и разогрев в СВЧ, но содержит 100% первичного пластика.'
            },
            {
                name: 'Ланч-бокс из тростниковой багассы (3 секции)',
                info: 'Биоразлагаемый бокс из прессованного тростникового волокна без пластиковой ламинации. Подходит для горячих блюд с гриля до +100°C и разогрева в микроволновке.'
            },
            {
                name: 'Крафт-супница с паровым клапаном и био-слоем',
                info: 'Термостойкий картонный стакан из сертифицированного FSC-картона с тонким барьерным био-слоем. Снижает долю первичного пластика более чем на 85% при фасовке горячих первых блюд.'
            },
            {
                name: 'Лоток из формованного волокна и контейнер 80% rPET',
                info: 'Облегчённый прозрачный контейнер на 80% из переработанного ПЭТ (всего 2.4 г первичного пластика). Оптимален для охлаждённых овощей и салатов (+2…+6°C), но не предназначен для СВЧ.'
            },
            {
                name: 'Салатник из переработанного rPET с крафт-манжетой',
                info: 'Прозрачная чаша из вторичного пищевого rPET с картонной обечайкой жёсткости. Позволяет уменьшить толщину стенок и сократить расход первичного полимера на 82%.'
            },
            {
                name: 'Картонный эко-лоток с целлюлозной сеткой для зелени',
                info: 'Полностью безпластиковая упаковка из гофрокартона и дышащей целлюлозной сетки. Защищает томаты и свежую зелень от конденсата на холодной витрине.'
            },
            {
                name: 'Скин-лоток PaperSeal и моно-лоток 85% rPET',
                info: 'Картонная основа с отделяемой тонкой барьерной плёнкой для вакуумной скин-упаковки охлаждённого мяса. Снижает массу пластика на единицу продукции на 75%.'
            },
            {
                name: 'Моно-ПЭТ лоток под запайку с крафт-этикеткой',
                info: 'Мономатериальный лоток из прозрачного rPET под герметичную запайку в модифицированной газовой среде (МГС). Полностью пригоден к вторичной переработке после использования.'
            },
            {
                name: 'Облегчённый барьерный вакуум-пакет (Thin-Gauge PE)',
                info: 'Тонкостенный коэкструзионный вакуумный пакет уменьшенной толщины. Сокращает вес первичного пластика на 40% при сохранении барьерных свойств и сроков годности стейков.'
            },
            {
                name: 'Крафт-пакет с био-окном из целлюлозы для хлеба',
                info: 'Пекарский пакет из неотбеленной крафт-бумаги с прозрачным окном из гидратцеллюлозы. Сохраняет хрустящую корочку горячего хлеба и не содержит первичного полипропилена.'
            },
            {
                name: 'Контейнер-ракушка 100% rPET для круассанов и слойки',
                info: 'Прозрачный блистер из 100% постпотребительского переработанного ПЭТ (0 г первичного пластика в корпусе). Защищает слоёную выпечку от смятия на витрине.'
            },
            {
                name: 'Коробка из FSC-крафта с прозрачным эко-окном для печенья',
                info: 'Жёсткая коробка из макулатурного картона с легко отделяемым прозрачным окном из rPET. Заменяет тяжёлые пластиковые коррексы в кондитерском отделе.'
            }
        ]
    },
    md: {
        login: 'Intră',
        nav: [
            'Culinărie Caldă (Grătar)',
            'Legume Proaspete',
            'Secția de Carne',
            'Brutărie & Patiserie'
        ],
        categories: {
            grill: 'Culinărie Caldă (Grătar)',
            vegetables: 'Legume Proaspete',
            meat: 'Secția de Carne',
            cookies: 'Brutărie & Patiserie'
        },
        compareTitle: 'Comparația Caracteristicilor',
        products: [
            {
                name: 'Termo-container PP 360 ml (Culinărie caldă / Microunde)',
                info: 'Container de bază din polipropilenă virgină (14.8 g). Rezistă la umplere fierbinte până la +121°C și reîncălzire la microunde, dar conține 100% plastic virgin.'
            },
            {
                name: 'Casoletă din bagasă de trestie de zahăr (3 compartimente)',
                info: 'Cutie biodegradabilă din fibră presată de trestie de zahăr fără laminare din plastic. Potrivită pentru preparate calde la grătar până la +100°C și microunde.'
            },
            {
                name: 'Bol kraft pentru supă cu supapă de abur și bio-strat',
                info: 'Pahar termorezistent din carton certificat FSC cu bio-strat barieră subțire. Reduce ponderea plasticului virgin cu peste 85% la ambalarea supelor fierbinți.'
            },
            {
                name: 'Tăviță din fibră turnată și container 80% rPET',
                info: 'Container transparent ușor realizat în proporție de 80% din PET reciclat (doar 2.4 g plastic virgin). Ideal pentru legume și salate refrigerate (+2…+6°C), incompatibil cu microundele.'
            },
            {
                name: 'Bol pentru salată din rPET reciclat cu manșon kraft',
                info: 'Bol alimentar transparent din rPET reciclat cu inel de rigidizare din carton. Permite subțierea pereților și reducerea consumului de polimer virgin cu 82%.'
            },
            {
                name: 'Eco-tăviță din carton cu plasă din celuloză pentru verdețuri',
                info: 'Ambalaj complet fără plastic din carton ondulat și plasă respirabilă din celuloză. Protejează roșiile și verdețurile proaspete împotriva condensului în vitrina frigorifică.'
            },
            {
                name: 'Tăviță skin PaperSeal și mono-tăviță 85% rPET',
                info: 'Bază din carton cu film barieră subțire detașabil pentru ambalarea skin în vid a cărnii refrigerate. Reduce masa de plastic pe unitate de produs cu 75%.'
            },
            {
                name: 'Tăviță mono-PET termosigilabilă cu etichetă kraft',
                info: 'Tăviță monomaterial din rPET transparent pentru sigilare ermetică în atmosferă modificată (MAP). Complet reciclabilă după utilizare.'
            },
            {
                name: 'Pungă vacuum barieră ușoară (Thin-Gauge PE)',
                info: 'Pungă de vid coextrudată cu pereți subțiri și grosime redusă. Scade greutatea plasticului virgin cu 40%, păstrând proprietățile de barieră și termenul de valabilitate.'
            },
            {
                name: 'Pungă kraft cu bio-fereastră din celuloză pentru pâine',
                info: 'Pungă de brutărie din hârtie kraft nealbită cu fereastră transparentă din celuloză hidratată. Păstrează crusta crocantă a pâinii calde fără polipropilenă virgină.'
            },
            {
                name: 'Casoletă clamshell 100% rPET pentru croissante și foietaje',
                info: 'Blister transparent din 100% PET reciclat post-consum (0 g plastic virgin în corp). Protejează produsele de patiserie împotriva deformării la raft.'
            },
            {
                name: 'Cutie din carton FSC kraft cu eco-fereastră pentru biscuiți',
                info: 'Cutie rigidă din carton reciclat cu fereastră transparentă din rPET ușor detașabilă. Înlocuiește suporturile grele din plastic din secția de cofetărie.'
            }
        ]
    },
    en: {
        login: 'Log In',
        nav: [
            'Hot Deli & Grill',
            'Fresh Vegetables',
            'Butchery & Meat',
            'Bakery'
        ],
        categories: {
            grill: 'Hot Deli & Grill',
            vegetables: 'Fresh Vegetables',
            meat: 'Butchery & Meat',
            cookies: 'Bakery'
        },
        compareTitle: 'Characteristic Comparison',
        products: [
            {
                name: 'PP 360 ml Thermal Container (Hot Deli / Microwave)',
                info: 'Baseline virgin polypropylene container (14.8 g). Withstands hot-fill up to +121°C and microwave reheating, but consists of 100% virgin plastic.'
            },
            {
                name: 'Sugarcane Bagasse Lunch Box (3-Compartment)',
                info: 'Biodegradable molded sugarcane fiber box with zero plastic lamination. Suitable for hot grilled meals up to +100°C and microwave reheating.'
            },
            {
                name: 'Kraft Soup Cup with Steam Vent & Bio-Lining',
                info: 'Heat-resistant FSC-certified paperboard cup with a thin bio-barrier lining. Cuts virgin plastic mass by over 85% for hot soups and stews.'
            },
            {
                name: 'Molded Fiber Tray & 80% rPET Produce Container',
                info: 'Lightweight clear container made with 80% recycled PET (only 2.4 g virgin plastic). Optimal for chilled produce and salads (+2…+6°C); not for microwave use.'
            },
            {
                name: 'Recycled rPET Salad Bowl with Kraft Belly Band',
                info: 'Food-grade recycled rPET bowl reinforced with a kraft paperboard sleeve. Enables thinner walls and reduces virgin polymer usage by 82%.'
            },
            {
                name: 'Cardboard Eco-Punnet with Cellulose Mesh for Herbs',
                info: '100% plastic-free corrugated punnet paired with breathable cellulose mesh. Protects cherry tomatoes and fresh herbs from condensation in chilled displays.'
            },
            {
                name: 'PaperSeal Skin-Pack Tray & 85% rPET Mono-Tray',
                info: 'Cardboard base with a peelable ultra-thin barrier liner for vacuum skin packaging of chilled meat. Reduces plastic weight per pack by 75%.'
            },
            {
                name: 'Heat-Sealable Mono-rPET Tray with Kraft Label',
                info: 'Mono-material clear rPET tray designed for modified atmosphere packaging (MAP) heat sealing. Fully recyclable in standard PET streams after use.'
            },
            {
                name: 'Lightweight Barrier Vacuum Pouch (Thin-Gauge PE)',
                info: 'Down-gauged co-extruded vacuum pouch. Cuts virgin plastic weight by 40% while preserving oxygen barrier performance and steak shelf life.'
            },
            {
                name: 'Kraft Bread Bag with Cellulose Bio-Window',
                info: 'Unbleached kraft bakery bag with a breathable hydrated-cellulose viewing window. Keeps artisan bread crusts crisp with zero virgin polypropylene.'
            },
            {
                name: '100% rPET Clamshell Container for Croissants & Pastries',
                info: 'Crystal-clear clamshell made from 100% post-consumer recycled PET (0 g virgin plastic in body). Protects delicate pastries on display.'
            },
            {
                name: 'FSC Kraft Cookie Box with Peelable rPET Eco-Window',
                info: 'Rigid recycled paperboard box with an easily separable rPET viewing window. Replaces heavy virgin-plastic blister trays in the bakery aisle.'
            }
        ]
    }
};

const langSelect = document.querySelector('.lang-select');
const loginBtn = document.querySelector('.log-in');
const grillTitle = document.querySelector('#grill');
const vegetablesTittle = document.querySelector('#vegetables');
const meatTittle = document.querySelector('#meat');
const cookiesTittle = document.querySelector('#cookies');
const newLinks = document.querySelectorAll('.desc-nav-bar');
const productNames = document.querySelectorAll('.name-product');
const productInfos = document.querySelectorAll('.info-product');
const compareTitles = document.querySelectorAll('.table-desc');

langSelect.addEventListener('change', () => {
    const t = dictionary[langSelect.value];
    newLinks.forEach((newLinks, index) => {
        newLinks.textContent = t.nav[index];
    });
    productNames.forEach((tittle, index) => {
        tittle.textContent = t.products[index].name;
    });
    productInfos.forEach((info, index) => {
        info.textContent = t.products[index].info;
    });
    compareTitles.forEach((heading) => {
        heading.textContent = t.compareTitle;
    });
    loginBtn.textContent = t.login;
    grillTitle.textContent = t.categories.grill;
    vegetablesTittle.textContent = t.categories.vegetables;
    meatTittle.textContent = t.categories.meat;
    cookiesTittle.textContent = t.categories.cookies;
});

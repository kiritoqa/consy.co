/* ==========================================================================
   Consy — automatic translation
   The page is written in English. If the visitor's browser prefers Russian
   or Ukrainian, the copy is swapped before main.js runs (it splits some
   headings into words, so the text must already be final).
   Russian and Ukrainian copy avoids IT jargon on purpose: the main visitors
   are specialists from other fields.
   Keys are the English HTML of each text block with whitespace collapsed.
   Test with ?lang=ru, ?lang=uk or ?lang=en.
   ========================================================================== */
(() => {
  const SUPPORTED = { ru: 'ru', be: 'ru', kk: 'ru', uk: 'uk' };
  const forced = new URLSearchParams(window.location.search).get('lang');
  const pick = () => {
    if (forced) return SUPPORTED[forced] || 'en';
    for (const tag of navigator.languages || [navigator.language || 'en']) {
      const base = String(tag).toLowerCase().split('-')[0];
      if (base === 'en') return 'en';
      if (SUPPORTED[base]) return SUPPORTED[base];
    }
    return 'en';
  };
  const lang = pick();
  if (lang === 'en') return;

  const T = {
    ru: {
      'Skip to content': 'Перейти к содержанию',
      '<span class="hero__title-a">You know your craft.</span> <span class="hero__title-b">I’ll make your product show it and <em>find its audience.</em></span>':
        '<span class="hero__title-a">Вы знаете своё дело.</span> <span class="hero__title-b">Я помогу вашему проекту это показать и <em>найти своих людей.</em></span>',
      'One partner for your entire launch.': 'Один человек на весь запуск.',
      'From positioning and brand identity to web, mobile and social. I build it as one system and take it live, so your product stays consistent as you scale.':
        'От того, как рассказать о вашем деле, и фирменного стиля до сайта, приложения и соцсетей. Я делаю всё как единое целое и довожу до запуска, чтобы ваш проект оставался цельным, когда растёт.',
      'Contact': 'Написать',
      'Plans': 'Пакеты',
      '<span class="about__dot" aria-hidden="true"></span>Limited availability': '<span class="about__dot" aria-hidden="true"></span>Свободных мест немного',
      'Selected work': 'Избранные работы',

      'Three ways to launch your product': 'Три способа запустить ваш проект',
      'Each package has a fixed scope, timeline and price. Not sure which one fits? Write to me, and we’ll choose it together.':
        'У каждого пакета понятный состав, срок и цена. Не знаете, какой подходит? Напишите мне, и мы выберем вместе.',
      'Launch': 'Старт',
      'You have an idea and want to show it to your first clients': 'У вас есть идея, и вы хотите показать её первым клиентам',
      'Visual strategy <span class="pkg__note">— how your product looks and feels, and why people remember it</span>':
        'Образ проекта <span class="pkg__note">— как он выглядит, какое впечатление производит и чем запоминается</span>',
      'Brand book <span class="pkg__note">— logo, colours, fonts and how to use them</span>':
        'Фирменный стиль <span class="pkg__note">— логотип, цвета, шрифты и правила, как ими пользоваться</span>',
      'Landing page <span class="pkg__note">— a one-page website that explains what you offer and invites people to get in touch</span>':
        'Сайт-визитка на одну страницу <span class="pkg__note">— рассказывает, что вы предлагаете, и приглашает связаться с вами</span>',
      '10 social media templates <span class="pkg__note">— adapted for three networks</span>':
        '10 шаблонов для соцсетей <span class="pkg__note">— под три разные соцсети</span>',
      'Timeline': 'Срок',
      '2–3 weeks': '2–3 недели',
      'Price': 'Цена',
      'Contact me directly': 'Написать мне',
      'Website': 'Сайт',
      'You need a full website with several pages': 'Вам нужен полноценный сайт из нескольких страниц',
      'Instead of a one-page landing': 'Вместо сайта на одну страницу',
      '<b>A website of up to 5 pages</b> <span class="pkg__note">— for example Home, About, Services, Cases and Contacts</span>':
        '<b>Сайт до 5 страниц</b> <span class="pkg__note">— например: главная, обо мне, услуги, работы и контакты</span>',
      'Also included, as in Launch': 'Также входит, как в «Старте»',
      'Visual strategy': 'Образ проекта',
      'Brand book': 'Фирменный стиль',
      '10 social media templates': '10 шаблонов для соцсетей',
      '4–5 weeks': '4–5 недель',
      'Product': 'Проект',
      'You need a product designer for the long run': 'Вам нужен дизайнер надолго',
      'Not a 5-page website, but a product people use every day, like an online school, a platform or an app.':
        'Не сайт на 5 страниц, а сервис, которым люди пользуются каждый день: например, онлайн-школа, платформа или приложение.',
      'Interfaces <span class="pkg__note">— the screens your users work in, on web and mobile</span>':
        'Экраны сервиса <span class="pkg__note">— всё, с чем работают ваши клиенты, на компьютере и в телефоне</span>',
      'Marketing materials <span class="pkg__note">— website, social media, presentations</span>':
        'Материалы для продвижения <span class="pkg__note">— сайт, соцсети, презентации</span>',
      'Ongoing work <span class="pkg__note">— as your product grows</span>':
        'Постоянная работа <span class="pkg__note">— по мере того, как растёт ваш проект</span>',
      'Long-term': 'Надолго',
      'We agree on it personally': 'Обсуждаем лично',
      'Optional add-on to Launch or Website': 'Можно добавить к «Старту» или «Сайту»',
      'Support System': 'Сайт в ваших руках',
      'Change your site yourself after launch, without waiting for a designer.': 'Меняйте сайт сами после запуска, не дожидаясь дизайнера.',
      '<b>Design system</b> All your colours, fonts and page blocks in one place, ready to reuse.':
        '<b>Библиотека стиля</b> Все ваши цвета, шрифты и готовые блоки страниц в одном месте.',
      '<b>A simple guide</b> Step by step: how to add a page or change a text or a photo.':
        '<b>Простая инструкция</b> Шаг за шагом: как добавить страницу, поменять текст или фото.',
      '<b>AI tools, set up for you</b> So you can make new pages and posts in your style on your own.':
        '<b>Настроенные помощники с ИИ</b> Чтобы вы сами делали новые страницы и посты в своём стиле.',
      '<b>+€400</b> with Launch': '<b>+€400</b> к «Старту»',
      '<b>+€700</b> with Website': '<b>+€700</b> к «Сайту»',
      '<b>+1 week</b> to the timeline': '<b>+1 неделя</b> к сроку',

      'Have questions? I’ve got&nbsp;answers.': 'Есть вопросы? У меня есть&nbsp;ответы.',
      'My idea is still rough. Is it too early?': 'Моя идея ещё сырая. Не рано?',
      'No. Most projects start this way. When we talk, we’ll find what’s strongest in your idea and decide where to begin.':
        'Нет. Почти все проекты так начинаются. Когда поговорим, найдём самое сильное в вашей идее и решим, с чего начать.',
      'I already have a product. Can you help?': 'У меня уже есть проект. Сможете помочь?',
      'Yes. For existing products I start with a Focus Review: a look at what your product says, what users experience, and what to change first.':
        'Да. Для готовых проектов я начинаю с короткого разбора: что ваш проект говорит людям, что они чувствуют, когда им пользуются, и что стоит изменить в первую очередь.',
      'Do you also build the website?': 'Вы делаете и сам сайт?',
      'Yes, the landing page or website is part of the Launch and Website packages. For larger development, SEO or sales setup, I bring in trusted partners.':
        'Да, сайт-визитка или полноценный сайт входят в пакеты «Старт» и «Сайт». Для сложной разработки, продвижения в поиске или настройки продаж я подключаю проверенных партнёров.',
      'Which languages do you work in?': 'На каких языках вы работаете?',
      'English, Russian and Ukrainian.': 'На английском, русском и украинском.',
      'How does payment work?': 'Как проходит оплата?',
      'We agree on the scope and price once we’ve talked about your project. Payment details are in the agreement.':
        'Объём работы и цену согласуем, когда обсудим ваш проект. Условия оплаты прописаны в договоре.',
      '<b>Didn’t find the answer?</b> I’m a real person, just like you. Ask me anything.':
        '<b>Не нашли ответ?</b> Я живой человек, как и вы. Спрашивайте о чём угодно.',
      'Email me': 'Написать на почту',
      'Chat on WhatsApp': 'Написать в WhatsApp',
      'Write on Telegram': 'Написать в Telegram',
      'Booking': 'Запись',

      'I notice what others miss, and make it clear.': 'Я замечаю то, что упускают другие, и делаю это понятным.',
      'I’m Iryna Nechytailo, a senior product designer with 12&nbsp;years of experience in apps, websites and the systems behind them.':
        'Я Ирина Нечитайло, дизайнер с 12-летним&nbsp;опытом. Делаю приложения, сайты и продумываю, как всё в них устроено.',
      'I start with the essence and only then look for the form. Every idea has one signal that makes it worth choosing. I find it and carry it through positioning, brand, interface and launch, so the product feels like the person who made it.':
        'Сначала я ищу суть и только потом форму. В каждой идее есть что-то одно, ради чего её выбирают. Я нахожу это и провожу через всё: как о проекте рассказать, как он выглядит, как им пользоваться и как его запустить. Так проект становится похож на своего автора.',
      'Consy is my studio. On Instagram it is also my product lab, where I take small products apart and show what is valuable in them and where they could grow.':
        'Consy — моя студия. А в Instagram это ещё и моя мастерская: там я разбираю небольшие проекты и показываю, что в них ценного и как они могут вырасти.',
      'My experience on LinkedIn <span aria-hidden="true">↗</span>': 'Мой опыт в LinkedIn <span aria-hidden="true">↗</span>',
      '12 years': '12 лет',
      'designing digital products, from the first idea to a live launch': 'создаю сайты и приложения, от первой идеи до запуска',
      'One system': 'Всё вместе',
      'positioning, brand, web, mobile and social, built to work together': 'образ, стиль, сайт, приложение и соцсети работают как одно целое',
      'Fewer problems': 'Только главное',
      'I look for the few things that really matter, and explain why': 'нахожу то немногое, что действительно важно, и объясняю почему',
      '3 languages': '3 языка',
      'English, Russian and Ukrainian, with trusted partners for development, SEO and sales':
        'английский, русский и украинский, плюс проверенные партнёры по разработке, продвижению и продажам',

      'Your work deserves to be seen. <span>Tell me about it, and we’ll find where to start.</span>':
        'Ваша работа заслуживает, чтобы её увидели. <span>Расскажите о ней, и мы найдём, с чего начать.</span>',
      'Email': 'Почта',
      'Privacy policy': 'Конфиденциальность',
      '© 2026 Iryna Nechytailo': '© 2026 Ирина Нечитайло',

      // attributes: aria-labels, email subjects and bodies
      'Consy — back to the top': 'Consy — наверх',
      'Write to me': 'Напишите мне',
      'Price and timeline': 'Цена и срок',
      'Contacts': 'Контакты',
      'Elsewhere': 'Ссылки',
      'Let’s talk about my project': 'Хочу обсудить свой проект',
      'Launch package: website launch': 'Пакет «Старт»: запуск сайта',
      'Website package: a new website': 'Пакет «Сайт»: новый сайт',
      'Product design: long-term work': 'Проект: долгая совместная работа',
      'A question from the Consy website': 'Вопрос с сайта Consy',
      'Hi Iryna,\n\nAbout me and my project:\n': 'Здравствуйте, Ирина!\n\nО себе и своём проекте:\n',
      'Hi Iryna,\n\nI’d like to talk about the Launch package.\n\nAbout me and my project:\n': 'Здравствуйте, Ирина!\n\nХочу обсудить пакет «Старт».\n\nО себе и своём проекте:\n',
      'Hi Iryna,\n\nI’d like to talk about the Website package.\n\nAbout me and my project:\n': 'Здравствуйте, Ирина!\n\nХочу обсудить пакет «Сайт».\n\nО себе и своём проекте:\n',
      'Hi Iryna,\n\nI’d like to talk about the Product package.\n\nAbout me and my project:\n': 'Здравствуйте, Ирина!\n\nХочу обсудить долгую работу над проектом.\n\nО себе и своём проекте:\n',
    },

    uk: {
      'Skip to content': 'Перейти до змісту',
      '<span class="hero__title-a">You know your craft.</span> <span class="hero__title-b">I’ll make your product show it and <em>find its audience.</em></span>':
        '<span class="hero__title-a">Ви знаєте свою справу.</span> <span class="hero__title-b">Я допоможу вашому проєкту це показати і <em>знайти своїх людей.</em></span>',
      'One partner for your entire launch.': 'Одна людина на весь запуск.',
      'From positioning and brand identity to web, mobile and social. I build it as one system and take it live, so your product stays consistent as you scale.':
        'Від того, як розповісти про вашу справу, і фірмового стилю до сайту, застосунку та соцмереж. Я роблю все як єдине ціле й доводжу до запуску, щоб ваш проєкт залишався цілісним, коли росте.',
      'Contact': 'Написати',
      'Plans': 'Пакети',
      '<span class="about__dot" aria-hidden="true"></span>Limited availability': '<span class="about__dot" aria-hidden="true"></span>Вільних місць небагато',
      'Selected work': 'Вибрані роботи',

      'Three ways to launch your product': 'Три способи запустити ваш проєкт',
      'Each package has a fixed scope, timeline and price. Not sure which one fits? Write to me, and we’ll choose it together.':
        'У кожного пакета зрозумілий склад, термін і ціна. Не знаєте, який підходить? Напишіть мені, і ми оберемо разом.',
      'Launch': 'Старт',
      'You have an idea and want to show it to your first clients': 'У вас є ідея, і ви хочете показати її першим клієнтам',
      'Visual strategy <span class="pkg__note">— how your product looks and feels, and why people remember it</span>':
        'Образ проєкту <span class="pkg__note">— як він виглядає, яке враження справляє і чим запам’ятовується</span>',
      'Brand book <span class="pkg__note">— logo, colours, fonts and how to use them</span>':
        'Фірмовий стиль <span class="pkg__note">— логотип, кольори, шрифти й правила, як ними користуватися</span>',
      'Landing page <span class="pkg__note">— a one-page website that explains what you offer and invites people to get in touch</span>':
        'Сайт-візитка на одну сторінку <span class="pkg__note">— розповідає, що ви пропонуєте, і запрошує зв’язатися з вами</span>',
      '10 social media templates <span class="pkg__note">— adapted for three networks</span>':
        '10 шаблонів для соцмереж <span class="pkg__note">— під три різні соцмережі</span>',
      'Timeline': 'Термін',
      '2–3 weeks': '2–3 тижні',
      'Price': 'Ціна',
      'Contact me directly': 'Написати мені',
      'Website': 'Сайт',
      'You need a full website with several pages': 'Вам потрібен повноцінний сайт із кількох сторінок',
      'Instead of a one-page landing': 'Замість сайту на одну сторінку',
      '<b>A website of up to 5 pages</b> <span class="pkg__note">— for example Home, About, Services, Cases and Contacts</span>':
        '<b>Сайт до 5 сторінок</b> <span class="pkg__note">— наприклад: головна, про мене, послуги, роботи й контакти</span>',
      'Also included, as in Launch': 'Також входить, як у «Старті»',
      'Visual strategy': 'Образ проєкту',
      'Brand book': 'Фірмовий стиль',
      '10 social media templates': '10 шаблонів для соцмереж',
      '4–5 weeks': '4–5 тижнів',
      'Product': 'Проєкт',
      'You need a product designer for the long run': 'Вам потрібна дизайнерка надовго',
      'Not a 5-page website, but a product people use every day, like an online school, a platform or an app.':
        'Не сайт на 5 сторінок, а сервіс, яким люди користуються щодня: наприклад, онлайн-школа, платформа чи застосунок.',
      'Interfaces <span class="pkg__note">— the screens your users work in, on web and mobile</span>':
        'Екрани сервісу <span class="pkg__note">— усе, з чим працюють ваші клієнти, на комп’ютері й у телефоні</span>',
      'Marketing materials <span class="pkg__note">— website, social media, presentations</span>':
        'Матеріали для просування <span class="pkg__note">— сайт, соцмережі, презентації</span>',
      'Ongoing work <span class="pkg__note">— as your product grows</span>':
        'Постійна робота <span class="pkg__note">— у міру того, як росте ваш проєкт</span>',
      'Long-term': 'Надовго',
      'We agree on it personally': 'Обговорюємо особисто',
      'Optional add-on to Launch or Website': 'Можна додати до «Старту» чи «Сайту»',
      'Support System': 'Сайт у ваших руках',
      'Change your site yourself after launch, without waiting for a designer.': 'Змінюйте сайт самі після запуску, не чекаючи на дизайнера.',
      '<b>Design system</b> All your colours, fonts and page blocks in one place, ready to reuse.':
        '<b>Бібліотека стилю</b> Усі ваші кольори, шрифти й готові блоки сторінок в одному місці.',
      '<b>A simple guide</b> Step by step: how to add a page or change a text or a photo.':
        '<b>Проста інструкція</b> Крок за кроком: як додати сторінку, змінити текст чи фото.',
      '<b>AI tools, set up for you</b> So you can make new pages and posts in your style on your own.':
        '<b>Налаштовані помічники зі ШІ</b> Щоб ви самі робили нові сторінки й дописи у своєму стилі.',
      '<b>+€400</b> with Launch': '<b>+€400</b> до «Старту»',
      '<b>+€700</b> with Website': '<b>+€700</b> до «Сайту»',
      '<b>+1 week</b> to the timeline': '<b>+1 тиждень</b> до терміну',

      'Have questions? I’ve got&nbsp;answers.': 'Є питання? У мене є&nbsp;відповіді.',
      'My idea is still rough. Is it too early?': 'Моя ідея ще сира. Не зарано?',
      'No. Most projects start this way. When we talk, we’ll find what’s strongest in your idea and decide where to begin.':
        'Ні. Майже всі проєкти так починаються. Коли поговоримо, знайдемо найсильніше у вашій ідеї й вирішимо, з чого почати.',
      'I already have a product. Can you help?': 'У мене вже є проєкт. Зможете допомогти?',
      'Yes. For existing products I start with a Focus Review: a look at what your product says, what users experience, and what to change first.':
        'Так. Для готових проєктів я починаю з короткого розбору: що ваш проєкт каже людям, що вони відчувають, коли ним користуються, і що варто змінити насамперед.',
      'Do you also build the website?': 'Ви робите й сам сайт?',
      'Yes, the landing page or website is part of the Launch and Website packages. For larger development, SEO or sales setup, I bring in trusted partners.':
        'Так, сайт-візитка або повноцінний сайт входять у пакети «Старт» і «Сайт». Для складної розробки, просування в пошуку чи налаштування продажів я залучаю перевірених партнерів.',
      'Which languages do you work in?': 'Якими мовами ви працюєте?',
      'English, Russian and Ukrainian.': 'Англійською, російською та українською.',
      'How does payment work?': 'Як відбувається оплата?',
      'We agree on the scope and price once we’ve talked about your project. Payment details are in the agreement.':
        'Обсяг роботи й ціну погоджуємо, коли обговоримо ваш проєкт. Умови оплати прописані в договорі.',
      '<b>Didn’t find the answer?</b> I’m a real person, just like you. Ask me anything.':
        '<b>Не знайшли відповідь?</b> Я жива людина, як і ви. Питайте про що завгодно.',
      'Email me': 'Написати на пошту',
      'Chat on WhatsApp': 'Написати у WhatsApp',
      'Write on Telegram': 'Написати в Telegram',
      'Booking': 'Запис',

      'I notice what others miss, and make it clear.': 'Я помічаю те, що пропускають інші, і роблю це зрозумілим.',
      'I’m Iryna Nechytailo, a senior product designer with 12&nbsp;years of experience in apps, websites and the systems behind them.':
        'Я Ірина Нечитайло, дизайнерка з 12-річним&nbsp;досвідом. Створюю застосунки, сайти й продумую, як усе в них влаштовано.',
      'I start with the essence and only then look for the form. Every idea has one signal that makes it worth choosing. I find it and carry it through positioning, brand, interface and launch, so the product feels like the person who made it.':
        'Спочатку я шукаю суть і лише потім форму. У кожній ідеї є щось одне, заради чого її обирають. Я знаходжу це й проводжу через усе: як про проєкт розповісти, як він виглядає, як ним користуватися і як його запустити. Так проєкт стає схожим на свого автора.',
      'Consy is my studio. On Instagram it is also my product lab, where I take small products apart and show what is valuable in them and where they could grow.':
        'Consy — моя студія. А в Instagram це ще й моя майстерня: там я розбираю невеликі проєкти й показую, що в них цінного і як вони можуть вирости.',
      'My experience on LinkedIn <span aria-hidden="true">↗</span>': 'Мій досвід у LinkedIn <span aria-hidden="true">↗</span>',
      '12 years': '12 років',
      'designing digital products, from the first idea to a live launch': 'створюю сайти й застосунки, від першої ідеї до запуску',
      'One system': 'Усе разом',
      'positioning, brand, web, mobile and social, built to work together': 'образ, стиль, сайт, застосунок і соцмережі працюють як одне ціле',
      'Fewer problems': 'Лише головне',
      'I look for the few things that really matter, and explain why': 'знаходжу те небагато, що справді важливо, і пояснюю чому',
      '3 languages': '3 мови',
      'English, Russian and Ukrainian, with trusted partners for development, SEO and sales':
        'англійська, російська й українська, плюс перевірені партнери з розробки, просування та продажів',

      'Your work deserves to be seen. <span>Tell me about it, and we’ll find where to start.</span>':
        'Ваша робота заслуговує, щоб її побачили. <span>Розкажіть про неї, і ми знайдемо, з чого почати.</span>',
      'Email': 'Пошта',
      'Privacy policy': 'Конфіденційність',
      '© 2026 Iryna Nechytailo': '© 2026 Ірина Нечитайло',

      'Consy — back to the top': 'Consy — нагору',
      'Write to me': 'Напишіть мені',
      'Price and timeline': 'Ціна й термін',
      'Contacts': 'Контакти',
      'Elsewhere': 'Посилання',
      'Let’s talk about my project': 'Хочу обговорити свій проєкт',
      'Launch package: website launch': 'Пакет «Старт»: запуск сайту',
      'Website package: a new website': 'Пакет «Сайт»: новий сайт',
      'Product design: long-term work': 'Проєкт: довга спільна робота',
      'A question from the Consy website': 'Питання із сайту Consy',
      'Hi Iryna,\n\nAbout me and my project:\n': 'Добрий день, Ірино!\n\nПро себе та свій проєкт:\n',
      'Hi Iryna,\n\nI’d like to talk about the Launch package.\n\nAbout me and my project:\n': 'Добрий день, Ірино!\n\nХочу обговорити пакет «Старт».\n\nПро себе та свій проєкт:\n',
      'Hi Iryna,\n\nI’d like to talk about the Website package.\n\nAbout me and my project:\n': 'Добрий день, Ірино!\n\nХочу обговорити пакет «Сайт».\n\nПро себе та свій проєкт:\n',
      'Hi Iryna,\n\nI’d like to talk about the Product package.\n\nAbout me and my project:\n': 'Добрий день, Ірино!\n\nХочу обговорити довгу роботу над проєктом.\n\nПро себе та свій проєкт:\n',
    },
  }[lang];

  const root = document.documentElement;
  root.lang = lang;

  // Poppins has no Cyrillic; Montserrat is the closest geometric face that does (see styles.css)
  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,600;1,500&display=swap';
  document.head.appendChild(font);

  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const BLOCK = 'p,li,h1,h2,h3,dt,dd,summary,a,button';
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'svg', 'SVG']);

  // a text block whose markup is plain (text, b, em, span, br) is swapped whole;
  // one that also holds icons or links gets only its own words swapped
  const translateText = (el) => {
    el.childNodes.forEach((node) => {
      if (node.nodeType === 3) {
        const key = norm(node.nodeValue);
        if (key && T[key]) node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), T[key]);
      } else if (node.nodeType === 1 && !SKIP.has(node.tagName)) {
        translateText(node);
      }
    });
  };
  const walk = (el) => {
    for (const child of el.children) {
      if (SKIP.has(child.tagName)) continue;
      const leaf = child.matches(BLOCK) && !child.querySelector('p,li,ul,ol,div,section,h1,h2,h3,dl');
      if (leaf) {
        const rich = child.querySelector('svg,img,a');
        const key = norm(child.innerHTML);
        if (!rich && T[key]) child.innerHTML = T[key];
        else translateText(child);
      } else {
        walk(child);
      }
    }
  };
  walk(document.body);

  document.querySelectorAll('[aria-label],[data-subject],[data-body]').forEach((el) => {
    ['aria-label', 'data-subject', 'data-body'].forEach((attr) => {
      const value = el.getAttribute(attr);
      if (value && T[value]) el.setAttribute(attr, T[value]);
    });
  });
})();

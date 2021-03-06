# Командный проект на JS

Проект представляет собой SPA в виде некоего блокнота для фильмов. 
  - Адаптивность (рассчитано на мобильные устройства, планшеты и десктопы)
  - В проекте использовалось API https://www.themoviedb.org/ 
  - Зайдя на страницу, пользователь видит популярные фильмы.
  - Пользователь может просматривать фильмы постранично, без перезагрузки страницы
  - Пользователь может выбрать понравившийся фильм, посмотреть подробную информацию о нем, посмотреть трейлер, 
  поделится с друзьми с помощью telegram, и добавить себе в один из списков - "К просмотру" или "Просмотренно"
  - Пользователь может воспользоваться возможностью поиска фильмов с последующим применением фильтров (по годам выхода и по жанрам)
  - Пользователь может переключать язык интерфейса (русский/английский)
  - Пользователь может редактировать свою библиотеку - удаляя или добавляя туда фильмы

## Стек
  - HTML5
  - Scss (sass)
  - JS (классы, fetch api, Intersection Observer,  вопщем более-менее современненько)
  - Шаблонизатор Handlebars
  - Стили Bootstrap (пагинация, кнопки)
  - Модалка Lightbox
  - NPM
  - Webpack
  - Babel
  - Git (github https://github.com/Gal4enock/Project-JS-filmoteka)
  - API: 
    - tmdb API https://www.themoviedb.org/ 
    - telegram API https://core.telegram.org/
    - youtube API https://developers.google.com/youtube/v3
  - Trello
  - SCRUM
  
  Может еще что-то, всего не упомнишь :)

## Ответственность: 
- приблизительная структура приложения
- помощь участникам при сложностях с написанием кода 
- mainController (события, начальная загрузка, хранение состояния, контроль работы приложения, выгрузка) 
- apiService (взаимодействие с API https://www.themoviedb.org/, расчет требуемых запросов в зависимости от устройства, на котором зашел пользователь)
- pagination (требует у apiService нужную страницу и передает на рендер уже сформированные снапшоты данных)
- infinite scroll (включается в мобильной версии, заменяя пагинатор)
- languages switching (переключение языков и перерисовка интерфейса; инициирует запросы к apiService за фильмами на нужном языке и перерисовку контента)

### Авторы:
  - Тимлид - Галина Хижинская https://github.com/Gal4enock (общее руководство, помощь участникам, приблизительная структура приложения, презентация, работа с библиотекой)
  - Скрам-мастер - Денис Даниелян (работа с Трелло, распределение задач, слежение за порядком, хедер)
  - Техлид - Шаблий Олег https://github.com/Xoms (я - зона ответсвенности выше)
  - Виктория Назарук https://github.com/VINK92 (шаблон спсиска фильмов, telegram API, трейлеры)
  - Юлия Артёменко https://github.com/Julia-itcourse (сортировка данных поиска, логика фильтрации, а также стилизация управляющих элементов поиска)
  - Иван Рыбачук https://github.com/IvanRybachuk (добавление в списки, лоадер, идейный вдохновитель, ответсвенный за связь) 
  - Георгий Василенко https://github.com/Heorhiivv (модалка с основной информацией о фильме, формирование объекта данных текущего фильма, афтор компонента, в который был нужен всем)
  - Людмила Мычта https://github.com/ludmiladev (футер, странича команды, работа с библиотекой, сбор личных данных (с согласия на распространение):) )
  

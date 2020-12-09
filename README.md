# Industry-Locator
control of the current workload of machines (контроль текущей загруженности станков)

# Тестовая авторизация:
Demo:   https://industry-locator.web.app/
Login:   revat_2015@mail.ru
Password:   333333

# Functional description:
The application shows the machines (technological areas) on which the production process is currently underway (the "Production" page). Allows you to quickly monitor the degree of utilization of machines and the stage of readiness of production products in the context of customers. The "DETAILED" button opens specific technological operations with an indication of the planned output quantity (on a red background), the quantity already produced (on a green background) and the amount left to be produced (on a yellow one).

The "Generation" page displays the actual work performed by the current user for the selected period (for the test, select the period from 06/01/2020 to 12/31/2020)

Operational data on the loading of machines come from the shop workers. The foreman, through the touch terminals located in the shop, scans the barcodes of the route sheets and reflects the start and finish operations of the product manufacturing process in the 1C8 program. The received data with each update goes to the cloud storage, and then the update takes place on the user's application screen.

# Описание функционала:
Приложение показывает станки (технологические участки) на которых в текущий момент идет процесс производства (страница "Производство"). Позволяет оперативно отслеживать степень   загрузки станков и стадии готовности производственных изделий в разрезе заказчиков. Фильтр "ПОДРОБНО" открывает конкретные технологические операции с указанием запланированного  количества выпуска (на красном фоне), уже изготовленого количества (на зеленом фоне) и осталось изготовить (на желтом). 

На странице "Выработка" отражается фактически выполненная работа текущим пользователем за выбранный период (для теста выберите период с 01.06.2020 по 31.12.2020)

Оперативные данные о загрузке станков поступают от мастеров цеха. Мастера, через сенсорные терминалы расположенные на производстве, сканируют штрихкоды маршрутных листов и отражают операции запуска и финиша процесса производства изделий в программе 1С8. Полученные данные при каждом обновлении попадают в облачное хранилище, и затем происходит обновление на экране приложения пользователя. 

# Используемые технологии и стили:
- JavaScript
- Firebase
- Vue
- Vue-router
- Vuelidate
- Vuex
- Webpack
- Stylus
- Uimini
- Pug (Jade)

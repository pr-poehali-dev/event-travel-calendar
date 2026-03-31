import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "calendar", label: "Календарь" },
  { id: "tours", label: "Туры и экскурсии" },
  { id: "locations", label: "Локации" },
  { id: "hotels", label: "Где переночевать" },
  { id: "food", label: "Где покушать" },
  { id: "souvenirs", label: "Сувениры" },
  { id: "services", label: "Городские сервисы" },
  { id: "contacts", label: "Контакты" },
];

const EVENTS = [
  { id: 1, title: "Фестиваль тайги", color: "#16a34a", days: [1, 4, 7, 11, 16, 26, 28, 29] },
  { id: 2, title: "День шахтёра", color: "#dc2626", days: [2, 5, 8, 9, 12, 14, 17, 19, 22, 24, 27] },
  { id: 3, title: "Сибирская ярмарка", color: "#2563eb", days: [6, 13, 20] },
  { id: 4, title: "Зимний фестиваль", color: "#9333ea", days: [3, 10, 15, 21, 30] },
];

const TOURS = [
  { id: 1, title: "Тур в Шерегеш", subtitle: "Горнолыжный курорт", price: "от 8 500 ₽", days: "3 дня", emoji: "🎿" },
  { id: 2, title: "Кузнецкая крепость", subtitle: "Исторический тур", price: "от 2 200 ₽", days: "1 день", emoji: "🏰" },
  { id: 3, title: "Горная Шория", subtitle: "Природный парк", price: "от 5 400 ₽", days: "2 дня", emoji: "🏔️" },
  { id: 4, title: "Сплав по Томи", subtitle: "Водный туризм", price: "от 3 800 ₽", days: "2 дня", emoji: "🛶" },
];

const LOCATIONS = [
  { id: 1, title: "Гора Югус", subtitle: "Кузнецкий Алатау", emoji: "⛰️" },
  { id: 2, title: "Озеро Иткуль", subtitle: "Кемеровская область", emoji: "🏞️" },
  { id: 3, title: "Томская писаница", subtitle: "Яшкинский район", emoji: "🪨" },
  { id: 4, title: "Кузедеево", subtitle: "Новокузнецкий район", emoji: "🌾" },
  { id: 5, title: "Водопад Сага", subtitle: "Горная Шория", emoji: "💧" },
];

const HOTELS = [
  { id: 1, title: "Отель Восход", subtitle: "Кемерово, 4 звезды", price: "от 3 200 ₽/ночь", emoji: "🏨" },
  { id: 2, title: "Кемпинг Лесной", subtitle: "Горная Шория", price: "от 800 ₽/ночь", emoji: "⛺" },
  { id: 3, title: "Санаторий Сибирь", subtitle: "Новокузнецк", price: "от 2 100 ₽/ночь", emoji: "🏥" },
  { id: 4, title: "Горный приют", subtitle: "Шерегеш", price: "от 1 600 ₽/ночь", emoji: "🏠" },
  { id: 5, title: "Таёжная заимка", subtitle: "Мыски", price: "от 1 200 ₽/ночь", emoji: "🌲" },
];

const FOOD = [
  { id: 1, title: "Кафе Уголёк", subtitle: "Кемерово, русская кухня", emoji: "☕" },
  { id: 2, title: "Ресторан Тайга", subtitle: "Кемерово, сибирская кухня", emoji: "🍲" },
  { id: 3, title: "Маслинг Акада", subtitle: "Новокузнецк, авторская", emoji: "🍽️" },
  { id: 4, title: "Короткий Гон", subtitle: "Кемерово, охотничья кухня", emoji: "🦌" },
  { id: 5, title: "Пельменная СССР", subtitle: "Кемерово, домашняя", emoji: "🥟" },
];

const SOUVENIRS = [
  { id: 1, title: "Лавка Мастеров", subtitle: "Народные промыслы", emoji: "🪆" },
  { id: 2, title: "Сибирский Дар", subtitle: "Кемерово", emoji: "🎁" },
  { id: 3, title: "Кедровый рай", subtitle: "Орехи, мёд, травы", emoji: "🌰" },
  { id: 4, title: "Шерегеш Шоп", subtitle: "Сувениры курорта", emoji: "🎿" },
];

const SERVICES = [
  { id: 1, title: "Такси Сибирь", subtitle: "Круглосуточно", icon: "Car" },
  { id: 2, title: "Прокат велосипедов", subtitle: "Кемерово, центр", icon: "Bike" },
  { id: 3, title: "Гид по Шерегешу", subtitle: "Личный гид", icon: "Map" },
  { id: 4, title: "Трансфер в аэропорт", subtitle: "Кемерово / Новокузнецк", icon: "Plane" },
  { id: 5, title: "Экскурсионное бюро", subtitle: "Все направления", icon: "Compass" },
];

const MONTHS = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];
const DAYS_OF_WEEK = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

// ─── Calendar Logic ────────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

// ─── Calendar Component ────────────────────────────────────────────────────────

function EventCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [calendarTab, setCalendarTab] = useState<"events" | "tours">("events");

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const getEventsForDay = (day: number) => EVENTS.filter(e => e.days.includes(day));

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex border-b border-border">
        <button
          onClick={() => setCalendarTab("events")}
          className={`flex-1 py-3 font-oswald font-semibold text-sm tracking-wider uppercase transition-colors ${
            calendarTab === "events" ? "bg-lime text-forest" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Календарь событий
        </button>
        <button
          onClick={() => setCalendarTab("tours")}
          className={`flex-1 py-3 font-oswald font-semibold text-sm tracking-wider uppercase transition-colors ${
            calendarTab === "tours" ? "bg-lime text-forest" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Туры и экскурсии
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-oswald text-lg font-semibold text-snow">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary transition-colors">
              <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
            </button>
            <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary transition-colors">
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAYS_OF_WEEK.map(d => (
            <div key={d} className="text-center text-xs text-muted-foreground font-golos font-medium py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
          {Array.from({ length: totalCells }).map((_, i) => {
            const dayNum = i - firstDay + 1;
            const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
            const isToday = isCurrentMonth && dayNum === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            const events = isCurrentMonth ? getEventsForDay(dayNum) : [];

            return (
              <div
                key={i}
                className={`bg-card min-h-[72px] p-1 cursor-pointer hover:bg-secondary transition-colors ${isToday ? "ring-2 ring-lime ring-inset" : ""}`}
              >
                <span className={`text-xs font-golos font-medium block mb-1 ${
                  !isCurrentMonth ? "text-muted-foreground/30" :
                  isToday ? "text-lime font-bold" : "text-snow"
                }`}>
                  {isCurrentMonth ? dayNum : ""}
                </span>
                <div className="flex flex-col gap-0.5">
                  {events.slice(0, 2).map(ev => (
                    <span
                      key={ev.id}
                      className="text-[10px] font-golos font-medium px-1 py-0.5 rounded-sm text-white leading-tight truncate block"
                      style={{ backgroundColor: ev.color }}
                    >
                      {ev.title}
                    </span>
                  ))}
                  {events.length > 2 && (
                    <span className="text-[10px] text-muted-foreground">+{events.length - 2}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {EVENTS.map(ev => (
            <div key={ev.id} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: ev.color }} />
              <span className="text-xs text-muted-foreground font-golos">{ev.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Reusable card ─────────────────────────────────────────────────────────────

function PlaceCard({ title, subtitle, price, emoji, btnLabel = "Подробнее" }: {
  title: string; subtitle: string; price?: string; emoji?: string; btnLabel?: string;
}) {
  return (
    <div className="card-hover flex-shrink-0 w-44 bg-card border border-border rounded-xl overflow-hidden cursor-pointer">
      <div className="h-28 bg-pine flex items-center justify-center text-5xl">{emoji || "🌲"}</div>
      <div className="p-3">
        <p className="font-oswald text-sm font-semibold text-snow leading-tight">{title}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight font-golos">{subtitle}</p>
        {price && <p className="text-xs text-lime font-semibold mt-1 font-golos">{price}</p>}
        <button className="mt-2 w-full bg-lime text-forest text-xs font-semibold font-oswald py-1.5 rounded hover:bg-lime/90 transition-colors">
          {btnLabel}
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ title, subtitle, icon }: { title: string; subtitle: string; icon: string }) {
  return (
    <div className="card-hover flex-shrink-0 w-44 bg-card border border-border rounded-xl overflow-hidden cursor-pointer">
      <div className="h-28 bg-pine flex items-center justify-center">
        <Icon name={icon} size={48} className="text-lime" fallback="Star" />
      </div>
      <div className="p-3">
        <p className="font-oswald text-sm font-semibold text-snow leading-tight">{title}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5 font-golos">{subtitle}</p>
        <button className="mt-2 w-full bg-lime text-forest text-xs font-semibold font-oswald py-1.5 rounded hover:bg-lime/90 transition-colors">
          Заказать
        </button>
      </div>
    </div>
  );
}

function ScrollSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">{title}</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-lime text-forest flex items-center justify-center hover:bg-lime/90 transition-colors">
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button className="w-8 h-8 rounded-full bg-lime text-forest flex items-center justify-center hover:bg-lime/90 transition-colors">
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">{children}</div>
    </section>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative mb-10 rounded-2xl overflow-hidden" style={{ minHeight: 300 }}>
        <div className="absolute inset-0 taiga-bg" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://cdn.poehali.dev/projects/e16d1184-46e4-409c-91da-1cd3a7bc4cae/bucket/0a99f60b-ef31-4f3d-a9da-d4eb66f5d072.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative p-10 flex flex-col justify-end" style={{ minHeight: 300 }}>
          <p className="text-lime font-oswald tracking-widest text-sm uppercase mb-2">Добро пожаловать</p>
          <h1 className="font-oswald text-5xl font-bold text-snow text-shadow mb-3 leading-tight">
            Открой Сибирь
          </h1>
          <p className="font-golos text-snow/80 text-lg max-w-lg mb-6">
            Туристический портал Сибирского региона — события, туры, локации и всё для незабываемого путешествия
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="bg-lime text-forest font-oswald font-semibold px-6 py-3 rounded-lg hover:bg-lime/90 transition-colors tracking-wide">
              Смотреть события
            </button>
            <button className="border border-lime/50 text-lime font-oswald font-semibold px-6 py-3 rounded-lg hover:bg-lime/10 transition-colors tracking-wide">
              Туры и экскурсии
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { num: "40+", label: "Событий в месяц", icon: "Calendar" },
          { num: "120+", label: "Локаций", icon: "MapPin" },
          { num: "35+", label: "Туров и маршрутов", icon: "Map" },
          { num: "80+", label: "Мест отдыха", icon: "Star" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center">
            <Icon name={s.icon} size={24} className="text-lime mb-2" fallback="Star" />
            <span className="font-oswald text-2xl font-bold text-snow">{s.num}</span>
            <span className="font-golos text-xs text-muted-foreground mt-1">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Calendar preview */}
      <h2 className="section-title mb-4">Ближайшие события</h2>
      <div className="mb-10">
        <EventCalendar />
      </div>

      {/* Scroll sections */}
      <ScrollSection title="Локации для самостоятельных путешествий">
        {LOCATIONS.map(l => <PlaceCard key={l.id} title={l.title} subtitle={l.subtitle} emoji={l.emoji} />)}
      </ScrollSection>

      <ScrollSection title="Где переночевать">
        {HOTELS.map(h => <PlaceCard key={h.id} title={h.title} subtitle={h.subtitle} price={h.price} emoji={h.emoji} btnLabel="Забронировать" />)}
      </ScrollSection>

      <ScrollSection title="Где покушать">
        {FOOD.map(f => <PlaceCard key={f.id} title={f.title} subtitle={f.subtitle} emoji={f.emoji} btnLabel="Меню" />)}
      </ScrollSection>

      <div className="grid md:grid-cols-2 gap-8">
        <ScrollSection title="Где купить сувениры">
          {SOUVENIRS.map(s => <PlaceCard key={s.id} title={s.title} subtitle={s.subtitle} emoji={s.emoji} btnLabel="Купить" />)}
        </ScrollSection>
        <ScrollSection title="Городские сервисы">
          {SERVICES.map(s => <ServiceCard key={s.id} title={s.title} subtitle={s.subtitle} icon={s.icon} />)}
        </ScrollSection>
      </div>
    </div>
  );
}

function CalendarPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="font-oswald text-4xl font-bold text-snow mb-6 tracking-wide">КАЛЕНДАРЬ</h1>
      <EventCalendar />
    </div>
  );
}

function ToursPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="font-oswald text-4xl font-bold text-snow mb-6 tracking-wide">ТУРЫ И ЭКСКУРСИИ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOURS.map(t => (
          <div key={t.id} className="card-hover bg-card border border-border rounded-xl overflow-hidden">
            <div className="h-44 bg-pine flex items-center justify-center text-6xl">{t.emoji}</div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-oswald text-lg font-semibold text-snow">{t.title}</h3>
                <span className="bg-secondary text-xs text-muted-foreground px-2 py-0.5 rounded font-golos flex-shrink-0 ml-2">{t.days}</span>
              </div>
              <p className="text-sm text-muted-foreground font-golos mb-3">{t.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="text-lime font-oswald font-semibold">{t.price}</span>
                <button className="bg-lime text-forest text-xs font-semibold font-oswald px-4 py-1.5 rounded hover:bg-lime/90 transition-colors">
                  Купить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationsPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="font-oswald text-4xl font-bold text-snow mb-6 tracking-wide">ЛОКАЦИИ ДЛЯ ПУТЕШЕСТВИЙ</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {LOCATIONS.map(l => (
          <div key={l.id} className="card-hover bg-card border border-border rounded-xl overflow-hidden cursor-pointer">
            <div className="h-36 bg-pine flex items-center justify-center text-5xl">{l.emoji}</div>
            <div className="p-3">
              <p className="font-oswald text-sm font-semibold text-snow">{l.title}</p>
              <p className="text-xs text-muted-foreground font-golos mt-0.5">{l.subtitle}</p>
              <button className="mt-2 w-full bg-lime text-forest text-xs font-semibold font-oswald py-1.5 rounded hover:bg-lime/90 transition-colors">
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HotelsPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="font-oswald text-4xl font-bold text-snow mb-6 tracking-wide">ГДЕ ПЕРЕНОЧЕВАТЬ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HOTELS.map(h => (
          <div key={h.id} className="card-hover bg-card border border-border rounded-xl overflow-hidden">
            <div className="h-44 bg-pine flex items-center justify-center text-6xl">{h.emoji}</div>
            <div className="p-4">
              <h3 className="font-oswald text-lg font-semibold text-snow">{h.title}</h3>
              <p className="text-sm text-muted-foreground font-golos mb-3">{h.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="text-lime font-oswald font-semibold">{h.price}</span>
                <button className="bg-lime text-forest text-xs font-semibold font-oswald px-4 py-1.5 rounded hover:bg-lime/90 transition-colors">
                  Забронировать
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FoodPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="font-oswald text-4xl font-bold text-snow mb-6 tracking-wide">ГДЕ ПОКУШАТЬ</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {FOOD.map(f => (
          <div key={f.id} className="card-hover bg-card border border-border rounded-xl overflow-hidden cursor-pointer">
            <div className="h-36 bg-pine flex items-center justify-center text-5xl">{f.emoji}</div>
            <div className="p-3">
              <p className="font-oswald text-sm font-semibold text-snow">{f.title}</p>
              <p className="text-xs text-muted-foreground font-golos mt-0.5">{f.subtitle}</p>
              <button className="mt-2 w-full bg-lime text-forest text-xs font-semibold font-oswald py-1.5 rounded hover:bg-lime/90 transition-colors">
                Меню
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SouvenirsPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="font-oswald text-4xl font-bold text-snow mb-6 tracking-wide">ГДЕ КУПИТЬ СУВЕНИРЫ</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SOUVENIRS.map(s => (
          <div key={s.id} className="card-hover bg-card border border-border rounded-xl overflow-hidden cursor-pointer">
            <div className="h-44 bg-pine flex items-center justify-center text-6xl">{s.emoji}</div>
            <div className="p-3">
              <p className="font-oswald text-base font-semibold text-snow">{s.title}</p>
              <p className="text-xs text-muted-foreground font-golos mt-0.5">{s.subtitle}</p>
              <button className="mt-2 w-full bg-lime text-forest text-xs font-semibold font-oswald py-1.5 rounded hover:bg-lime/90 transition-colors">
                Купить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="font-oswald text-4xl font-bold text-snow mb-6 tracking-wide">ГОРОДСКИЕ СЕРВИСЫ</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {SERVICES.map(s => (
          <div key={s.id} className="card-hover bg-card border border-border rounded-xl overflow-hidden cursor-pointer">
            <div className="h-40 bg-pine flex items-center justify-center">
              <Icon name={s.icon} size={56} className="text-lime" fallback="Star" />
            </div>
            <div className="p-3">
              <p className="font-oswald text-sm font-semibold text-snow">{s.title}</p>
              <p className="text-xs text-muted-foreground font-golos mt-0.5">{s.subtitle}</p>
              <button className="mt-2 w-full bg-lime text-forest text-xs font-semibold font-oswald py-1.5 rounded hover:bg-lime/90 transition-colors">
                Заказать
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsPage() {
  return (
    <div className="animate-fade-in max-w-2xl">
      <h1 className="font-oswald text-4xl font-bold text-snow mb-6 tracking-wide">КОНТАКТЫ</h1>
      <div className="grid gap-3 mb-8">
        {[
          { icon: "Phone", label: "Телефон", value: "+7 (3842) 00-00-00" },
          { icon: "Mail", label: "Email", value: "info@siberia-travel.ru" },
          { icon: "MapPin", label: "Адрес", value: "г. Кемерово, пр. Советский, 1" },
          { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–18:00" },
        ].map(c => (
          <div key={c.label} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 bg-pine rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={c.icon} size={20} className="text-lime" fallback="Star" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-golos">{c.label}</p>
              <p className="font-oswald text-snow font-semibold">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-oswald text-xl font-semibold text-snow mb-4">Написать нам</h3>
        <div className="grid gap-3">
          <input
            type="text"
            placeholder="Ваше имя"
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-snow placeholder:text-muted-foreground font-golos text-sm focus:outline-none focus:ring-1 focus:ring-lime"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-snow placeholder:text-muted-foreground font-golos text-sm focus:outline-none focus:ring-1 focus:ring-lime"
          />
          <textarea
            rows={4}
            placeholder="Сообщение"
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-snow placeholder:text-muted-foreground font-golos text-sm focus:outline-none focus:ring-1 focus:ring-lime resize-none"
          />
          <button className="bg-lime text-forest font-oswald font-semibold py-3 rounded-lg hover:bg-lime/90 transition-colors tracking-wide">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Layout ───────────────────────────────────────────────────────────────

export default function Index() {
  const [activePage, setActivePage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomePage />;
      case "calendar": return <CalendarPage />;
      case "tours": return <ToursPage />;
      case "locations": return <LocationsPage />;
      case "hotels": return <HotelsPage />;
      case "food": return <FoodPage />;
      case "souvenirs": return <SouvenirsPage />;
      case "services": return <ServicesPage />;
      case "contacts": return <ContactsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen taiga-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16 gap-6">
            <button
              onClick={() => setActivePage("home")}
              className="flex items-center gap-2 flex-shrink-0 group"
            >
              <div className="w-10 h-10 bg-lime rounded-lg flex items-center justify-center group-hover:bg-lime/90 transition-colors">
                <span className="font-oswald font-bold text-forest text-xl">С</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-oswald font-bold text-snow text-sm leading-tight tracking-wider">СИБИРЬ</p>
                <p className="text-muted-foreground text-[10px] font-golos leading-tight">туристический портал</p>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-5 flex-1 overflow-x-auto scrollbar-hide">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`nav-link font-golos text-sm whitespace-nowrap transition-colors ${
                    activePage === item.id ? "text-lime active" : "text-muted-foreground hover:text-snow"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-3">
              <button className="hidden sm:flex items-center text-muted-foreground hover:text-snow transition-colors">
                <Icon name="Search" size={18} />
              </button>
              <button className="hidden sm:flex items-center text-muted-foreground hover:text-snow transition-colors">
                <Icon name="User" size={18} />
              </button>
              <button
                className="lg:hidden text-muted-foreground hover:text-snow"
                onClick={() => setMobileMenuOpen(o => !o)}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
                  className={`text-left py-2.5 px-3 rounded-lg font-golos text-sm transition-colors ${
                    activePage === item.id
                      ? "bg-lime/20 text-lime"
                      : "text-muted-foreground hover:bg-secondary hover:text-snow"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderPage()}
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center">
                <span className="font-oswald font-bold text-forest">С</span>
              </div>
              <span className="font-oswald text-snow font-semibold tracking-wider">СИБИРЬ</span>
            </div>
            <p className="font-golos text-sm text-muted-foreground text-center">
              © 2024 Туристический портал Сибирского региона
            </p>
            <div className="flex gap-3">
              {["MessageCircle", "Send", "Globe"].map(icon => (
                <button key={icon} className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center hover:bg-lime/20 transition-colors">
                  <Icon name={icon} size={16} className="text-muted-foreground" fallback="Share2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
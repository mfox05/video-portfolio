/**
 * Konfiguracja dla sekcji "Viral Case Study"
 * Tutaj wpisuj wszystkie dane i dodawaj screenshoty.
 */

export const viralCase = {
  // YouTube video ID (część po "youtu.be/" albo "?v=")
  youtubeId: '-OtbMCTTBGU',

  // Statystyki — zmień wartości jak będą aktualizacje
  stats: [
    { value: '225K', labelPL: 'wyświetleń', labelEN: 'views', subPL: 'w 14 dni - 1 filmik', subEN: 'in 14 days - 1 video' },
    { value: '25K',  labelPL: 'polubień',   labelEN: 'likes', subPL: 'organicznie',  subEN: 'organic' },
    { value: '4K',   labelPL: 'udostępnień', labelEN: 'shares', subPL: 'jeden film',  subEN: 'one video' },
    { value: '30+',  labelPL: 'TikToków z moim dźwiękiem', labelEN: 'TikToks with my sound', subPL: 'inni twórcy', subEN: 'other creators' },
  ],

  // Screenshoty z TikToka
  // 1. Wrzuć pliki do: public/screenshots/tiktok-viral/
  // 2. Wpisz tu nazwy plików jak poniżej:
  screenshots: [
    '/screenshots/tiktok-viral/screen-01.PNG',
    '/screenshots/tiktok-viral/screen-02.PNG',
    '/screenshots/tiktok-viral/screen-03.PNG',
    // '/screenshots/tiktok-viral/screen-04.png',
  ],

  // Ile slotów placeholder pokazać gdy nie ma zdjęć
  placeholderCount: 4,

  // Pozostałe filmiki bez statystyk — wpisz ID z YouTube (część po "youtu.be/" lub "?v=")
  // aspect: 'landscape' = 16:9 (YouTube/rolki), 'portrait' = 9:16 (TikTok pionowy)
  moreVideos: [
    { id: 'yPsCfnfpIB0', title: '', aspect: 'landscape' },
    { id: '2MUmh0rr5c8', title: '', aspect: 'landscape' },
    { id: 'hvpk5iVdm1c', title: '', aspect: 'landscape' },
  ],
};

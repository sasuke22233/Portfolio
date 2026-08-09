# Как настроить вашу Portfolio OS

## Добавление новых обоев
Чтобы добавить свои обои (включая анимированные из Wallpaper Engine):

### 1. Статичные обои (Картинки)
- Добавьте файл изображения в папку `public/wallpapers/` (создайте её, если она не существует).
- Или используйте внешнюю ссылку.
- Откройте файл `src/app/page.tsx`.
- Найдите массив `wallpapers`.
- Добавьте новую запись:
  ```javascript
  { 
    id: "my-new-wallpaper", 
    name: "Мои крутые обои", 
    type: "static", 
    style: "url('/wallpapers/my-image.jpg') center/cover no-repeat" 
  }
  ```

### 2. Анимированные обои (Видео / Wallpaper Engine)
Wallpaper Engine часто использует формат `.pkg` или `.tex`, которые являются специфичными для этой программы и **не поддерживаются** напрямую в веб-браузерах.

**Как использовать обои из Wallpaper Engine:**
1. **Конвертация в видео**:
   - Самый простой способ: Запишите видео с экрана (Screen Recording) с работающими обоями и сохраните как `.mp4`.
   - Или поищите исходный видеофайл в папке проекта (иногда они лежат как `.webm` или `.mp4`).
   - Если файл `.pkg`, вам понадобятся специальные распаковщики (например, RePKG), чтобы извлечь ресурсы, но это сложно. Лучше найти видео-версию этих обоев в интернете.

2. **Добавление видео в код**:
   - Поместите файл `wallpaper.mp4` в папку `public/wallpapers/`.
   - В `src/app/page.tsx` вам нужно будет изменить рендеринг фона. Сейчас он использует `style={{ background: ... }}`. Для видео нужно добавить условный рендеринг:
   
   *В компоненте Home:*
   ```javascript
   {currentWallpaper?.type === 'video' ? (
     <video 
       autoPlay 
       loop 
       muted 
       className="animated-bg object-cover w-full h-full fixed inset-0 -z-10"
       src={currentWallpaper.videoUrl}
     />
   ) : (
     <div 
       className="animated-bg" 
       style={{ background: currentWallpaper?.style || "#0a0a0a" }} 
     />
   )}
   ```
   
   *И добавить в массив wallpapers:*
   ```javascript
   { 
     id: "video-wall", 
     name: "Video Wallpaper", 
     type: "video", 
     videoUrl: "/wallpapers/wallpaper.mp4" 
   }
   ```

## Изменение иконки на реалистичную летучую мышь
Чтобы заменить векторную иконку летучей мыши на реалистичное изображение:

1. **Найдите изображение**: Найдите PNG картинку реалистичной летучей мыши с прозрачным фоном.
2. **Получите ссылку**: Скопируйте URL картинки или сохраните её в проект.
3. **Обновите код**:
   - Откройте `src/app/page.tsx`.
   - Найдите функцию `getDesktopIcons`.
   - Замените `icon: "bat"` на URL вашей картинки.
   
   *Было:*
   ```javascript
   { id: "identity", name: t.identity, icon: "bat" },
   ```
   
   *Стало:*
   ```javascript
   { id: "identity", name: t.identity, icon: "https://example.com/realistic-bat.png" },
   ```
   
   - Сделайте то же самое для массива `dockItems`.
   
   *Примечание*: Код автоматически проверяет, если `icon === "bat"`, то рисует SVG. Если там URL, он нарисует картинку (`<img>`). Так что просто замены строки на URL достаточно.

## Добавление музыки с текстом
1. Откройте `src/app/page.tsx`.
2. Найдите массив `musicTracks`.
3. Добавьте новый объект:
   ```javascript
   {
     id: 5,
     title: "Название песни",
     artist: "Исполнитель",
     duration: "3:30",
     lyrics: `Текст песни...`
   },
   ```

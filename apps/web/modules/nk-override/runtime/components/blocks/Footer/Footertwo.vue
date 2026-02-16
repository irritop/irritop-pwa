<template>
  <footer class="bg-neutral-100 text-neutral-900 pt-10 pb-6">
    <div class="max-w-screen-xl mx-auto px-4 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Unternehmen -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Unternehmen</h3>
          <ul>
            <li><a href="https://www.irritop.com/www/kontakt" class="hover:underline">Kontakt</a></li>
            <li><a href="https://www.irritop.com/www/versandkosten-lieferung" class="hover:underline">Versandkosten & Lieferung</a></li>
            <li><a href="https://www.irritop.com/b2b" class="hover:underline">Großhandel</a></li>
          </ul>
        </div>
        <!-- Hilfe & FAQ -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Hilfe & FAQ</h3>
          <ul>
            <li><a href="https://www.irritop.com/hgf" class="hover:underline">Hilfe</a></li>
            <li><a href="https://www.irritop.com/www/angebote" class="hover:underline">Angebote</a></li>
            <li><a href="https://www.irritop.com/www/wunschzettel" class="hover:underline">Wunschliste</a></li>
          </ul>
        </div>
        <!-- Rechtliches -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Rechtliches</h3>
          <ul>
            <li><a href="https://www.irritop.com/www/stornierungsrechte" class="hover:underline">Widerrufsrecht</a></li>
            <li><a href="https://www.irritop.com/www/rechtliche-offenlegung" class="hover:underline">Impressum</a></li>
            <li><a href="https://www.irritop.com/www/datenschutzrichtlinie" class="hover:underline">Datenschutzerklärung</a></li>
            <li><a href="https://www.irritop.com/www/agb" class="hover:underline">AGB</a></li>
          </ul>
        </div>
        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
          <p class="text-sm mb-2">Sei immer auf dem neuesten Stand! Abonniere unseren Newsletter und erfahre als Erster von neuen Angeboten und Produkteinführungen.</p>
          <form class="flex flex-col gap-2">
            <input type="email" placeholder="E-Mail" class="border rounded px-3 py-2" required />
            <button type="submit" class="bg-primary-500 text-white rounded px-4 py-2 hover:bg-primary-600">Abonnieren</button>
            <small class="text-xs">Hiermit bestätige ich, dass ich die <a href="https://www.irritop.com/www/datenschutzrichtlinie" class="underline">Datenschutzerklärung</a> gelesen habe. Meine Einwilligung kann ich jederzeit widerrufen.</small>
          </form>
        </div>
      </div>
      <div class="border-t pt-6 text-sm flex flex-col md:flex-row justify-between items-center gap-2">
        <div>
          <span>© Copyright 2026 IRRITOP GmbH | Alle Rechte vorbehalten.</span>
          <span class="block md:inline">*Alle Preise zzgl. Versand und inkl. MwSt. / Änderungen und Irrtümer vorbehalten. Versand aus Bremen (Deutschland).</span>
        </div>
        <div>
          <span>Irritop GmbH, Ohmstraße 7, 10179 Berlin, Deutschland | </span>
          <a href="mailto:info@irritop.com" class="hover:underline">info@irritop.com</a>
          <span> | Hotline: <a href="tel:+493030806982" class="hover:underline">+49 (0) 30 30806982</a> (Mo-Fr, 09:00-15:00)</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No script logic required for static footer
</script>
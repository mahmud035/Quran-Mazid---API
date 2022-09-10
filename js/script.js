'use strict';

const toggleSpinner = (displayValue) => {
  document.getElementById('spinner').style.display = displayValue;
};

const loadAllData = async () => {
  // display spinner
  toggleSpinner('block');

  const url = `https://api.alquran.cloud/v1/quran/bn.bengali`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data.surahs);
  return data.data.surahs;
};

const displayAllSurah = async () => {
  const allSurah = await loadAllData(); //* Bangla Quran Data

  const allSurahContainer = document.getElementById('surah-card-container');

  allSurah.forEach((surah = {}) => {
    const { englishName, englishNameTranslation, number } = surah;
    // console.log(surah);

    const newEnglishName = englishName.replaceAll("'", '-');
    // console.log(newEnglishName);

    const surahObject = JSON.stringify(surah);
    // console.log(surahObject);

    const surahDiv = document.createElement('div');
    surahDiv.classList.add('.col');

    surahDiv.innerHTML = `
       <div class="surah-card"
       onclick='displayCompleteSurah(${surahObject}, ${number})' data-bs-toggle="modal"  data-bs-target="#exampleModal">
            <div class="surah-number-bookmark">
              <p>${number}</p>
              <i id="bookmark" class="bx bx-heart heart"></i>
            </div>
            <div class="surah-name-info">
              <h3>${newEnglishName}</h3>
              <h4>${englishNameTranslation}</h4>
            </div>
        </div>
      `;

    allSurahContainer.appendChild(surahDiv);
  });

  // Hide Spinner
  toggleSpinner('none');
};

displayAllSurah();

//* Display Single Surah (Completely)
const displayCompleteSurah = async (surah, surahNumber) => {
  const { englishName, number } = surah;

  //* get All Arabic Ayat from Corresponding Sura
  const allArabicAyat = await loadArabicText(surahNumber);
  // console.log(allArabicAyat);

  let count = 0;

  console.log(surah, surahNumber);

  const surahName = document.getElementById('surah-name');
  surahName.innerText = englishName;

  const modalBody = document.getElementById('modal-body');
  modalBody.textContent = '';

  const allAyat = surah.ayahs; //* Single Surah's Bangla Data

  allAyat.forEach((ayat = {}) => {
    const { numberInSurah, text } = ayat;
    // console.log(ayat);

    const ayatDiv = document.createElement('div');
    ayatDiv.classList.add('ayat-card', 'w-50', 'mx-auto');
    ayatDiv.innerHTML = `
        <div id="arabic-text-container" class="number-and-arabic-ayat-info">
              <p id="sura-and-ayat-number">${number}:${numberInSurah}</p>
              <p id="arabic-ayat">${allArabicAyat[count].text} </p>

         </div>
         <div class="translation-info">
              <h6>
                  BANGLA - M KHAN | <span class="tafsir">SEE TAFSIR</span> | <span><i onclick="playAudio('${allArabicAyat[count].audio}')" class="fa-regular fa-circle-play ms-2 fs-5 "></i> </span>
              </h6>
          </div>

          <div class="bangla-meaning">
              <p id="bangla-meaning">${text}</p>
          </div>
        `;

    modalBody.appendChild(ayatDiv);
    count++;
  });

  // loadArabicText(surahNumber);
};

//* get Single Surah's Arabic Text and Audio Data
const loadArabicText = async (surahNumber) => {
  const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`;
  // console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data.ayahs);
  return data.data.ayahs;
};

//* play audio function
const playAudio = async (url) => {
  const audio = new Audio(url);
  audio.play();
  console.log(url);
};

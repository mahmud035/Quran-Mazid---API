'use strict';

const toggleSpinner = (displayValue) => {
  document.getElementById('spinner').style.display = displayValue;
};

const loadAllData = async () => {
  // display spinner
  toggleSpinner('block');

  const url = `http://api.alquran.cloud/v1/quran/bn.bengali`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data.surahs);
  return data.data.surahs;
};

const displayAllSurah = async () => {
  const allSurah = await loadAllData();

  const allSurahContainer = document.getElementById('surah-card-container');

  allSurah.forEach((surah = {}) => {
    const { englishName, englishNameTranslation, number } = surah;
    // console.log(surah);

    const surahObject = JSON.stringify(surah);
    console.log(surahObject);

    const surahDiv = document.createElement('div');
    surahDiv.classList.add('.col');

    surahDiv.innerHTML = `
       <div class="surah-card"
       onclick='displayCompleteSurah(${surahObject})' data-bs-toggle="modal"  data-bs-target="#exampleModal">
            <div class="surah-number-bookmark">
              <p id="surah-number">${number}</p>
              <i id="bookmark" class="bx bx-heart heart"></i>
            </div>
            <div class="surah-name-info">
              <h3 >${englishName}</h3>
              <h4 id="english-translation-name">${englishNameTranslation}</h4>
            </div>
        </div>
      `;

    allSurahContainer.appendChild(surahDiv);
  });

  // Hide Spinner
  toggleSpinner('none');
};

displayAllSurah();

const displayCompleteSurah = (surah) => {
  // const surahObject = JSON.parse(surah);
  // console.log(surahObject);
  console.log(surah);
};

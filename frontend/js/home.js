/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */


const showMakeOfferModal = () => {
  const makeOfferModal = document.getElementById('makeOfferModal'); // Get the modal
  const nameOfOrderPersonInput = document.getElementById('nameOfOrderPerson');
  const { first_name, last_name } = JSON.parse(localStorage.getItem('autoMartUser'));
  nameOfOrderPersonInput.value = `${first_name} ${last_name}`;
  makeOfferModal.style.display = 'block';
};

const showReportAdModal = () => {
  const reportFraudModal = document.getElementById('reportFraudByUser'); // Get the modal
  const nameOfReportPersonInput = document.getElementById('nameOfReportPerson');
  const { first_name, last_name } = JSON.parse(localStorage.getItem('autoMartUser'));
  nameOfReportPersonInput.value = `${first_name} ${last_name}`;
  reportFraudModal.style.display = 'block';
};

let Adverts = [];

const initMakeOfferModal = () => {
  const makeOfferModal = document.getElementById('makeOfferModal'); // Get the modal
  const span = document.getElementsByClassName('close')[0]; // Get the <span> element that closes the modal

  span.addEventListener('click', () => { // When the user clicks on <span> (x), close the modal
    makeOfferModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => { // When the user clicks anywhere outside of the modal, close it
    if (event.target === makeOfferModal) {
      makeOfferModal.style.display = 'none';
    }
  });
};

const initReportModal = () => {
  const reportFraudModal = document.getElementById('reportFraudByUser'); // Get the modal
  const reportSpan = document.getElementsByClassName('close')[1]; // Get the <span> element that closes the modal

  reportSpan.addEventListener('click', () => { // When the user clicks on <span> (x), close the modal
    reportFraudModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => { // When the user clicks anywhere outside of the modal, close it
    if (event.target === reportFraudModal) {
      reportFraudModal.style.display = 'none';
    }
  });
};

const getData = async (url) => {
  const { token } = JSON.parse(localStorage.getItem('autoMartUser'));
  const cars = await fetch(url, {
    method: 'GET',
    headers: {
      Authentication: `${token}`,
      // 'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .catch(error => ({ fetchError: error.message }));
  return cars;
};

const getAllAdverts = async () => {
  const { is_admin } = JSON.parse(localStorage.getItem('autoMartUser'));
  let url = 'https://automarter.herokuapp.com/api/v1/car?status=available';
  if (is_admin) url = 'https://automarter.herokuapp.com/api/v1/car';
  const cars = await getData(url)
    .then(data => data)
    .catch(error => error);
  return cars;
};

const buildAdBox = (ad) => { // adBox builder
  // ad Box
  const adBox = document.createElement('div');
  adBox.className = 'ad-box';
  adBox.id = `ad-Box${ad.id}`;

  // image section
  const adBoxImg = document.createElement('div');
  adBoxImg.className = 'ad-box-img';
  const img = document.createElement('img');
  // eslint-disable-next-line prefer-destructuring
  img.src = ad.photos[0];
  adBoxImg.append(img); // coupling

  /**
    * info sections
    */
  const adBoxInfo = document.createElement('div');
  adBoxInfo.className = 'ad-box-info';

  // title section
  const adBoxTitle = document.createElement('div');
  adBoxTitle.className = 'ad-box-title';
  adBoxTitle.innerHTML = `<a>${ad.title}</a>`;

  // price section
  const adBoxPrice = document.createElement('div');
  adBoxPrice.className = 'ad-box-price';
  adBoxPrice.innerHTML = `<span>Price: </span><span id="adPrice${ad.id}">N${ad.price}</span>`;

  // details section
  const adBoxDetails = document.createElement('div');
  adBoxDetails.className = 'ad-box-details';
  adBoxDetails.innerHTML = `
        <span>${ad.manufacturer} </span>|<span> ${ad.model} </span>|<span> ${ad.state}</span>`;

  // coupling infos
  adBoxInfo.append(adBoxTitle, adBoxPrice, adBoxDetails);

  /**
    * update sections
    */
  let adBoxButtons = '';
  // update button sections
  adBoxButtons = document.createElement('section');
  adBoxButtons.className = 'ad-box-buttons';
  adBoxButtons.id = 'ad-box-buttons';

  const makeOfferButton = document.createElement('button'); // update status button
  makeOfferButton.innerHTML = 'Make Offer';
  makeOfferButton.className = 'revealOfferModal';
  makeOfferButton.addEventListener('click', () => {
    showMakeOfferModal();
  });

  const reportAdButton = document.createElement('button'); // update price button
  reportAdButton.innerHTML = 'Report';
  reportAdButton.className = 'revealReportModal';
  reportAdButton.addEventListener('click', () => {
    showReportAdModal();
  });
  adBoxButtons.append(makeOfferButton, reportAdButton); // coupling

  /**
     * Total coupling of the advert
     */
  adBox.append(adBoxImg, adBoxInfo, adBoxButtons);
  return adBox;
};

const arrangeMyAdverts = (ads) => {
  const container = document.createElement('div');
  container.className = 'ad-box-container';
  for (let i = ads.length - 1; i > -1; i -= 1) {
    container.append(buildAdBox(ads[i]));
  }
  Adverts.push(container);
};

const displayAdverts = () => {
  const sectionTag = document.getElementsByClassName('home-page-body')[0];
  if (Adverts.length === 0) {
    sectionTag.style.backgroundImage = "url('images/noAds.png')";
  } else {
    sectionTag.append(Adverts[0]);
    Adverts = [];
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  // get all ads
  const Ads = await getAllAdverts();
  if (Ads.status === 401) {
    signOut('signin.html'); // from main.js
  }
  if (Ads.data.length !== 0) arrangeMyAdverts(Ads.data);
  displayAdverts();
  initMakeOfferModal();
  initReportModal();
});

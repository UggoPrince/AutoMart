/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

const isAdmin = JSON.parse(localStorage.getItem('autoMartUser')).is_admin;
const showMakeOfferModal = (car_id) => {
  const makeOfferModal = document.getElementById('makeOfferModal'); // Get the modal
  const nameOfOrderPersonInput = document.getElementById('nameOfOrderPerson');
  const { first_name, last_name } = JSON.parse(localStorage.getItem('autoMartUser'));
  nameOfOrderPersonInput.value = `${first_name} ${last_name}`;
  document.getElementById('carIdForOffer').value = car_id;
  makeOfferModal.style.display = 'block';
};

const showReportAdModal = (car_id) => {
  const reportFraudModal = document.getElementById('reportFraudModal'); // Get the modal
  const nameOfReportPersonInput = document.getElementById('nameOfReportPerson');
  const { first_name, last_name } = JSON.parse(localStorage.getItem('autoMartUser'));
  nameOfReportPersonInput.value = `${first_name} ${last_name}`;
  document.getElementById('carIdForReport').value = car_id;
  reportFraudModal.style.display = 'block';
};

let Adverts = [];

class Advert {
  async getData(url) {
    const { token } = JSON.parse(localStorage.getItem('autoMartUser'));
    const cars = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .catch(error => ({ fetchError: error.message }));
    return cars;
  }

  async getAnAdvert(car_id) {
    const url = `https://automarter.herokuapp.com/api/v1/car/${car_id}`;
    const car = await this.getData(url)
      .then(data => data)
      .catch(error => error);
    return car;
  }

  async getAllAdverts() {
    const { is_admin } = JSON.parse(localStorage.getItem('autoMartUser'));
    let url = 'https://automarter.herokuapp.com/api/v1/car?status=available';
    if (is_admin) url = 'https://automarter.herokuapp.com/api/v1/car';
    const cars = await this.getData(url)
      .then(data => data)
      .catch(error => error);
    return cars;
  }

  async deleteAdvert(car_id) {
    const url = `https://automarter.herokuapp.com/api/v1/car/${car_id}`;
    const { token } = JSON.parse(localStorage.getItem('autoMartUser'));
    const deletedCar = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        mode: 'cors',
      },
    }).then(response => response.json())
      .catch(error => ({ fetchError: error.message }));
    if (deletedCar.error && deletedCar.status !== 401) {
      // eslint-disable-next-line no-console
      // console.log(deletedCar.error);
    } else if (deletedCar.status === 401) {
      signOut('signin.html'); // from main.js
    } else if (deletedCar.status === 200) {
      getElemId(`ad-Box${car_id}`).style.display = 'none';
    }
  }
}

class Order {
  async postData(url, formData) {
    const { token } = JSON.parse(localStorage.getItem('autoMartUser'));
    const serverRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then(response => response.json())
      .catch(error => ({ fetchError: error.message }));
    return serverRes;
  }

  buildOrderData(form) {
    return {
      car_id: form.car_id.value,
      amount: form.amount.value,
    };
  }

  getNotify() {
    return document.getElementsByClassName('serverNotice')[0];
  }

  handleNetworkError() {
    const notify = this.getNotify();
    notify.style.color = 'red';
    notify.style.background = 'rgb(255, 182, 182)';
    notify.innerHTML = 'Not connecting. Check your network.';
  }

  displayError(error) {
    const notify = this.getNotify();
    notify.innerHTML = error.amount;
  }

  handleUserError(resultError) {
    const notify = this.getNotify();
    notify.style.color = 'red';
    notify.style.background = 'rgb(255, 182, 182)';
    if (resultError.status === 401) {
      notify.innerHTML = 'Session expired, login to continue.';
      setTimeout(() => {
        signOut('signin.html'); // from main.js
      }, 1500);
    } else this.displayError(resultError.error);
  }

  closeModalAfterSuccess() {
    setTimeout(() => {
      const makeOfferModal = document.getElementById('makeOfferModal'); // Get the modal
      makeOfferModal.style.display = 'none';
      const notify = this.getNotify();
      notify.style.display = 'none';
      notify.innerHTML = '';
    }, 1500);
  }

  handleSuccess() {
    const notify = this.getNotify();
    notify.innerHTML = 'Successfully Ordered.';
  }

  async makeOrder(event) {
    event.preventDefault();
    const notify = this.getNotify();
    notify.style.display = 'inline-block';
    notify.style.color = 'green';
    notify.style.background = 'rgb(198, 240, 198)';
    notify.innerHTML = 'Wait. Processing...';
    const form = event.target;
    const formData = this.buildOrderData(form);
    const url = 'https://automarter.herokuapp.com/api/v1/order';
    const result = await this.postData(url, formData)
      .then(data => data)
      .catch(error => error);
    if (result.fetchError) {
      this.handleNetworkError();
    } else if (result.error && result.status !== 401) {
      this.handleUserError(result);
    } else if (result.status === 201) {
      this.handleSuccess();
    }
  }
}

class Flag {
  async postData(url, formData) {
    const { token } = JSON.parse(localStorage.getItem('autoMartUser'));
    const serverRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then(response => response.json())
      .catch(error => ({ fetchError: error.message }));
    return serverRes;
  }

  buildReportData(form) {
    return {
      car_id: form.car_id.value,
      reason: form.reason.value,
      description: form.description.value,
    };
  }

  getNotify() {
    return document.getElementsByClassName('serverNotice')[1];
  }

  handleNetworkError() {
    const notify = this.getNotify();
    notify.style.color = 'red';
    notify.style.background = 'rgb(255, 182, 182)';
    notify.innerHTML = 'Not connecting. Check your network.';
  }

  displayError(error) {
    const notify = this.getNotify();
    notify.innerHTML = 'Unsuccessful.';
    const errorSpan = document.getElementsByClassName('errorSpanForReport');
    if (error.reason) errorSpan[0].innerHTML = error.reason;
    if (error.description) errorSpan[1].innerHTML = error.description;
  }

  handleUserError(resultError) {
    const notify = this.getNotify();
    notify.style.color = 'red';
    notify.style.background = 'rgb(255, 182, 182)';
    if (resultError.status === 401) {
      notify.innerHTML = 'Session expired, login to continue.';
      setTimeout(() => {
        signOut('signin.html'); // from main.js
      }, 1500);
    } else {
      this.displayError(resultError.error.error);
    }
  }

  closeModalAfterSuccess() {
    setTimeout(() => {
      const makeOfferModal = document.getElementById('makeOfferModal'); // Get the modal
      makeOfferModal.style.display = 'none';
      const notify = this.getNotify();
      notify.style.display = 'none';
      notify.innerHTML = '';
    }, 1500);
  }

  handleSuccess() {
    const notify = this.getNotify();
    notify.innerHTML = 'Advert Reported.';
  }

  emptyErrorSpan() {
    const errorSpan = document.getElementsByClassName('errorSpanForReport');
    errorSpan[0].innerHTML = '';
    errorSpan[1].innerHTML = '';
  }

  async reportAdvert(event) {
    event.preventDefault();
    this.emptyErrorSpan();
    const notify = this.getNotify();
    notify.style.display = 'inline-block';
    notify.style.color = 'green';
    notify.style.background = 'rgb(198, 240, 198)';
    notify.innerHTML = 'Wait. Processing...';
    const form = event.target;
    const formData = this.buildReportData(form);
    const url = 'https://automarter.herokuapp.com/api/v1/flag';
    const result = await this.postData(url, formData)
      .then(data => data)
      .catch(error => error);
    if (result.fetchError) {
      this.handleNetworkError();
    } else if (result.error && result.status !== 401) {
      this.handleUserError(result);
    } else if (result.status === 201) {
      this.handleSuccess();
    }
  }
}

const initMakeOfferModal = () => {
  const makeOfferModal = document.getElementById('makeOfferModal'); // Get the modal
  const span = document.getElementsByClassName('close')[0]; // Get the <span> element that closes the modal
  const order = new Order();
  const notify = order.getNotify();

  makeOfferModal.addEventListener('submit', async (event) => {
    await order.makeOrder(event);
  });

  span.addEventListener('click', () => { // When the user clicks on <span> (x), close the modal
    makeOfferModal.style.display = 'none';
    notify.style.display = 'none';
    notify.innerHTML = '';
  });

  window.addEventListener('click', (event) => { // When the user clicks anywhere outside of the modal, close it
    if (event.target === makeOfferModal) {
      makeOfferModal.style.display = 'none';
      notify.style.display = 'none';
      notify.innerHTML = '';
    }
  });
};

const initReportModal = () => {
  const reportFraudModal = document.getElementById('reportFraudModal'); // Get the modal
  const reportSpan = document.getElementsByClassName('close')[1]; // Get the <span> element that closes the modal
  const flag = new Flag();
  // const notify = order.getNotify();

  reportFraudModal.addEventListener('submit', async (event) => {
    await flag.reportAdvert(event);
  });

  reportSpan.addEventListener('click', () => { // When the user clicks on <span> (x), close the modal
    reportFraudModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => { // When the user clicks anywhere outside of the modal, close it
    if (event.target === reportFraudModal) {
      reportFraudModal.style.display = 'none';
    }
  });
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
  img.src = ad.image_url;
  adBoxImg.append(img); // coupling

  /**
    * info sections
    */
  const adBoxInfo = document.createElement('div');
  adBoxInfo.className = 'ad-box-info';

  // title section
  const adBoxTitle = document.createElement('div');
  adBoxTitle.className = 'ad-box-title';
  adBoxTitle.innerHTML = `<a href="home.html?car=${ad.id}">${ad.title}</a>`;

  // price section
  const adBoxPrice = document.createElement('div');
  adBoxPrice.className = 'ad-box-price';
  adBoxPrice.innerHTML = `<span>Price: </span><span id="adPrice${ad.id}">N${ad.price}</span>`;

  // details section
  const adBoxDetails = document.createElement('div');
  adBoxDetails.className = 'ad-box-details';
  adBoxDetails.innerHTML = `
        <span>${ad.manufacturer} </span>|<span> ${ad.model} </span>|<span> ${ad.state}</span>`;
  let adBoxStatus = '';
  if (isAdmin) {
    adBoxStatus = createElement('div');
    adBoxStatus.className = 'ad-box-available';
    adBoxStatus.innerHTML = `Status: <span>${ad.status}</span>`;
  }

  // coupling infos
  adBoxInfo.append(adBoxTitle, adBoxPrice, adBoxStatus, adBoxDetails);

  /**
    * update sections
    */
  let adBoxButtons = '';
  // update button sections
  adBoxButtons = document.createElement('section');
  adBoxButtons.className = 'ad-box-buttons';
  adBoxButtons.id = `ad-box-buttons${ad.id}`;

  const makeOfferButton = document.createElement('button'); // update status button
  makeOfferButton.innerHTML = '<i class="fas fa-cart-arrow-down"></i> Make Offer';
  makeOfferButton.className = 'revealOfferModal';
  makeOfferButton.addEventListener('click', () => {
    showMakeOfferModal(ad.id);
  });


  let reportAdButton = ''; // update price button
  if (!isAdmin) {
    reportAdButton = document.createElement('button');
    reportAdButton.innerHTML = '<i class="fas fa-mask"></i> Report';
    reportAdButton.className = 'revealReportModal';
    reportAdButton.addEventListener('click', () => {
      showReportAdModal(ad.id);
    });
  } else {
    reportAdButton = document.createElement('button');
    reportAdButton.innerHTML = '<i class="fas fa-trash"></i> Delete Ad';
    reportAdButton.className = '.ad-box-delete-button';
    reportAdButton.addEventListener('click', async () => {
      const advert = new Advert();
      await advert.deleteAdvert(ad.id);
    });
  }
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

const buildOneAdBox = (ad) => {
  // car block
  const carPage = createElement('section');
  carPage.className = 'car-page';

  // details
  const carDetails = createElement('div');
  carDetails.className = 'car-details';

  // header block
  const carHeader = createElement('section');
  carHeader.className = 'car-header';

  const carTitle = createElement('div'); // title
  carTitle.class = 'car-header-title';
  carTitle.innerHTML = ad.title;
  const carPrice = createElement('div'); // price
  carPrice.innerHTML = `Price: ${ad.price}`;
  carPrice.className = 'car-header-price';
  const carState = createElement('div');
  carState.innerHTML = `State: ${ad.state}`;
  carState.className = 'car-header-state';
  const carModel = createElement('div');
  carModel.innerHTML = `Manufacturer: ${ad.manufacturer} | Model: ${ad.model}`;
  carModel.className = 'car-header-model';

  carHeader.append(carTitle, carPrice, carState, carModel); // coupling

  // photo section
  const carPhoto = createElement('img');
  // eslint-disable-next-line prefer-destructuring
  carPhoto.src = ad.image_url;
  carPhoto.className = 'car-photo';

  // buttons
  const buttonDiv = createElement('div');
  buttonDiv.className = 'car-make-offer-buttons';
  const button = createElement('button');
  button.innerHTML = '<i class="fas fa-cart-arrow-down"></i> Make Offer';
  button.addEventListener('click', () => {
    showMakeOfferModal(ad.id);
  });

  let button2 = '';
  if (!isAdmin) {
    button2 = createElement('button');
    button2.innerHTML = '<i class="fas fa-mask"></i> Report';
    button2.addEventListener('click', () => {
      showReportAdModal(ad.id);
    });
  } else {
    button2 = document.createElement('button');
    button2.innerHTML = '<i class="fas fa-trash"></i> Delete Ad';
    button2.addEventListener('click', async () => {
      const advert = new Advert();
      await advert.deleteAdvert(ad.id);
    });
  }
  buttonDiv.append(button, button2); // coupling

  // total coupling
  carDetails.append(carHeader, carPhoto, buttonDiv);
  carPage.append(carDetails);
  return carPage;
};

const runGetOneAdvert = async () => {
  const anAdGetter = new Advert();
  const ad = await anAdGetter.getAnAdvert(urlParams().get('car'));
  if (ad.status === 401) {
    signOut('signin.html'); // from main.js
  }
  if (ad.data.id) {
    const sectionTag = document.getElementsByClassName('home-page-body')[0];
    const AdBlock = buildOneAdBox(ad.data);
    sectionTag.appendChild(AdBlock);
  }
};

const runGetAllAdverts = async () => {
  const adsGetter = new Advert();
  const Ads = await adsGetter.getAllAdverts();
  if (Ads.status === 401) {
    signOut('signin.html'); // from main.js
  }
  if (Ads.data.length !== 0) arrangeMyAdverts(Ads.data);
  displayAdverts();
};

document.addEventListener('DOMContentLoaded', () => {
  if (urlParams().has('car')) {
    runGetOneAdvert();
  } else {
  // get all ads
    runGetAllAdverts();
  }
  initMakeOfferModal();
  initReportModal();
});

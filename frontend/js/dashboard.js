/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */


class AdvertUpdater {
  async patchData(url, formData) {
    const { token } = JSON.parse(localStorage.getItem('autoMartUser'));
    const serverRes = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `${token}`,
      },
      body: JSON.stringify(formData),
    }).then(response => response.json())
      .catch(error => ({ fetchError: error.message }));
    return serverRes;
  }

  buildUpdatePriceData(form) {
    return { newPrice: form.newPrice.value };
  }

  appendToAds(data) {
    const container = document.getElementsByClassName('ad-block-container')[1];
    // eslint-disable-next-line no-use-before-define
    container.prepend(buildAdBlock(data));
  }

  async updateAdPrice(event, carId) {
    event.preventDefault();
    const url = `https://automarter.herokuapp.com/api/v1/car/${carId}/price`;
    const form = event.target;
    const formData = this.buildUpdatePriceData(form);
    const req = await this.patchData(url, formData)
      .then(data => data)
      .catch(error => error);
    if (req.status && req.status === 200) {
      document.getElementById(`adPrice${carId}`).innerHTML = req.data.price;
    }
  }

  async updateAdStatus(event, carId) {
    const url = `https://automarter.herokuapp.com/api/v1/car/${carId}/status`;
    const formData = { newStatus: 'sold' };
    const req = await this.patchData(url, formData)
      .then(data => data)
      .catch(error => error);
    if (req.error) {
      // eslint-disable-next-line no-console
      console.log(req.error);
    } else if (req.status && req.status === 200) {
      document.getElementById(`ad-block${carId}`).style.display = 'none';
      this.appendToAds(req.data);
    }
  }
}
const advertUpdater = new AdvertUpdater();
let MyAdverts = [];

const buildAdBlock = (ad) => { // adBlock builder
  // ad block
  const adBlock = document.createElement('div');
  adBlock.className = 'ad-block';
  adBlock.id = `ad-block${ad.id}`;

  // image section
  const adBlockImg = document.createElement('div');
  adBlockImg.className = 'ad-block-img';
  const img = document.createElement('img');
  // eslint-disable-next-line prefer-destructuring
  img.src = ad.photos[0];
  adBlockImg.append(img); // coupling

  /**
   * info sections
   */
  const adBlockInfo = document.createElement('div');
  adBlockInfo.className = 'ad-block-info';

  // title section
  const adBlockTitle = document.createElement('div');
  adBlockTitle.className = 'ad-block-title';
  adBlockTitle.innerHTML = `<a>${ad.title}</a>`;

  // price section
  const adBlockPrice = document.createElement('div');
  adBlockPrice.className = 'ad-block-price';
  adBlockPrice.innerHTML = `<span>Price: </span><span id="adPrice${ad.id}">N${ad.price}</span>`;

  // details section
  const adBlockDetails = document.createElement('div');
  adBlockDetails.className = 'ad-block-details';
  adBlockDetails.innerHTML = `
      <span>${ad.manufacturer} </span>|<span> ${ad.model} </span>|<span> ${ad.state}</span>`;

  // coupling infos
  adBlockInfo.append(adBlockTitle, adBlockPrice, adBlockDetails);

  /**
   * update sections
  */
  let adBlockUpdatePriceForm = '';
  let adBlockUpdateButtons = '';
  if (ad.status === 'available') {
    // update price form section
    adBlockUpdatePriceForm = document.createElement('section');
    adBlockUpdatePriceForm.className = 'ad-block-update-price-form';
    const updatePriceForm = document.createElement('form');
    updatePriceForm.id = 'updatePriceForm';
    updatePriceForm.name = 'updatePriceForm';
    updatePriceForm.method = 'POST';
    updatePriceForm.addEventListener('submit', async (event) => {
      await advertUpdater.updateAdPrice(event, ad.id);
    });

    const updatePriceInput = document.createElement('input');
    updatePriceInput.type = 'number';
    updatePriceInput.name = 'newPrice';
    updatePriceInput.min = 0;
    updatePriceInput.placeholder = 'Enter new Price';

    const submitNewPriceButton = document.createElement('input');
    submitNewPriceButton.value = 'Update';
    submitNewPriceButton.type = 'submit';
    updatePriceForm.append(updatePriceInput, submitNewPriceButton); // coupling
    adBlockUpdatePriceForm.append(updatePriceForm); // coupling
    adBlockUpdatePriceForm.style.display = 'none';

    // update button sections
    adBlockUpdateButtons = document.createElement('section');
    adBlockUpdateButtons.className = 'ad-block-update-buttons';
    adBlockUpdateButtons.id = 'ad-block-update-buttons';

    const updateStatusButton = document.createElement('button'); // update status button
    updateStatusButton.innerHTML = 'Mark Sold';
    updateStatusButton.addEventListener('click', async (event) => {
      await advertUpdater.updateAdStatus(event, ad.id);
    });

    const updatePriceButton = document.createElement('button'); // update price button
    updatePriceButton.innerHTML = 'Update Price';
    updatePriceButton.addEventListener('click', () => {
      if (adBlockUpdatePriceForm.style.display === 'none') {
        updatePriceButton.innerHTML = 'Close';
        updateStatusButton.style.display = 'none'; // hide update status button
        adBlockInfo.style.display = 'none'; // hide info section
        adBlockUpdatePriceForm.style.display = 'block'; // show form
        updatePriceButton.style.background = 'red';
      } else {
        adBlockUpdatePriceForm.style.display = 'none'; // hide form
        updateStatusButton.style.display = 'inline-block'; // show update status button
        adBlockInfo.style.display = 'block'; // show info section
        updatePriceButton.innerHTML = 'Update Price';
        updatePriceButton.style.background = 'rgb(255, 97, 40)';
      }
    });
    adBlockUpdateButtons.append(updatePriceButton, updateStatusButton); // coupling
  }

  /**
   * Total coupling of the advert
   */
  adBlock.append(adBlockImg, adBlockInfo, adBlockUpdatePriceForm,
    adBlockUpdateButtons);
  return adBlock;
};

class AdvertPoster {
  async postData(url, formData) {
    const { token } = JSON.parse(localStorage.getItem('autoMartUser'));
    const serverRes = await fetch(url, {
      method: 'POST',
      headers: {
        Authentication: `${token}`,
        // 'Content-Type': 'application/json',
      },
      body: formData,
    }).then(response => response.json())
      .catch(error => ({ fetchError: error.message }));
    return serverRes;
  }

  buildPostAdvertData(form) {
    const formData = new FormData();
    formData.append('bodyType', form.bodyType.value);
    formData.append('state', form.state.value);
    formData.append('status', 'available');
    formData.append('manufacturer', form.manufacturer.value);
    formData.append('model', form.model.value);
    formData.append('photo', form.photo.files[0]);
    formData.append('price', form.price.value);
    formData.append('title', form.title.value);
    return formData;
  }

  getNotify() {
    return document.getElementsByClassName('serverNotice')[0];
  }

  displayError(error) {
    const errorSpan = document.getElementsByClassName('errorSpan');
    const notify = this.getNotify();
    if (error.bodyType) errorSpan[0].innerHTML = error.bodyType;
    if (error.state) errorSpan[1].innerHTML = error.state;
    if (error.manufacturer) errorSpan[2].innerHTML = error.manufacturer;
    if (error.model) errorSpan[3].innerHTML = error.model;
    if (error.image) errorSpan[4].innerHTML = error.image;
    if (error.price) errorSpan[5].innerHTML = error.price;
    if (error.title) errorSpan[6].innerHTML = error.title;
    if (error.status === 401) {
      notify.innerHTML = 'Session expired, login';
    }
  }

  cleanErrorDisplay() {
    const errorSpan = document.querySelectorAll('.errorSpan');
    errorSpan.forEach((element) => {
      element.innerHTML = '';
    });
  }

  handleNetworkError() {
    const notify = this.getNotify();
    notify.style.color = 'red';
    notify.style.background = 'rgb(255, 182, 182)';
    notify.innerHTML = 'Not connecting. Check your network.';
  }

  handleUserError(reqError) {
    const notify = this.getNotify();
    notify.style.color = 'red';
    notify.style.background = 'rgb(255, 182, 182)';
    if (reqError.status === 401 && reqError.status === 'Session expired, login') {
      notify.innerHTML = 'Session expired, login to continue.';
    } else notify.innerHTML = 'Unsuccessful!';
    this.displayError(reqError.error);
  }

  closeModalAfterSuccess() {
    setTimeout(() => {
      const postAdvertModal = document.getElementById('postAdvertModal');
      postAdvertModal.style.display = 'none';
    }, 1000);
  }

  handleSuccess(data) {
    const notify = this.getNotify();
    notify.innerHTML = 'Car Advert Created.';
    this.closeModalAfterSuccess();
    this.appendToAds(data);
  }

  appendToAds(data) {
    const container = document.getElementsByClassName('ad-block-container')[0];
    container.prepend(buildAdBlock(data));
  }

  async postAdvert(event) {
    event.preventDefault();
    this.cleanErrorDisplay();
    const notify = this.getNotify();
    notify.style.display = 'inline-block';
    notify.style.color = 'green';
    notify.style.background = 'rgb(198, 240, 198)';
    notify.innerHTML = 'Wait. Processing...';
    const url = 'https://automarter.herokuapp.com/api/v1/car/';
    const form = event.target;
    const formData = this.buildPostAdvertData(form);
    const req = await this.postData(url, formData)
      .then(data => data)
      .catch(error => error);
    // console.log(req);
    if (req.fetchError && req.fetchError === 'Failed to fetch') {
      this.handleNetworkError();
    } else if (req === 'undefined') {
      this.handleNetworkError();
    } else if (req.error) {
      this.handleUserError(req);
    } else if (req.status === 201) {
      this.handleSuccess(req.data);
    }
  }
}

const getAllMyAdverts = async () => {
  const { id, token } = JSON.parse(localStorage.getItem('autoMartUser'));
  const cars = await fetch(`https://automarter.herokuapp.com/api/v1/car?owner=${id}`, {
    method: 'GET',
    headers: {
      Authentication: `${token}`,
      // 'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .catch(error => ({ fetchError: error.message }));
  return cars;
};

const arrangeMyAdverts = (ads) => {
  const container = document.createElement('div');
  const container2 = document.createElement('div');
  container.className = 'ad-block-container';
  container2.className = 'ad-block-container';
  container2.style.display = 'none';
  for (let i = ads.length - 1; i > -1; i -= 1) {
    if (ads[i].status === 'available') {
      container.append(buildAdBlock(ads[i]));
    } else {
      container2.append(buildAdBlock(ads[i]));
    }
  }
  // MyAdverts[0] = container;
  MyAdverts.push(container, container2);
};

const displayMyAdverts = () => {
  const adsDiv = document.getElementById('myAdsDiv');
  if (MyAdverts.length === 0) {
    adsDiv.style.backgroundImage = "url('images/noAds.png')";
  } else {
    adsDiv.append(MyAdverts[0], MyAdverts[1]);
    MyAdverts = [];
  }
};

let dashBoardMobileMenuOpen = false;
const toggleDashboardMenu = (dashboardMenu) => {
  if (!dashBoardMobileMenuOpen) {
    dashboardMenu.style.display = 'inline-block';
    dashBoardMobileMenuOpen = true;
  } else {
    dashboardMenu.style.display = 'none';
    dashBoardMobileMenuOpen = false;
  }
};

const togglePostAdvertModal = () => {
  const postAdvertModal = document.getElementById('postAdvertModal');
  const revealPostAdvertModal = document.getElementsByClassName('revealPostAdvertModal')[0];
  const span = document.getElementsByClassName('close')[0]; // Get the <span> element that closes the modal

  span.addEventListener('click', () => { // When the user clicks on <span> (x), close the modal
    postAdvertModal.style.display = 'none';
  });

  // When the user clicks the tab, open the modal
  revealPostAdvertModal.addEventListener('click', () => {
    postAdvertModal.style.display = 'block';
  });

  window.addEventListener('click', (event) => {
    if (event.target === postAdvertModal) {
      postAdvertModal.style.display = 'none';
    }
  });
};

const showSoldAndUnsold = (i, j) => {
  const m = document.getElementsByClassName('ad-block-container')[i];
  const n = document.getElementsByClassName('ad-block-container')[j];
  m.style.display = 'block';
  n.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', async () => {
  // get all my posted ads
  const MyAds = await getAllMyAdverts();
  if (MyAds.data.length !== 0) arrangeMyAdverts(MyAds.data);
  displayMyAdverts(MyAds);
  // prepare post advert engine
  const advertPoster = new AdvertPoster();
  const signupForm = document.getElementById('postAdvertForm');
  signupForm.addEventListener('submit', (event) => {
    advertPoster.postAdvert(event);
  });

  const menuButtonForMobile = document.getElementById('dashbaordMenuButton');
  const dashboardMenu = document.getElementById('dashboard-header');
  menuButtonForMobile.addEventListener('click', () => {
    toggleDashboardMenu(dashboardMenu);
  });
  const unsoldAndSoldButtons = document.getElementsByClassName('unsold&SoldButtons');
  const indicateUnsoldOrSold = document.getElementById('indicateUnsoldOrSold');
  indicateUnsoldOrSold.innerHTML = '- Available';
  unsoldAndSoldButtons[0].addEventListener('click', () => {
    indicateUnsoldOrSold.innerHTML = '- Available';
    showSoldAndUnsold(0, 1);
  });
  unsoldAndSoldButtons[1].addEventListener('click', () => {
    indicateUnsoldOrSold.innerHTML = '- Sold';
    showSoldAndUnsold(1, 0);
  });
  togglePostAdvertModal();
});

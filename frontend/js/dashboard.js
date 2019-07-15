/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

class AdvertUpdater {
  async patchData(url, formData) {
    const { token } = JSON.parse(localStorage.getItem('autoMartUser'));
    const serverRes = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then(response => response.json())
      .catch(error => ({ fetchError: error.message }));
    return serverRes;
  }

  buildUpdatePriceData(form) {
    return { price: form.price.value };
  }

  appendToAds(data) {
    const container = document.getElementsByClassName('ad-block-container')[1];
    // eslint-disable-next-line no-use-before-define
    container.prepend(buildAdBlock(data));
  }

  closeForm(id) {
    getElemId(`adBlockUpdatePriceForm${id}`).style.display = 'none';
    getElemId(`adBlockInfo${id}`).style.display = 'block';
    getElemId(`updatePriceButton${id}`).style.background = 'rgb(255, 97, 40)';
    getElemId(`updateStatusButton${id}`).style.display = 'inline-block';
  }

  async updateAdPrice(event, car_id) {
    event.preventDefault();
    const url = `https://automarter.herokuapp.com/api/v1/car/${car_id}/price`;
    const form = event.target;
    const formData = this.buildUpdatePriceData(form);
    const result = await this.patchData(url, formData)
      .then(data => data)
      .catch(error => error);
    if (result.status && result.status === 200) {
      getElemId(`adPrice${car_id}`).innerHTML = result.data.price;
      this.closeForm(car_id);
    } else if (result.status === 401) {
      signOut('signin.html'); // from main.js
    }
  }

  async updateAdStatus(event, car_id) {
    const url = `https://automarter.herokuapp.com/api/v1/car/${car_id}/status`;
    const formData = { status: 'sold' };
    const result = await this.patchData(url, formData)
      .then(data => data)
      .catch(error => error);
    if (result.error && result.status && result.status !== 401) {
      // eslint-disable-next-line no-console
      console.log(result.error);
    } else if (result.status && result.status === 200) {
      getElemId(`ad-block${car_id}`).style.display = 'none';
      this.appendToAds(result.data);
    } else if (result.status === 401) {
      signOut('signin.html'); // from main.js
    }
  }
}
const advertUpdater = new AdvertUpdater();
let MyAdverts = [];
let MyPurOrders = [];

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
  img.src = ad.image_url;
  adBlockImg.append(img); // coupling

  /**
   * info sections
   */
  const adBlockInfo = document.createElement('div');
  adBlockInfo.className = 'ad-block-info';
  adBlockInfo.id = `adBlockInfo${ad.id}`;

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
    adBlockUpdatePriceForm.id = `adBlockUpdatePriceForm${ad.id}`;
    const updatePriceForm = document.createElement('form');
    updatePriceForm.id = 'updatePriceForm';
    updatePriceForm.name = 'updatePriceForm';
    updatePriceForm.method = 'POST';
    updatePriceForm.addEventListener('submit', async (event) => {
      await advertUpdater.updateAdPrice(event, ad.id);
    });

    const updatePriceInput = document.createElement('input');
    updatePriceInput.id = `updatePriceInput${ad.id}`;
    updatePriceInput.type = 'number';
    updatePriceInput.name = 'price';
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
    updateStatusButton.id = `updateStatusButton${ad.id}`;
    updateStatusButton.addEventListener('click', async (event) => {
      await advertUpdater.updateAdStatus(event, ad.id);
    });

    const updatePriceButton = document.createElement('button'); // update price button
    updatePriceButton.innerHTML = 'Update Price';
    updatePriceButton.id = `updatePriceButton${ad.id}`;
    updatePriceButton.addEventListener('click', () => {
      if (adBlockUpdatePriceForm.style.display === 'none') {
        updatePriceButton.innerHTML = 'Close';
        updateStatusButton.style.display = 'none'; // hide update status button
        adBlockInfo.style.display = 'none'; // hide info section
        adBlockUpdatePriceForm.style.display = 'block'; // show form
        updatePriceButton.style.background = '#039ec5';
        updatePriceButton.style.borderColor = '#039ec5';
      } else {
        adBlockUpdatePriceForm.style.display = 'none'; // hide form
        updateStatusButton.style.display = 'inline-block'; // show update status button
        adBlockInfo.style.display = 'block'; // show info section
        updatePriceButton.innerHTML = 'Update Price';
        updatePriceButton.style.background = 'rgb(255, 97, 40)';
        updatePriceButton.style.borderColor = 'rgb(255, 97, 40)';
        getElemId(`updatePriceInput${ad.id}`).value = '';
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
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
      },
      body: formData,
    }).then(response => response.json())
      .catch(error => ({ fetchError: error.message }));
    return serverRes;
  }

  buildPostAdvertData(form) {
    const formData = new FormData();
    formData.append('body_type', form.body_type.value);
    formData.append('state', form.state.value);
    formData.append('status', 'available');
    formData.append('manufacturer', form.manufacturer.value);
    formData.append('model', form.model.value);
    formData.append('img_url', form.img_url.files[0]);
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
    if (error.body_type) errorSpan[0].innerHTML = error.body_type;
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

  handleUserError(resultError) {
    const notify = this.getNotify();
    notify.style.color = 'red';
    notify.style.background = 'rgb(255, 182, 182)';
    if (resultError.status === 401) {
      notify.innerHTML = 'Session expired, login to continue.';
      setTimeout(() => {
        signOut('signin.html'); // from main.js
      }, 1500);
    } else notify.innerHTML = 'Unsuccessful!';
    this.displayError(resultError.error);
  }

  closeModalAfterSuccess() {
    setTimeout(() => {
      const postAdvertModal = document.getElementById('postAdvertModal');
      postAdvertModal.style.display = 'none';
      const notify = this.getNotify();
      notify.style.display = 'none';
      notify.innerHTML = '';
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
    document.getElementById('myAdsDiv').style.background = 'white';
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
    const result = await this.postData(url, formData)
      .then(data => data)
      .catch(error => error);
    // console.log(req);
    if (result.fetchError && result.fetchError === 'Failed to fetch') {
      this.handleNetworkError();
    } else if (result === 'undefined') {
      this.handleNetworkError();
    } else if (result.error && result.status !== 401) {
      this.handleUserError(result);
    } else if (result.status === 201) {
      this.handleSuccess(result.data);
    }
  }
}

class Orders {
  async getData() {
    const { id, token } = JSON.parse(localStorage.getItem('autoMartUser'));
    const orders = await fetch(`https://automarter.herokuapp.com/api/v1/order?buyer=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .catch(error => ({ fetchError: error.message }));
    return orders;
  }

  async patchData(url, formData) {
    const { token } = JSON.parse(localStorage.getItem('autoMartUser'));
    const serverRes = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then(response => response.json())
      .catch(error => ({ fetchError: error.message }));
    return serverRes;
  }

  async getMyPurchaseOrders() {
    const result = await this.getData()
      .then(data => data)
      .catch(error => error);
    return result;
  }

  buildUpdateAmountData(form) {
    return { price: form.amount.value };
  }

  closeForm(id) {
    getElemId(`updatepoPriceFormBlock${id}`).style.display = 'none';
    getElemId(`poPrice${id}`).style.display = 'block';
    getElemId(`poStatusBlock${id}`).style.display = 'block';
    getElemId(`poAmountBlock${id}`).style.display = 'block';
    const button = getElemId(`updateOrderPriceButton${id}`);
    button.innerHTML = 'Update Order';
    button.style.background = 'rgb(255, 97, 40)';
  }

  async updateOrderAmount(event, order_id) {
    event.preventDefault();
    const url = `https://automarter.herokuapp.com/api/v1/order/${order_id}/price`;
    const form = event.target;
    const formData = this.buildUpdateAmountData(form);
    const result = await this.patchData(url, formData)
      .then(data => data)
      .catch(error => error);
    if (result.status && result.status === 200) {
      getElemId(`opAmount${order_id}`).innerHTML = result.data.new_price_offered;
      this.closeForm(order_id);
    } else if (result.status === 401) {
      signOut('signin.html'); // from main.js
    }
  }
}

const buildPurchaseBlock = (po) => { // adBlock builder
  // order
  const orders = new Orders();
  // ad block
  const poBlock = document.createElement('div');
  poBlock.className = 'po-block';
  poBlock.id = `po-block${po.id}`;

  // image section
  const poBlockImg = document.createElement('div');
  poBlockImg.className = 'po-block-img';
  const img = document.createElement('img');
  // eslint-disable-next-line prefer-destructuring
  img.src = po.image_url;
  poBlockImg.append(img); // coupling

  /**
   * info sections
   */
  const poBlockInfo = document.createElement('div');
  poBlockInfo.className = 'po-block-info';

  // title section
  const poBlockTitle = document.createElement('div');
  poBlockTitle.className = 'po-block-title';
  poBlockTitle.innerHTML = `<a>${po.title}</a>`;

  // price section
  const poBlockPrice = document.createElement('div');
  poBlockPrice.className = 'po-block-price';
  poBlockPrice.innerHTML = `<span>Price: </span><span>N${po.car_price}</span>`;
  poBlockPrice.id = `poPrice${po.id}`;

  // update form section
  let poBlockUpdatePriceForm = '';
  if (po.status === 'pending') {
    // update price form section
    poBlockUpdatePriceForm = document.createElement('section');
    poBlockUpdatePriceForm.id = `updatepoPriceFormBlock${po.id}`;
    poBlockUpdatePriceForm.className = 'po-block-update-price-form';
    const updateAmountForm = document.createElement('form');
    updateAmountForm.id = 'updatepoPriceForm';
    updateAmountForm.name = 'updatepoPriceForm';
    updateAmountForm.method = 'POST';
    updateAmountForm.addEventListener('submit', async (event) => {
      await orders.updateOrderAmount(event, po.id);
    });

    const updateAmountInput = document.createElement('input');
    updateAmountInput.id = `updateAmountInput${po.id}`;
    updateAmountInput.type = 'number';
    updateAmountInput.name = 'amount';
    updateAmountInput.min = 0;
    updateAmountInput.placeholder = 'Enter new Amount';

    const submitNewAmountButton = document.createElement('input');
    submitNewAmountButton.value = 'Update';
    submitNewAmountButton.type = 'submit';
    updateAmountForm.append(updateAmountInput, submitNewAmountButton); // coupling
    poBlockUpdatePriceForm.append(updateAmountForm);
  }

  // details section
  const poBlockDetails = document.createElement('div');
  poBlockDetails.className = 'po-block-details';
  const d1 = createElement('div');
  const d2 = createElement('div');
  const d3 = createElement('div');
  d1.id = `poStatusBlock${po.id}`;
  d2.id = `poAmountBlock${po.id}`;
  d1.innerHTML = `<span>Advert: </span><span>${po.car_status}</span>`;
  d2.innerHTML = `<span>Amount: </span><span id="opAmount${po.id}">${po.amount}</span>`;
  d3.innerHTML = `<span>Status: </span><span>${po.status}</span>`;
  d1.style.display = 'block';
  d2.style.display = 'block';
  d3.style.display = 'block';
  let updateOrderPriceButton = '';
  if (po.status === 'pending') {
    updateOrderPriceButton = createElement('button');
    updateOrderPriceButton.innerHTML = 'Update Order';
    updateOrderPriceButton.id = `updateOrderPriceButton${po.id}`;
    updateOrderPriceButton.addEventListener('click', () => {
      if (d1.style.display === 'block') {
        poBlockPrice.style.display = 'none';
        d1.style.display = 'none';
        d2.style.display = 'none';
        poBlockUpdatePriceForm.style.display = 'block';
        updateOrderPriceButton.innerHTML = 'Close';
        updateOrderPriceButton.style.background = '#039ec5';
        updateOrderPriceButton.style.borderColor = '#039ec5';
      } else {
        poBlockUpdatePriceForm.style.display = 'none';
        poBlockPrice.style.display = 'block';
        d1.style.display = 'block';
        d2.style.display = 'block';
        updateOrderPriceButton.innerHTML = 'Update Order';
        updateOrderPriceButton.style.background = 'rgb(255, 97, 40)';
        updateOrderPriceButton.style.borderColor = 'rgb(255, 97, 40)';
        getElemId(`updateAmountInput${po.id}`).value = '';
      }
    });
  }
  d3.append(updateOrderPriceButton);
  poBlockDetails.append(d1, d2, d3);

  // coupling infos
  poBlockInfo.append(poBlockTitle, poBlockUpdatePriceForm, poBlockPrice, poBlockDetails);
  poBlock.append(poBlockImg, poBlockInfo);
  return poBlock;
};

const getAllMyAdverts = async () => {
  const { id, token } = JSON.parse(localStorage.getItem('autoMartUser'));
  const cars = await fetch(`https://automarter.herokuapp.com/api/v1/car?owner=${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
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
  MyAdverts.push(container, container2);
};

const adEmptyCoupling = () => {
  const container = document.createElement('div');
  const container2 = document.createElement('div');
  container.className = 'ad-block-container';
  container2.className = 'ad-block-container';
  container2.style.display = 'none';
  const adsDiv = document.getElementById('myAdsDiv');
  adsDiv.style.backgroundImage = "url('images/noAds.png')";
  adsDiv.style.minHeight = '70vh';
  adsDiv.append(container, container2);
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

const arrangeMyPurchase = (po) => {
  const container = document.createElement('div');
  container.className = 'po-block-container';
  for (let i = po.length - 1; i > -1; i -= 1) {
    container.append(buildPurchaseBlock(po[i]));
  }
  MyPurOrders.push(container);
};

const displayPurchaseOrders = () => {
  const poDiv = document.getElementById('myPurchaseDiv');
  if (MyPurOrders.length === 0) {
    poDiv.style.backgroundImage = "url('images/noAds.png')";
  } else {
    poDiv.append(MyPurOrders[0]);
    MyPurOrders = [];
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
  const advertPosta = new AdvertPoster();
  const notify = advertPosta.getNotify();

  span.addEventListener('click', () => { // When the user clicks on <span> (x), close the modal
    postAdvertModal.style.display = 'none';
    notify.style.display = 'none';
    notify.innerHTML = '';
    advertPosta.cleanErrorDisplay();
  });

  // When the user clicks the tab, open the modal
  revealPostAdvertModal.addEventListener('click', () => {
    postAdvertModal.style.display = 'block';
  });

  window.addEventListener('click', (event) => {
    if (event.target === postAdvertModal) {
      postAdvertModal.style.display = 'none';
      notify.style.display = 'none';
      notify.innerHTML = '';
      advertPosta.cleanErrorDisplay();
    }
  });
};

const showSoldAndUnsold = (i, j) => {
  const m = document.getElementsByClassName('ad-block-container')[i];
  const n = document.getElementsByClassName('ad-block-container')[j];
  m.style.display = 'block';
  n.style.display = 'none';
};

const hideAndShowTabs = (tabs, a, b, c) => {
  tabs[b].style.display = 'none';
  tabs[c].style.display = 'none';
  tabs[a].style.display = 'block';
};

const toggleDashboardTabs = () => {
  const tabs = document.getElementsByClassName('dtab');
  const tablink = document.getElementsByClassName('tabLink');
  tablink[0].addEventListener('click', () => { hideAndShowTabs(tabs, 0, 1, 2); });
  tablink[1].addEventListener('click', () => { hideAndShowTabs(tabs, 1, 0, 2); });
  tablink[2].addEventListener('click', () => { hideAndShowTabs(tabs, 2, 0, 1); });
};

document.addEventListener('DOMContentLoaded', async () => {
  const orders = new Orders();
  // get all my posted ads
  const MyAds = await getAllMyAdverts();
  const MyPurchase = await orders.getMyPurchaseOrders();
  if (MyAds.status === 401) {
    signOut('signin.html'); // from main.js
  }
  if (MyAds.data.length !== 0) arrangeMyAdverts(MyAds.data);
  else adEmptyCoupling();
  if (MyPurchase.length !== 0) arrangeMyPurchase(MyPurchase.data);
  displayMyAdverts(MyAds);
  displayPurchaseOrders(MyPurchase);


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
  toggleDashboardTabs();
});

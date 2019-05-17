const buildCarList = (userType) => {
    const content = document.getElementsByClassName('home-page-body')[0];
    if (userType === 'user') {
        for (let i = 0, j = 1; i < vehicles.length; i++, j++) {
            if (vehicles[i].status === 'available') {
                content.append('\n\n', listBuilder(i, false));
            }
        }
    } else if (userType === 'admin') {
        for (let i = 0, j = 1; i < vehicles.length; i++, j++) {
            content.append('\n\n', listBuilder(i, true));
        }
    }
};

const listBuilder = (i, admin) => {
    let available = '';
    const ad_Box_Div = document.createElement('div');
    ad_Box_Div.className = 'ad-box';
    //ad_Box_Div.style.marginLeft = '10px';

    const ad_box_img = document.createElement('div');
    const img = document.createElement('img');
    ad_box_img.className = 'ad-box-img';
    img.src = vehicles[i].pix;
    ad_box_img.append(img);

    const ad_box_title = document.createElement('div')
    const a = document.createElement('a');
    a.href = 'car.html';
    a.innerHTML = vehicles[i].title;
    ad_box_title.className = 'ad-box-title';
    ad_box_title.append(a);

    const ad_box_price = document.createElement('div');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    span1.innerHTML = 'Price: ';
    span2.innerHTML = vehicles[i].price;
    ad_box_price.className = 'ad-box-price';
    ad_box_price.append(span1, span2);

    if (admin) {
        available = document.createElement('div');
        available.innerHTML = vehicles[i].status;
        available.className = 'ad-box-available';
    }

    const ad_box_details = document.createElement('div');
    const span3 = document.createElement('span');
    const span4 = document.createElement('span');
    const span5 = document.createElement('span');
    ad_box_details.className = 'ad-box-details';
    span3.innerHTML = vehicles[i].manufacturer;
    span4.innerHTML = vehicles[i].model;
    span5.innerHTML = vehicles[i].state;
    ad_box_details.append(span3, ' | ', span4, ' | ', span5);

    const section = document.createElement('section');
    const button = document.createElement('button');
    section.className = 'ad-box-price-button';
    button.className = 'revealOfferModal';
    button.innerHTML = 'MAKE AN OFFER';
    section.append(button);

    ad_Box_Div.append(ad_box_img, ad_box_title, ad_box_price, available, ad_box_details, section);
    return ad_Box_Div;
};

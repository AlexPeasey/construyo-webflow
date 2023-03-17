window.Webflow ||= [];
window.Webflow.push(() => {
  //creates tender=true page

  //grabs parameters from URL
  const paramQuery = window.location.search;

  // page view for partners
  if (paramQuery.includes('partner=true')) {
    const partnerNavMenu = document.querySelector('#partner-nav') as HTMLElement;
    partnerNavMenu.classList.remove('hidden');
    const navbarMain = document.getElementById('navbar-main') as HTMLElement;
    navbarMain.setAttribute('style', 'display:none;');
    const leadFormColumn = document.querySelector('.lead-form-column');
    if (leadFormColumn) {
      leadFormColumn.remove();
    }
    const partnerColumn = document.querySelector('.partner-column');
    if (partnerColumn) {
      partnerColumn.classList.remove('w-col-7');
    }
    const urls: NodeListOf<HTMLAnchorElement> =
      document.querySelectorAll('.project-card-container');
    for (let i = 0; i < urls.length; i++) {
      urls[i].href = urls[i].href + '?partner=true';
    }
    const footer = document.getElementById('footer');
    if (footer) {
      footer.setAttribute('style', 'display:none;');
    }
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (breadcrumbs) {
      breadcrumbs.setAttribute('style', 'display:none;');
    }
  }
  if (paramQuery.includes('tender=true')) {
    //page view for customers viewing in tender mode
    const leadFormColumn = document.getElementsByClassName('lead-form-column');
    leadFormColumn[0].setAttribute('style', 'display:none;');
    const navbarMain = document.getElementById('navbar-main');
    if (navbarMain) {
      navbarMain.setAttribute('style', 'display:none;');
    }
    const floatingCTA = document.getElementsByClassName('floating-cta-container');
    floatingCTA[0].setAttribute('style', 'display:none;');
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (breadcrumbs) {
      breadcrumbs.setAttribute('style', 'display:none;');
    }
    //displays app menu on the left
    const navbarTender = document.getElementById('navbar-tender');
    if (navbarTender) {
      navbarTender.setAttribute('style', 'display:block;');
    }
    //hides footer
    const footer = document.getElementById('footer');
    if (footer) {
      footer.setAttribute('style', 'display:none;');
    }
    //make containers left aligned
    const wContainerClasses = document.getElementsByClassName('w-container');
    for (let i = 0; i < wContainerClasses.length; i++) {
      wContainerClasses[i].classList.add('tender-container');
      document.querySelectorAll('#footer .container')[0].classList.remove('tender-container');
    }

    //add margin to tender view on desktop and ensure main content is min 756px
    document.body.classList.add('tender-desktop-margin');
    const partnerColumn = document.getElementsByClassName('partner-column');
    partnerColumn[0].classList.add('tender-partner-column');

    //loops through URLs of projects and review pages and gives them "?tender=true" so that the tender view continues when the page changes
    const urls: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('project-card-container');
    for (let i = 0; i < urls.length; i++) {
      urls[i].href = urls[i].href + '?tender=true';
    }
  }
  const partnerNameTypeform = document.getElementsByClassName('expert-name')[0].innerHTML;

  const replaceWhitespace = (partnerNameTypeform = '') => {
    let res = '';
    const { length } = partnerNameTypeform;
    for (let i = 0; i < length; i++) {
      const char = partnerNameTypeform[i];
      if (!(char === ' ')) {
        res += char;
      } else {
        res += '%20';
      }
    }
    return res;
  };

  const partnerNameTypeformNoSpaces = replaceWhitespace(partnerNameTypeform);
  const findID = window.location.href.lastIndexOf('/');
  const getPartnerID = window.location.href.substring(findID + 1);

  const getFloatingCtaUrl = (type: string): string => {
    const baseUrl = `https://www.construyo.de/bauen/anfrage-stellen-${type}`;
    const urlParams = `partner_name=${partnerNameTypeformNoSpaces}&partner_id=${getPartnerID}`;
    return `${baseUrl}?${urlParams}`;
  };

  (document.getElementById('floating-CTA-architekt') as HTMLAnchorElement).href =
    getFloatingCtaUrl('architekt');
  (document.getElementById('floating-CTA-statiker') as HTMLAnchorElement).href =
    getFloatingCtaUrl('statiker');
  (document.getElementById('floating-CTA-energieberater') as HTMLAnchorElement).href =
    getFloatingCtaUrl('energieberater');

  //set extra margin at bottom of footer to account for floating CTA
  const footerBottom = document.getElementsByClassName('footer-bottom');
  footerBottom[0].setAttribute('style', 'margin-bottom:50px;');

  // add a space after the commas in the services and chamber text
  const servicesText = document.getElementById('services') as HTMLElement;
  const replaceServicesText = servicesText.innerHTML.replace(/,/g, ', ');
  if (servicesText && replaceServicesText) {
    servicesText.innerHTML = replaceServicesText;
  }
  const chamberText = document.getElementById('chamber') as HTMLElement;
  const replaceChamberText = chamberText.innerHTML.replace(/,/g, ', ');
  chamberText.innerHTML = replaceChamberText;

  // hide "Was Kunden erwähnen:" heading if there are no callouts to display
  const hiddenCallouts = document.getElementsByClassName(
    'review-overall-callout w-condition-invisible'
  ).length;
  const calloutHeading = document.querySelector(
    '.heading .partner-page-h3 .callouts'
  ) as HTMLElement;
  if (hiddenCallouts === 8) {
    calloutHeading.style.display = 'none';
  }

  //change decmial point to comma in reviews
  const averageScore = document.querySelector('#average-score');
  if (averageScore) {
    averageScore.innerHTML = averageScore.innerHTML.replace('.', ',');
  }

  //adds commas between professions
  const professionsList = document.querySelectorAll(
    '.profession-city-page:not(.w-condition-invisible)'
  );
  const numOfProfessions = professionsList.length;
  for (let i = 0; i < numOfProfessions - 1; i++) {
    professionsList[i].append(',');
  }
  // change internal links to include town names
  const townName = document.querySelectorAll('.town-in')[0].innerHTML;
  const townPlaceholder = document.querySelectorAll('.town');
  for (let i = 0; i < townPlaceholder.length; i++) {
    townPlaceholder[i].innerHTML = townName;
  }
  // noindexes any page without a profile pic and reviews
  const reviewsOverview = document.querySelectorAll('.reviews-overview-section')[0];
  const profilePic = document.querySelectorAll('.expert-avatar')[0];
  const partnerEnabledSwitch = document.querySelectorAll('.partner-enabled-switch');
  const partnerEnabledSwitchOff =
    partnerEnabledSwitch[0].classList.contains('w-condition-invisible');
  if (
    profilePic.classList.contains('w-condition-invisible') &&
    reviewsOverview.classList.contains('w-condition-invisible')
  ) {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
  } else if (partnerEnabledSwitchOff === true) {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
  }
  // removes town internal links section if none are present
  const internalLinksTowns = document.querySelectorAll('.internal-links-div.towns')[0];
  let breadcrumbsContainer = document.querySelectorAll('.breadcrumbs-container');
  breadcrumbsContainer = breadcrumbsContainer[0].querySelectorAll('a');
  let numOfInvisible = 0;
  for (let i = 0; i < breadcrumbsContainer.length; i++) {
    if (breadcrumbsContainer[i].classList.contains('w-condition-invisible')) {
      numOfInvisible += 1;
    }
  }
  if (numOfInvisible === breadcrumbsContainer.length) {
    internalLinksTowns.remove();
    //    breadcrumbsDivider.remove();
  }
  //add comma to collaborations cards
  const collabCards = document.querySelectorAll('.collab-card');
  for (let i = 0; i < collabCards.length; i++) {
    const listOfCollabProfessions = collabCards[i].querySelectorAll(
      '.profession-containers.collab:not(.w-condition-invisible)'
    );
    for (let j = 0; j < listOfCollabProfessions.length - 1; j++) {
      listOfCollabProfessions[j].append(', ');
    }
  }
  const emptyStateCollabs = document.querySelectorAll('.empty-state-collabs');
  if (emptyStateCollabs.length === 2) {
    const collabDescText = document.querySelector('.collab-desc-text');
    const collabDescNoCollabsText = document.querySelector(
      '.collab-desc-nocollabs-text'
    ) as HTMLElement;
    if (collabDescText && collabDescNoCollabsText) {
      collabDescText.remove();
      collabDescNoCollabsText.style.display = 'block';
    }
  }

  //sort and remove collabs above 9th one
  window.onload = function () {
    function clickSortButton() {
      const cmsSort = document.querySelector('.fs_cmssort_button') as HTMLElement;
      cmsSort.click();
    }
    clickSortButton();
  };
  function removeCollabs() {
    const collabs = document.querySelectorAll('.collab-card') as NodeListOf<HTMLElement>;
    for (let i = 0; i < collabs.length; i++) {
      if (i > 8) {
        collabs[i].parentNode?.removeChild(collabs[i]);
      }
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(removeCollabs, 1000);
  });
});

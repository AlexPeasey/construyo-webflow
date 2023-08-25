window.Webflow ||= [];
window.Webflow.push(() => {
  const numExpertsNear: number = document.querySelectorAll('.architects-near').length;
  const expertsNearContainer: Element = document.getElementById(
    'architects-near-container'
  ) as HTMLElement;
  const partnerProfiles = document.querySelectorAll('.expert-card.w-dyn-item');
  const allCards = document.querySelectorAll('.card-wrapper');
  const calloutsElements = document.querySelectorAll('.reviews-overview-callouts');
  const numberOfExperts = document.querySelectorAll('.card-wrapper').length;
  const numberOfExpertsHero = document.querySelector('#number-of-experts') as HTMLElement;
  const numberOfExpertsNoHero = document.getElementById('number-of-experts-no-hero') as HTMLElement;
  addLinksToCards(allCards);
  hideCalloutElement(calloutsElements);
  countExperts(numberOfExperts, numberOfExpertsHero, numberOfExpertsNoHero);
  removeArchitectsNearby(numExpertsNear, expertsNearContainer);
  addCommas(partnerProfiles);
  removeExternalExpertsSection();
  document.querySelectorAll<HTMLElement>('.projects-container').forEach((element: HTMLElement) => {
    element.addEventListener('click', (event: MouseEvent) => {
      goToProject(event, element);
    });
  });
});

// go to projects on click
function goToProject(event: MouseEvent, element: HTMLElement): void {
  event.preventDefault();
  const hideElement: HTMLElement | null = element.querySelector('.hide');
  if (hideElement && hideElement.textContent) {
    const url: string = hideElement.textContent;
    window.open(url, '_blank')?.focus();
  }
}

//Removes architects nearby section if there are no elements
function removeArchitectsNearby(numExpertsNear: number, expertsNearContainer: Element) {
  if (numExpertsNear === 0) {
    expertsNearContainer.remove();
  }
}

//adds links to each card
function addLinksToCards(allCards: NodeListOf<Element>) {
  allCards.forEach((card) => {
    $(card).wrap(
      '<a href="' +
        $(card).prev().prev().attr('href') +
        '" target="_blank" class="card-wrapper" style="padding:0"></a>'
    );
  });
}

//hides callout element if none displayed
function hideCalloutElement(calloutsElement: NodeListOf<Element>) {
  calloutsElement.forEach(function (node) {
    const hiddenCallouts = node.querySelectorAll(
      '.review-overall-callout, .w-condition-invisible'
    ).length;
    if (hiddenCallouts === 8) {
      (node as HTMLElement).style.display = 'none';
    }
  });
}

//counts number of experts in total then assigns that number to strings on page
function countExperts(
  numberOfExperts: number,
  numberOfExpertsHero: Element,
  numberOfExpertsNoHero: Element
) {
  numberOfExpertsHero.innerHTML = String(numberOfExperts);
  numberOfExpertsNoHero.innerHTML = String(numberOfExperts);
}

//adds commas between professions
function addCommas(partnerProfiles: NodeListOf<Element>) {
  for (let i = 0; i < partnerProfiles.length; i++) {
    const currentProfileProfessionsList = partnerProfiles[i].querySelectorAll(
      '.profession-city-page:not(.w-condition-invisible)'
    );
    const numOfProfessions = currentProfileProfessionsList.length;
    for (let p = 0; p < numOfProfessions - 1; p++) {
      currentProfileProfessionsList[p].append(',');
    }
  }
}

//removes external experts section if there are none
function removeExternalExpertsSection() {
  const externalExpertsEmpty =
    document.querySelectorAll('.external-experts-list-wrapper.w-dyn-list .w-dyn-empty').length > 0;
  if (externalExpertsEmpty === true) {
    const externalExpertsDiv = document.querySelectorAll('.external-experts-div');
    externalExpertsDiv[0].remove();
  }
}

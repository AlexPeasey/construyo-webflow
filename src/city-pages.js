//adds links to projects
Webflow.push(function () {
  $('.projects-container').click(function () {
    goToProject($(this), event);
  });
  function goToProject(thisObj, event) {
    event.preventDefault();
    window.open(thisObj.find('.hide').text(), '_blank').focus();
  }
});

//adds links to each card
let allCards = document.querySelectorAll('.card-wrapper');
allCards.forEach((card) => {
  $(card).wrap(
    '<a href="https://www.construyo.de/dienstleister/' +
      $(card).prev().text() +
      '" target="_blank" class="card-wrapper" style="padding:0"></a>'
  );

  //hides callout element if none displayed
  let hiddenCallouts = card.getElementsByClassName(
    'review-overall-callout w-condition-invisible'
  ).length;
  let calloutsElement = card.getElementsByClassName('reviews-overview-callouts');
  if (hiddenCallouts === 8) {
    calloutsElement[0].style.display = 'none';
  }
});

//counts number of experts in total then assigns that number to strings on page
const numberOfExperts = document.getElementsByClassName('card-wrapper').length;
document.querySelector('#number-of-experts').innerHTML = numberOfExperts;
document.getElementById('number-of-experts-no-hero').innerHTML = numberOfExperts;

$(document).ready(function () {
  //Removes architects nearby section if there are no elements
  const numExpertsNear = document.getElementsByClassName('architects-near').length;
  if (numExpertsNear === 0) {
    const expertsNearContainer = document.getElementById('architects-near-container');
    expertsNearContainer.remove();
  }
});
//adds commas between professions
const partnerProfiles = document.querySelectorAll('.expert-card.w-dyn-item');
for (i = 0; i < partnerProfiles.length; i++) {
  let currentProfileProfessionsList = partnerProfiles[i].querySelectorAll(
    '.profession-city-page:not(.w-condition-invisible)'
  );
  let numOfProfessions = currentProfileProfessionsList.length;
  for (p = 0; p < numOfProfessions - 1; p++) {
    currentProfileProfessionsList[p].append(',');
  }
}
//removes external experts section if there are none
let externalExpertsEmpty =
  document.querySelectorAll('.external-experts-list-wrapper.w-dyn-list .w-dyn-empty').length > 0;
if (externalExpertsEmpty === true) {
  let externalExpertsDiv = document.querySelectorAll('.external-experts-div');
  externalExpertsDiv[0].remove();
}

function replaceUmlauts(str) {
  return str
    .replace(/\u00df/g, 'ss')
    .replace(/\u00e4/g, 'ae')
    .replace(/\u00f6/g, 'oe')
    .replace(/\u00fc/g, 'ue')
    .replace(/\u00c4/g, 'Ae')
    .replace(/\u00d6/g, 'Oe')
    .replace(/\u00dc/g, 'Ue');
}

/*
 * Copyright (c) 2014 Mike King (@micjamking)
 *
 * jQuery Succinct plugin
 * Version 1.1.0 (October 2014)
 *
 * Licensed under the MIT License
 */

/*global jQuery*/
(function ($) {
  'use strict';

  $.fn.succinct = function (options) {
    var settings = $.extend(
      {
        size: 240,
        omission: '...',
        ignore: true,
      },
      options
    );

    return this.each(function () {
      var textDefault,
        textTruncated,
        elements = $(this),
        regex = /[!-\/:-@\[-`{-~]$/,
        init = function () {
          elements.each(function () {
            textDefault = $(this).html();

            if (textDefault.length > settings.size) {
              textTruncated = $.trim(textDefault)
                .substring(0, settings.size)
                .split(' ')
                .slice(0, -1)
                .join(' ');

              if (settings.ignore) {
                textTruncated = textTruncated.replace(regex, '');
              }

              $(this).html(textTruncated + settings.omission);
            }
          });
        };
      init();
    });
  };
})(jQuery);

$(function () {
  $('.expert-card-description').succinct({
    size: 240,
  });
});

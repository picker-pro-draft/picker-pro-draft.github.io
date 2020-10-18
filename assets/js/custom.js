$(document).ready(function () {
  $('#picking-subject').tagsinput({
    tagClass: 'get-started-btn suggested-category'
  });


  $('.suggested-category').click(function () {
    $('#picking-subject').tagsinput('removeAll');
    $('#picking-subject').tagsinput('add', $(this).text());
  });

  $('#picking-subject').tagsinput('add', 'Smartphone');

  dragula(
    {
      isContainer: function (el) {
        return el.classList.contains('criteria-list');
      },
      copy: true,
      copySortSource: true
    })

    .on('drop', function (el, target, source, sibling) {

      if (target != null) {
        preventDuplicates(el, target, source);

        removeFromSourceIfNeeded(el, target, source);

        updateColors(el, target);

        updateOrders();
      }
      if (target === null) {
        if (source.classList.contains('criteria-met')) {
          removeCriteriaByText(source, el.getElementsByClassName('badge')[0].innerText);
        }
      }
    })
    .on('drag', function (el, source) {
      if (source.classList.contains('criteria-definition')) {
        $('.criteria-met, .criteria-definition').addClass('drop-area-active');
        $('.drop-hint').fadeIn();
      }
      if (source.classList.contains('criteria-met')) {
        $('.criteria-met, .criteria-definition').addClass('drop-area-active');
        $('.remove-hint').fadeIn();
      }
    })
    .on('dragend', function (el) {
      $('.criteria-met, .criteria-definition').removeClass('drop-area-active');
      $('.drop-hint').fadeOut();
      $('.remove-hint').fadeOut();
    })
    ;
});

function updateOrders() {

  let products = document.getElementsByClassName('criteria-met');

  for (let groupIndex = 0; groupIndex < products.length; groupIndex++) {

    var ul = $(products[groupIndex]);
    var li = ul.children("li");

    li.detach().sort((a, b) => (getScore(a) < getScore(b) ? 1 : -1));
    ul.prepend(li);

  }
}

function getScore(li) {
  let badge = li.getElementsByClassName('badge')[0];
  if (badge.classList.contains("badge-must")) {
    return 4;
  } else if (badge.classList.contains("badge-should")) {
    return 3;
  } else if (badge.classList.contains("badge-could")) {
    return 2;
  } else {
    return 1;
  }
}

function updateColors(el, target) {

  if (target.classList.contains("criteria-definition")) {

    let type = target.dataset.criteriaType;
    let badge = el.getElementsByClassName('badge')[0];
    let desiredClass = "badge badge-" + type;
    badge.className = desiredClass;

    let allBadges = document.getElementsByClassName('badge-criteria');
    for (let i = 0; i < allBadges.length; i++) {
      if (allBadges[i].innerText === badge.innerText) {
        allBadges[i].className = desiredClass;
      }
    }

  }
}

function preventDuplicates(el, target, source) {
  if (source === target || target === null) {
    return;
  }
  let otherOptions = target.getElementsByClassName('badge');
  let duplicatesCount = 0;
  for (let i = 0; i < otherOptions.length; i++) {
    if (otherOptions[i].innerText === el.getElementsByClassName('badge')[0].innerText) {
      duplicatesCount++;
      if (duplicatesCount > 1) {
        el.remove();
        duplicatesCount--;
      }
    }
  }
}

function removeFromSourceIfNeeded(el, target, source) {
  if (isReording(source, target)) {
    return;
  }
  if (isAssigingCriteriaToOption(source, target)) {
    return;
  }

  removeCriteriaByText(source, el.getElementsByClassName('badge')[0].innerText);
}

function removeCriteriaByText(container, text) {
  let remainingOptions = container.getElementsByClassName('badge');
  for (let i = 0; i < remainingOptions.length; i++) {
    if (remainingOptions[i].innerText === text) {
      remainingOptions[i].closest('li').remove();
    }
  }
}

function isReording(source, target) {
  //moving within the same container
  if (source === target) {
    return true;
  }
  return false;
}

function isAssigingCriteriaToOption(source, target) {
  //moving from list of criteria to a specific product
  if (source.classList.contains('criteria-definition') && target.classList.contains('criteria-met')) {
    return true;
  }
  return false;
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}


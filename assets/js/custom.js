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


    });
});

function updateOrders() {

  let products = document.getElementsByClassName('criteria-met');

  for (let groupIndex = 0; groupIndex < products.length; groupIndex++) {

    var ul = $(products[groupIndex]);
    var li = ul.children("li");

    li.detach().sort((a, b) => (getScore(a) < getScore(b) ? 1 : -1));
    ul.append(li);

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
  if (source === target) {
    return;
  }
  let remainingOptions = source.getElementsByClassName('badge');
  for (let i = 0; i < remainingOptions.length; i++) {
    if (remainingOptions[i].innerText === el.getElementsByClassName('badge')[0].innerText) {
      remainingOptions[i].closest('li').remove();
    }
  }
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


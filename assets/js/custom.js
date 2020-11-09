$(document).ready(function () {
  $('#PickingSubject').tagsinput({
    tagClass: 'get-started-btn suggested-category'
  });

  $('#InitialInfoModal').modal();

  $('.remove-option').on("click", function () {
    removeOption(this);
  });

  $('.suggested-category').click(function () {
    $('#PickingSubject').tagsinput('removeAll');
    $('#PickingSubject').tagsinput('add', $(this).text());
  });

  $('#PickingSubject').tagsinput('add', 'Smartphone');

  $('.add-criteria').click(function () {
    let input = $(this).closest('.input-group').find('input');
    if (isEmptyOrSpaces(input.val())) {
      return;
    }
    let list = $(this).closest('.box').find('.criteria-list');
    let priority = list.data('criteria-type');
    let existing = $(list).find('.badge');

    let isAlreadyDefined = false;

    for (let i = 0; i < existing.length; i++) {
      if (existing[i].innerText === input.val()) {
        isAlreadyDefined = true;
      }
    }

    if (!isAlreadyDefined) {
      $(list).append('<li><i class="bx bx-check"></i> <span class="badge badge-criteria badge-' + priority + '">' + input.val() + '</span></li>')
    }
    $(input).val('');
  });

  $('#AddOptionButton').click(function () { addOption(this); });


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
        handleCriteriaRemoval(el, source);
      }
      showEmptyDropPlace();
    })
    .on('drag', function (el, source) {
      if (source.classList.contains('criteria-definition')) {
        $('.drop-hint-initial').hide();
        $('.criteria-met, .criteria-definition').addClass('drop-area-active');
        $('.drop-hint').fadeIn();

      }
      if (source.classList.contains('criteria-met')) {
        $('.criteria-met').addClass('drop-area-active');
        $('.remove-hint').fadeIn();
        $(source).find('.drop-hint-initial').hide();
      }
    })
    .on('dragend', function (el, source) {
      $('.criteria-met, .criteria-definition').removeClass('drop-area-active');
      
    });
});


function addOption(addButton) {
  let input = $(addButton).closest('.input-group').find('input');
  if (isEmptyOrSpaces(input.val())) {
    return;
  }

  let template = $('#OptionTemplate').clone();
  template.find('.remove-option').on("click", function () {
    removeOption(this);
  });
  template.attr("id", "");

  template.find('.criteria-met').addClass('drop-area-active');

  fetch("https://source.unsplash.com/200x130/?phone&sig=" + Math.random()).then((response) => {
    $(template).find('.product-image').attr("src", response.url);
    $(template).find('.product-image').show();
    $(template).find('.spinner-border').hide();
  });

  $('#OptionsList').prepend(template);
  $(template).show();


    let url = $(template).find('.option-url > a');
    url.text(input.val());

     $.get("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=1&minLength=5&maxLength=5&limit=2&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5", function( response ){
       
     let text = response[0].word +' '+ response[1].word;
       let title = $(template).find(".option-title");
       title.text(text);
    });
  


     
  $(input).val('');
}

function showEmptyDropPlace() {
  $('.criteria-met, .criteria-definition').removeClass('drop-area-active');
  $('.drop-hint').fadeOut();
  $('.drop-hint-initial').fadeOut();
  $('.remove-hint').fadeOut();

  $('.criteria-met').each(function () {
    if ($(this).find('.badge').length === 0) {
      $(this).addClass('drop-area-active');
      $(this).find('.drop-hint-initial').fadeIn();
    }
  });
}

function removeOption(removeButton) {
  $(removeButton).closest('.box').fadeOut(function () { $(this).remove(); });
}

function handleCriteriaRemoval(el, source) {
  if (source.classList.contains('criteria-met')) {
    removeCriteriaByText(source, el.getElementsByClassName('badge')[0].innerText);
  }
  if (source.classList.contains('criteria-definition')) {
    let text = el.getElementsByClassName('badge')[0].innerText;
    let allMet = $('.criteria-met .badge-criteria')
    let isCriteriaInUse = false;

    for (let i = 0; i < allMet.length; i++) {
      if (allMet[i].innerText === text) {
        isCriteriaInUse = true;
      }
    }

    if (isCriteriaInUse) {
      $('#ConfirmCriteriaRemovalModal').modal().on("click", ".btn-danger", function () {
        removeCriteriaByText($('.criteria-definition'), text);
        removeCriteriaByText($('.criteria-met'), text);
      })
    } else {
      removeCriteriaByText($('.criteria-definition'), text);
    }
  }
}

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
    let desiredClass = "badge badge-criteria badge-" + type;
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
  let remainingOptions = $(container).find('.badge');
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
var surveyReminderClosed = false;
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  let header = document.getElementsByClassName("header-hideable")[0];
  if (header) {
    if (prevScrollpos > currentScrollPos) {
      header.style.top = "0";
    } else {
      header.style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  }
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  let progressBar = document.getElementById("PageProgressBar");
  if (progressBar){
    progressBar.style.width = scrolled + "%";
  }
  

  if (!surveyReminderClosed) {

    var surveyReminderTop = $("#SurveyReminderTrigger").offset().top;
    if (currentScrollPos > surveyReminderTop) {
      $("#SurveyReminder").fadeIn(500);
    }
  }

  $('.callout-closebtn').click(function(){
    surveyReminderClosed = true;
    $("#SurveyReminder").fadeOut(500);
  });
}





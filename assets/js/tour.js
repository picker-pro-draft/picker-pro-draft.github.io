$(document).ready(function () {


  const driver = new Driver({
    animate: false,
    allowClose: false,
    doneBtnText: 'Sounds great, I`want to use it!',

  });

  // Define the steps for introduction
  driver.defineSteps([
    {
      element: '#PickingSubjectArea',
      popover: {
        title: 'Step One',
        description: 'You typed what you were looking for, or selected one of the popular options...',
        position: 'top-center'
      },
      onNext: function (el) {
        moveToStep(driver, 1);
      },

    },
    {
      element: '#CriteriaPanel',
      popover: {
        title: "Step two",
        description: "Then you added your criteria, according to their priority...",
        position: 'top-center'
      },
      onNext: function (el) {
        moveToStep(driver,2);
      },
    },
    {
      element: '#InputMust',
      popover: {
        title: "Hint",
        description: "(You can add some more, or drag to change their priority)",
        position: 'top-center'
      }
      , onNext: function (el) {
        moveToStep(driver,3);
      },
    },
    {
      element: "#OptionsPanel",
      popover: {
        title: "Step three",
        description: "You added some of the smartphones you think are cool",
        position: 'top-center'
      }
      , onNext: function (el) {
        moveToStep(driver,4);
      },
    },

    {
      element: "#InputOption",
      popover: {
        title: "Hint",
        description: "You can add some more, but in the <strong>demo</strong> site, the images will be random :)",
        position: 'top-center'
      }
      , onNext: function (el) {
        moveToStep(driver,5);
      },
    },
    {
      element: "#MainArea",
      popover: {
        title: "Step four",
        description: "Finally, yoy dragged & dropped the matching criteria to the products...<br/> " +
          "and now you easily see which phones meet most of your criteria!",
        position: 'top-center'
      }
      , onNext: function (el) {
        moveToStep(driver,6);
      },
    },
    {
      element: "#main",
      popover: {
        title: "What's coming up next?",
        description: "In the full version of the site:<br/> " +
          "<ul>" +
          "<li><strong>Save</strong> your picking session so that you can take few days before choosing</li>" +
          "<li><strong>Share</strong> it, so that you can collaborate with a friend or your partner</li>" +
          "<li><strong>See</strong> your options <strong>ordered</strong> based on how well they fit you!</li>" +
          "<li><strong>Gain insights</strong> on what criteria others had and which products they chose</li>" +
          "<li>And much more!</li>" +
          "</ul>"
        ,
        closeBtnText: 'I don`t care, I won`t use it',
        position: 'top-center'
      }
      , onNext: function (el) {
        moveToStep(driver,7);
      },
    }
  ]);

  let step = getCookie('tourStep');
  if (step === null) {
    step = 0;
  }
  driver.start(step);



  $('.get-started').click(function () {
    setCookie('tourStep', 0);
    driver.start();
  });


});

function moveToStep(driver, step){
  driver.preventMove();
  setCookie('tourStep', step);
  if (step < 7){
    driver.start(step );
  } else{
    driver.reset();
  }

}




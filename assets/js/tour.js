$(document).ready(function () {


  const driver = new Driver({
    animate: false,
    allowClose: false,
  });

  // Define the steps for introduction
  driver.defineSteps([
    {
      element: '#PickingSubjectArea',
      popover: {
        title: 'Step One',
        description: 'You typed what you were looking for, or selected one of the popular options',
        position: 'top-center'
      }
    },
    {
      element: '#CriteriaPanel',
      popover: {
        title: "Step two",
        description: "You added your criteria, according to their priority",
        position: 'top-center'
      }
    },
    {
      element: "#OptionsPanel",

      popover: {
        title: "Step three",
        description: "You added some of the smartphones you think are cool",
        position: 'top-center'
      }
    },
    {
      element: "#MainArea",
      popover: {
        title: "Step four",
        description: "You dragged & dropped the matching criteria to the products",
        position: 'top-center'
      }
    }
  ]);

  // Start the introduction
  driver.start();



  $('.get-started').click(function () {
    driver.start();
  });


});




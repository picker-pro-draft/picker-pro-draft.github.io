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
      }
    },
    {
      element: '#CriteriaPanel',
      popover: {
        title: "Step two",
        description: "Then you added your criteria, according to their priority...",
        position: 'top-center'
      }
    },
    {
      element: '#InputMust',
      popover: {
        title: "Hint",
        description: "(You can add some more, or drag to change their priority)",
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
      element: "#InputOption",
      popover: {
        title: "Hint",
        description: "You can add some more, but in the <strong>demo</strong> site, the images will be random :)",
        position: 'top-center'
      }
    },
    {
      element: "#MainArea",
      popover: {
        title: "Step four",
        description: "Finally, yoy dragged & dropped the matching criteria to the products...<br/> "+
        "and now you easily see which phones meet most of your criteria!",
        position: 'top-center'
      }
    },
    {
      element: "#main",
      popover: {
        title: "What's coming up next?",
        description: "In the full version of the site:<br/> "+
        "<ul>" + 
        "<li><strong>Save</strong> your picking session so that you can take few days before choosing</li>" + 
        "<li><strong>Share</strong> it, so that you can collaborate with a friend or your partner</li>" + 
        "<li><strong>Gain insights</strong> on what criteria others had and which products they chose</li>" + 
        "<li>And much more!</li>" + 
        "</ul>" 
        ,
        closeBtnText: 'I don`t care, I won`t use it',  
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




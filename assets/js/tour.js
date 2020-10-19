$(document).ready(function () {
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      
      scrollTo: true
    }
  });

  tour.addStep({
    id: 'example-step',
    text: 'This step is attached to the bottom of the <code>.example-css-selector</code> element.',
    attachTo: {
      element: '#picking-subject',
      on: 'top'
    },
    classes: 'example-step-extra-class',
    buttons: [
      {
        text: 'Next',
        action: tour.next
      }
    ]
  });


  tour.start();
});


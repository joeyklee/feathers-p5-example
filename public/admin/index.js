let moodForm;
let anxietyInput;
let stressInput;
let contentmentInput;
let productivityInput;
let inputs = [];

function setup(){
    // We will be generated unique canvases for each data instance
    noCanvas();
    
    // select the mood form and add an event listener to handle the submission
    moodForm = select("#moodForm");
    moodForm.elt.addEventListener('submit', handleSubmit);

    // select the inputs to track if and when they change
    anxietyInput = select("#anxiety-input");
    stressInput = select("#stress-input");
    contentmentInput = select("#contentment-input");
    productivityInput = select("#productivity-input");

    // create an array of those inputs to iterate through them
    // we will set the inital state of the slider labels
    // we will also make sure to change the slider label value on .changed()
    inputs = [anxietyInput, stressInput, contentmentInput, productivityInput];
    inputs.forEach( i => {
        // set the initial value
        let label = select(`#${i.elt.id}-label`)
        label.html(i.elt.value);
        
        // if it changes, then update it by adding an event listener
        i.changed(function(e){
            label.html(i.elt.value);
        })
    });
    // no loop since we don't use draw here
    noLoop();
}

// handleSubmit is the callback function for the form submission
function handleSubmit(e){
    e.preventDefault();
    console.log("form submitted!")

    // since we're working with an html form, we need to be able to retrieve the values from the  form
    // we do so using the form.get(nameOftheInput);
    const myForm = new FormData(e.currentTarget);
    const payload = {
        anxiety: myForm.get('anxiety'),
        contentment: myForm.get('contentment'),
        fitness: myForm.get('fitness'),
        mood: myForm.get('mood'),
        productivity: myForm.get('productivity'),
        stress: myForm.get('stress')
    }
    // https://github.com/shiffman/itp-networked-media/wiki/GET,-POST-with-p5
    // httpPost("/feelings", payload, finished)
    client.authenticate().then( authd => {
        console.log(authd)
        feelings.create(payload).then( newItem => {
            console.log("success!")
            finished(newItem)
        })
    })

}

// when the httpPost() function is finished, change the window location to '/'
function finished(response) {
    console.log(response);
    window.location.href = "/";
}
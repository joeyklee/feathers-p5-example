let moodForm;
let anxietyInput;
let stressInput;
let contentmentInput;
let productivityInput;
let inputs = [];

function setup(){
    // We will be generated unique canvases for each data instance
    noCanvas();
    
    moodForm = select("#moodForm");
    moodForm.elt.addEventListener('submit', handleSubmit);


    anxietyInput = select("#anxiety-input");
    stressInput = select("#stress-input");
    contentmentInput = select("#contentment-input");
    productivityInput = select("#productivity-input");

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

    noLoop();
}

function draw(){    


}

function handleSubmit(e){
    e.preventDefault();
    console.log("form submitted!")

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
    httpPost("/feelings", payload, finished)
}

function finished(response) {
    console.log(response);
    window.location.href = "/";
}
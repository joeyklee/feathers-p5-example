// Step 1: make a variable to assign your data to
let dataFeelings;
let gridVisElement;

function preload(){
    // request your data using the loadJSON function which makes a GET request to he URL provided
    dataFeelings =  loadJSON("/feelings?$limit=false");
}

function setup(){
    // We will be generated unique canvases for each data instance
    noCanvas();
    // make sure we're getting our data
    console.log(dataFeelings.data);

    // noLoop() since we won't be needing to run this over an over again
    noLoop();
}

function draw(){    

    dataFeelings.data.forEach( (item, idx) => {
        let newSketch = new MyFeelings(item);
        // vis.addTo('grid-vis');
        let newDiv = createDiv()
        let divId = `vis-${idx}`
        newDiv.parent('vis-grid');
        newDiv.class('grid-item');
        newDiv.id(divId);
        newDiv.html(`<small style="font-size:9px">${item.createdAt}</small><br><small style="font-size:9px">${item.mood}</small>`);
        new p5(newSketch.render, divId);
        
    })
}


class MyFeelings {
    /**
     * 
    // anxiety: 5
    // contentment: 10
    // createdAt: "2019-02-03T21:00:59.347Z"
    // fitness: false
    // mood: "happy"
    // productivity: 9
    // stress: 6
     */
   
    constructor(_data){
        this.width = 160;
        this.height = 160;
        this.data = _data;
        this.render = this.render.bind(this);
    }

    render(sketch){
        // remember that the "this" keyword, won't be available do to scope 
        const w = this.width;
        const h = this.height;
        const data = this.data;
        const starWidth = 80

        sketch.setup = function() {
            sketch.createCanvas(w, h);
            sketch.noLoop();
        };

        sketch.draw = function() {
            if(data.fitness){
                sketch.background( 218, 247, 166 );
            }else{
                sketch.background(  247, 223, 241 );
            }
            

            sketch.push();
            sketch.translate(sketch.width/2, sketch.height/2);
            sketch.beginShape();
            sketch.noStroke();
            // anxiety
            // angle 0
            sketch.vertex(
                    sketch.cos(radians(0) )*sketch.map(data.anxiety, 1, 10, 1, starWidth), 
                    sketch.sin(radians(0) )*sketch.map(data.anxiety, 1, 10, 1, starWidth)
                    );

            // contentment
            sketch.vertex(
                    sketch.cos(radians(90) )*sketch.map(data.contentment, 1, 10, 1, starWidth), 
                    sketch.sin(radians(90) )*sketch.map(data.contentment, 1, 10, 1, starWidth)
                    );

            // productivity
            sketch.vertex(
                    sketch.cos(radians(180))*sketch.map(data.productivity, 1, 10, 1, starWidth), 
                    sketch.sin(radians(180))*sketch.map(data.productivity, 1, 10, 1, starWidth)
                    );

            // stress
            sketch.vertex(
                    sketch.cos(radians(270))*sketch.map(data.stress, 1, 10, 1, starWidth), 
                    sketch.sin(radians(270))*sketch.map(data.stress, 1, 10, 1, starWidth)
                    );
            

            sketch.endShape(CLOSE);

            sketch.stroke(0);
            sketch.line(-5, 0, 5, 0)
            sketch.line(0, -5, 0, 5)
            sketch.pop();

        };
    }

}